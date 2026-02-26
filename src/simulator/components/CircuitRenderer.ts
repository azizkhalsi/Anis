// Real-time 3-Phase Inverter (Pont-H) circuit: DC bus → 6 switches → motor.
// Duties u10,u20,u30 drive Q1–Q6; phase voltages drive current-flow animation.

const PI = Math.PI;
const TWO_PI = 2 * PI;

// Layout for 1280×600 (scaled by caller if needed)
const W = 1280;
const H = 600;
const BUS_PLUS_Y = 58;
const BUS_MINUS_Y = 542;
const BUS_X_L = 80;
const BUS_X_R = 780;
const LEG_X = [240, 440, 640];
const MID_Y = 300;
const SW_W = 64;
const SW_H = 88;
const HIGH_CY = BUS_PLUS_Y + 72 + SW_H / 2;
const LOW_CY = BUS_MINUS_Y - 72 - SW_H / 2;
const MOTOR_CX = 1050;
const MOTOR_CY = MID_Y;
const MOTOR_R = 90;
const PHASE_COLORS = ['#facc15', '#ef4444', '#22c55e'];
const PHASE_LABELS = ['A', 'B', 'C'];
const WIRE_Y_OFFSETS = [-52, 0, 52];

const wirePaths: [number, number][][] = LEG_X.map((lx, i) => {
  const wy = MID_Y + WIRE_Y_OFFSETS[i];
  const entryAngle = (160 - i * 20) * PI / 180;
  const mx = MOTOR_CX + MOTOR_R * Math.cos(entryAngle);
  const my = MOTOR_CY - MOTOR_R * Math.sin(entryAngle);
  return [[lx, MID_Y], [lx + 20, wy], [mx - 14, wy], [mx, my]];
});

type Pt = [number, number];

function pathLen(pts: Pt[]): number {
  let l = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1];
    l += Math.sqrt(dx * dx + dy * dy);
  }
  return l;
}

function ptOnPath(pts: Pt[], d: number): Pt {
  let rem = d;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1];
    const seg = Math.sqrt(dx * dx + dy * dy);
    if (rem <= seg && seg > 0) {
      const t = rem / seg;
      return [pts[i - 1][0] + dx * t, pts[i - 1][1] + dy * t];
    }
    rem -= seg;
  }
  return pts[pts.length - 1];
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function hexAlpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function lerpHex(dark: string, light: string, t: number): string {
  const d = [parseInt(dark.slice(1, 3), 16), parseInt(dark.slice(3, 5), 16), parseInt(dark.slice(5, 7), 16)];
  const l = [parseInt(light.slice(1, 3), 16), parseInt(light.slice(3, 5), 16), parseInt(light.slice(5, 7), 16)];
  const mix = d.map((v, i) => Math.round(v + (l[i] - v) * t));
  return `rgb(${mix[0]},${mix[1]},${mix[2]})`;
}

function drawSwitch(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  duty: number, phaseColor: string, label: string, labelBelow: boolean
) {
  const x = cx - SW_W / 2, y = cy - SW_H / 2;
  const fill = lerpHex('#1e293b', phaseColor, 0.25 + duty * 0.75);
  ctx.fillStyle = fill;
  roundRect(ctx, x, y, SW_W, SW_H, 8);
  ctx.fill();
  ctx.strokeStyle = hexAlpha(phaseColor, 0.3 + duty * 0.7);
  ctx.lineWidth = duty > 0.4 ? 3 : 1.5;
  roundRect(ctx, x, y, SW_W, SW_H, 8);
  ctx.stroke();
  ctx.fillStyle = duty > 0.5 ? '#000' : '#e2e8f0';
  ctx.font = 'bold 15px monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(`${Math.round(duty * 100)}%`, cx, cy);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(label, cx, labelBelow ? cy + SW_H / 2 + 16 : cy - SW_H / 2 - 11);
}

function drawDiode(ctx: CanvasRenderingContext2D, cx: number, cy: number, phaseColor: string) {
  const sz = 12;
  ctx.strokeStyle = hexAlpha(phaseColor, 0.6);
  ctx.fillStyle = hexAlpha(phaseColor, 0.35);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - sz, cy + sz);
  ctx.lineTo(cx + sz, cy + sz);
  ctx.lineTo(cx, cy - sz);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - sz, cy - sz);
  ctx.lineTo(cx + sz, cy - sz);
  ctx.stroke();
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  path: Pt[],
  color: string,
  magnitude: number,
  tick: number
) {
  const absMag = Math.abs(magnitude);
  if (absMag < 1.5) return;
  const total = pathLen(path);
  const spacing = 26;
  const n = Math.ceil(total / spacing);
  const speed = (magnitude > 0 ? 1.8 : -1.8) * Math.min(absMag / 20, 1);
  const baseR = 3 + Math.min(absMag / 30, 1) * 2;
  const alpha = 0.4 + Math.min(absMag / 30, 1) * 0.55;
  ctx.fillStyle = hexAlpha(color, alpha);
  for (let i = 0; i < n; i++) {
    const d = ((i * spacing + tick * speed) % total + total) % total;
    const p = ptOnPath(path, d);
    ctx.beginPath();
    ctx.arc(p[0], p[1], baseR, 0, TWO_PI);
    ctx.fill();
  }
}

function drawMotor(
  ctx: CanvasRenderingContext2D,
  electricalAngleDeg: number,
  amplitude: number
) {
  const cx = MOTOR_CX, cy = MOTOR_CY, r = MOTOR_R;
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, TWO_PI); ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath(); ctx.arc(cx, cy, r - 3, 0, TWO_PI); ctx.fill();
  for (let i = 0; i < 3; i++) {
    const entryAngle = (160 - i * 20) * PI / 180;
    const ex = cx + r * Math.cos(entryAngle);
    const ey = cy - r * Math.sin(entryAngle);
    const dx = cx - ex, dy = cy - ey;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
    const bumps = 6, amp = 9;
    ctx.strokeStyle = hexAlpha(PHASE_COLORS[i], 0.75);
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    for (let j = 1; j <= bumps * 2; j++) {
      const t = j / (bumps * 2 + 1);
      const px = ex + dx * t, py = ey + dy * t;
      const side = (j % 2 === 1 ? 1 : -1) * amp;
      ctx.lineTo(px + nx * side, py + ny * side);
    }
    ctx.lineTo(cx, cy);
    ctx.stroke();
  }
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, TWO_PI); ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.fillText('N', cx, cy + 8);
  const fieldMag = Math.min(amplitude / 100, 1) * (r - 20);
  if (fieldMag > 4) {
    const rad = electricalAngleDeg * PI / 180;
    const fx = cx + fieldMag * Math.cos(rad);
    const fy = cy - fieldMag * Math.sin(rad);
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(fx, fy); ctx.stroke();
    const angle = Math.atan2(fy - cy, fx - cx);
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx - 12 * Math.cos(angle - 0.4), fy - 12 * Math.sin(angle - 0.4));
    ctx.lineTo(fx - 12 * Math.cos(angle + 0.4), fy - 12 * Math.sin(angle + 0.4));
    ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 26px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('M', cx, cy - r - 18);
}

export function drawCircuit(
  ctx: CanvasRenderingContext2D,
  duties: [number, number, number],
  phaseVoltages: [number, number, number],
  electricalAngleDeg: number,
  amplitude: number,
  tick: number,
  isRunning: boolean = true,
  stoppedLabel: string = 'STOPPED'
) {
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;
  const scaleX = cw / W;
  const scaleY = ch / H;
  const scale = Math.min(scaleX, scaleY);
  const offX = (cw - W * scale) / 2;
  const offY = (ch - H * scale) / 2;
  ctx.save();
  ctx.translate(offX, offY);
  ctx.scale(scale, scale);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  ctx.fillText('3-Phase Inverter (Pont-H) · Real-time', 18, 14);

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ef4444';
  ctx.beginPath(); ctx.moveTo(BUS_X_L, BUS_PLUS_Y); ctx.lineTo(BUS_X_R, BUS_PLUS_Y); ctx.stroke();
  ctx.fillStyle = '#ef4444'; ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('V+', BUS_X_L - 10, BUS_PLUS_Y - 8);

  ctx.strokeStyle = '#60a5fa';
  ctx.beginPath(); ctx.moveTo(BUS_X_L, BUS_MINUS_Y); ctx.lineTo(BUS_X_R, BUS_MINUS_Y); ctx.stroke();
  ctx.fillStyle = '#60a5fa';
  ctx.fillText('V−', BUS_X_L - 10, BUS_MINUS_Y - 8);

  const capX = 130, capW = 32, capGap = 12;
  const capTopY = MID_Y - capGap / 2, capBotY = MID_Y + capGap / 2;
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(capX, BUS_PLUS_Y); ctx.lineTo(capX, capTopY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(capX, capBotY); ctx.lineTo(capX, BUS_MINUS_Y); ctx.stroke();
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(capX - capW / 2, capTopY); ctx.lineTo(capX + capW / 2, capTopY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(capX - capW / 2, capBotY); ctx.lineTo(capX + capW / 2, capBotY); ctx.stroke();
  ctx.fillStyle = '#cbd5e1'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('C', capX, MID_Y + 5);

  for (let i = 0; i < 3; i++) {
    const lx = LEG_X[i];
    const d = duties[i] / 100;
    const dHigh = d, dLow = 1 - d;
    const col = PHASE_COLORS[i];
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(lx, BUS_PLUS_Y); ctx.lineTo(lx, HIGH_CY - SW_H / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lx, HIGH_CY + SW_H / 2); ctx.lineTo(lx, MID_Y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lx, MID_Y); ctx.lineTo(lx, LOW_CY - SW_H / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lx, LOW_CY + SW_H / 2); ctx.lineTo(lx, BUS_MINUS_Y); ctx.stroke();
    drawSwitch(ctx, lx, HIGH_CY, dHigh, col, `Q${i * 2 + 1}`, false);
    drawSwitch(ctx, lx, LOW_CY, dLow, col, `Q${i * 2 + 2}`, true);
    const diodeX = lx + SW_W / 2 + 18;
    drawDiode(ctx, diodeX, HIGH_CY, col);
    drawDiode(ctx, diodeX, LOW_CY, col);
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(lx, MID_Y, 5, 0, TWO_PI); ctx.fill();
    ctx.fillStyle = col; ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(PHASE_LABELS[i], lx + 10, MID_Y - 16);
  }

  for (let i = 0; i < 3; i++) {
    const col = PHASE_COLORS[i];
    const path = wirePaths[i];
    ctx.strokeStyle = hexAlpha(col, 0.6);
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for (let j = 1; j < path.length; j++) ctx.lineTo(path[j][0], path[j][1]);
    ctx.stroke();
    drawParticles(ctx, path, col, isRunning ? phaseVoltages[i] : 0, isRunning ? tick : 0);
  }

  drawMotor(ctx, electricalAngleDeg, isRunning ? amplitude : 0);

  ctx.fillStyle = '#475569'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('Dead-time between Q_high ↔ Q_low · Body diodes: freewheeling / back-EMF', 18, H - 14);

  if (!isRunning) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(W / 2 - 90, H / 2 - 28, 180, 56);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(W / 2 - 90, H / 2 - 28, 180, 56);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(stoppedLabel, W / 2, H / 2);
  }

  ctx.restore();
}
