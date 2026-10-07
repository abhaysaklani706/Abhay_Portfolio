"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const Orb = () => {
  const group = useRef<Group>(null);
  useFrame(({ pointer, clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    const k = Math.min(1, delta * 2);
    // slow drift + gentle follow of the cursor
    g.rotation.y += (pointer.x * 0.6 + t * 0.15 - g.rotation.y) * k;
    g.rotation.x += (-pointer.y * 0.4 - g.rotation.x) * k;
    g.position.y = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.75} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.85, 0.008, 8, 120]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.6, 0]}>
        <torusGeometry args={[2.2, 0.006, 8, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

export default function HeroOrb({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Orb />
    </Canvas>
  );
}
