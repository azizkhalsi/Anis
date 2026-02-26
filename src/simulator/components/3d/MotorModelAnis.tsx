/**
 * Anis 3D motor model – stator ported from public/Anis-model-main/stator-3d.
 * Stator is fixed; rotor (shaft) rotates from simulation electrical angle.
 * Rotation direction and speed follow graph/simulation (phase, frequency).
 * Coil glow reflects per-phase voltage in real time.
 */
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
/** PMSM: mechanical angle = electrical / pole pairs. 2 pole pairs = one full elec cycle = half mechanical turn. */
const POLE_PAIRS = 2;

const PHASE_COLORS = [0xfde047, 0xf87171, 0x4ade80]; // A, B, C (hex for emissive)
const COIL_INTENSITY_THRESH = 0.02;

function createMaterials() {
  return {
    black: new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.85,
      metalness: 0.05,
    }),
    copper: new THREE.MeshStandardMaterial({
      color: 0xb87333,
      metalness: 0.92,
      roughness: 0.22,
    }),
    silver: new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      metalness: 0.95,
      roughness: 0.1,
    }),
    darkMetal: new THREE.MeshStandardMaterial({
      color: 0x555555,
      metalness: 0.8,
      roughness: 0.35,
    }),
  };
}

function createCoilMaterial(index: number, emissiveHex: number) {
  const m = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.92,
    roughness: 0.22,
    emissive: new THREE.Color(emissiveHex),
    emissiveIntensity: 0,
  });
  m.name = `coil-${index}`;
  return m;
}

function createCoilGeometry(
  innerRadius: number,
  length: number,
  turns: number,
  wireRadius: number
) {
  const points: THREE.Vector3[] = [];
  const totalPoints = turns * 32;
  for (let i = 0; i <= totalPoints; i++) {
    const t = i / totalPoints;
    const angle = t * turns * Math.PI * 2;
    const y = (t - 0.5) * length;
    const x = innerRadius * Math.cos(angle);
    const z = innerRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(points, false);
  return new THREE.TubeGeometry(curve, totalPoints * 2, wireRadius, 8, false);
}

function createHub(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const hubSize = 0.55;
  const hubGeo = new THREE.BoxGeometry(hubSize, hubSize * 0.7, hubSize);
  const hub = new THREE.Mesh(hubGeo, materials.black);
  group.add(hub);
  /* Central black rod (edgeMesh) removed – user requested magnet/rod removal */
  return group;
}

function createBearing(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.04, 16, 32),
    materials.silver
  );
  group.add(outerRing);
  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.12, 0.03, 16, 32),
    materials.silver
  );
  group.add(innerRing);
  const shield = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.04, 32),
    materials.darkMetal
  );
  shield.rotation.x = Math.PI / 2;
  group.add(shield);
  return group;
}

function createArm(materials: ReturnType<typeof createMaterials>) {
  const group = new THREE.Group();
  const armGeo = new THREE.BoxGeometry(0.22, 0.28, 0.9);
  const arm = new THREE.Mesh(armGeo, materials.black);
  arm.position.z = 0.7;
  group.add(arm);
  const flangeInner = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.45, 0.06),
    materials.black
  );
  flangeInner.position.z = 0.3;
  group.add(flangeInner);
  const flangeOuter = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.45, 0.06),
    materials.black
  );
  flangeOuter.position.z = 1.1;
  group.add(flangeOuter);
  return group;
}

function createArmWithCoil(
  materials: ReturnType<typeof createMaterials>,
  coilMat: THREE.MeshStandardMaterial
) {
  const group = new THREE.Group();
  const arm = createArm(materials);
  group.add(arm);
  const coilGeo = createCoilGeometry(0.22, 0.72, 18, 0.032);
  const coil = new THREE.Mesh(coilGeo, coilMat);
  coil.rotation.x = Math.PI / 2;
  coil.position.z = 0.7;
  group.add(coil);
  return group;
}


function buildFullMotor(
  materials: ReturnType<typeof createMaterials>,
  coilMaterials: THREE.MeshStandardMaterial[]
) {
  const motor = new THREE.Group();
  motor.name = "AnisMotor";
  motor.add(createHub(materials));
  const bearing = createBearing(materials);
  bearing.position.z = -0.2;
  motor.add(bearing);
  /* Shaft (central rod/magnet) removed per user request */
  const armAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
  armAngles.forEach((angle, i) => {
    const armUnit = createArmWithCoil(materials, coilMaterials[i]);
    armUnit.rotation.y = angle;
    motor.add(armUnit);
  });
  return motor;
}

/** Shortest-path phase delta in degrees (handles 360↔0 wrap). */
function phaseDeltaDeg(prev: number, current: number): number {
  let d = current - prev;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

export default function MotorModelAnis({
  motorDataRef,
  amplitude,
  isRunning,
}: Props) {
  const motorRef = useRef<THREE.Group>(null);
  const axisArrowRef = useRef<THREE.Group>(null);
  const coilMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const prevPhaseRef = useRef<number | null>(null);
  const cumulativeAngleRef = useRef(0);
  const rotationDirectionRef = useRef(1);
  const prevCoilIntensityRef = useRef<[number, number, number]>([0, 0, 0]);

  const { motorGroup, scale } = useMemo(() => {
    const materials = createMaterials();
    const coilMats = [
      createCoilMaterial(0, PHASE_COLORS[0]),
      createCoilMaterial(1, PHASE_COLORS[1]),
      createCoilMaterial(2, PHASE_COLORS[2]),
    ];
    coilMaterialsRef.current = coilMats;
    const motor = buildFullMotor(materials, coilMats);
    const s = 0.5;
    return { motorGroup: motor, scale: s };
  }, []);

  useFrame(() => {
    const data = motorDataRef.current;
    if (!data) return;

    const phaseDeg = data.angle;
    const prev = prevPhaseRef.current;
    if (prev !== null) {
      const deltaDeg = phaseDeltaDeg(prev, phaseDeg);
      if (Math.abs(deltaDeg) > 90) {
        cumulativeAngleRef.current = (phaseDeg * DEG_TO_RAD) / POLE_PAIRS;
      } else {
        const mechanicalDeltaRad = (deltaDeg * DEG_TO_RAD) / POLE_PAIRS;
        cumulativeAngleRef.current += mechanicalDeltaRad;
        if (mechanicalDeltaRad !== 0) {
          rotationDirectionRef.current = Math.sign(mechanicalDeltaRad);
        }
      }
    }
    prevPhaseRef.current = phaseDeg;

    if (motorRef.current) {
      motorRef.current.rotation.y = cumulativeAngleRef.current;
    }
    if (axisArrowRef.current) {
      axisArrowRef.current.rotation.y = rotationDirectionRef.current < 0 ? Math.PI : 0;
    }

    const norm = amplitude / 100;
    const prevCoil = prevCoilIntensityRef.current;
    for (let i = 0; i < 3; i++) {
      const mat = coilMaterialsRef.current[i];
      if (!mat) continue;
      const intensity = isRunning
        ? (Math.abs(data.phaseVoltages[i]) / 35) * norm
        : 0;
      const value = 0.05 + intensity * 1.8;
      if (Math.abs(value - prevCoil[i]) <= COIL_INTENSITY_THRESH) continue;
      prevCoil[i] = value;
      mat.emissiveIntensity = value;
    }
  });

  return (
    <group
      scale={scale}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    >
      <group ref={motorRef}>
        <primitive object={motorGroup} />
        <group ref={axisArrowRef} position={[0, 0, 0.65]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 16]} />
            <meshStandardMaterial color="#00d4ff" metalness={0.3} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.045, 0.1, 16]} />
            <meshStandardMaterial color="#00d4ff" metalness={0.3} roughness={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
