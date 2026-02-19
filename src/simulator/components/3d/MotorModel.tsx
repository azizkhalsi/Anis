import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Educational PMSM: rotor angle and coil intensity read from a shared ref
// every frame (zero latency, no React re-render overhead).

interface MotorData {
  angle: number;
  phaseVoltages: [number, number, number];
}

interface Props {
  motorDataRef: React.RefObject<MotorData>;
  amplitude: number;
  isRunning: boolean;
}

const TWO_PI = Math.PI * 2;
const DEG_TO_RAD = Math.PI / 180;

const STATOR_OUTER = 1.0;
const STATOR_INNER = 0.72;
const STATOR_H = 0.7;
const ROTOR_R = 0.62;
const ROTOR_H = 0.58;
const SHAFT_R = 0.08;
const SHAFT_H = 1.6;
const TOOTH_COUNT = 6;
const COIL_COLORS: [string, string, string] = ["#eab308", "#ef4444", "#22c55e"];
const COIL_ANGLES = [0, TWO_PI / 3, (2 * TWO_PI) / 3];

export default function MotorModel({ motorDataRef, amplitude, isRunning }: Props) {
  const rotorRef = useRef<THREE.Group>(null);
  const fieldArrowRef = useRef<THREE.Group>(null);
  const coilRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  useFrame(() => {
    const data = motorDataRef.current;
    if (!data) return;
    const targetRad = data.angle * DEG_TO_RAD;

    // Set rotor directly from simulation angle — zero lag
    if (rotorRef.current) {
      rotorRef.current.rotation.y = targetRad;
    }
    if (fieldArrowRef.current) {
      fieldArrowRef.current.rotation.y = targetRad;
    }

    // Coil emissive intensity from phase voltages
    const norm = amplitude / 100;
    for (let i = 0; i < 3; i++) {
      const mesh = coilRefs[i].current;
      if (!mesh) continue;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const v = Math.abs(data.phaseVoltages[i]) / 35;
      mat.emissiveIntensity = 0.15 + v * norm * 3.0;
    }
  });

  // ─── Geometries (all memoized) ───

  const statorGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, STATOR_OUTER, 0, TWO_PI, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, STATOR_INNER, 0, TWO_PI, true);
    shape.holes.push(hole);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: STATOR_H, bevelEnabled: false, curveSegments: 48 });
    geo.rotateX(Math.PI / 2);
    geo.translate(0, -STATOR_H / 2, 0);
    return geo;
  }, []);

  const endCapGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, STATOR_OUTER, 0, TWO_PI, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, SHAFT_R + 0.01, 0, TWO_PI, true);
    shape.holes.push(hole);
    return new THREE.ShapeGeometry(shape, 48);
  }, []);

  const toothGeo = useMemo(() => new THREE.BoxGeometry(STATOR_INNER - ROTOR_R - 0.08, STATOR_H - 0.06, 0.09), []);
  const coilGeo = useMemo(() => new THREE.TorusGeometry(0.16, 0.055, 12, 24), []);

  const rotorNorthGeo = useMemo(
    () => new THREE.CylinderGeometry(ROTOR_R, ROTOR_R, ROTOR_H, 48, 1, false, 0, Math.PI), []
  );
  const rotorSouthGeo = useMemo(
    () => new THREE.CylinderGeometry(ROTOR_R, ROTOR_R, ROTOR_H, 48, 1, false, Math.PI, Math.PI), []
  );

  const shaftGeo = useMemo(() => new THREE.CylinderGeometry(SHAFT_R, SHAFT_R, SHAFT_H, 20), []);
  const stripeGeo = useMemo(() => new THREE.BoxGeometry(0.05, ROTOR_H + 0.02, ROTOR_R * 0.65), []);
  const arrowShaftGeo = useMemo(() => new THREE.CylinderGeometry(0.025, 0.025, ROTOR_R * 0.7, 8), []);
  const arrowHeadGeo = useMemo(() => new THREE.ConeGeometry(0.06, 0.15, 8), []);

  const teethData = useMemo(() => {
    return Array.from({ length: TOOTH_COUNT }, (_, i) => {
      const angle = (i * TWO_PI) / TOOTH_COUNT;
      const r = (STATOR_INNER + ROTOR_R + 0.08) / 2;
      return { x: r * Math.cos(angle), z: r * Math.sin(angle), angle };
    });
  }, []);

  const coilData = useMemo(() => {
    return COIL_ANGLES.map(angle => {
      const r = STATOR_INNER - 0.04;
      return { x: r * Math.cos(angle), z: r * Math.sin(angle), angle };
    });
  }, []);

  return (
    <group>
      <mesh geometry={statorGeo}>
        <meshStandardMaterial
          color="#64748b" metalness={0.5} roughness={0.4}
          transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false}
        />
      </mesh>

      <mesh geometry={endCapGeo} position={[0, STATOR_H / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#475569" metalness={0.4} roughness={0.5} transparent opacity={0.45} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh geometry={endCapGeo} position={[0, -STATOR_H / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#475569" metalness={0.4} roughness={0.5} transparent opacity={0.45} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {teethData.map((t, i) => (
        <mesh key={`tooth-${i}`} geometry={toothGeo} position={[t.x, 0, t.z]} rotation={[0, -t.angle + Math.PI / 2, 0]}>
          <meshStandardMaterial color="#334155" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}

      {coilData.map((c, i) => (
        <mesh key={`coil-${i}`} ref={coilRefs[i]} geometry={coilGeo}
          position={[c.x, 0, c.z]} rotation={[Math.PI / 2, 0, c.angle]}>
          <meshStandardMaterial
            color={COIL_COLORS[i]} emissive={COIL_COLORS[i]}
            emissiveIntensity={0.15} metalness={0.05} roughness={0.8}
          />
        </mesh>
      ))}

      <group ref={rotorRef}>
        <mesh geometry={rotorNorthGeo}>
          <meshStandardMaterial color="#1e40af" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh geometry={rotorSouthGeo}>
          <meshStandardMaterial color="#991b1b" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh geometry={stripeGeo} position={[ROTOR_R * 0.82, 0, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[ROTOR_R * 0.45, ROTOR_H / 2 + 0.01, 0]}>
          <boxGeometry args={[0.18, 0.015, 0.18]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1.0} />
        </mesh>
        <mesh position={[-ROTOR_R * 0.45, ROTOR_H / 2 + 0.01, 0]}>
          <boxGeometry args={[0.18, 0.015, 0.18]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.0} />
        </mesh>
        <mesh geometry={shaftGeo}>
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      <group ref={fieldArrowRef} position={[0, STATOR_H / 2 + 0.12, 0]}>
        <mesh geometry={arrowShaftGeo} position={[ROTOR_R * 0.35 / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial color="#ffffff" emissive="#f0f0f0" emissiveIntensity={0.5} />
        </mesh>
        <mesh geometry={arrowHeadGeo} position={[ROTOR_R * 0.65, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial color="#ffffff" emissive="#f0f0f0" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}
