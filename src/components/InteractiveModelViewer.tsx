import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

type InteractiveModelViewerProps = {
  className?: string
}

function PlaceholderModel() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 2.1, 0.9]} />
        <meshStandardMaterial color="#1fa896" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial color="#53c7b3" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.22, 16]} />
        <meshStandardMaterial color="#9adfd3" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function FutureRobotModel() {
  /**
   * FUTURE MODEL INTEGRATION
   * 1) Put your final .glb/.gltf model in: public/models/skyshine-robot.glb
   * 2) Uncomment the lines below and remove <PlaceholderModel /> from the Suspense fallback area.
   *
   * Example:
   * const robot = useGLTF('/models/skyshine-robot.glb')
   * return <primitive object={robot.scene} scale={1.1} />
   */
  return <PlaceholderModel />
}

export default function InteractiveModelViewer({ className = '' }: InteractiveModelViewerProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-skyshine-border bg-white/80 ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(83,199,179,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(83,199,179,0.12)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-skyshine-mint/60 via-transparent to-skyshine-surface/70" />

      <div className="relative h-[360px] md:h-[520px] lg:h-[640px]">
        <Canvas camera={{ position: [0, 2.2, 5], fov: 45 }}>
          <ambientLight intensity={0.65} />
          <directionalLight position={[4, 8, 3]} intensity={1} color="#8ed8cb" />
          <pointLight position={[-4, -1, -2]} intensity={0.4} color="#53c7b3" />

          <Suspense fallback={<PlaceholderModel />}>
            <FutureRobotModel />
          </Suspense>

          <OrbitControls enablePan enableZoom enableRotate autoRotate={false} autoRotateSpeed={0.75} />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-xl border border-skyshine-border bg-white/85 px-4 py-3 backdrop-blur-md">
        <p className="text-base font-medium text-skyshine-text">Interactive 3D Robot Model</p>
        <p className="mt-1 text-sm text-skyshine-muted">
          Model viewer ready. Final SkyShine robot model will be added here.
        </p>
      </div>
    </div>
  )
}
