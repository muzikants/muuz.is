"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import type { Group } from "three";

const wireMaterial = { color: "#2a2a2a", wireframe: true as const };

function StealthSilhouette() {
  const groupRef = useRef<Group>(null);
  const entryRef = useRef(0);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    entryRef.current = Math.min(entryRef.current + delta * 0.8, 1);
    const eased = 1 - Math.pow(1 - entryRef.current, 3);

    group.rotation.y += delta * 0.18;
    group.rotation.x = 0.35 + Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
    group.scale.setScalar(0.6 + eased * 0.4);
  });

  return (
    <group ref={groupRef} rotation={[0.35, 0.8, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.12, 2.2]} />
        <meshStandardMaterial {...wireMaterial} />
      </mesh>

      <mesh position={[0, 0.02, -0.15]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.04, 0.9]} />
        <meshStandardMaterial {...wireMaterial} />
      </mesh>

      <mesh position={[0, 0.08, -0.95]} rotation={[0.55, 0, 0]}>
        <boxGeometry args={[0.7, 0.03, 0.45]} />
        <meshStandardMaterial {...wireMaterial} />
      </mesh>

      <mesh position={[0, 0.06, 0.75]}>
        <coneGeometry args={[0.18, 0.35, 4]} />
        <meshStandardMaterial {...wireMaterial} />
      </mesh>

      <mesh position={[0.95, 0.04, 0.1]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.5, 0.03, 0.35]} />
        <meshStandardMaterial {...wireMaterial} />
      </mesh>

      <mesh position={[-0.95, 0.04, 0.1]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.5, 0.03, 0.35]} />
        <meshStandardMaterial {...wireMaterial} />
      </mesh>
    </group>
  );
}

function CodecGrid() {
  return (
    <Grid
      infiniteGrid
      fadeDistance={12}
      fadeStrength={1.2}
      cellSize={0.35}
      cellThickness={0.4}
      sectionSize={1.4}
      sectionThickness={0.8}
      cellColor="#1f1f1f"
      sectionColor="#2e2e2e"
      position={[0, -1.1, 0]}
    />
  );
}

export function Hero3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 5.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={0.7} />
      <directionalLight position={[-4, 2, -2]} intensity={0.25} />
      <StealthSilhouette />
      <CodecGrid />
    </Canvas>
  );
}
