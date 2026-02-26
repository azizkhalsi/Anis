import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MotorData {
  angle: number;
  phaseVoltages: [number, number, number];
}

interface Props {
  motorDataRef: React.RefObject<MotorData>;
  amplitude: number;
  isRunning: boolean;
}

const DEG_TO_RAD = Math.PI / 180;

const PHASE_CONFIG = [
  { name: "A", glowColor: "#fde047", angle: 0 },
  { name: "B", glowColor: "#f87171", angle: 120 },
  { name: "C", glowColor: "#4ade80", angle: 240 },
];

const COIL_COPPER = "#b87333";
const COIL_COPPER_DARK = "#8b5a2b";
const STATOR_BLACK = "#1a1a1a";
const ROTOR_WHITE = "#f2f2f2";
const SHAFT_SILVER = "#c8c8c8";
const BEARING_OUTER = "#9ca3af";
const BEARING_INNER = "#374151";

export default function MotorModel({ motorDataRef, amplitude, isRunning }: Props) {
  const rotorRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Group>(null);
  const coilRefs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
  ];

  useFrame(() => {
    const data = motorDataRef.current;
    if (!data) return;
    const targetRad = data.angle * DEG_TO_RAD;
    const norm = amplitude / 100;

    if (rotorRef.current) rotorRef.current.rotation.y = targetRad;
    if (arrowRef.current) arrowRef.current.rotation.y = targetRad;

    for (let i = 0; i < 3; i++) {
      const g = coilRefs[i].current;
      if (!g) continue;
      const intensity = isRunning ? (Math.abs(data.phaseVoltages[i]) / 35) * norm : 0;
      g.traverse((c) => {
        if (c instanceof THREE.Mesh && (c.material as THREE.MeshStandardMaterial).emissive) {
          const m = c.material as THREE.MeshStandardMaterial;
          m.emissive.setStyle(PHASE_CONFIG[i].glowColor);
          m.emissiveIntensity = 0.05 + intensity * 1.8;
        }
      });
    }
  });

  const armPositions = useMemo(() => {
    return PHASE_CONFIG.map((p) => {
      const a = (p.angle - 90) * DEG_TO_RAD;
      const r = 0.18;
      return {
        ...p,
        x: r * Math.cos(a),
        z: r * Math.sin(a),
        angleRad: a,
      };
    });
  }, []);

  const orbitRadius = 0.52;

  return (
    <group scale={1.35}>
      {/* STATOR: 3 arms with bobbins – central hub cylinder (magnet/rod) removed per user request */}

      {armPositions.map((pos, i) => (
        <group key={`arm-${i}`} rotation={[0, -pos.angleRad, 0]}>
          <mesh position={[0.07, 0, 0]}>
            <boxGeometry args={[0.045, 0.05, 0.04]} />
            <meshStandardMaterial color={STATOR_BLACK} metalness={0.06} roughness={0.92} />
          </mesh>
          {/* Prominent rectangular bobbin – coil wraps this (ref: squared-off end block) */}
          <mesh position={[0.175, 0, 0]}>
            <boxGeometry args={[0.11, 0.075, 0.07]} />
            <meshStandardMaterial color="#0f0f0f" metalness={0.05} roughness={0.93} />
          </mesh>
        </group>
      ))}

      {/* COILS: Rectangular prism of windings (ref: “rectangular prism conforming to stator arm”) – box + wire detail */}
      {armPositions.map((pos, i) => (
        <group
          key={`coil-${i}`}
          position={[pos.x, 0, pos.z]}
          rotation={[0, -pos.angleRad + Math.PI, 0]}
          ref={coilRefs[i]}
        >
          {/* Main coil body: rounded box so it reads as blocky winding mass, not donuts */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.12, 0.06, 0.08]} />
            <meshStandardMaterial
              color={COIL_COPPER}
              emissive={pos.glowColor}
              emissiveIntensity={0.06}
              metalness={0.88}
              roughness={0.14}
            />
          </mesh>
          {/* Front/back faces of winding stack (slightly recessed for depth) */}
          <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.08, 0.055, 0.065]} />
            <meshStandardMaterial
              color={COIL_COPPER_DARK}
              emissive={pos.glowColor}
              emissiveIntensity={0.05}
              metalness={0.9}
              roughness={0.12}
            />
          </mesh>
          {/* Wire-turn detail: 2 torus layers at edges so it reads as “tightly wound” */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.065, 0.01, 8, 20]} />
            <meshStandardMaterial
              color={COIL_COPPER_DARK}
              emissive={pos.glowColor}
              emissiveIntensity={0.05}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.095, 0.01, 8, 20]} />
            <meshStandardMaterial
              color={COIL_COPPER}
              emissive={pos.glowColor}
              emissiveIntensity={0.05}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Lead wires – visible thin copper from top coil (ref: “extend upwards and slightly right”) */}
      <group position={[armPositions[0].x, 0, armPositions[0].z]} rotation={[0, -armPositions[0].angleRad + Math.PI, 0]}>
        <mesh position={[0.14, 0.07, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.005, 0.005, 0.07, 8]} />
          <meshStandardMaterial color={COIL_COPPER} metalness={0.88} roughness={0.18} />
        </mesh>
        <mesh position={[0.16, 0.11, 0.025]} rotation={[0.25, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.004, 0.004, 0.055, 8]} />
          <meshStandardMaterial color={COIL_COPPER} metalness={0.88} roughness={0.18} />
        </mesh>
        <mesh position={[0.15, 0.09, -0.02]} rotation={[-0.2, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.004, 0.004, 0.045, 8]} />
          <meshStandardMaterial color={COIL_COPPER} metalness={0.88} roughness={0.18} />
        </mesh>
      </group>

      {/* Bearing in hub: outer silver ring + darker inner race (ref: “concentric rings”) */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.038, 0.009, 14, 32]} />
        <meshStandardMaterial color={BEARING_OUTER} metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.022, 0.035, 32]} />
        <meshStandardMaterial color={BEARING_OUTER} metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.01, 0.02, 24]} />
        <meshStandardMaterial color={BEARING_INNER} metalness={0.65} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* ROTOR: shaft + white core – only this group rotates */}
      <group ref={rotorRef}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2, 24]} />
          <meshStandardMaterial color={SHAFT_SILVER} metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.048, 28]} />
          <meshStandardMaterial color={ROTOR_WHITE} metalness={0.02} roughness={0.9} />
        </mesh>
      </group>

      {/* Direction arrow – orbits at coil height */}
      <group ref={arrowRef}>
        <group position={[orbitRadius, 0, 0]} rotation={[0, Math.PI, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.09, 0.01, 8, 24, Math.PI * 1.2]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0.075, 0, -0.04]} rotation={[0, -0.45, -Math.PI / 2]}>
            <coneGeometry args={[0.02, 0.04, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
