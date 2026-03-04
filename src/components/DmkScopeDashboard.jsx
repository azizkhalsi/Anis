import { useEffect, useRef, useState } from 'react';

const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 720;

export default function DmkScopeDashboard() {
  const wrapRef = useRef(null);
  const tdCanvasRef = useRef(null);
  const dqCanvasRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Scale to fit pane
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const s = Math.min(w / DESIGN_WIDTH, h / DESIGN_HEIGHT);
      setScale(s);
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // TIME DOMAIN + DQ animation
  useEffect(() => {
    const tdC = tdCanvasRef.current;
    const dqC = dqCanvasRef.current;
    if (!tdC || !dqC) return;

    const tdX = tdC.getContext('2d');
    const dqX = dqC.getContext('2d');
    const W1 = tdC.width;
    const H1 = tdC.height;
    const W2 = dqC.width;
    const H2 = dqC.height;

    const TD_MAX = 79;
    const TD_MIN = -79;
    const TD_RNG = TD_MAX - TD_MIN;
    const ML1 = 54;
    const MR1 = 8;
    const MT1 = 6;
    const MB1 = 6;
    const PW1 = W1 - ML1 - MR1;
    const PH1 = H1 - MT1 - MB1;
    const TD_TICKS = [79, 59.25, 39.5, 19.75, 0, -19.75, -39.5, -59.25, -79];

    function y1(v) {
      return MT1 + ((TD_MAX - v) / TD_RNG) * PH1;
    }

    const CYCLES = 4.5;
    const tdWaves = [
      { amp: 55, off: 0, col: '#4db84d', lw: 1.8 },
      { amp: 55, off: (2 * Math.PI) / 3, col: '#e8a020', lw: 1.8 },
      { amp: 55, off: (4 * Math.PI) / 3, col: '#5060c8', lw: 1.8 },
    ];
    let tdPh = 0;

    function drawTD(ph) {
      tdX.fillStyle = '#fff';
      tdX.fillRect(0, 0, W1, H1);
      tdX.strokeStyle = '#ddd';
      tdX.lineWidth = 0.8;
      TD_TICKS.forEach((v) => {
        const y = y1(v);
        tdX.beginPath();
        tdX.moveTo(ML1, y);
        tdX.lineTo(ML1 + PW1, y);
        tdX.stroke();
      });
      for (let i = 0; i <= 10; i++) {
        const x = ML1 + (i / 10) * PW1;
        tdX.beginPath();
        tdX.moveTo(x, MT1);
        tdX.lineTo(x, MT1 + PH1);
        tdX.stroke();
      }
      tdX.fillStyle = '#333';
      tdX.font = '10px Courier New';
      tdX.textAlign = 'right';
      TD_TICKS.forEach((v) => {
        tdX.fillText(v.toFixed(2), ML1 - 4, y1(v) + 3.5);
      });
      tdX.strokeStyle = '#5599ee';
      tdX.lineWidth = 1.5;
      tdX.beginPath();
      tdX.moveTo(ML1, y1(0));
      tdX.lineTo(ML1 + PW1, y1(0));
      tdX.stroke();
      const om = 2 * Math.PI * CYCLES;
      tdWaves.forEach((w) => {
        tdX.strokeStyle = w.col;
        tdX.lineWidth = w.lw;
        tdX.beginPath();
        for (let px = 0; px <= PW1; px++) {
          const t = px / PW1;
          const v = w.amp * Math.sin(om * t + ph + w.off);
          const x = ML1 + px;
          const y = y1(v);
          if (px === 0) tdX.moveTo(x, y);
          else tdX.lineTo(x, y);
        }
        tdX.stroke();
      });
      tdX.strokeStyle = '#999';
      tdX.lineWidth = 1;
      tdX.strokeRect(ML1, MT1, PW1, PH1);
    }

    const DQ_MAX = 36;
    const DQ_MIN = -36;
    const DQ_RNG = DQ_MAX - DQ_MIN;
    const ML2 = 54;
    const MR2 = 8;
    const MT2 = 6;
    const MB2 = 6;
    const PW2 = W2 - ML2 - MR2;
    const PH2 = H2 - MT2 - MB2;
    const DQ_TICKS = [36, 27, 18, 9, 0, -9, -18, -27, -36];

    function y2(v) {
      return MT2 + ((DQ_MAX - v) / DQ_RNG) * PH2;
    }

    const N = Math.floor(PW2);
    const bVQ = new Float32Array(N);
    const bVD = new Float32Array(N);
    const bIQ = new Float32Array(N);
    const bID = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      const t = i / N;
      const rise = Math.min(1, t * 5);
      bVQ[i] = 30.2 + (Math.random() - 0.5) * 1.2;
      bVD[i] = 5.5 * rise + (Math.random() - 0.5) * 1.6 + Math.sin(t * 50) * 0.4;
      bIQ[i] = (Math.random() - 0.5) * 0.28;
      bID[i] = (Math.random() - 0.5) * 0.2;
    }
    let dqT = 0;

    function pushDQ() {
      bVQ.copyWithin(0, 1);
      bVD.copyWithin(0, 1);
      bIQ.copyWithin(0, 1);
      bID.copyWithin(0, 1);
      const L = N - 1;
      bVQ[L] = 30.3 + (Math.random() - 0.5) * 1.4;
      bVD[L] = 5.5 + (Math.random() - 0.5) * 1.8 + Math.sin(dqT * 0.18) * 0.5;
      bIQ[L] = (Math.random() - 0.5) * 0.26;
      bID[L] = (Math.random() - 0.5) * 0.18;
      dqT++;
    }

    function drawLine2(buf, col, lw) {
      dqX.strokeStyle = col;
      dqX.lineWidth = lw;
      dqX.beginPath();
      for (let i = 0; i < N; i++) {
        const x = ML2 + i;
        const y = y2(buf[i]);
        if (i === 0) dqX.moveTo(x, y);
        else dqX.lineTo(x, y);
      }
      dqX.stroke();
    }

    function drawDQ() {
      dqX.fillStyle = '#fff';
      dqX.fillRect(0, 0, W2, H2);
      dqX.strokeStyle = '#ddd';
      dqX.lineWidth = 0.8;
      DQ_TICKS.forEach((v) => {
        const y = y2(v);
        dqX.beginPath();
        dqX.moveTo(ML2, y);
        dqX.lineTo(ML2 + PW2, y);
        dqX.stroke();
      });
      for (let i = 0; i <= 10; i++) {
        const x = ML2 + (i / 10) * PW2;
        dqX.beginPath();
        dqX.moveTo(x, MT2);
        dqX.lineTo(x, MT2 + PH2);
        dqX.stroke();
      }
      dqX.fillStyle = '#333';
      dqX.font = '10px Courier New';
      dqX.textAlign = 'right';
      DQ_TICKS.forEach((v) => {
        dqX.fillText(v.toFixed(2), ML2 - 4, y2(v) + 3.5);
      });
      drawLine2(bID, '#c44444', 1.5);
      drawLine2(bIQ, '#5060c8', 1.5);
      drawLine2(bVD, '#e8a020', 1.6);
      drawLine2(bVQ, '#4db84d', 1.8);
      dqX.strokeStyle = '#999';
      dqX.lineWidth = 1;
      dqX.strokeRect(ML2, MT2, PW2, PH2);
    }

    const SPEED = 2.2;
    let last = null;
    let frameId;

    function loop(ts) {
      if (!last) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;

      tdPh += SPEED * dt;
      const n = Math.max(1, Math.round(dt * 60));
      for (let i = 0; i < n; i++) pushDQ();

      drawTD(tdPh);
      drawDQ();
      frameId = requestAnimationFrame(loop);
    }
    frameId = requestAnimationFrame(loop);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={wrapRef} className="dmk-rt-wrap">
      <div
        className="dmk-rt-app-window"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <div className="dmk-rt-title-bar">
          <div className="dmk-rt-tb-icon">A</div>
          <div className="dmk-rt-tb-title">APPCON: DMKRT - Motor Monitoring System</div>
          <div className="dmk-rt-win-btns">
            <div className="dmk-rt-win-btn">—</div>
            <div className="dmk-rt-win-btn">☐</div>
            <div className="dmk-rt-win-btn dmk-rt-close">✕</div>
          </div>
        </div>

        <div className="dmk-rt-menu-bar">
          <span className="dmk-rt-mi">COM PORT</span>
          <span className="dmk-rt-mi">Configuration</span>
        </div>

        <div className="dmk-rt-body-row">
          <div className="dmk-rt-side-tabs">
            <div className="dmk-rt-stab dmk-rt-active">Main Menu</div>
            <div className="dmk-rt-stab">Settings</div>
          </div>

          <div className="dmk-rt-left-panel">
            <button type="button" className="dmk-rt-stop-btn">Stop</button>

            <div className="dmk-rt-pbox">
              <div className="dmk-rt-pbox-title">Time Menu</div>
              <div className="dmk-rt-zoom-lbl">Zoom: 100%</div>
              <div className="dmk-rt-knob-wrap">
                <div className="dmk-rt-knob-outer">
                  <svg className="dmk-rt-knob-svg" width="60" height="60">
                    <g transform="translate(30,30)">
                      {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((rot) => (
                        <line key={rot} x1="0" y1="-27" x2="0" y2="-23" stroke="#888" strokeWidth="1.2" transform={`rotate(${rot})`} />
                      ))}
                    </g>
                  </svg>
                  <div className="dmk-rt-knob-body" />
                </div>
                <div className="dmk-rt-knob-lbl">10 ms / DIV</div>
              </div>
            </div>

            <div className="dmk-rt-pbox">
              <div className="dmk-rt-pbox-title">Trigger Menu</div>
              <div className="dmk-rt-ctrl-row">
                <select className="dmk-rt-ctrl-sel">
                  <option>Auto</option>
                  <option>Normal</option>
                  <option>Single</option>
                </select>
              </div>
              <div className="dmk-rt-ch-row">
                <div className="dmk-rt-ch-color-box" style={{ background: '#4db84d' }} />
                <select className="dmk-rt-ch-sel">
                  <option>CH1</option>
                  <option>CH2</option>
                  <option>CH3</option>
                  <option>CH4</option>
                </select>
              </div>
              <div className="dmk-rt-ctrl-row">
                <select className="dmk-rt-ctrl-sel">
                  <option>Rising Edge</option>
                  <option>Falling Edge</option>
                </select>
              </div>
              <input type="range" className="dmk-rt-trig-slider" min="0" max="100" defaultValue="30" />
              <div className="dmk-rt-trig-val">Trigger value: 0</div>
              <button type="button" className="dmk-rt-set50">Set to 50%</button>
            </div>

            <div className="dmk-rt-pbox">
              <div className="dmk-rt-pbox-title">Filter Menu</div>
              <div className="dmk-rt-filter-row">
                <span>Filter Order</span>
                <select className="dmk-rt-filt-sel">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>4</option>
                </select>
              </div>
            </div>

            <div className="dmk-rt-fft-box">
              <div className="dmk-rt-fft-title">FFT / TEMPORAL</div>
              <button type="button" className="dmk-rt-fft-btn">
                <span className="dmk-rt-fft-arrow">⇒</span> Freq Domain
              </button>
            </div>
          </div>

          <div className="dmk-rt-charts-area">
            <div className="dmk-rt-charts-row">
              <div className="dmk-rt-chart-panel">
                <div className="dmk-rt-chart-title">TIME DOMAIN VIEW</div>
                <canvas ref={tdCanvasRef} width={470} height={452} />
                <div className="dmk-rt-chart-legend">
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#5599ee' }} /> Trig</div>
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#4db84d' }} /> Vs1</div>
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#e8a020' }} /> Vs2</div>
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#5060c8' }} /> Is1</div>
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#c44444' }} /> Is2</div>
                </div>
              </div>
              <div className="dmk-rt-chart-panel">
                <div className="dmk-rt-chart-title">DQ CHART VIEW</div>
                <canvas ref={dqCanvasRef} width={470} height={452} />
                <div className="dmk-rt-chart-legend">
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#4db84d' }} /> VQ</div>
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#e8a020' }} /> VD</div>
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#5060c8' }} /> IQ</div>
                  <div className="dmk-rt-li"><div className="dmk-rt-ld" style={{ background: '#c44444' }} /> ID</div>
                </div>
              </div>
            </div>

            <div className="dmk-rt-knobs-section">
              <div className="dmk-rt-knobs-grp">
                <div className="dmk-rt-ki"><div className="dmk-rt-ks" /><div className="dmk-rt-kl" style={{ background: '#666' }}>CH1 x 1</div></div>
                <div className="dmk-rt-ki"><div className="dmk-rt-ks" /><div className="dmk-rt-kl" style={{ background: '#e8a020' }}>CH2 x 1</div></div>
                <div className="dmk-rt-ki"><div className="dmk-rt-ks" /><div className="dmk-rt-kl" style={{ background: '#5060c8' }}>CH3 x 1</div></div>
                <div className="dmk-rt-ki"><div className="dmk-rt-ks" /><div className="dmk-rt-kl" style={{ background: '#c44444' }}>CH4 x 1</div></div>
              </div>
              <div className="dmk-rt-knobs-grp">
                <div className="dmk-rt-ki"><div className="dmk-rt-ks" /><div className="dmk-rt-kl" style={{ background: '#4db84d' }}>CH1 x 1</div></div>
                <div className="dmk-rt-ki"><div className="dmk-rt-ks" /><div className="dmk-rt-kl" style={{ background: '#e8a020' }}>CH2 x 1</div></div>
                <div className="dmk-rt-ki"><div className="dmk-rt-ks" /><div className="dmk-rt-kl" style={{ background: '#5060c8' }}>CH3 x 1</div></div>
                <div className="dmk-rt-ki"><div className="dmk-rt-ks" /><div className="dmk-rt-kl" style={{ background: '#c44444' }}>CH4 x 1</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="dmk-rt-status-bar">
          10 ms / DIV &nbsp;&nbsp; Online <div className="dmk-rt-ol-dot" />
        </div>
      </div>
    </div>
  );
}
