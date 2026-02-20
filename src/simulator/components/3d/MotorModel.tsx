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
  { name: 'A', color: '#facc15', glowColor: '#fde047', angle: 0 },
  { name: 'B', color: '#ef4444', glowColor: '#f87171', angle: 120 },
  { name: 'C', color: '#22c55e', glowColor: '#4ade80', angle: 240 },
];

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

    if (rotorRef.current) {
      rotorRef.current.rotation.y = targetRad;
    }
    
    if (arrowRef.current) {
      arrowRef.current.rotation.y = targetRad;
    }

    for (let i = 0; i < 3; i++) {
      const coilGroup = coilRefs[i].current;
      if (!coilGroup) continue;
      
      const voltage = data.phaseVoltages[i];
      const intensity = isRunning ? (Math.abs(voltage) / 35) * norm : 0;
      
      coilGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshStandardMaterial;
          if (mat.emissive) {
            mat.emissive.setStyle(PHASE_CONFIG[i].glowColor);
            mat.emissiveIntensity = 0.04 + intensity * 1.6;
          }
        }
      });
    }
  });

  // Inductors positioned closer to center to be more prominent
  const inductorPositions = useMemo(() => {
    return PHASE_CONFIG.map((phase, i) => {
      const angleRad = (phase.angle - 90) * DEG_TO_RAD;
      const r = 0.18; // Closer to center
      return {
        ...phase,
        x: r * Math.cos(angleRad),
        z: r * Math.sin(angleRad),
        angleRad
      };
    });
  }, []);

  return (
    <group scale={1.1}>
      {/* === WHITE MULTI-LAYER HOUSING === */}
      
      {/* Outer ring */}
      <mesh position={[0, -0.12, 0]}>
        <torusGeometry args={[0.48, 0.045, 16, 48]} />
        <meshStandardMaterial color="#e5e5e5" metalness={0.08} roughness={0.65} />
      </mesh>
      <mesh position={[0, -0.14, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.42, 0.52, 48]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.06} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Middle ring */}
      <mesh position={[0, -0.06, 0]}>
        <torusGeometry args={[0.4, 0.035, 12, 48]} />
        <meshStandardMaterial color="#eeeeee" metalness={0.05} roughness={0.68} />
      </mesh>
      
      {/* Inner platform */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.12, 0.38, 48]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.04} roughness={0.72} side={THREE.DoubleSide} />
      </mesh>

      {/* === WHITE Y-FRAME === */}
      
      {/* Central hub - white plastic */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.07, 0.075, 0.1, 6]} />
        <meshStandardMaterial color="#ffffff" metalness={0.02} roughness={0.88} />
      </mesh>
      
      {/* Y-frame arms */}
      {inductorPositions.map((pos, i) => (
        <group key={`arm-${i}`} rotation={[0, -pos.angleRad, 0]}>
          <mesh position={[0.1, 0.02, 0]}>
            <boxGeometry args={[0.1, 0.06, 0.045]} />
            <meshStandardMaterial color="#ffffff" metalness={0.02} roughness={0.88} />
          </mesh>
          {/* Square cutouts */}
          <mesh position={[0.08, 0.052, 0.012]}>
            <boxGeometry args={[0.018, 0.008, 0.018]} />
            <meshStandardMaterial color="#d0d0d0" />
          </mesh>
          <mesh position={[0.08, 0.052, -0.012]}>
            <boxGeometry args={[0.018, 0.008, 0.018]} />
            <meshStandardMaterial color="#d0d0d0" />
          </mesh>
        </group>
      ))}

      {/* === GRAY FINNED BRACKETS === */}
      {[60, 180, 300].map((angle, i) => {
        const ba = (angle - 90) * DEG_TO_RAD;
        return (
          <group key={`brk-${i}`} position={[0.28 * Math.cos(ba), 0, 0.28 * Math.sin(ba)]} rotation={[0, -ba, 0]}>
            <mesh>
              <boxGeometry args={[0.08, 0.12, 0.05]} />
              <meshStandardMaterial color="#4a4a4a" metalness={0.35} roughness={0.55} />
            </mesh>
            {/* Fins */}
            {[-0.04, -0.02, 0, 0.02, 0.04].map((y, fi) => (
              <mesh key={fi} position={[0, y, 0.028]}>
                <boxGeometry args={[0.07, 0.012, 0.006]} />
                <meshStandardMaterial color="#3a3a3a" metalness={0.4} roughness={0.5} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* === 3 BIG COPPER INDUCTORS === */}
      {inductorPositions.map((pos, i) => (
        <group 
          key={`inductor-${pos.name}`}
          position={[pos.x, 0.02, pos.z]}
          rotation={[0, -pos.angleRad + Math.PI, 0]}
        >
          {/* Core */}
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.14, 12]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
          </mesh>
          
          {/* === BIG COPPER COILS === */}
          <group ref={coilRefs[i]}>
            {/* Inner dense layer */}
            {Array.from({ length: 22 }, (_, j) => (
              <mesh 
                key={`i${j}`} 
                position={[(j / 21 - 0.5) * 0.13, 0, 0]} 
                rotation={[0, 0, Math.PI/2]}
              >
                <torusGeometry args={[0.055, 0.02, 14, 32]} />
                <meshStandardMaterial 
                  color="#cd7035"
                  emissive={pos.glowColor}
                  emissiveIntensity={0.04}
                  metalness={0.97} 
                  roughness={0.04}
                />
              </mesh>
            ))}
            
            {/* Middle layer */}
            {Array.from({ length: 18 }, (_, j) => (
              <mesh 
                key={`m${j}`} 
                position={[(j / 17 - 0.5) * 0.12, 0, 0]} 
                rotation={[0, 0, Math.PI/2]}
              >
                <torusGeometry args={[0.078, 0.018, 12, 30]} />
                <meshStandardMaterial 
                  color="#c06030"
                  emissive={pos.glowColor}
                  emissiveIntensity={0.03}
                  metalness={0.95} 
                  roughness={0.08}
                />
              </mesh>
            ))}
            
            {/* Outer layer */}
            {Array.from({ length: 14 }, (_, j) => (
              <mesh 
                key={`o${j}`} 
                position={[(j / 13 - 0.5) * 0.11, 0, 0]} 
                rotation={[0, 0, Math.PI/2]}
              >
                <torusGeometry args={[0.1, 0.016, 10, 28]} />
                <meshStandardMaterial 
                  color="#b55528"
                  emissive={pos.glowColor}
                  emissiveIntensity={0.025}
                  metalness={0.93} 
                  roughness={0.12}
                />
              </mesh>
            ))}
            
            {/* Outermost layer for extra bulk */}
            {Array.from({ length: 10 }, (_, j) => (
              <mesh 
                key={`x${j}`} 
                position={[(j / 9 - 0.5) * 0.09, 0, 0]} 
                rotation={[0, 0, Math.PI/2]}
              >
                <torusGeometry args={[0.118, 0.014, 8, 26]} />
                <meshStandardMaterial 
                  color="#a84a22"
                  emissive={pos.glowColor}
                  emissiveIntensity={0.02}
                  metalness={0.9} 
                  roughness={0.16}
                />
              </mesh>
            ))}
          </group>
          
          {/* Yellow tape ties */}
          <mesh position={[-0.06, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <torusGeometry args={[0.09, 0.012, 8, 20]} />
            <meshStandardMaterial color="#d4c060" roughness={0.5} />
          </mesh>
          <mesh position={[0.06, 0, 0]} rotation={[0, 0, Math.PI/2]}>
            <torusGeometry args={[0.09, 0.012, 8, 20]} />
            <meshStandardMaterial color="#d4c060" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* === BIG GOLDEN CENTRAL BEARING === */}
      <group ref={rotorRef}>
        {/* Outer brass ring */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.058, 0.058, 0.09, 28]} />
          <meshStandardMaterial color="#c9a020" metalness={0.88} roughness={0.15} />
        </mesh>
        
        {/* Brass ring detail */}
        <mesh position={[0, 0.065, 0]}>
          <torusGeometry args={[0.045, 0.01, 12, 28]} />
          <meshStandardMaterial color="#d4b030" metalness={0.9} roughness={0.12} />
        </mesh>
        
        {/* Inner ring */}
        <mesh position={[0, 0.02, 0]}>
          <torusGeometry args={[0.032, 0.008, 10, 24]} />
          <meshStandardMaterial color="#ddc040" metalness={0.92} roughness={0.1} />
        </mesh>
        
        {/* Top face */}
        <mesh position={[0, 0.068, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <ringGeometry args={[0.018, 0.052, 28]} />
          <meshStandardMaterial color="#c9a828" metalness={0.85} roughness={0.18} />
        </mesh>
        
        {/* Dark center hole */}
        <mesh position={[0, 0.07, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <circleGeometry args={[0.018, 20]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.85} />
        </mesh>
      </group>

      {/* === ROTATION ARROW === */}
      <group ref={arrowRef} position={[0, 0.14, 0]}>
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.1, 0.01, 8, 24, Math.PI * 1.3]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.088, 0, -0.048]} rotation={[0, -0.45, -Math.PI/2]}>
          <coneGeometry args={[0.024, 0.048, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* === SCREWS === */}
      {[20, 100, 140, 220, 260, 340].map((angle, i) => {
        const sa = angle * DEG_TO_RAD;
        return (
          <mesh key={`scr-${i}`} position={[0.35 * Math.cos(sa), -0.01, 0.35 * Math.sin(sa)]}>
            <cylinderGeometry args={[0.012, 0.012, 0.018, 8]} />
            <meshStandardMaterial color="#606060" metalness={0.6} roughness={0.4} />
          </mesh>
        );
      })}

      {/* === PHASE INDICATORS === */}
      {inductorPositions.map((pos, i) => (
        <mesh 
          key={`ph-${i}`}
          position={[pos.x * 2.2, 0.1, pos.z * 2.2]}
        >
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshStandardMaterial 
            color={pos.color}
            emissive={pos.color}
            emissiveIntensity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}
