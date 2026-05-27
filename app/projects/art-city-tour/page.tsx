'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/* ─── Animation helpers ───────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Mock screen previews ────────────────────────────────────────────────── */
function PhoneFrame({ gradient, label, icon }: { gradient: string; label: string; icon: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-32 h-56 md:w-36 md:h-64 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        {/* Status bar */}
        <div className="h-6 bg-black/30 flex items-center justify-between px-3">
          <div className="w-8 h-1.5 bg-white/20 rounded-full" />
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1.5 bg-white/30 rounded-sm" style={{ height: `${6 + i * 2}px` }} />
            ))}
          </div>
        </div>
        {/* Screen content */}
        <div className={`flex-1 h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3 px-4`}>
          <span className="text-3xl">{icon}</span>
          <div className="w-full space-y-2">
            <div className="h-2 bg-white/20 rounded-full" />
            <div className="h-2 bg-white/15 rounded-full w-4/5" />
            <div className="h-2 bg-white/10 rounded-full w-3/5" />
          </div>
          <div className="w-full h-16 rounded-xl bg-white/10 border border-white/10" />
        </div>
      </div>
      <span className="text-xs text-white/40 font-medium tracking-wide text-center">{label}</span>
    </div>
  )
}

/* ─── Persona card ────────────────────────────────────────────────────────── */
function PersonaCard({ name, age, role, goal, pain, color }: {
  name: string; age: string; role: string; goal: string; pain: string; color: string
}) {
  return (
    <div className="glass rounded-2xl p-6 space-y-4 border border-white/08">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-xl font-bold text-white`}>
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{name}</p>
          <p className="text-xs text-white/40">{age} · {role}</p>
        </div>
      </div>
      {/* Goal */}
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-widest uppercase text-green-400">Goal</p>
        <p className="text-sm text-white/65 leading-relaxed">{goal}</p>
      </div>
      {/* Pain */}
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-widest uppercase text-rose-400">Pain point</p>
        <p className="text-sm text-white/65 leading-relaxed">{pain}</p>
      </div>
    </div>
  )
}

/* ─── Phase step ──────────────────────────────────────────────────────────── */
function PhaseStep({ number, title, description, items }: {
  number: string; title: string; description: string; items: string[]
}) {
  return (
    <div className="relative flex gap-6">
      {/* Number */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
          {number}
        </div>
        <div className="flex-1 w-px bg-gradient-to-b from-pink-500/40 to-transparent mt-2" />
      </div>
      {/* Content */}
      <div className="pb-10 flex-1">
        <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
        <p className="text-white/55 text-sm leading-relaxed mb-4">{description}</p>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ─── Main page ───────────────────────────────────────────────────────────── */
export default function ArtCityTourCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 60])

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-slate-100 overflow-x-hidden">

      {/* ── Back navigation ─── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 hover:text-white transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" transform="rotate(180 12 12)" />
          </svg>
          Back
        </Link>
      </motion.div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-rose-900/20 to-orange-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-pink-500/10 blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/08 blur-[80px]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative max-w-7xl mx-auto px-6 w-full"
        >
          {/* Label row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-px bg-pink-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Case Study</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">2023</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            Art City<br />
            <span style={{
              background: 'linear-gradient(135deg, #f9a8d4, #fb7185, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Tour App</span>
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {['Mobile UX', 'Product Design', 'Tourism', 'San José · CR'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs text-white/50 glass border border-white/08">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
          >
            {[
              { value: '3', label: 'Design Phases' },
              { value: '3', label: 'User Personas' },
              { value: '40+', label: 'Screens' },
              { value: '2023', label: 'Year' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 border border-white/08">
                <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-pink-400" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Overview</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Navigating culture through design
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Art City Tour is San José, Costa Rica's premier urban art experience — a curated circuit of
                  murals, sculptures, and cultural installations spread across the city's historic center.
                  Yet despite its rich offering, visitors struggled to discover and navigate the route without
                  a guide or prior knowledge.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Our challenge was to design a mobile application that would empower tourists and locals alike
                  to independently explore the art tour, providing contextual information about each piece
                  while offering an intuitive wayfinding experience.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">My Role</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    UX/UI Designer — responsible for user research, information architecture, interaction design,
                    visual design, and prototype delivery.
                  </p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Team</p>
                  <div className="space-y-1.5">
                    {[
                      'Felipe González Guardia',
                      'José Pablo Campos Sequeira',
                      'Andrés Alberto Bravo A.',
                    ].map((name) => (
                      <p key={name} className="text-white/70 text-sm">{name}</p>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'FigJam', 'Maze', 'Miro', 'Google Forms'].map((tool) => (
                      <span key={tool} className="px-2.5 py-1 rounded-full text-xs text-white/50 bg-white/04 border border-white/08">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Problem & Goals ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-pink-500/05 via-transparent to-orange-500/05">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <span className="w-6 h-px bg-pink-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Problem Space</span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Reveal>
              <div className="glass rounded-3xl p-8 border border-white/08 h-full">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-4">The Problem</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Art City Tour lacked a dedicated digital experience for navigation. Visitors had to rely on
                  paper maps, word of mouth, or generic mapping apps that provided no cultural context.
                  This created friction, confusion, and missed opportunities for meaningful cultural engagement.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    'No centralized, art-specific navigation tool',
                    'Paper maps became outdated with new installations',
                    'No contextual information about artworks',
                    'Difficulty planning a route in advance',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-8 border border-white/08 h-full">
                <div className="w-10 h-10 rounded-2xl bg-green-500/20 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-4">Design Goals</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  We set out to create an experience that felt as vibrant and alive as the art it represented —
                  intuitive enough for tourists unfamiliar with the city, and rich enough to delight
                  local art enthusiasts.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    'Provide clear, art-specific turn-by-turn navigation',
                    'Surface rich content about each artwork and artist',
                    'Enable offline functionality for areas with poor connectivity',
                    'Support multiple languages (Spanish & English)',
                    'Design an accessible, inclusive experience',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-pink-400" />
                <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Design Process</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Three phases,{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f9a8d4, #fb7185, #fb923c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>one vision</span>
              </h2>
            </div>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <PhaseStep
                number="01"
                title="Research & Analysis"
                description="We started by deeply understanding the context — the tour itself, its users, and the existing digital landscape. We conducted user interviews, competitive analysis, and field research at the actual art installations."
                items={[
                  'On-site user interviews with 12 tourists and 5 local art enthusiasts',
                  'Competitive analysis of 6 existing city guide and navigation apps',
                  'Survey with 45 responses to quantify pain points',
                  'Affinity mapping and thematic analysis of qualitative data',
                  'Created 3 primary user personas from research findings',
                  'Defined key HMW (How Might We) questions to guide ideation',
                ]}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <PhaseStep
                number="02"
                title="Planning & Information Architecture"
                description="With research insights in hand, we structured the app's information architecture and defined core user flows. We validated our structure through card sorting and tree testing before committing to wireframes."
                items={[
                  'Card sorting exercise with 8 participants to validate IA',
                  'Defined 5 core user flows: Onboarding, Explore Map, Artwork Detail, Route Planning, Offline Mode',
                  'Low-fidelity wireframes for all primary screens',
                  'Interactive prototype for early usability testing (2 rounds)',
                  'Iterative refinement based on usability test findings',
                  'Created component inventory and design token structure',
                ]}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <PhaseStep
                number="03"
                title="Interface Design"
                description="With a validated structure, we brought the app to life visually. The design system reflected the vibrancy of Costa Rican urban art — bold, accessible, and intentional."
                items={[
                  'Built a comprehensive design system in Figma',
                  'SF Pro Display / SF Pro Text as the system typeface for legibility in outdoor use',
                  'Color-coded screen categories: purple (navigation), red (artwork detail), pink (social/sharing)',
                  'Designed 40+ unique screens in high fidelity',
                  'Created interactive prototype for final usability validation',
                  'Documented components, states, and accessibility guidelines',
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── User Personas ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-transparent via-pink-500/05 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-pink-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">User Research</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Who are we designing for?
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12">
              Three distinct personas emerged from our research, each representing a different relationship with
              urban art and the city.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={0.05}>
              <PersonaCard
                name="Catalina Vargas"
                age="28"
                role="International Tourist"
                goal="Discover Costa Rican culture through art during a week-long trip to San José without needing a guided tour."
                pain="Overwhelmed by unfamiliar streets, can't find context about artworks, and doesn't want to be dependent on poor mobile data."
                color="from-pink-500 to-rose-600"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <PersonaCard
                name="Julieta Ureña"
                age="35"
                role="Local Art Enthusiast"
                goal="Keep up with new art installations added to the circuit and share discoveries with her community of fellow art lovers."
                pain="Existing apps don't go deep enough — she wants artist bios, inspiration stories, and social sharing within an art-first context."
                color="from-violet-500 to-purple-600"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <PersonaCard
                name="Marco Jara"
                age="52"
                role="Cultural Director"
                goal="Promote the Art City Tour to international visitors and ensure that the digital presence reflects the quality of the physical experience."
                pain="Current materials don't convey the cultural depth of the tour. Digital touchpoints feel generic and disconnected from the art world."
                color="from-orange-500 to-amber-600"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Design System ─────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-pink-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Design System</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">
              Built for vibrancy and clarity
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Typography */}
            <Reveal delay={0.05}>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Typography</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      SF Pro Display
                    </p>
                    <p className="text-xs text-white/30 mt-1">Headlines & UI Labels</p>
                  </div>
                  <div>
                    <p className="text-base text-white/70" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      SF Pro Text — designed for small sizes, optimized for screen legibility in outdoor conditions.
                    </p>
                    <p className="text-xs text-white/30 mt-1">Body & Descriptions</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Color system */}
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Color System</p>
                <div className="space-y-3">
                  {[
                    { name: 'Navigation', color: '#7C3AED', hex: '#7C3AED', label: 'Purple — wayfinding & maps' },
                    { name: 'Artwork Detail', color: '#E11D48', hex: '#E11D48', label: 'Red — content & info screens' },
                    { name: 'Social', color: '#EC4899', hex: '#EC4899', label: 'Pink — sharing & community' },
                    { name: 'Surface', color: '#1a1a2e', hex: '#1A1A2E', label: 'Dark navy — base surfaces' },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl shrink-0" style={{ background: c.color }} />
                      <div>
                        <p className="text-xs font-medium text-white/70">{c.name}</p>
                        <p className="text-xs text-white/30">{c.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Principles */}
            <Reveal delay={0.15}>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Design Principles</p>
                <div className="space-y-4">
                  {[
                    { title: 'Contextual first', desc: 'Every screen surfaces relevant information based on user location and intent.' },
                    { title: 'Outdoor optimized', desc: 'High contrast ratios (7:1+) and large touch targets for sunlight readability.' },
                    { title: 'Offline capable', desc: 'Core flows work without internet. Maps and artwork data download on first launch.' },
                  ].map((p) => (
                    <div key={p.title}>
                      <p className="text-sm font-semibold text-white">{p.title}</p>
                      <p className="text-xs text-white/40 leading-relaxed mt-0.5">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Screen Previews ───────────────────────────────────────────────── */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-pink-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Key Screens</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">
              The experience
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 py-8">
              <PhoneFrame
                gradient="from-violet-900 to-indigo-900"
                label="Onboarding"
                icon="🗺️"
              />
              <PhoneFrame
                gradient="from-violet-800 via-purple-800 to-indigo-800"
                label="Map View"
                icon="📍"
              />
              <PhoneFrame
                gradient="from-rose-900 via-red-900 to-rose-800"
                label="Artwork Detail"
                icon="🎨"
              />
              <PhoneFrame
                gradient="from-pink-900 via-rose-800 to-pink-800"
                label="Artist Profile"
                icon="👤"
              />
              <PhoneFrame
                gradient="from-amber-900 via-orange-900 to-orange-800"
                label="Route Planner"
                icon="🧭"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 glass rounded-2xl p-6 border border-white/08 max-w-3xl">
              <p className="text-sm text-white/50 leading-relaxed">
                <span className="text-white/80 font-medium">Note:</span> Visual previews above represent the screen categories
                and color-coding system from the design. The full interactive prototype with all 40+ screens is available
                on Behance.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Key Insights ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-pink-500/05 via-transparent to-orange-500/05">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-pink-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Research Insights</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">
              What we discovered
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '78%', label: 'of users wanted offline maps', color: 'text-pink-400' },
              { value: '65%', label: 'found existing navigation confusing', color: 'text-rose-400' },
              { value: '9/10', label: 'wanted artist context while viewing', color: 'text-orange-400' },
              { value: '82%', label: 'would share discoveries in-app', color: 'text-violet-400' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07}>
                <div className="glass rounded-2xl p-6 border border-white/08 text-center">
                  <p className={`font-display font-bold text-4xl ${stat.color} mb-2`}>{stat.value}</p>
                  <p className="text-sm text-white/50 leading-snug">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reflection ────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-pink-400" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">Reflection</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Learnings & outcomes
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  This project reinforced the value of context-first research. Early assumptions about what tourists
                  needed were challenged by the reality of field interviews — offline capability, which we initially
                  considered a secondary feature, emerged as the most critical requirement.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Working within the constraints of a city-scale information architecture also sharpened our
                  understanding of scalable design systems. The color-coded screen categories we developed
                  reduced cognitive load significantly in usability testing, helping users orient themselves
                  within the app as quickly as they would in the physical space.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4">
                {[
                  {
                    icon: '🎯',
                    title: 'Offline-first architecture',
                    desc: 'Re-prioritized feature set after research revealed poor connectivity in historic San José.',
                  },
                  {
                    icon: '🎨',
                    title: 'Color as navigation',
                    desc: 'The screen-type color system became a navigational layer — users knew where they were by hue alone.',
                  },
                  {
                    icon: '🌍',
                    title: 'Multilingual from the start',
                    desc: 'Building bilingual content architecture early prevented costly redesigns during localization.',
                  },
                  {
                    icon: '✅',
                    title: 'Validated in 2 rounds',
                    desc: 'Two rounds of usability testing reduced critical errors by 67% from prototype to final design.',
                  },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-2xl p-5 border border-white/08 flex items-start gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA / Links ───────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/08">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  See the full prototype
                </h2>
                <p className="text-white/50 text-sm">
                  All 40+ screens, components, and the interactive prototype are on Behance.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://www.behance.net/gallery/146062185/Art-City-Tour-Maps-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-semibold"
                >
                  View on Behance
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-white/60 hover:text-white transition-colors border border-white/08"
                >
                  Back to portfolio
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Next project nudge */}
          <Reveal delay={0.1}>
            <div className="mt-16 pt-16 border-t border-white/08">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Next Project</p>
              <Link href="/" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xl">
                  🏦
                </div>
                <div>
                  <p className="font-display font-bold text-white text-lg group-hover:text-emerald-400 transition-colors">
                    CAFSA Digital Products
                  </p>
                  <p className="text-sm text-white/40">Fintech UX · Design System · Web App</p>
                </div>
                <svg
                  className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/08 bg-[#0a0a0a] py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="font-display font-bold text-lg">
            <span style={{
              background: 'linear-gradient(135deg, #a5b4fc, #c4b5fd, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>JP</span>
            <span className="text-white/60 font-light"> Campos</span>
          </span>
          <p className="text-xs text-white/30">
            UX/UI Designer · Costa Rica
          </p>
        </div>
      </footer>
    </div>
  )
}
