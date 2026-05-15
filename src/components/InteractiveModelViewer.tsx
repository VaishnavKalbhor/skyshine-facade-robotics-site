import { Suspense, Component, useMemo, type ErrorInfo, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Environment, OrbitControls, useGLTF } from '@react-three/drei'

/** Served from `public/models/` — update this path if you replace the file. */
export const SKYSHINE_ROBOT_GLB_URL = '/models/skyshine-robot.glb'

/** Optional Quick Look (iOS). File: `public/models/skyshine-robot.usdz` */
export const SKYSHINE_ROBOT_USDZ_URL = '/models/skyshine-robot.usdz'

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

function LoadedRobot() {
  const { scene } = useGLTF(SKYSHINE_ROBOT_GLB_URL)
  const model = useMemo(() => scene.clone(true), [scene])
  return (
    <Bounds fit clip observe margin={1.25}>
      <primitive object={model} />
    </Bounds>
  )
}

useGLTF.preload(SKYSHINE_ROBOT_GLB_URL)

type ModelErrorBoundaryProps = { children: ReactNode; fallback: ReactNode }
type ModelErrorBoundaryState = { hasError: boolean }

class ModelErrorBoundary extends Component<ModelErrorBoundaryProps, ModelErrorBoundaryState> {
  state: ModelErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ModelErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Intentionally quiet: fallback geometry keeps the page usable.
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

export default function InteractiveModelViewer({ className = '' }: InteractiveModelViewerProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-skyshine-border bg-white/80 ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(83,199,179,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(83,199,179,0.12)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-skyshine-mint/60 via-transparent to-skyshine-surface/70" />

      <div className="relative h-[360px] md:h-[520px] lg:h-[640px]">
        <Canvas camera={{ position: [0, 1.2, 4.2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.22} />
          <directionalLight position={[4, 7, 3]} intensity={0.52} color="#b8d9d2" />
          <directionalLight position={[-4, 3, -2]} intensity={0.28} color="#4a9e8f" />
          <directionalLight position={[0, -5, 3]} intensity={0.12} color="#2d7a6c" />

          <Suspense fallback={<PlaceholderModel />}>
            <ModelErrorBoundary fallback={<PlaceholderModel />}>
              <LoadedRobot />
            </ModelErrorBoundary>
            <Environment preset="city" environmentIntensity={0.38} />
          </Suspense>

          <OrbitControls enablePan enableZoom enableRotate autoRotate={false} autoRotateSpeed={0.75} />
        </Canvas>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 rounded-xl border border-skyshine-border bg-white/90 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-medium text-skyshine-text">Interactive 3D Robot Model</p>
          <p className="mt-1 text-sm text-skyshine-muted">Drag to orbit, scroll to zoom, right-drag to pan.</p>
        </div>
        <a
          href={SKYSHINE_ROBOT_USDZ_URL}
          rel="ar"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-skyshine-border bg-skyshine-surface px-3 py-2 text-xs font-semibold text-skyshine-tealDark transition hover:-translate-y-0.5 hover:shadow-glow"
        >
          View in AR (iOS)
        </a>
      </div>
    </div>
  )
}
