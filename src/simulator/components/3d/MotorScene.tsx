import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MotorModelAnis from "./MotorModelAnis";
import MotorModel from "./MotorModel";
import MotorErrorBoundary from "./MotorErrorBoundary";

interface MotorData {
  angle: number;
  phaseVoltages: [number, number, number];
}

interface Props {
  motorDataRef: React.RefObject<MotorData>;
  amplitude: number;
  isRunning: boolean;
}

export default function MotorScene({ motorDataRef, amplitude, isRunning }: Props) {
  const motorProps = { motorDataRef, amplitude, isRunning };

  return (
    <Canvas
      camera={{ position: [1.8, 1.4, 2], fov: 42 }}
      dpr={[1, 1]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      frameloop="always"
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[5, 8, 5]} intensity={2.4} />
      <directionalLight position={[-4, 6, -3]} intensity={0.85} color="#b4d4ff" />
      <directionalLight position={[0, 5, 2]} intensity={0.75} color="#ffffff" />
      <directionalLight position={[0, -3, 0]} intensity={0.5} color="#ffcc99" />
      <pointLight position={[0, 2, 0]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[2, 3, 4]} intensity={0.6} color="#e8f4ff" />

      <MotorErrorBoundary fallback={<MotorModel {...motorProps} />}>
        <MotorModelAnis {...motorProps} />
      </MotorErrorBoundary>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.5}
        maxDistance={6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        rotateSpeed={0.7}
        zoomSpeed={1}
      />
    </Canvas>
  );
}
