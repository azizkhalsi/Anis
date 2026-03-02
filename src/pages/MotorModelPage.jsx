import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MotorModel from '../simulator/components/3d/MotorModel';

export default function MotorModelPage() {
  const motorDataRef = useRef({ angle: 0, phaseVoltages: [0, 0, 0] });
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!animate) return;
    let raf;
    const tick = () => {
      motorDataRef.current.angle = (motorDataRef.current.angle + 0.8) % 360;
      const a = motorDataRef.current.angle * (Math.PI / 180);
      motorDataRef.current.phaseVoltages = [
        Math.cos(a) * 30,
        Math.cos(a - (2 * Math.PI / 3)) * 30,
        Math.cos(a - (4 * Math.PI / 3)) * 30,
      ];
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0f172a' }}>
      <Canvas
        camera={{ position: [0, 2.8, 1.6], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 8, 4]} intensity={1.6} />
        <directionalLight position={[-3, 5, -2]} intensity={0.4} color="#a0c4ff" />
        <hemisphereLight args={['#b0c4de', '#1e293b', 0.5]} />

        <MotorModel
          motorDataRef={motorDataRef}
          amplitude={100}
          isRunning={animate}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          enableDamping
          dampingFactor={0.08}
          minDistance={1.5}
          maxDistance={6}
          rotateSpeed={0.7}
        />
      </Canvas>

      <div style={{
        position: 'absolute', top: 16, left: 16, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontFamily: 'system-ui, sans-serif' }}>
          3-Phase Motor Model
        </span>
        <label style={{
          color: 'rgba(255,255,255,0.85)', fontSize: 13, fontFamily: 'system-ui, sans-serif',
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        }}>
          <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.target.checked)} />
          Animate rotor
        </label>
      </div>
    </div>
  );
}
