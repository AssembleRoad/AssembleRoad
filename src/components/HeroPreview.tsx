import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Rotate3D, ZoomIn, Move } from "lucide-react";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Responsive hero preview with immutable camera.
 * ───────────────────────────────────────────────
 *   • Desktop (≥ md): slider bottom‑right for zoom (scale 0.6‑1.4)
 *   • Mobile : slider hidden, pinch‑to‑zoom & single‑finger drag
 *   • Horizontal drag  → rotation Y
 *   • Vertical drag    → translation Z (push/pull)
 *   • Caméra fixe à [0,1.2,5]
 */
export default function HeroPreview() {
  const rigRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState<number>(1);

  // Apply scale when state changes (desktop slider)
  useEffect(() => {
    if (rigRef.current) rigRef.current.scale.setScalar(scale);
  }, [scale]);

  return (
    <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden">
      {/* 3D viewport */}
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.2, 5], fov: 45, near: 0.1, far: 100 }}
        style={{ background: "#1976d2", touchAction: "none" /* disable browser gestures */ }}
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
          <InteractionController rigRef={rigRef} setScale={setScale} />
        </Suspense>
      </Canvas>

      {/* Desktop‑only zoom slider */}
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

/* ───────── Interaction logic ───────── */

type Mode = "rotate" | "translate" | null;
interface InteractionProps {
  rigRef: React.RefObject<THREE.Group>;
  setScale: (s: number) => void; // update state when pinch zoom used
}

function InteractionController({ rigRef, setScale }: InteractionProps) {
  const { gl } = useThree();

  // Track active pointers for pinch (pointerId → position)
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDist = useRef<number>(0);
  const initialScale = useRef<number>(1);

  // Single‑pointer drag state
  const drag = useRef<{ active: boolean; startX: number; startY: number; mode: Mode }>({
    active: false,
    startX: 0,
    startY: 0,
    mode: null,
  });

  useEffect(() => {
    const canvas = gl.domElement as HTMLCanvasElement;

    /* ──── Helpers ──── */
    const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.hypot(dx, dy);
    };

    /* ──── Pointer handlers ──── */
    const onPointerDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 1) {
        // Start single‑finger drag
        drag.current.active = true;
        drag.current.startX = e.clientX;
        drag.current.startY = e.clientY;
        drag.current.mode = null;
      } else if (pointers.current.size === 2) {
        // Begin pinch
        const [p1, p2] = Array.from(pointers.current.values());
        initialPinchDist.current = getDistance(p1, p2);
        initialScale.current = rigRef.current ? rigRef.current.scale.x : 1;
        drag.current.active = false; // cancel drag while pinching
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!rigRef.current) return;

      if (pointers.current.has(e.pointerId)) {
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }

      // Pinch handling (two active pointers)
      if (pointers.current.size === 2) {
        const [p1, p2] = Array.from(pointers.current.values());
        const newDist = getDistance(p1, p2);
        let newScale = initialScale.current * (newDist / initialPinchDist.current);
        newScale = THREE.MathUtils.clamp(newScale, 0.6, 1.4);
        rigRef.current.scale.setScalar(newScale);
        setScale(newScale); // sync with desktop slider state (even if slider hidden)
        return;
      }

      // Single‑finger drag interaction
      if (drag.current.active) {
        const dx = e.clientX - drag.current.startX;
        const dy = e.clientY - drag.current.startY;

        if (drag.current.mode === null) {
          drag.current.mode = Math.abs(dx) > Math.abs(dy) ? "rotate" : "translate";
        }

        if (drag.current.mode === "rotate") {
          rigRef.current.rotation.y += dx * 0.005;
        } else {
          rigRef.current.position.z -= dy * 0.01;
          rigRef.current.position.z = THREE.MathUtils.clamp(rigRef.current.position.z, -3, 1.5);
        }

        drag.current.startX = e.clientX;
        drag.current.startY = e.clientY;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      canvas.releasePointerCapture(e.pointerId);
      pointers.current.delete(e.pointerId);

      if (pointers.current.size < 2) {
        initialPinchDist.current = 0;
      }

      if (pointers.current.size === 0) {
        drag.current.active = false;
        drag.current.mode = null;
      }
    };

    /* ──── Wheel (desktop trackpad) ──── */
    const onWheel = (e: WheelEvent) => {
      if (!rigRef.current) return;
      let s = rigRef.current.scale.x - e.deltaY * 0.001;
      s = THREE.MathUtils.clamp(s, 0.6, 1.4);
      rigRef.current.scale.setScalar(s);
      setScale(s);
    };

    /* ──── Listener binding ──── */
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [gl, rigRef, setScale]);

  return null;
}
