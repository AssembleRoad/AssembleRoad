import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { Rotate3D, ZoomIn, Move } from "lucide-react";

/**
 * Responsive hero preview showcasing a manipulable 3D table.
 *  - white Ikea‑style table
 *  - blue background (#1976d2)
 *  - OrbitControls enable rotate + zoom (pinch / wheel)
 *  - subtle soft shadow under the table
 *  - minimalist overlay icons bottom‑right (70 % opacity)
 */
export default function HeroPreview() {
  return (
    
        <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden">
        {/* 3D viewport */}
        <Canvas
            dpr={window.devicePixelRatio}
            camera={{ position: [0, 1.2, 3], fov: 40 }}
            style={{ background: "#1976d2" }}
        >
            {/* Lights */}
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />

            {/* White table */}
            <Table />

            {/* Ground contact shadows for soft edges */}
            <ContactShadows
            position={[0, 0, 0]}
            opacity={0.25}
            blur={5}
            scale={10}
            />

            {/* Global environment lighting (soft) */}
            <Environment preset="city" background={false} />

            {/* Controls */}
            <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={1}
            maxDistance={7.5}
            />
        </Canvas>

        {/* Overlay icons */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 text-white/70">
            <ZoomIn size={24} />
            <Rotate3D size={24} />
            <Move size={24} />
        </div>
        </div>
    
  );
}

/**
 * Simple white table: top + 4 legs
 */
function Table() {
  return (
    <group>
      {/* Table top */}
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
