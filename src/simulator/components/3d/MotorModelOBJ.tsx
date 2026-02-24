import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as THREE from "three";

const BASE = "/3d_model";
const OBJ_FILE = "4020 Brushless Stator.obj";
const MTL_FILE = "4020 Brushless Stator.mtl";
const OBJ_URL = `${BASE}/${OBJ_FILE}`;

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

/** Find the node that should rotate (rotor/shaft). If none named, we rotate the whole model. */
function findRotorForRotation(obj: THREE.Object3D): THREE.Object3D | null {
  const name = (obj.name || "").toLowerCase();
  if (/rotor|shaft|axis|armature|spin/.test(name)) return obj;
  for (const child of obj.children) {
    const found = findRotorForRotation(child);
    if (found) return found;
  }
  return null;
}

export default function MotorModelOBJ({ motorDataRef, amplitude, isRunning, fallback }: Props) {
  const [loadedObject, setLoadedObject] = useState<THREE.Group | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const rootRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Object3D | null>(null);
  const arrowRef = useRef<THREE.Group>(null);

  useEffect(() => {
    let cancelled = false;

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(BASE + "/");
    mtlLoader.load(
      MTL_FILE,
      (materials) => {
        if (cancelled) return;
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
          OBJ_URL,
          (object) => {
            if (cancelled) return;
            object.traverse((node) => {
              node.castShadow = true;
              node.receiveShadow = true;
            });
            setLoadedObject(object);
            setLoadError(null);
          },
          undefined,
          (err) => {
            if (cancelled) return;
            console.error("[MotorModelOBJ] OBJ load failed:", err);
            setLoadError(err?.message || "Failed to load OBJ");
          }
        );
      },
      undefined,
      (err) => {
        if (cancelled) return;
        console.error("[MotorModelOBJ] MTL load failed:", err);
        setLoadError(err?.message || "Failed to load MTL");
      }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const clonedScene = useMemo(() => {
    if (!loadedObject) return null;
    return loadedObject.clone();
  }, [loadedObject]);

  useEffect(() => {
    if (!clonedScene) return;
    const rotor = findRotorForRotation(clonedScene);
    rotorRef.current = rotor || null;
  }, [clonedScene]);

  useFrame(() => {
    const data = motorDataRef.current;
    if (!data) return;
    const targetRad = data.angle * DEG_TO_RAD;
    // Rotate motor the other way so you see the motor rotating, not the background sliding
    const rotationY = -targetRad;
    const rotatingPart = rotorRef.current || rootRef.current;
    if (rotatingPart) rotatingPart.rotation.y = rotationY;
    if (arrowRef.current) arrowRef.current.rotation.y = rotationY;
  });

  const { scale, position, orbitRadius, centerY } = useMemo(() => {
    if (!clonedScene) {
      return {
        scale: 1,
        position: [0, 0, 0] as [number, number, number],
        orbitRadius: 0.6,
        centerY: 0,
      };
    }
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const s = 1.9 / maxDim;
    const halfXZ = Math.max(size.x, size.z) * 0.5 * s;
    const orbitR = halfXZ + 0.14;
    return {
      scale: s,
      position: [-center.x * s, -center.y * s, -center.z * s] as [number, number, number],
      orbitRadius: orbitR,
      centerY: 0,
    };
  }, [clonedScene]);

  if (loadError || !clonedScene) {
    return <>{fallback}</>;
  }

  return (
    <group>
      {/* Your 3D model: scaled, centered; only the detected motor part rotates in useFrame */}
      <group ref={rootRef} scale={scale} position={position}>
        <primitive object={clonedScene} />
      </group>

      {/* Arrow orbits around the motor center, synced to simulation angle */}
      <group ref={arrowRef}>
        <group position={[orbitRadius, centerY, 0]} rotation={[0, Math.PI, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.1, 0.012, 8, 24, Math.PI * 1.2]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.75} />
          </mesh>
          <mesh position={[0.08, 0, -0.045]} rotation={[0, -0.45, -Math.PI / 2]}>
            <coneGeometry args={[0.022, 0.044, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.75} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
