/**
 * AvatarSection.jsx
 * Interactive 3D Portfolio Character Section
 *
 * SETUP CHECKLIST:
 * 1. npm install three @react-three/fiber @react-three/drei
 * 2. Go to https://readyplayer.me → create your avatar → download .glb
 * 3. Rename it to `developer.glb` and drop into your project's /public/models/ folder
 * 4. Done — the component auto-loads it.
 *
 * OPTIONAL ANIMATIONS:
 * - Ready Player Me avatars ship with idle animation clips baked in.
 * - The component activates the first clip found automatically.
 */

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────────────────────
const MODEL_PATH = "/models/developer.glb";

// ─── Studio Lighting ──────────────────────────────────────────────────────────
function StudioLights() {
  return (
    <>
      {/* Soft ambient fill — keeps shadows from going pitch black */}
      <ambientLight intensity={0.25} color="#a8c0e8" />

      {/* Key light: front-top, slightly off-center — mimics a softbox */}
      <directionalLight
        position={[2, 4, 3]}
        intensity={2.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fill light: opposite side, cooler tone */}
      <directionalLight
        position={[-3, 2, 1]}
        intensity={0.6}
        color="#6090cc"
      />

      {/* Rim / back light: the sharp silhouette highlight on shoulders + hair */}
      <directionalLight
        position={[0, 3, -5]}
        intensity={3.5}
        color="#c8d8ff"
      />

      {/* Subtle ground bounce */}
      <pointLight position={[0, -1, 2]} intensity={0.3} color="#334466" />
    </>
  );
}

// ─── Placeholder mesh shown while the GLB loads / on error ────────────────────
function PlaceholderFigure() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Gentle float
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.04;
  });

  const mat = <meshStandardMaterial color="#1a2540" roughness={0.4} metalness={0.6} />;

  return (
    <group ref={groupRef} position={[0, -0.9, 0]}>
      {/* Head */}
      <mesh position={[0, 1.72, 0]} castShadow>
        <sphereGeometry args={[0.16, 32, 32]} />
        {mat}
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.16, 0.55, 24]} />
        {mat}
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.28, 1.28, 0]} rotation={[0, 0, 0.25]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.45, 16]} />
        {mat}
      </mesh>
      {/* Right arm */}
      <mesh position={[0.28, 1.28, 0]} rotation={[0, 0, -0.25]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.45, 16]} />
        {mat}
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.1, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.07, 0.5, 16]} />
        {mat}
      </mesh>
      {/* Right leg */}
      <mesh position={[0.1, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.07, 0.5, 16]} />
        {mat}
      </mesh>
      {/* Text label */}
      <mesh position={[0, 0.5, 0.001]}>
        <planeGeometry args={[0.6, 0.12]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0} />
      </mesh>
    </group>
  );
}

// ─── Avatar Model ─────────────────────────────────────────────────────────────
function AvatarModel({ mousePos }) {
  const groupRef = useRef();
  const neckRef = useRef();
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions, names } = useAnimations(animations, groupRef);

  // Play the first animation clip (idle)
  useEffect(() => {
    if (names.length > 0) {
      const idleClip =
        names.find((n) => /idle/i.test(n)) || names[0];
      actions[idleClip]?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  // Find neck / head bone once model loads
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isBone && /neck|head/i.test(child.name)) {
        neckRef.current = child;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!neckRef.current) return;
    // Smooth damped rotation following mouse
    neckRef.current.rotation.y = THREE.MathUtils.lerp(
      neckRef.current.rotation.y,
      mousePos.current.x * 0.4,
      0.07
    );
    neckRef.current.rotation.x = THREE.MathUtils.lerp(
      neckRef.current.rotation.x,
      mousePos.current.y * -0.25,
      0.07
    );
  });

  return (
    <group
      ref={groupRef}
      position={[0, -1.05, 0]}
      scale={1}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
}

// ─── Mouse Tracker (normalised –1 → +1) ──────────────────────────────────────
function MouseTracker({ mousePos }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mousePos.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    canvas.addEventListener("mousemove", onMove);
    return () => canvas.removeEventListener("mousemove", onMove);
  }, [gl, mousePos]);

  return null;
}

// ─── 3D Scene ─────────────────────────────────────────────────────────────────
function Scene({ mousePos }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 15]} />

      <MouseTracker mousePos={mousePos} />
      <StudioLights />

      <Suspense fallback={<PlaceholderFigure />}>
        <AvatarModel mousePos={mousePos} />
      </Suspense>

      {/* Subtle ground shadow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.06, 0]} receiveShadow>
        <circleGeometry args={[0.6, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function AvatarSection() {
  const mousePos = useRef({ x: 0, y: 0 });

  return (
    <section className="flex flex-col items-center gap-6 py-16 px-4">
      {/* Section heading — matches image typography */}
      <h2 className="text-white text-3xl font-bold tracking-tight self-start max-w-md mx-auto w-full">
        My Work Experience
      </h2>

      {/* Portfolio card */}
      <div
        className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d0d0d 0%, #0a0a12 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
          aspectRatio: "9/16",
          maxHeight: "520px",
        }}
      >
        {/* Subtle inner vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* R3F Canvas */}
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0.6, 2.6], fov: 45, near: 0.1, far: 20 }}
          gl={{ antialias: true, alpha: false }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene mousePos={mousePos} />
        </Canvas>
      </div>

      {/* Caption badge */}
      <p className="text-xs text-white/30 tracking-widest uppercase">
        Interactive · Drag to explore
      </p>
    </section>
  );
}

// Preload the GLB so it starts fetching immediately
useGLTF.preload(MODEL_PATH);