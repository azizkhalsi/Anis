import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MotorModel from "./MotorModel";

const PI = Math.PI;

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
      camera={{ position: [0, 2.8, 1.6], fov: 36 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      frameloop="always"
      style={{ background: "#ffffff" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 8, 4]} intensity={1.6} />
      <directionalLight position={[-3, 5, -2]} intensity={0.4} color="#a0c4ff" />
      <hemisphereLight args={["#b0c4de", "#1e293b", 0.5]} />

      <MotorModel
        motorDataRef={motorDataRef}
        amplitude={amplitude}
        isRunning={isRunning}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        enableDamping
        dampingFactor={0.08}
        minDistance={1.2}
        maxDistance={7}
        minPolarAngle={0}
        maxPolarAngle={PI}
        rotateSpeed={0.8}
        zoomSpeed={1}
      />
    </Canvas>
  );
}
