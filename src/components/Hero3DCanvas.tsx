"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import {
  Float32BufferAttribute,
  IcosahedronGeometry,
  type Group,
  type Mesh,
  type Points,
} from "three";

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

type MorphProps = { onMorph?: (value: number) => void };

function MorphForm({ onMorph }: MorphProps) {
  const groupRef = useRef<Group>(null);
  const wireRef = useRef<Mesh>(null);
  const pointsRef = useRef<Points>(null);
  const entryRef = useRef(0);
  const morphRef = useRef(0);
  const geometry = useMorphGeometry();

  // Geometry arrives via props, so each object must re-read its morph attributes.
  useLayoutEffect(() => {
    wireRef.current?.updateMorphTargets();
    pointsRef.current?.updateMorphTargets();
  }, [geometry]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const wire = wireRef.current?.morphTargetInfluences;
    const points = pointsRef.current?.morphTargetInfluences;
    if (!group || !wire || !points) return;

    entryRef.current = Math.min(entryRef.current + delta * 0.6, 1);
    const eased = 1 - Math.pow(1 - entryRef.current, 3);
    const t = state.clock.elapsedTime;

    // Idle: hold Form A, drift toward B and back on a slow cycle.
    const idle = Math.pow(0.5 - 0.5 * Math.cos(t * 0.22), 3);
    // Scroll: leaving the hero commits to Form B.
    const scroll = Math.min(window.scrollY / window.innerHeight, 1) * 1.6;
    const target = Math.min(Math.max(idle, scroll), 1);
    morphRef.current += (target - morphRef.current) * Math.min(delta * 2.5, 1);
    wire[0] = morphRef.current;
    points[0] = morphRef.current;
    onMorph?.(morphRef.current);

    // Sit right of centre on wide screens so the wordmark never covers it.
    const wide = state.viewport.aspect > 1.1;
    group.position.x += ((wide ? 0.95 : 0) - group.position.x) * 0.08;
    group.position.y = wide ? 0.25 : 0.55;

    group.rotation.y += delta * 0.16;
    const tiltX = 0.3 + Math.sin(t * 0.35) * 0.05 - state.pointer.y * 0.15;
    group.rotation.x += (tiltX - group.rotation.x) * 0.05;
    group.rotation.z += (state.pointer.x * -0.1 - group.rotation.z) * 0.05;
    group.scale.setScalar(Math.min(1.1, state.viewport.width / 4) * (0.55 + eased * 0.45));
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0.8, 0]}>
      <mesh ref={wireRef} geometry={geometry}>
        <meshBasicMaterial color="#8a8a8a" wireframe transparent opacity={0.22} />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          color="#f2f2f2"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function DustField() {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const count = 700;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic scatter so server and client renders agree.
      const a = Math.sin(i * 12.9898) * 43758.5453;
      const b = Math.sin(i * 78.233) * 12543.123;
      const c = Math.sin(i * 39.425) * 24634.634;
      data[i * 3] = ((a - Math.floor(a)) - 0.5) * 16;
      data[i * 3 + 1] = ((b - Math.floor(b)) - 0.5) * 8;
      data[i * 3 + 2] = ((c - Math.floor(c)) - 0.5) * 10 - 2;
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9a9a9a"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
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

export function Hero3DCanvas({ onMorph }: MorphProps) {
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
        eventSource={document.body}
        eventPrefix="client"
        camera={{ position: [0, 0.6, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <DustField />
        <MorphForm onMorph={onMorph} />
        <CodecGrid />
      </Canvas>
    </div>
  );
}
