import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Rotate3D, ZoomIn, Move } from "lucide-react";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Responsive hero preview with immutable camera.
 * ───────────────────────────────────────────────
 *   • Desktop (≥ md): slider en bas à droite pour zoom (scale 0.6‑1.4)
 *   • Mobile : slider caché, pinch/trackpad wheel pour zoom
 *   • Horizontal drag  → rotation Y
 *   • Vertical drag    → translation Z (push/pull)
 *   • Caméra fixe à [0,1.2,5]
 */
export default function HeroPreview() {
  const rigRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState<number>(1);

  /* Synchronise la valeur du slider avec l'échelle de l'objet */
  useEffect(() => {
    if (rigRef.current) rigRef.current.scale.setScalar(scale);
  }, [scale]);

  return (
    <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden">
      {/* 3D viewport */}
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.2, 5], fov: 45, near: 0.1, far: 100 }}
        style={{ background: "#1976d2" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

          {/* Manipulable group */}
          <group ref={rigRef}>
            <Table />
          </group>

          {/* Ground + environment */}
          <ContactShadows position={[0, 0, 0]} opacity={0.25} blur={5} scale={10} />
          <Environment preset="city" background={false} />

          {/* Gestures */}
          <InteractionController rigRef={rigRef} />
        </Suspense>
      </Canvas>

      {/* Desktop‑only zoom slider (rotated vertical) */}
      <input
        type="range"
        min={0.6}
        max={1.4}
        step={0.01}
        value={scale}
        onChange={(e) => setScale(parseFloat(e.currentTarget.value))}
        className="hidden md:block absolute bottom-3 right-8 w-32 rotate-90 origin-bottom-right cursor-pointer shadow-lg bg-white/40 backdrop-blur-sm rounded-lg"
        aria-label="Zoom"
        style={{ pointerEvents: "auto" }}
      />

      {/* Helper icons */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex flex-col gap-2 text-white/70">
        <ZoomIn size={24} />
        <Rotate3D size={24} />
        <Move size={24} />
      </div>
    </div>
  );
}

/** Table model */
function Table() {
  return (
    <group>
      {/* Top */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* Legs */}
      {[
        [-0.9, 0.25, -0.45],
        [0.9, 0.25, -0.45],
        [-0.9, 0.25, 0.45],
        [0.9, 0.25, 0.45],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.7, 0.1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* Interaction logic */

type Mode = "rotate" | "translate" | null;
interface InteractionProps {
  rigRef: React.RefObject<THREE.Group>;
}

function InteractionController({ rigRef }: InteractionProps) {
  const { gl } = useThree();
  const state = useRef<{ active: boolean; startX: number; startY: number; mode: Mode }>({
    active: false,
    startX: 0,
    startY: 0,
    mode: null,
  });

  useEffect(() => {
    const canvas = gl.domElement as HTMLCanvasElement;

    const onPointerDown = (e: PointerEvent) => {
      state.current.active = true;
      state.current.startX = e.clientX;
      state.current.startY = e.clientY;
      state.current.mode = null;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!state.current.active || !rigRef.current) return;
      const dx = e.clientX - state.current.startX;
      const dy = e.clientY - state.current.startY;
      if (state.current.mode === null) {
        state.current.mode = Math.abs(dx) > Math.abs(dy) ? "rotate" : "translate";
      }
      if (state.current.mode === "rotate") {
        rigRef.current.rotation.y += dx * 0.005;
      } else {
        rigRef.current.position.z -= dy * 0.01;
        rigRef.current.position.z = THREE.MathUtils.clamp(rigRef.current.position.z, -3, 1.5);
      }
      state.current.startX = e.clientX;
      state.current.startY = e.clientY;
    };

    const endDrag = () => {
      state.current.active = false;
      state.current.mode = null;
    };

    /* Wheel (trackpad / pinch) for uniform scale */
    const onWheel = (e: WheelEvent) => {
      if (!rigRef.current) return;
      let s = rigRef.current.scale.x - e.deltaY * 0.001;
      s = THREE.MathUtils.clamp(s, 0.6, 1.4);
      rigRef.current.scale.setScalar(s);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    canvas.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [gl, rigRef]);

  return null;
}
