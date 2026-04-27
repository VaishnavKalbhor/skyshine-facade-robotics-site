import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Gauge,
  LineChart,
  Radar,
  Shield,
  Sparkles,
  Waves,
} from 'lucide-react'
import InteractiveModelViewer from './components/InteractiveModelViewer'

type IconCard = { title: string; description: string; icon: LucideIcon }

const problemCards: IconCard[] = [
  { title: 'Worker Safety Risk', description: 'Workers are exposed to dangerous high-altitude conditions on ropes and platforms.', icon: AlertTriangle },
  { title: 'Labour-Intensive Operations', description: 'Cleaning quality and timing are highly dependent on manual coordination.', icon: Gauge },
  { title: 'Cost Pressure', description: 'Growing labour costs and setup overhead challenge building operators and service providers.', icon: CircleDollarSign },
  { title: 'Limited Standardization', description: 'Service quality can vary by team, weather windows, and onsite setup complexity.', icon: CheckCircle2 },
  { title: 'Urban Disruption', description: 'Scaffolding and suspended systems require space and can disrupt building operations.', icon: Building2 },
  { title: 'Pollution-Driven Frequency', description: 'In urban areas like Milan, frequent facade cleaning is needed but hard to scale.', icon: Waves },
]

const solutionCards: IconCard[] = [
  { title: 'Vertical Robotics Platform', description: 'Autonomous or semi-autonomous facade cleaning for high-rise surfaces.', icon: Bot },
  { title: 'Navigation + Sensors', description: 'Designed for controlled movement and operation across facade geometries.', icon: Radar },
  { title: 'Software Monitoring', description: 'Dashboard support for scheduling, tracking, and operational visibility.', icon: BarChart3 },
  { title: 'Safety-Centered Design', description: 'Aims to reduce human exposure to high-risk, high-altitude operations.', icon: Shield },
  { title: 'Operational Efficiency', description: 'Designed to improve consistency, speed, and deployment repeatability.', icon: Clock3 },
  { title: 'Data Foundations', description: 'Supports future facade-condition insights and preventive maintenance workflows.', icon: LineChart },
]

const navItems = ['Problem', 'Solution', '3D Robot', 'Product', 'Benefits', 'Contact']

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070f]/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#home" className="text-xl font-semibold tracking-wide text-slate-100">
            Sky<span className="text-cyan-300">Shine</span>
          </a>
          <div className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="transition hover:text-cyan-300">
                {item}
              </a>
            ))}
          </div>
          <a href="#contact" className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-400/20">
            Request Pilot
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="section-container relative bg-hero-grid pt-20 md:pt-24">
          <div className="hero-glow left-[-8rem] top-[-6rem] bg-cyan-500/20" />
          <div className="hero-glow bottom-[-8rem] right-[-10rem] bg-indigo-500/20" />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-500/10 px-3 py-1 text-xs tracking-wider text-cyan-100">
                <Sparkles className="h-4 w-4" /> Milan-based High-Tech Startup
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
                Autonomous Robots for Safer Skyscraper Facade Cleaning
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
                SkyShine is developing intelligent facade-cleaning robots designed to reduce risk, lower operating costs, and make high-rise maintenance faster, safer, and more sustainable.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#solution" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_rgba(34,211,238,0.35)]">Explore the Solution</a>
                <a href="#3d-robot" className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100">View 3D Robot</a>
                <a href="#contact" className="rounded-full border border-cyan-300/50 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-100">Request a Pilot</a>
              </div>
            </div>
            <div className="glass-card relative overflow-hidden p-8 shadow-glow md:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-transparent to-indigo-400/15" />
              <div className="relative space-y-4">
                <div className="h-56 rounded-2xl border border-white/15 bg-[linear-gradient(120deg,rgba(56,189,248,0.18),rgba(15,23,42,0.7))]" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/15 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-300">Robotics + AI Navigation</p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-slate-900/60 p-4">
                    <p className="text-sm text-slate-300">Facade Monitoring Data</p>
                  </div>
                </div>
                <div className="rounded-xl border border-cyan-300/20 bg-cyan-500/5 p-4 text-sm text-cyan-100">
                  Prototype in development for safer and more scalable high-rise facade operations.
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        <section id="problem" className="section-container">
          <h2 className="section-title">The Problem With Traditional Facade Cleaning</h2>
          <p className="section-subtitle">Current approaches are risky, labour-intensive, and difficult to scale consistently across high-rise portfolios.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {problemCards.map(({ title, description, icon: Icon }) => (
              <article key={title} className="glass-card p-6">
                <Icon className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold text-slate-100">{title}</h3>
                <p className="mt-2 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="section-divider" />

        <section id="solution" className="section-container">
          <h2 className="section-title">A Robotics-First Cleaning Solution</h2>
          <p className="section-subtitle">SkyShine combines autonomous robotics and software workflows to support safer, repeatable facade-cleaning operations.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutionCards.map(({ title, description, icon: Icon }) => (
              <article key={title} className="glass-card p-6">
                <Icon className="h-6 w-6 text-indigo-300" />
                <h3 className="mt-4 text-xl font-semibold text-slate-100">{title}</h3>
                <p className="mt-2 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="section-divider" />

        <section id="3d-robot" className="section-container">
          <h2 className="section-title">Explore the SkyShine Robot in 3D</h2>
          <p className="section-subtitle">
            Our website is prepared for an interactive 3D model of the SkyShine facade-cleaning robot. Once the final model is added, visitors will be able to rotate, zoom, and inspect the robot directly in the browser.
          </p>
          <div className="mt-10">
            <InteractiveModelViewer />
          </div>
        </section>
        <div className="section-divider" />

        <section id="product" className="section-container">
          <h2 className="section-title">An Integrated Robotics + Software Platform</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              ['Autonomous Cleaning Robot', 'Vertical movement and adhesion system designed for complex facade environments with efficient resource use.'],
              ['Control & Monitoring Software', 'Scheduling, progress tracking, operational status visibility, and performance reporting in one dashboard.'],
              ['Maintenance & Support', 'Training, maintenance workflows, spare parts, updates, and pilot support through service contracts.'],
            ].map(([title, text]) => (
              <article key={title} className="glass-card p-6">
                <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
                <p className="mt-3 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="section-divider" />

        <section id="benefits" className="section-container">
          <h2 className="section-title">Cheaper, Faster, Safer, and More Sustainable Facade Cleaning</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              ['Safety', 'Designed to reduce worker exposure to height-related risks.'],
              ['Cost Efficiency', 'Aims to reduce labour dependency and recurring operational costs.'],
              ['Speed', 'Expected to support faster and more predictable cleaning cycles.'],
              ['Scalability', 'Supports expansion without proportional workforce growth.'],
              ['Sustainability', 'Optimizes water and cleaning-agent usage through controlled operation.'],
              ['Data Readiness', 'Enables facade-condition monitoring and future predictive maintenance.'],
            ].map(([title, text]) => (
              <article key={title} className="glass-card p-6">
                <h3 className="text-xl font-semibold text-cyan-100">{title}</h3>
                <p className="mt-2 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="section-divider" />

        <section id="contact" className="section-container pb-24">
          <div className="glass-card relative overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-indigo-500/10" />
            <h2 className="section-title">Interested in safer facade cleaning?</h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              We are looking for pilot partners and collaborators in facade cleaning, facility management, and robotics-driven building maintenance.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="mailto:contact@skyshine.ai" className="rounded-full border border-white/20 px-5 py-3 text-sm text-slate-100">
                contact@skyshine.ai
              </a>
              <a href="mailto:contact@skyshine.ai?subject=Request%20Pilot" className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-900">
                Request Pilot
              </a>
              <a href="mailto:contact@skyshine.ai?subject=Contact%20Team" className="rounded-full border border-cyan-300/50 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100">
                Contact Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row md:items-center md:px-10">
          <div>
            <p className="font-semibold text-slate-200">SkyShine</p>
            <p>Autonomous facade-cleaning robots for safer and smarter cities.</p>
          </div>
          <div className="flex gap-4">
            {['Problem', 'Solution', '3D Robot', 'Product', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-cyan-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
