"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

export const StarBackground = (props: PointsInstancesProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() => {
    // Create safe positions without NaN values
    const positions = new Float32Array(5000 * 3); // x, y, z for each star
    for (let i = 0; i < positions.length; i += 3) {
      // Generate random spherical coordinates
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 0.8 + Math.random() * 0.4; // Random radius between 0.8 and 1.2
      
      // Convert spherical to Cartesian coordinates
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);     // x
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      positions[i + 2] = radius * Math.cos(phi);                    // z
    }
    return positions;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);
