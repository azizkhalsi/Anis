import { useRef, useState, useEffect } from 'react';
import MotorScene from '../simulator/components/3d/MotorScene';

export default function MotorModelPage() {
  const motorDataRef = useRef({ angle: 0, phaseVoltages: [0, 0, 0] });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!animate) return;
    let raf;
    const tick = () => {
      motorDataRef.current.angle = (motorDataRef.current.angle + 1.2) % 360;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}>
        <MotorScene
          motorDataRef={motorDataRef}
          amplitude={100}
          isRunning={animate}
        />
      </div>
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
          3-phase motor model
        </span>
        <label style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
          />
          Animate rotor
        </label>
      </div>
    </div>
  );
}
