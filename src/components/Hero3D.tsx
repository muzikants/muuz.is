"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function StealthMesh() {
  return (
    <mesh rotation={[0.4, 0.6, 0]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color="#1a1a1a" wireframe />
    </mesh>
  );
}

export function Hero3D() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20"
        aria-hidden="true"
      >
        <div className="h-32 w-32 rotate-45 border border-[var(--color-border)]" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-30"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 3, 4]} intensity={0.8} />
        <StealthMesh />
      </Canvas>
    </div>
  );
}
