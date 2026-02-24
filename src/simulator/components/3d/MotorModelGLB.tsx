import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const GLB_URL = "/3DModel.glb";

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

function findRotorNode(obj: THREE.Object3D): THREE.Object3D | null {
  const name = (obj.name || "").toLowerCase();
  if (/rotor|shaft|axis|armature|spin/.test(name)) return obj;
  for (const child of obj.children) {
    const found = findRotorNode(child);
    if (found) return found;
  }
  return null;
}

export default function MotorModelGLB({ motorDataRef, amplitude, isRunning, fallback }: Props) {
  const [loadedScene, setLoadedScene] = useState<THREE.Group | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Object3D | null>(null);
  const arrowRef = useRef<THREE.Group>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new GLTFLoader();
    loader.load(
      GLB_URL,
      (gltf) => {
        if (cancelled) return;
        const scene = gltf.scene;
        if (!scene) {
          setLoadError("GLB has no scene");
          return;
        }
        scene.traverse((node) => {
          node.castShadow = true;
          node.receiveShadow = true;
        });
        setLoadedScene(scene);
        setLoadError(null);
      },
      undefined,
      (err) => {
        if (cancelled) return;
        console.error("[MotorModelGLB] Load failed:", err);
        setLoadError(err?.message || "Failed to load 3DModel.glb");
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const clonedScene = useMemo(() => {
    if (!loadedScene) return null;
    const clone = loadedScene.clone();
    return clone;
  }, [loadedScene]);

  useEffect(() => {
    if (!clonedScene) return;
    const rotor = findRotorNode(clonedScene);
    rotorRef.current = rotor || null;
  }, [clonedScene]);

  useFrame(() => {
    const data = motorDataRef.current;
    if (!data) return;
    const targetRad = data.angle * DEG_TO_RAD;
    const target = rotorRef.current || groupRef.current;
    if (target) target.rotation.y = targetRad;
    if (arrowRef.current) arrowRef.current.rotation.y = targetRad;
  });

  const { scale, position } = useMemo(() => {
    if (!clonedScene) return { scale: 1, position: [0, 0, 0] as [number, number, number] };
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const s = 1.2 / maxDim;
    const center = new THREE.Vector3();
    box.getCenter(center);
    return {
      scale: s,
      position: [-center.x * s, -center.y * s, -center.z * s] as [number, number, number],
    };
  }, [clonedScene]);

  if (loadError || !clonedScene) {
    return <>{fallback}</>;
  }

  return (
    <group ref={groupRef} scale={scale} position={position}>
      <primitive object={clonedScene} />
      <group ref={arrowRef} position={[0, 0.6, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.015, 8, 24, Math.PI * 1.3]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.13, 0, -0.06]} rotation={[0, -0.45, -Math.PI / 2]}>
          <coneGeometry args={[0.03, 0.06, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
}
