import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MotorModel from "./MotorModel";

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
  return (
    <Canvas
      camera={{ position: [1.6, 1.4, 2.0], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} />
      <directionalLight position={[-3, 4, -4]} intensity={0.35} color="#a0c4ff" />

      <MotorModel
        motorDataRef={motorDataRef}
        amplitude={amplitude}
        isRunning={isRunning}
      />

      <OrbitControls enablePan={false} minDistance={1.8} maxDistance={5} />
    </Canvas>
  );
}
