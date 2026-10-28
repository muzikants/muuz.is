"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { Float32BufferAttribute, IcosahedronGeometry, type Mesh } from "three";

/** Layered sines — cheap deterministic stand-in for 3D noise. */
function organicNoise(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 2.1 + y * 1.3) * 0.5 +
    Math.sin(y * 3.4 - z * 2.2) * 0.3 +
    Math.sin(z * 4.7 + x * 3.1) * 0.2
  );
}

/**
 * Form A: faceted, flattened stealth wing (octahedral L1 projection, swept back).
 * Form B: Arca-like organic mass (noise-displaced sphere).
 * Both share one vertex set so the mesh can morph between them.
 */
function useMorphGeometry() {
  return useMemo(() => {
    const geometry = new IcosahedronGeometry(1, 4);
    const sphere = geometry.attributes.position;
    const stealth = new Float32Array(sphere.count * 3);
    const organic = new Float32Array(sphere.count * 3);

    for (let i = 0; i < sphere.count; i++) {
      const x = sphere.getX(i);
      const y = sphere.getY(i);
      const z = sphere.getZ(i);

      const l1 = Math.abs(x) + Math.abs(y) + Math.abs(z);
      const fx = x / l1;
      const fy = y / l1;
      const fz = z / l1;
      stealth[i * 3] = fx * 2.4;
      stealth[i * 3 + 1] = fy * 0.32;
      stealth[i * 3 + 2] = fz * 1.3 - Math.abs(fx) * 0.9 + 0.3;

      const displacement = 1 + organicNoise(x * 1.6, y * 1.6, z * 1.6) * 0.3;
      organic[i * 3] = x * displacement * 1.15;
      organic[i * 3 + 1] = y * displacement * 1.05;
      organic[i * 3 + 2] = z * displacement * 1.15;
    }

    geometry.setAttribute("position", new Float32BufferAttribute(stealth, 3));
    geometry.morphAttributes.position = [
      new Float32BufferAttribute(organic, 3),
    ];
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

function MorphForm() {
  const meshRef = useRef<Mesh>(null);
  const entryRef = useRef(0);
  const morphRef = useRef(0);
  const geometry = useMorphGeometry();

  // Geometry arrives via props, so the mesh must re-read its morph attributes.
  useLayoutEffect(() => {
    meshRef.current?.updateMorphTargets();
  }, [geometry]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh?.morphTargetInfluences) return;

    entryRef.current = Math.min(entryRef.current + delta * 0.8, 1);
    const eased = 1 - Math.pow(1 - entryRef.current, 3);
    const t = state.clock.elapsedTime;

    // Idle: hold Form A, drift toward B and back on a slow cycle.
    const idle = Math.pow(0.5 - 0.5 * Math.cos(t * 0.22), 3);
    // Scroll: leaving the hero commits to Form B.
    const scroll = Math.min(window.scrollY / window.innerHeight, 1) * 1.6;
    const target = Math.min(Math.max(idle, scroll), 1);
    morphRef.current += (target - morphRef.current) * Math.min(delta * 2.5, 1);
    mesh.morphTargetInfluences[0] = morphRef.current;

    mesh.rotation.y += delta * 0.16;
    mesh.rotation.x = 0.3 + Math.sin(t * 0.35) * 0.05;
    mesh.scale.setScalar(0.6 + eased * 0.4);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[0.3, 0.8, 0]}>
      <meshBasicMaterial
        color="#6a6a6a"
        wireframe
        transparent
        opacity={0.32}
      />
    </mesh>
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
      position={[0, -1.4, 0]}
    />
  );
}

export function Hero3DCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.6, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <MorphForm />
        <CodecGrid />
      </Canvas>
    </div>
  );
}
