/**
 * Full fault detection simulation: image + canvas overlay (scan line + fault marker),
 * Run button, status text, and fault badge. Ported from standalone HTML/JS.
 */
import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const N = 500;
const SPIKE = 250;
const DUR_MS = 1800;
const f = (2 * Math.PI * 75) / 1000;
const wV = Array.from({ length: N }, (_, p) => {
  const t = -10 + (p / (N - 1)) * 20;
  const sp = Math.abs(t) < 0.38 ? 33 * Math.exp(-Math.pow(t * 5.8, 2)) : 0;
  return 50 * Math.sin(f * t - 2.094) + sp;
});

export default function DmkFaultDetectionSim({ imageSrc, imageAlt }) {
  const { t } = useTranslation();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const scanXRef = useRef(-1);
  const [busy, setBusy] = useState(false);
  const [fault, setFault] = useState(false);
  const scanStartRef = useRef(0);

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const cpx = (i) => W * (i / (N - 1));
    const cpy = (v) => H * (1 - (v + 55) / 110);

    const currentScanX = scanXRef.current;
    if (currentScanX >= 0 && currentScanX <= 1) {
      const sx = W * currentScanX;
      const g = ctx.createLinearGradient(sx - 28 * dpr, 0, sx + 4 * dpr, 0);
      g.addColorStop(0, 'rgba(22,163,74,0)');
      g.addColorStop(1, 'rgba(22,163,74,0.18)');
      ctx.fillStyle = g;
      ctx.fillRect(sx - 28 * dpr, 0, 28 * dpr, H);
      ctx.strokeStyle = 'rgba(22,163,74,0.85)';
      ctx.lineWidth = 1.8 * dpr;
      ctx.setLineDash([5 * dpr, 3 * dpr]);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, H);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (fault) {
      const fx = cpx(SPIKE);
      const fy = cpy(wV[SPIKE]);

      ctx.strokeStyle = 'rgba(20,20,20,0.65)';
      ctx.lineWidth = 1.4 * dpr;
      ctx.setLineDash([6 * dpr, 4 * dpr]);
      ctx.beginPath();
      ctx.moveTo(fx, 0);
      ctx.lineTo(fx, H);
      ctx.stroke();
      ctx.setLineDash([]);

      const now = Date.now();
      [0, 320, 640].forEach((off) => {
        const ph = ((now + off) % 960) / 960;
        ctx.fillStyle = `rgba(220,38,38,${(1 - ph) * 0.25 + 0.1})`;
        ctx.beginPath();
        ctx.arc(fx, fy, (4 + ph * 20) * dpr, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(fx, fy, 4.5 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5 * dpr;
      ctx.stroke();

      const txt = 'FAULT · V_W · T = 0';
      ctx.font = `bold ${9.5 * dpr}px 'JetBrains Mono', monospace`;
      const tw = ctx.measureText(txt).width;
      let lx = fx + 8 * dpr;
      const ly = fy - 21 * dpr;
      if (lx + tw + 14 * dpr > W) lx = fx - tw - 22 * dpr;
      ctx.fillStyle = 'rgba(220,38,38,0.92)';
      ctx.beginPath();
      ctx.roundRect(lx, ly, tw + 12 * dpr, 16 * dpr, 4 * dpr);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText(txt, lx + 6 * dpr, ly + 11 * dpr);
    }

    if (fault || (currentScanX >= 0 && currentScanX <= 1)) {
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [fault, dpr]);

  useEffect(() => {
    draw();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  const resize = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const rect = wrap.getBoundingClientRect();
    const left = rect.width * 0.07;
    const top = rect.height * 0.7689;
    const w = rect.width * 0.8973;
    const h = rect.height * 0.2059;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    draw();
  }, [dpr, draw]);

  useEffect(() => {
    resize();
    const ro = new ResizeObserver(resize);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', resize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  const runAlgorithm = () => {
    if (busy || fault) return;
    setBusy(true);
    scanXRef.current = 0;
    scanStartRef.current = performance.now();
    rafRef.current = requestAnimationFrame(draw);

    const tick = (now) => {
      const elapsed = now - scanStartRef.current;
      const p = Math.min(elapsed / DUR_MS, 1);
      const easeX = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      scanXRef.current = easeX;

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      scanXRef.current = -1;
      setFault(true);
      setBusy(false);
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const statusKey = fault
    ? 'products.dmk.dataIntel.faultStatusFound'
    : busy
      ? 'products.dmk.dataIntel.faultStatusScanning'
      : 'products.dmk.dataIntel.faultStatusReady';
  const statusClass = fault ? 'dmk-fault-sim-status--found' : busy ? 'dmk-fault-sim-status--scanning' : '';

  return (
    <div className="dmk-fault-sim">
      <div className="dmk-fault-sim-wrap" ref={wrapRef}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="dmk-fault-sim-img"
          loading="lazy"
          decoding="async"
        />
        <canvas
          ref={canvasRef}
          className="dmk-fault-sim-canvas"
          aria-hidden
        />
        <div
          className={`dmk-fault-sim-badge ${fault ? 'dmk-fault-sim-badge--show' : ''}`}
          role="status"
          aria-live="polite"
        >
          ● Fault 2 &nbsp;|&nbsp; V_W at T = 0 &nbsp;|&nbsp; Row 1 090 975 &nbsp;|&nbsp; 1.8 ms detection
        </div>
      </div>
      <button
        type="button"
        className={`dmk-fault-sim-btn ${busy ? 'dmk-fault-sim-btn--busy' : ''} ${fault ? 'dmk-fault-sim-btn--done' : ''}`}
        onClick={runAlgorithm}
        disabled={busy}
        aria-pressed={fault}
      >
        {fault ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Fault Found
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            {t('products.dmk.dataIntel.runYourAlgorithm')}
          </>
        )}
      </button>
      <div className={`dmk-fault-sim-status ${statusClass}`}>
        {t(statusKey)}
      </div>
    </div>
  );
}
