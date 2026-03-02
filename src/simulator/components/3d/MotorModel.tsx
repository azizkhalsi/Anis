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

const PI = Math.PI;
const TWO_PI = PI * 2;
const DEG = PI / 180;

/* ── dimensions ── */
const HOUSING_OUTER = 1.25;
const HOUSING_INNER = 0.82;
const HOUSING_DEPTH = 0.6;

const ROTOR_R = 0.38;
const ROTOR_DEPTH = 0.25;
const SHAFT_R = 0.06;

const COIL_ANGLES = [0, TWO_PI / 3, (2 * TWO_PI) / 3];

const GAP_INNER = ROTOR_R + 0.05;
const GAP_OUTER = HOUSING_INNER - 0.03;
const COIL_CENTER_R = (GAP_INNER + GAP_OUTER) / 2;
const COIL_LENGTH = GAP_OUTER - GAP_INNER;

const WIRE_R = 0.013;
const LAYERS = 4;
const TURNS = 10;

/* phase colours matching the graph: yellow, red, green */
const PHASE_COLORS: [string, string, string] = ["#eab308", "#ef4444", "#22c55e"];
const PHASE_EMISSIVE: [string, string, string] = ["#facc15", "#f87171", "#4ade80"];

/* ── coil geometry ──
   Barrel of torus rings whose hole faces along local X (radial).
   Wire loops wrap around that axis, stacked along X. */
function buildCoilGeo(): THREE.BufferGeometry {
  const geos: THREE.BufferGeometry[] = [];
  const startX = -COIL_LENGTH / 2 + WIRE_R;
  const turnSpacing = (COIL_LENGTH - WIRE_R * 2) / (TURNS - 1);

  for (let layer = 0; layer < LAYERS; layer++) {
    const loopR = 0.06 + layer * WIRE_R * 2.2;
    for (let t = 0; t < TURNS; t++) {
      const torus = new THREE.TorusGeometry(loopR, WIRE_R, 8, 28);
      torus.rotateY(PI / 2);
      torus.translate(startX + t * turnSpacing, 0, 0);
      geos.push(torus);
    }
  }
  return mergeGeos(geos);
}

function mergeGeos(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  let totalV = 0, totalI = 0;
  for (const g of geos) {
    totalV += g.attributes.position.count;
    totalI += g.index ? g.index.count : 0;
  }
  const pos = new Float32Array(totalV * 3);
  const nrm = new Float32Array(totalV * 3);
  const idx = new Uint32Array(totalI);
  let vo = 0, io = 0, vb = 0;
  for (const g of geos) {
    const p = g.attributes.position;
    const n = g.attributes.normal;
    for (let i = 0; i < p.count * 3; i++) {
      pos[vo + i] = (p.array as Float32Array)[i];
      nrm[vo + i] = (n.array as Float32Array)[i];
    }
    if (g.index) {
      for (let i = 0; i < g.index.count; i++) idx[io + i] = g.index.array[i] + vb;
      io += g.index.count;
    }
    vb += p.count;
    vo += p.count * 3;
  }
  geos.forEach((g) => g.dispose());
  const m = new THREE.BufferGeometry();
  m.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  m.setAttribute("normal", new THREE.BufferAttribute(nrm, 3));
  m.setIndex(new THREE.BufferAttribute(idx, 1));
  return m;
}

export default function MotorModel({ motorDataRef, amplitude, isRunning }: Props) {
  const rotorRef = useRef<THREE.Group>(null);
  const coilMatRefs = [
    useRef<THREE.MeshStandardMaterial>(null),
    useRef<THREE.MeshStandardMaterial>(null),
    useRef<THREE.MeshStandardMaterial>(null),
  ];

  useFrame(() => {
    const d = motorDataRef.current;
    if (!d) return;

    /*
     * Graph convention: angle 0° = +X (right), 90° = +Y (up on screen).
     * Three.js rotation.y: positive = CCW from +X toward -Z.
     * When camera looks from above (+Y), -Z is "up" on screen.
     * So rotation.y = angle_deg * DEG gives the correct match.
     */
    if (rotorRef.current) {
      rotorRef.current.rotation.y = d.angle * DEG;
    }

    const a = amplitude / 100;
    for (let i = 0; i < 3; i++) {
      const mat = coilMatRefs[i].current;
      if (!mat) continue;
      mat.emissiveIntensity = 0.15 + (Math.abs(d.phaseVoltages[i]) / 35) * a * 1.6;
    }
  });

  /* ── geometries ── */
  const housingGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, HOUSING_OUTER, 0, TWO_PI, false);
    const h = new THREE.Path();
    h.absarc(0, 0, HOUSING_INNER, 0, TWO_PI, true);
    s.holes.push(h);
    const g = new THREE.ExtrudeGeometry(s, { depth: HOUSING_DEPTH, bevelEnabled: false, curveSegments: 64 });
    g.rotateX(PI / 2);
    g.translate(0, -HOUSING_DEPTH / 2, 0);
    return g;
  }, []);

  const toothGeo = useMemo(() => new THREE.BoxGeometry(COIL_LENGTH + 0.02, HOUSING_DEPTH * 0.92, 0.08), []);
  const coilGeo = useMemo(() => buildCoilGeo(), []);

  const rotorGeo = useMemo(() => new THREE.CylinderGeometry(ROTOR_R, ROTOR_R, ROTOR_DEPTH, 48), []);
  const rotorCapGeo = useMemo(() => new THREE.CircleGeometry(ROTOR_R, 48), []);
  const shaftGeo = useMemo(() => new THREE.CylinderGeometry(SHAFT_R, SHAFT_R, ROTOR_DEPTH + 0.35, 20), []);
  const shaftCapGeo = useMemo(() => new THREE.CylinderGeometry(SHAFT_R * 2, SHAFT_R * 2, 0.035, 20), []);

  const arrowL = ROTOR_R * 0.5;
  const arrowShaft = useMemo(() => new THREE.CylinderGeometry(0.016, 0.016, arrowL, 8), [arrowL]);
  const arrowHead = useMemo(() => new THREE.ConeGeometry(0.045, 0.1, 8), []);

  const slots = useMemo(() => COIL_ANGLES.map((a) => ({
    x: COIL_CENTER_R * Math.cos(a),
    z: COIL_CENTER_R * Math.sin(a),
    a,
  })), []);

  return (
    <group>
      {/* HOUSING (stator outer ring) */}
      <mesh geometry={housingGeo}>
        <meshStandardMaterial color="#52525b" metalness={0.55} roughness={0.38} />
      </mesh>

      {/* TEETH + PHASE-COLOURED COILS */}
      {slots.map((s, i) => (
        <group key={i}>
          <mesh geometry={toothGeo} position={[s.x, 0, s.z]} rotation={[0, -s.a, 0]}>
            <meshStandardMaterial color="#52525b" metalness={0.5} roughness={0.4} />
          </mesh>

          <group position={[s.x, 0, s.z]} rotation={[0, -s.a, 0]}>
            <mesh geometry={coilGeo}>
              <meshStandardMaterial
                ref={coilMatRefs[i]}
                color={PHASE_COLORS[i]}
                emissive={PHASE_EMISSIVE[i]}
                emissiveIntensity={0.15}
                metalness={0.78}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>
      ))}

      {/* ROTOR (rotates, arrow syncs with graph vector) */}
      <group ref={rotorRef}>
        <mesh geometry={rotorGeo}>
          <meshStandardMaterial color="#a1a1aa" metalness={0.55} roughness={0.3} />
        </mesh>
        <mesh geometry={rotorCapGeo} position={[0, ROTOR_DEPTH / 2 + 0.002, 0]} rotation={[-PI / 2, 0, 0]}>
          <meshStandardMaterial color="#d4d4d8" metalness={0.6} roughness={0.25} />
        </mesh>

        {/* N marker (blue) */}
        <mesh position={[ROTOR_R * 0.38, ROTOR_DEPTH / 2 + 0.008, 0]} rotation={[-PI / 2, 0, 0]}>
          <circleGeometry args={[0.055, 20]} />
          <meshStandardMaterial color="#3b82f6" emissive="#2563eb" emissiveIntensity={0.5} />
        </mesh>
        {/* S marker (red) */}
        <mesh position={[-ROTOR_R * 0.38, ROTOR_DEPTH / 2 + 0.008, 0]} rotation={[-PI / 2, 0, 0]}>
          <circleGeometry args={[0.055, 20]} />
          <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.5} />
        </mesh>

        {/* Shaft */}
        <mesh geometry={shaftGeo} position={[0, 0.175, 0]}>
          <meshStandardMaterial color="#a1a1aa" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh geometry={shaftCapGeo} position={[0, ROTOR_DEPTH / 2 + 0.35 + 0.018, 0]}>
          <meshStandardMaterial color="#a1a1aa" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Shaft hole ring on cap */}
        <mesh position={[0, ROTOR_DEPTH / 2 + 0.005, 0]} rotation={[-PI / 2, 0, 0]}>
          <ringGeometry args={[SHAFT_R * 0.6, SHAFT_R * 1.3, 20]} />
          <meshStandardMaterial color="#71717a" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Direction arrow (points along +X in local space, syncs with graph) */}
        <group position={[0, ROTOR_DEPTH / 2 + 0.02, 0]}>
          <mesh geometry={arrowShaft} position={[arrowL / 4, 0, 0]} rotation={[0, 0, -PI / 2]}>
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1} />
          </mesh>
          <mesh geometry={arrowHead} position={[arrowL * 0.65, 0, 0]} rotation={[0, 0, -PI / 2]}>
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
