import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
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
      camera={{ position: [2.2, 1.8, 2.5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      frameloop="always"
      style={{ background: 'transparent' }}
    >
      {/* Enhanced Lighting for Professional Look */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-4, 6, -3]} intensity={0.4} color="#b4d4ff" />
      <directionalLight position={[0, -3, 0]} intensity={0.2} color="#ffaa77" />
      <pointLight position={[0, 2, 0]} intensity={0.3} color="#ffffff" />

      {/* Motor Model */}
      <MotorModel
        motorDataRef={motorDataRef}
        amplitude={amplitude}
        isRunning={isRunning}
      />

      {/* Subtle shadow/reflection */}
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.4}
        scale={3}
        blur={2}
        far={1.5}
      />

      {/* Interactive Controls - Scroll to zoom, drag to rotate */}
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
