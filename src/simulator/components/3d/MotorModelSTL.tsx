import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";

const MOTOR_STL = "/New%20folder/OpenMotor%20-%2046428/files/motor.stl";
const FORMS_STL = "/New%20folder/OpenMotor%20-%2046428/files/forms.stl";

interface MotorData {
  angle: number;
  phaseVoltages: [number, number, number];
}

interface Props {
  motorDataRef: React.RefObject<MotorData>;
  amplitude: number;
  isRunning: boolean;
  fallback: React.ReactNode;
}

const DEG_TO_RAD = Math.PI / 180;

/** OpenMotor STL: OpenSCAD Z-up → we use Y-up; scale from mm to scene (~0.01). */
export default function MotorModelSTL({ motorDataRef, amplitude, isRunning, fallback }: Props) {
  const [motorMesh, setMotorMesh] = useState<THREE.Group | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [partsCount, setPartsCount] = useState(0);
  const groupRef = useRef<THREE.Group>(null);
  const arrowRef = useRef<THREE.Group>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new STLLoader();

    const applyMesh = (geometry: THREE.BufferGeometry, color: number, name: string) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.15,
        roughness: 0.85,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = name;
      return mesh;
    };

    const group = new THREE.Group();
    group.name = "OpenMotor";

    const addPart = () => {
      if (cancelled) return;
      setPartsCount((c) => c + 1);
    };

    loader.load(
      MOTOR_STL,
      (motorGeo) => {
        if (cancelled) return;
        motorGeo.computeVertexNormals();
        group.add(applyMesh(motorGeo, 0x1a1a1a, "motor"));
        setMotorMesh(group);
        setLoadError(null);
        addPart();
      },
      undefined,
      (err) => {
        if (cancelled) return;
        console.error("[MotorModelSTL] motor.stl load failed:", err);
        setLoadError(err?.message || "Failed to load motor.stl");
      }
    );

    loader.load(
      FORMS_STL,
      (formsGeo) => {
        if (cancelled) return;
        formsGeo.computeVertexNormals();
        group.add(applyMesh(formsGeo, 0x252525, "forms"));
        addPart();
      },
      undefined,
      () => {}
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const { scale, position, orbitRadius } = useMemo(() => {
    if (!motorMesh) return { scale: 0.012, position: [0, 0, 0] as [number, number, number], orbitRadius: 0.55 };
    const box = new THREE.Box3().setFromObject(motorMesh);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z, 1);
    const targetSize = 0.65;
    const s = targetSize / maxDim;
    const halfXZ = Math.max(size.x, size.z) * 0.5 * s;
    return {
      scale: s,
      position: [-center.x * s, -center.y * s, -center.z * s] as [number, number, number],
      orbitRadius: halfXZ + 0.1,
    };
  }, [motorMesh, partsCount]);

  useFrame(() => {
    const data = motorDataRef.current;
    if (!data) return;
    const rotationY = data.angle * DEG_TO_RAD;
    if (groupRef.current) groupRef.current.rotation.y = rotationY;
    if (arrowRef.current) arrowRef.current.rotation.y = rotationY;
  });

  if (loadError || !motorMesh) {
    return <>{fallback}</>;
  }

  return (
    <group>
      {/* OpenMotor from STL: Z-up → Y-up, scaled and centered; whole model rotates (STL is single mesh) */}
      <group
        ref={groupRef}
        scale={scale}
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <primitive object={motorMesh} />
      </group>

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
