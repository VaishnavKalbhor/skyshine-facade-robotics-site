import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, BarChart3, Bot, CheckCircle2, Leaf, Radar, Shield, Sparkles, Workflow, Wrench } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from './components/Animated'

const InteractiveModelViewer = lazy(() => import('./components/InteractiveModelViewer'))

type IconCard = { title: string; description: string; icon: LucideIcon }

const navItems = ['3D Robot', 'Problem', 'Solution', 'Technology', 'Benefits', 'Use Cases', 'Safety', 'Contact']

/** Static images copied to `public/media/` from your `Images and 3d Model` folder. */
const MEDIA = {
  robotScene: '/media/image-hd.png',
  map: '/media/map.png',
  cityNy: '/media/image-ny.png',
  cityMilan: '/media/image-unicredit.png',
  safetyGraph: '/media/safety-maintenance-graph.png',
  marketGraph: '/media/cleaning-robot-market-graph.png',
  robotDemo: '/media/skyshine-robot-demo.mp4',
  modelPreviewVideo: '/media/demo-video.mp4',
} as const

const problemCards: IconCard[] = [
  { title: 'High-Altitude Risk', description: 'Facade crews often work in hazardous conditions on ropes and suspended platforms.', icon: AlertTriangle },
  { title: 'Costly Operations', description: 'Labour-heavy workflows can increase operating costs and scheduling complexity.', icon: Workflow },
  { title: 'Inconsistent Outcomes', description: 'Manual execution can make cleaning quality and timing difficult to standardize.', icon: CheckCircle2 },
]

const solutionCards: IconCard[] = [
  { title: 'Autonomous Facade Robot', description: 'Designed to clean vertical high-rise surfaces with controlled robotic movement.', icon: Bot },
  { title: 'Sensor-Guided Navigation', description: 'Built with navigation and sensing support for structured facade operation.', icon: Radar },
  { title: 'Monitoring Dashboard', description: 'Software layer for scheduling, visibility, and performance tracking.', icon: BarChart3 },
]

const techCards: IconCard[] = [
  { title: 'Robotics Control', description: 'Motion, adhesion, and cleaning logic tuned for facade workflows.', icon: Wrench },
  { title: 'Computer Vision + AI', description: 'Perception support for surface context and navigation assistance.', icon: Sparkles },
  { title: 'Cloud-Connected Software', description: 'Operational data and team visibility in one integrated platform.', icon: Workflow },
]

const benefitCards = [
  ['Safer Operations', 'Aims to reduce worker exposure to height-related tasks.'],
  ['Faster Cycles', 'Designed for predictable and repeatable cleaning windows.'],
  ['Lower Cost Pressure', 'Expected to reduce labour intensity over time.'],
  ['Scalable Delivery', 'Supports broader building coverage with better consistency.'],
]

const useCaseCards = [
  ['Commercial Towers', 'Maintain premium facade quality for high-traffic business districts.'],
  ['Hotels and Mixed-Use Buildings', 'Keep visible exteriors clean with minimal operational disruption.'],
  ['Facility Portfolios', 'Standardize recurring facade maintenance across multiple assets.'],
]

function useInViewport(rootMargin = '900px') {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isInViewportRange, setIsInViewportRange] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setIsInViewportRange(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewportRange(entry.isIntersecting)
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, isInViewportRange }
}

function ModelViewerShell() {
  const { ref, isInViewportRange } = useInViewport()
  const [hasRequestedModel, setHasRequestedModel] = useState(false)
  const shouldMountViewer = hasRequestedModel && isInViewportRange

  return (
    <div ref={ref}>
      {shouldMountViewer ? (
        <Suspense fallback={<ModelViewerPlaceholder />}>
          <InteractiveModelViewer />
        </Suspense>
      ) : (
        <ModelViewerPlaceholder hasRequestedModel={hasRequestedModel} onExplore={() => setHasRequestedModel(true)} />
      )}
    </div>
  )
}

function ModelViewerPlaceholder({ hasRequestedModel = false, onExplore }: { hasRequestedModel?: boolean; onExplore?: () => void }) {
  return (
    <div className="relative h-[360px] overflow-hidden rounded-3xl border border-skyshine-border bg-white/80 md:h-[520px] lg:h-[640px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(83,199,179,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(83,199,179,0.12)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-skyshine-mint/60 via-transparent to-skyshine-surface/70" />
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-95"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={MEDIA.robotScene}
        aria-label="SkyShine robot preview video"
      >
        <source src={MEDIA.modelPreviewVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent" />
      <div className="relative flex h-full items-end px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="flex w-full flex-col gap-3 rounded-xl border border-skyshine-border bg-white/90 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-medium text-skyshine-text">Interactive 3D Robot Model</p>
            <p className="mt-1 text-sm text-skyshine-muted">
              {hasRequestedModel ? 'The 3D viewer is paused while this section is away from view.' : 'Load the full model only when you want to inspect it.'}
            </p>
          </div>
          {onExplore ? (
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-skyshine-teal px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-skyshine-tealDark"
            >
              Explore in 3D
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <header className="sticky top-0 z-50 border-b border-skyshine-border bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#home" className="text-xl font-semibold tracking-wide text-skyshine-text">
            Sky<span className="text-skyshine-tealDark">Shine</span>
          </a>
          <div className="hidden items-center gap-5 text-sm text-skyshine-muted lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="transition hover:text-skyshine-tealDark">
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-full bg-skyshine-teal px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-skyshine-tealDark"
          >
            Request Pilot
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="section-container relative bg-hero-grid pt-20 md:pt-24">
          <div className="hero-glow left-[-8rem] top-[-7rem] bg-skyshine-teal/20" />
          <div className="hero-glow bottom-[-9rem] right-[-9rem] bg-skyshine-tealDark/10" />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <AnimatedSection>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-skyshine-border bg-white px-3 py-1 text-xs tracking-wider text-skyshine-tealDark">
                  <Sparkles className="h-4 w-4" /> Intelligent Urban Facade Maintenance
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.08}>
                <h1 className="text-4xl font-semibold leading-tight text-skyshine-text md:text-6xl lg:text-7xl">
                  Autonomous Robots for Safer Skyscraper Facade Cleaning
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.16}>
                <p className="mt-6 max-w-2xl text-lg text-skyshine-muted md:text-xl">
                  SkyShine is developing intelligent facade-cleaning robots designed to reduce risk, lower operating costs, and make high-rise maintenance faster, safer, and more sustainable.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.24}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#solution" className="rounded-full bg-skyshine-teal px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-skyshine-tealDark">
                    Explore the Solution
                  </a>
                  <a href="#3d-robot" className="rounded-full border border-skyshine-teal bg-white px-6 py-3 text-sm font-semibold text-skyshine-tealDark transition hover:-translate-y-0.5 hover:shadow-glow">
                    View 3D Robot
                  </a>
                  <a href="#contact" className="rounded-full border border-skyshine-border bg-skyshine-surface px-6 py-3 text-sm font-semibold text-skyshine-text transition hover:-translate-y-0.5">
                    Request a Pilot
                  </a>
                </div>
              </AnimatedSection>
            </div>
            <AnimatedSection className="glass-card relative overflow-hidden p-6 md:p-8" delay={0.12}>
              <div className="absolute inset-0 bg-gradient-to-br from-skyshine-mint/70 via-transparent to-skyshine-surface/70" />
              <div className="relative space-y-4">
                <div className="overflow-hidden rounded-2xl border border-skyshine-border bg-white">
                  <img
                    src={MEDIA.robotScene}
                    alt="SkyShine autonomous facade-cleaning robot on a glass tower"
                    className="h-80 w-full object-cover object-[70%_center] md:h-[26rem] lg:h-[32rem]"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-skyshine-border bg-white p-4">
                    <p className="text-sm text-skyshine-muted">Robotics + AI Navigation</p>
                  </div>
                  <div className="rounded-xl border border-skyshine-border bg-white p-4">
                    <p className="text-sm text-skyshine-muted">Facade Monitoring Software</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
        <div className="section-divider" />

        <section id="3d-robot" className="section-container">
          <AnimatedSection>
            <h2 className="section-title">Explore the SkyShine Robot in 3D</h2>
            <p className="section-subtitle">
              Explore the SkyShine robot in the browser: rotate, zoom, and inspect the model. On supported iPhones and iPads, you can also open the USDZ in AR from the viewer bar.
            </p>
          </AnimatedSection>
          <AnimatedSection className="mt-10">
            <ModelViewerShell />
          </AnimatedSection>
        </section>
        <div className="section-divider" />

        <section id="problem" className="section-container">
          <AnimatedSection>
            <h2 className="section-title">Why Traditional Facade Cleaning Needs Innovation</h2>
            <p className="section-subtitle">Current methods can be risky, labour-intensive, and difficult to scale for growing high-rise portfolios.</p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {problemCards.map(({ title, description, icon: Icon }) => (
              <StaggerItem key={title}>
                <article className="glass-card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <Icon className="h-6 w-6 text-skyshine-tealDark" />
                  <h3 className="mt-4 text-xl font-semibold text-skyshine-text">{title}</h3>
                  <p className="mt-2 text-skyshine-muted">{description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection className="mt-10">
            <figure className="overflow-hidden rounded-2xl border border-skyshine-border bg-white shadow-sm">
              <img
                src={MEDIA.safetyGraph}
                alt="EU workplace safety data showing fatal work accidents and construction share"
                className="w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </AnimatedSection>
        </section>
        <div className="section-divider" />

        <section id="solution" className="section-container">
          <AnimatedSection>
            <h2 className="section-title">The SkyShine Solution</h2>
            <p className="section-subtitle">A robotics + software approach designed for safer and more consistent high-rise facade-cleaning operations.</p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutionCards.map(({ title, description, icon: Icon }) => (
              <StaggerItem key={title}>
                <article className="glass-card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <Icon className="h-6 w-6 text-skyshine-tealDark" />
                  <h3 className="mt-4 text-xl font-semibold text-skyshine-text">{title}</h3>
                  <p className="mt-2 text-skyshine-muted">{description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
        <div className="section-divider" />

        <section id="technology" className="section-container">
          <AnimatedSection>
            <h2 className="section-title">Technology Platform</h2>
            <p className="section-subtitle">SkyShine combines robotic hardware and software intelligence into one integrated service-ready system.</p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {techCards.map(({ title, description, icon: Icon }) => (
              <StaggerItem key={title}>
                <article className="glass-card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <Icon className="h-6 w-6 text-skyshine-tealDark" />
                  <h3 className="mt-4 text-xl font-semibold text-skyshine-text">{title}</h3>
                  <p className="mt-2 text-skyshine-muted">{description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-skyshine-border bg-white shadow-sm">
              <video
                className="max-h-[32rem] w-full object-cover object-center"
                controls
                muted
                playsInline
                preload="metadata"
                poster={MEDIA.robotScene}
                aria-label="SkyShine robot operation demo video"
              >
                <source src={MEDIA.robotDemo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </AnimatedSection>
        </section>
        <div className="section-divider" />

        <section id="benefits" className="section-container">
          <AnimatedSection>
            <h2 className="section-title">Benefits for Building Operations Teams</h2>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefitCards.map(([title, text]) => (
              <StaggerItem key={title}>
                <article className="glass-card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <h3 className="text-xl font-semibold text-skyshine-text">{title}</h3>
                  <p className="mt-2 text-skyshine-muted">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection className="mt-10">
            <figure className="overflow-hidden rounded-2xl border border-skyshine-border bg-white shadow-sm">
              <img
                src={MEDIA.marketGraph}
                alt="Cleaning robot market growth chart with projected CAGR"
                className="w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </AnimatedSection>
        </section>
        <div className="section-divider" />

        <section id="use-cases" className="section-container">
          <AnimatedSection>
            <h2 className="section-title">Use Cases</h2>
            <p className="section-subtitle">Built for teams managing high-value facades where safety, quality, and uptime matter.</p>
          </AnimatedSection>
          <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {useCaseCards.map(([title, text]) => (
              <StaggerItem key={title}>
                <article className="glass-card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <h3 className="text-xl font-semibold text-skyshine-text">{title}</h3>
                  <p className="mt-2 text-skyshine-muted">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection className="mt-12">
            <div className="grid gap-4 md:grid-cols-3">
              <figure className="overflow-hidden rounded-2xl border border-skyshine-border bg-white shadow-sm">
                <img src={MEDIA.cityNy} alt="Skyline reference for tall-building environments" className="h-44 w-full object-cover md:h-52" loading="lazy" decoding="async" />
                <figcaption className="px-3 py-2 text-xs text-skyshine-muted">High-rise environments</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-skyshine-border bg-white shadow-sm">
                <img src={MEDIA.map} alt="Urban map context for high-rise maintenance" className="h-44 w-full object-cover md:h-52" loading="lazy" decoding="async" />
                <figcaption className="px-3 py-2 text-xs text-skyshine-muted">Dense urban cores</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-skyshine-border bg-white shadow-sm">
                <img src={MEDIA.cityMilan} alt="Modern glass facade in a European city" className="h-44 w-full object-cover md:h-52" loading="lazy" decoding="async" />
                <figcaption className="px-3 py-2 text-xs text-skyshine-muted">Glass-heavy facades</figcaption>
              </figure>
            </div>
          </AnimatedSection>
        </section>
        <div className="section-divider" />

        <section id="safety" className="section-container">
          <AnimatedSection className="glass-card p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="section-title">Safety and Sustainability</h2>
                <p className="mt-4 text-skyshine-muted">
                  SkyShine is designed to support safer maintenance workflows and more resource-aware facade cleaning through controlled robotic operation.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl border border-skyshine-border bg-white p-4">
                  <p className="font-semibold text-skyshine-text"><Shield className="mr-2 inline h-4 w-4 text-skyshine-tealDark" />Safety-Driven Design</p>
                  <p className="mt-1 text-sm text-skyshine-muted">Aims to minimize high-altitude exposure for manual crews.</p>
                </div>
                <div className="rounded-2xl border border-skyshine-border bg-white p-4">
                  <p className="font-semibold text-skyshine-text"><Leaf className="mr-2 inline h-4 w-4 text-skyshine-tealDark" />Resource Efficiency</p>
                  <p className="mt-1 text-sm text-skyshine-muted">Designed to optimize water and cleaning-agent usage where possible.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>
        <div className="section-divider" />

        <section id="contact" className="section-container pb-24">
          <AnimatedSection className="glass-card relative overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-skyshine-mint/70 via-transparent to-skyshine-surface/70" />
            <h2 className="section-title relative">Interested in safer facade cleaning?</h2>
            <p className="relative mt-4 max-w-3xl text-skyshine-muted">
              We are looking for pilot partners and collaborators in facade cleaning, facility management, robotics, and urban maintenance.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center gap-4">
              <a href="mailto:contact@skyshine.ai" className="rounded-full border border-skyshine-border bg-white px-5 py-3 text-sm text-skyshine-text transition hover:-translate-y-0.5">
                contact@skyshine.ai
              </a>
              <a href="mailto:contact@skyshine.ai?subject=Request%20Pilot" className="rounded-full bg-skyshine-teal px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-skyshine-tealDark">
                Request Pilot
              </a>
              <a href="mailto:contact@skyshine.ai?subject=Contact%20Team" className="rounded-full border border-skyshine-teal bg-white px-5 py-3 text-sm font-semibold text-skyshine-tealDark transition hover:-translate-y-0.5 hover:shadow-glow">
                Contact Team
              </a>
            </div>
          </AnimatedSection>
        </section>
      </main>

      <footer className="border-t border-skyshine-border py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 text-sm text-skyshine-muted md:flex-row md:items-center md:px-10">
          <div>
            <p className="font-semibold text-skyshine-text">SkyShine</p>
            <p>Autonomous facade-cleaning robots for safer and smarter cities.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {['Problem', 'Solution', '3D Robot', 'Technology', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-skyshine-tealDark">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
