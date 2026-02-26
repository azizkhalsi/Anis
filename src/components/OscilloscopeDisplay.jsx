import { useRef, useEffect } from 'react';

const GRID_COLOR = 'rgba(255, 255, 255, 0.08)';
const LABEL_COLOR = 'rgba(255, 255, 255, 0.45)';
const TRACE_COLORS = ['#39d353', '#00d4aa', '#f0b429', '#ff8c42'];
const BG_COLOR = '#0f0f14';

export default function OscilloscopeDisplay() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width) || 140;
      const h = Math.round(rect.height) || 100;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const numChannels = 3;
    const divisionsX = 10;
    const divisionsY = 8;
    const padding = { top: 14, right: 28, bottom: 12, left: 36 };

    const draw = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const t = (timestamp - startTimeRef.current) / 1000;

      const w = canvas.width;
      const h = canvas.height;
      const graphW = w - padding.left - padding.right;
      const graphH = h - padding.top - padding.bottom;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;

      for (let i = 0; i <= divisionsX; i++) {
        const x = padding.left + (i / divisionsX) * graphW;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, h - padding.bottom);
        ctx.stroke();
      }
      for (let j = 0; j <= divisionsY; j++) {
        const y = padding.top + (j / divisionsY) * graphH;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();
      }

      ctx.fillStyle = LABEL_COLOR;
      ctx.font = '9px "JetBrains Mono", "SF Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText('2 ms/div', w - padding.right - 2, h - 2);
      ctx.textAlign = 'left';
      ctx.fillText('1 V/div', 2, padding.top + 10);

      for (let ch = 0; ch < numChannels; ch++) {
        ctx.fillStyle = TRACE_COLORS[ch];
        ctx.fillText(`Ch${ch + 1}`, padding.left + 2, padding.top + 12 + ch * 10);
      }

      const pointsPerTrace = Math.max(80, Math.floor(graphW / 2));
      const amp = graphH / (numChannels * 3);
      const baseY = padding.top + graphH / 2;
      const freq = 1.2;
      const phases = [0, Math.PI * 0.66, Math.PI * 1.33];

      for (let ch = 0; ch < numChannels; ch++) {
        ctx.strokeStyle = TRACE_COLORS[ch];
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const offsetY = (ch - (numChannels - 1) / 2) * (graphH / (numChannels + 1));
        for (let i = 0; i <= pointsPerTrace; i++) {
          const xNorm = i / pointsPerTrace;
          const x = padding.left + xNorm * graphW;
          const wave = Math.sin(2 * Math.PI * freq * (t + xNorm * 2) + phases[ch]);
          const noise = (Math.random() - 0.5) * 2;
          const y = baseY + offsetY - wave * amp + noise;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    setSize();
    rafRef.current = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      setSize();
    });
    resizeObserver.observe(canvas);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="oscilloscope-display"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
