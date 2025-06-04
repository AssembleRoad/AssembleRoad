import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Rotate3D, ZoomIn, Move } from "lucide-react";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Responsive hero preview with immutable camera.
 * ───────────────────────────────────────────────
 *   • Desktop (≥ md): slider bottom‑right for zoom (scale 0.6‑1.4)
 *   • Mobile : slider hidden, pinch‑zoom + drag
 *     – Horizontal drag  ⇒ rotation Y
 *     – Vertical drag    ⇒ translation Z
 *   • Camera stays at [0,1.2,5]
 */
export default function HeroPreview() {
  const rigRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState<number>(1);

  // Sync slider scale (desktop)
  useEffect(() => {
    if (rigRef.current) rigRef.current.scale.setScalar(scale);
  }, [scale]);

  return (
    <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 1.2, 5], fov: 45 }}
        style={{ background: "#1976d2", touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />

          {/* Rig */}
          <group ref={rigRef}>
            <Table />
          </group>

          <ContactShadows position={[0, 0, 0]} opacity={0.25} blur={5} scale={10} />
          <Environment preset="city" />

          <PointerControls rigRef={rigRef} setScale={setScale} />
        </Suspense>
      </Canvas>

      {/* Desktop slider */}
      <input
        type="range"
        min={0.6}
        max={1.4}
        step={0.01}
        value={scale}
        onChange={(e) => setScale(parseFloat(e.currentTarget.value))}
        className="hidden md:block absolute bottom-3 right-3 w-32 rotate-90 origin-bottom-right cursor-pointer shadow-lg bg-white/40 backdrop-blur-sm rounded-lg"
      />

      <div className="pointer-events-none absolute bottom-3 left-3 flex flex-col gap-2 text-white/70">
        <ZoomIn size={24} />
        <Rotate3D size={24} />
        <Move size={24} />
      </div>
    </div>
  );
}

function Table() {
  return (
    <group>
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
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

interface PointerControlsProps {
  rigRef: React.RefObject<THREE.Group>;
  setScale: (s: number) => void;
}

function PointerControls({ rigRef, setScale }: PointerControlsProps) {
  const { gl } = useThree();
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinch = useRef<{ start: number; baseScale: number }>({ start: 0, baseScale: 1 });
  const drag = useRef<{ active: boolean; prevX: number; prevY: number }>({ active: false, prevX: 0, prevY: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

    const onPointerDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 1) {
        drag.current = { active: true, prevX: e.clientX, prevY: e.clientY };
      } else if (pointers.current.size === 2 && rigRef.current) {
        const [p1, p2] = Array.from(pointers.current.values());
        pinch.current.start = distance(p1, p2);
        pinch.current.baseScale = rigRef.current.scale.x;
        drag.current.active = false; // disable single‑finger drag during pinch
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const entry = pointers.current.get(e.pointerId);
      if (!entry || !rigRef.current) return;
      entry.x = e.clientX;
      entry.y = e.clientY;

      if (pointers.current.size === 2) {
        const [p1, p2] = Array.from(pointers.current.values());
        let newScale = pinch.current.baseScale * (distance(p1, p2) / pinch.current.start);
        newScale = THREE.MathUtils.clamp(newScale, 0.6, 1.4);
        rigRef.current.scale.setScalar(newScale);
        setScale(newScale);
        return;
      }

      if (drag.current.active) {
        const dx = e.clientX - drag.current.prevX;
        const dy = e.clientY - drag.current.prevY;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Rotate – amplify a bit for mobile comfort
          rigRef.current.rotation.y += dx * 0.01;
        } else {
          // Translate Z
          rigRef.current.position.z -= dy * 0.02;
          rigRef.current.position.z = THREE.MathUtils.clamp(rigRef.current.position.z, -3, 1.5);
        }

        drag.current.prevX = e.clientX;
        drag.current.prevY = e.clientY;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      canvas.releasePointerCapture(e.pointerId);
      pointers.current.delete(e.pointerId);
      if (pointers.current.size === 0) drag.current.active = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!rigRef.current) return;
      let s = rigRef.current.scale.x - e.deltaY * 0.001;
      s = THREE.MathUtils.clamp(s, 0.6, 1.4);
      rigRef.current.scale.setScalar(s);
      setScale(s);
    };

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
