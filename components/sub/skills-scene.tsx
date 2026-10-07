"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

export type SceneSkill = {
  name: string;
  image: string;
  category: string;
  accent: string;
};

export type Progress = { value: number };

// Length of the "tunnel" the camera travels through.
const LENGTH = 56;
const GOLDEN = 2.399963;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Where the camera sits for a given scroll progress (0 → 1). */
const cameraPath = (t: number, out: THREE.Vector3) =>
  out.set(
    Math.sin(t * Math.PI * 3) * 0.55,
    Math.cos(t * Math.PI * 3) * 0.4,
    -t * LENGTH
  );

const makeTexture = (skill: SceneSkill) => {
  const W = 512;
  const H = 640;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const draw = (img?: HTMLImageElement) => {
    ctx.clearRect(0, 0, W, H);
    // glass body
    roundRect(12, 12, W - 24, H - 24, 56);
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "rgba(255,255,255,0.20)");
    g.addColorStop(1, "rgba(120,80,255,0.10)");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = skill.accent;
    ctx.globalAlpha = 0.85;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // soft glow behind the icon
    const rg = ctx.createRadialGradient(W / 2, 270, 10, W / 2, 270, 190);
    rg.addColorStop(0, skill.accent + "55");
    rg.addColorStop(1, "transparent");
    ctx.fillStyle = rg;
    ctx.fillRect(0, 60, W, 420);

    if (img) {
      const max = 230;
      const s = Math.min(max / img.width, max / img.height);
      const w = img.width * s;
      const h = img.height * s;
      ctx.drawImage(img, (W - w) / 2, 270 - h / 2, w, h);
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 52px Inter, system-ui, sans-serif";
    ctx.fillText(skill.name, W / 2, 500, W - 80);
    ctx.fillStyle = skill.accent;
    ctx.font = "600 26px Inter, system-ui, sans-serif";
    ctx.fillText(skill.category.toUpperCase(), W / 2, 550);
    tex.needsUpdate = true;
  };

  draw();
  const img = new Image();
  img.onload = () => draw(img);
  img.src = skill.image;
  return tex;
};

const Card = ({
  skill,
  index,
  total,
  progress,
}: {
  skill: SceneSkill;
  index: number;
  total: number;
  progress: MutableRefObject<Progress>;
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const aspect = useThree((s) => s.size.width / s.size.height);
  const texture = useMemo(() => makeTexture(skill), [skill]);
  useEffect(() => () => texture.dispose(), [texture]);

  const u = (index + 0.5) / total;
  const z = -(3.5 + u * (LENGTH - 7));
  const angle = index * GOLDEN;
  const radius = 2.1 + (index % 3) * 0.4;

  useFrame(() => {
    const m = mesh.current;
    if (!m || !mat.current) return;
    const p = progress.current.value;
    const rs = Math.min(1, Math.max(0.42, aspect / 1.6));
    const camZ = -p * LENGTH;
    const ahead = camZ - z; // >0 : card is in front of the camera

    m.position.set(
      Math.cos(angle) * radius * rs,
      Math.sin(angle) * radius * rs * 0.8,
      z
    );
    m.lookAt(0, 0, z + 3.5);
    // cards start tilted and swing upright as the camera closes in
    m.rotateZ(smooth(2, 14, ahead) * Math.sin(angle) * 0.6);

    const appear = smooth(20, 7, ahead);
    const s = (0.55 + 0.45 * appear) * (aspect < 0.8 ? 0.62 : aspect < 1.1 ? 0.8 : 1);
    m.scale.setScalar(s);
    mat.current.opacity = appear * smooth(-1.2, 0.8, ahead);
    m.visible = mat.current.opacity > 0.01;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1.6, 2]} />
      <meshBasicMaterial
        ref={mat}
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/** Dust that streaks past to give a sense of speed and depth. */
const Dust = () => {
  const geo = useMemo(() => {
    const n = 700;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.6 + Math.random() * 5;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(a) * r;
      arr[i * 3 + 2] = 6 - Math.random() * (LENGTH + 14);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.035}
        color="#c4b5fd"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

const Rig = ({ progress }: { progress: MutableRefObject<Progress> }) => {
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }) => {
    const p = progress.current.value;
    const cam = camera as THREE.PerspectiveCamera;
    cameraPath(p, cam.position.copy(tmp));
    cameraPath(p + 0.035, look);
    // slow roll + breathing zoom, all derived from scroll progress
    const roll = Math.sin(p * Math.PI * 2) * 0.32 + p * 0.5;
    cam.up.set(Math.sin(roll), Math.cos(roll), 0);
    cam.lookAt(look);
    cam.fov = 66 - 14 * Math.sin(p * Math.PI) ;
    cam.updateProjectionMatrix();
  });
  return null;
};

export default function SkillsScene({
  skills,
  progress,
}: {
  skills: SceneSkill[];
  progress: MutableRefObject<Progress>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 66, near: 0.1, far: 80 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#030014", 7, 24]} />
      <Rig progress={progress} />
      <Dust />
      {skills.map((s, i) => (
        <Card
          key={s.name}
          skill={s}
          index={i}
          total={skills.length}
          progress={progress}
        />
      ))}
    </Canvas>
  );
}
