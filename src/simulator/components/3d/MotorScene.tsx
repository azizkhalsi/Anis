import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MotorModel from "./MotorModel";
import MotorModelSTL from "./MotorModelSTL";

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
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      frameloop="always"
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-4, 6, -3]} intensity={0.4} color="#b4d4ff" />
      <directionalLight position={[0, -3, 0]} intensity={0.2} color="#ffaa77" />
      <pointLight position={[0, 2, 0]} intensity={0.35} color="#ffffff" />

      <MotorModelSTL {...motorProps} fallback={<MotorModel {...motorProps} />} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={1.5}
        maxDistance={6}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        rotateSpeed={0.8}
        zoomSpeed={1.2}
      />
    </Canvas>
  );
}
