'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

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

function PhaseStep({
  number,
  title,
  activities,
  result,
  accent,
}: {
  number: string
  title: string
  activities: string[]
  result: string
  accent: string
}) {
  return (
    <div className="relative flex gap-6 pb-10">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, #7c3aed)` }}>
          {number}
        </div>
        <div className="flex-1 w-px mt-2" style={{ background: `linear-gradient(to bottom, ${accent}50, transparent)` }} />
      </div>
      <div className="flex-1 pb-4">
        <h3 className="font-display font-bold text-white text-lg mb-3">{title}</h3>
        <ul className="space-y-2 mb-4">
          {activities.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/55">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />
              {a}
            </li>
          ))}
        </ul>
        <div className="glass rounded-xl p-4 border border-violet-500/20">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: accent }}>Output</p>
          <p className="text-sm text-white/60 leading-relaxed">{result}</p>
        </div>
      </div>
    </div>
  )
}

export default function ArtCityTourNavCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 60])

  const accent = '#a78bfa'

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-slate-100 overflow-x-hidden">

      {/* Back nav */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </motion.div>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}40, transparent)` }} />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[120px]" style={{ background: `${accent}0c` }} />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px]" style={{ background: '#7c3aed15' }} />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-px" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Case Study</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">2021</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">TEC · Escuela de Diseño Industrial</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            Art City Tour<br />
            <span style={{
              background: `linear-gradient(135deg, ${accent}, #c4b5fd, #ddd6fe)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Navigation App
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-lg mb-8 max-w-2xl"
          >
            Real-time navigation app for Art City Tour — a nocturnal cultural event in San José where visitors
            move between art venues in shuttle buses. Designed for orientation, transport tracking, and friend
            coordination without cognitive overload.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {['Mobile UX', 'Navigation Design', 'SF Design System', 'Accessibility', 'WCAG AA–AAA', 'Paper Prototyping'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs text-white/50 glass border border-white/08">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
          >
            {[
              { value: '15', label: 'Paper Prototype Users' },
              { value: '3', label: 'User Personas' },
              { value: '6', label: 'Apps Analyzed' },
              { value: 'WCAG', label: 'AA – AAA Contrast' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 border border-white/08">
                <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Context */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px" style={{ background: accent }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Context</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  A nocturnal event with no<br />real-time navigation
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Art City Tour is a nocturnal cultural event in San José where visitors move between exhibitions,
                  museums, and artistic spaces on shuttle buses. The experience had a concrete problem:
                  there was no quick access point to information about buses, venues, or real-time routes.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Users got lost, arrived late to events, and didn&apos;t know how far their next stop was.
                  The challenge was to design an app that solved orientation, transport, and social
                  coordination for an audience in motion — at night.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">The Challenge</p>
                  <p className="text-white/70 text-sm leading-relaxed italic">
                    &ldquo;How do you design an app for orientation, transport, and social connection during a dynamic
                    nocturnal event — without cognitively overloading a user who is in constant motion?&rdquo;
                  </p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Event Context</p>
                  <p className="text-white/70 text-sm">Art City Tour — San José, Costa Rica</p>
                  <p className="text-white/40 text-xs mt-1">Nocturnal cultural event · Shuttle buses · Multiple venues</p>
                  <p className="text-white/40 text-xs">Academic Project · TEC Escuela de Diseño Industrial</p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Design System</p>
                  <div className="flex flex-wrap gap-2">
                    {['SF Pro Typography', 'SF Symbols (iOS)', 'Figma', 'Paper Prototyping'].map((tool) => (
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

      {/* Methodology */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Design Process — Three Stages</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-16">
              Research, planning,{' '}
              <span style={{
                background: `linear-gradient(135deg, ${accent}, #c4b5fd)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                and validated UI
              </span>
            </h2>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal delay={0.05}>
              <PhaseStep
                number="01"
                title="Research"
                accent={accent}
                activities={[
                  'Analyzed 6 existing map applications using a complexity system — rating 20 features from 1 to 3',
                  'Defined 3 user personas with representation percentages from survey data',
                  'Traffic analysis via surveys to identify the functions representing 80% of expected usage',
                  'Identified primary use cases: bus stop locator (18%), direction finder (15%), and bus times (17%) as the core need cluster',
                ]}
                result="Clear priority hierarchy: transport and navigation functions represent 80% of expected usage. Low-frequency features (reporting 3%, favorites 3%, capacity 4%) identified for de-prioritized placement."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <PhaseStep
                number="02"
                title="Planning"
                accent={accent}
                activities={[
                  'Card sorting to validate terminology and alpha information architecture',
                  'Navigation paths to measure how many actions each critical user need required',
                  'High-fidelity wireframes designed for all primary flows',
                  'Paper prototyping validation with 15 users — testing navigation, terminology, and icon comprehension',
                  'Filter icon iteration: original icon confused with settings — replaced following iOS/Android conventions',
                ]}
                result="Alpha architecture validated. Critical tasks reduced to maximum 1 action. Paper prototyping identified 2 iconography issues — both resolved before UI design phase."
              />
            </Reveal>

            <Reveal delay={0.15}>
              <PhaseStep
                number="03"
                title="UI Design"
                accent={accent}
                activities={[
                  'Complete design system built on SF Pro typography and SF Symbols (iOS iconography)',
                  'Monochromatic color scheme — one accent per section for instant visual orientation',
                  'Dark background optimized for nighttime use context',
                  'Photography direction: places shown with human activity and urban life — not empty venues',
                  'WCAG accessibility tests — contrast ratios validated between 5.71 AA and 7.39 AAA across all screens',
                ]}
                result="Complete design system with validated accessibility. All primary flows functional, all high-frequency tasks solvable in a single tap. Dark, monochromatic UI optimized for the nocturnal event context."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* User Personas */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>User Personas</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Three personas — validated by survey
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12 leading-relaxed">
              Representation percentages derived from survey data. Design decisions on density, navigation depth,
              and social features were weighted by persona distribution.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'La Pelotera',
                emoji: '🎉',
                pct: '59%',
                desc: 'The majority persona. Came for the social experience — wants to find friends, discover what\'s happening nearby, and move spontaneously between venues.',
                needs: ['Find friends', 'Nearby events', 'Social sharing'],
                color: accent,
              },
              {
                name: 'La Ordenada',
                emoji: '📋',
                pct: '24%',
                desc: 'Plans ahead. Arrives with a schedule, wants to know exact bus times and routes before moving. Frustration tolerance is low.',
                needs: ['Exact bus times', 'Route planning', 'Schedule view'],
                color: '#c4b5fd',
              },
              {
                name: 'El Desubicado',
                emoji: '😅',
                pct: '17%',
                desc: 'Lost from the start. Needs the clearest possible interface — large tap targets, simple language, and immediate wayfinding with no assumptions about prior knowledge.',
                needs: ['Simple navigation', 'Nearest stop', 'Quick orientation'],
                color: '#ddd6fe',
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{p.emoji}</span>
                    <span className="font-display font-bold text-2xl" style={{ color: p.color }}>{p.pct}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-3">{p.name}</h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{p.desc}</p>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-2">Key Needs</p>
                    <div className="flex flex-wrap gap-2">
                      {p.needs.map((n) => (
                        <span key={n} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${p.color}15`, color: p.color }}>
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solution — 3 sections */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Solution</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Three sections, one tap away
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12 leading-relaxed">
              The app is structured around 3 primary sections accessible from a bottom tab bar.
              Every high-frequency task is reachable in a single tap from the home screen.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                section: 'Transport',
                icon: '🚌',
                color: accent,
                desc: 'Real-time location of shuttle buses and stops. The highest-traffic feature — accounts for 35% of expected usage. One tap to see the nearest bus stop.',
                features: ['Live bus positions', 'Stop list with distance', 'Arrival time estimates', 'Route for each bus'],
              },
              {
                section: 'Routes',
                icon: '🗺️',
                color: '#f87171',
                desc: 'Preset and custom routes between venues. Directions from current location. Second-highest traffic cluster at 15% of expected usage.',
                features: ['Preset venue routes', 'Custom route builder', 'Turn-by-turn directions', 'Walking distance + time'],
              },
              {
                section: 'Friends',
                icon: '👥',
                color: '#f9a8d4',
                desc: 'Real-time location and coordination with other attendees. Built for La Pelotera — the majority persona at 59%.',
                features: ['Friend location on map', 'Meetup suggestions', 'Group coordination', 'In-app messaging'],
              },
            ].map((s, i) => (
              <Reveal key={s.section} delay={i * 0.08}>
                <div className="glass rounded-2xl border border-white/08 overflow-hidden h-full">
                  <div className="h-1" style={{ background: `linear-gradient(to right, ${s.color}, ${s.color}80)` }} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{s.icon}</span>
                      <h3 className="font-display font-bold text-white text-lg">{s.section}</h3>
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-white/45">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ background: s.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Design system callout */}
          <Reveal delay={0.15}>
            <div className="glass rounded-2xl p-6 border border-white/08">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Design System</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-semibold text-white mb-2">Typography</p>
                  <p className="text-xs text-white/50 leading-relaxed">SF Pro — Apple&apos;s system font. Chosen for legibility on small screens in low-light conditions, with extensive real-world validation across iOS apps.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-2">Iconography</p>
                  <p className="text-xs text-white/50 leading-relaxed">SF Symbols — leverages established iOS mental models. Users recognize navigation patterns from apps they already use daily, reducing the learning curve.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-3">Color per Section</p>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Transport', color: accent },
                      { label: 'Routes', color: '#f87171' },
                      { label: 'Friends', color: '#f9a8d4' },
                    ].map((c) => (
                      <div key={c.label} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: c.color }} />
                        <span className="text-xs text-white/50">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Accessibility */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Accessibility</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">
              WCAG validated — AA to AAA
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Contrast Ratios</p>
                <div className="space-y-3">
                  {[
                    { label: 'Primary text on dark bg', ratio: '7.39:1', level: 'AAA' },
                    { label: 'Accent elements', ratio: '5.71:1', level: 'AA' },
                    { label: 'Secondary text', ratio: '6.12:1', level: 'AA' },
                    { label: 'Tab bar active state', ratio: '7.05:1', level: 'AAA' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/05 last:border-0">
                      <span className="text-xs text-white/55">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-white/70">{item.ratio}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{
                          background: item.level === 'AAA' ? `${accent}20` : '#34d39920',
                          color: item.level === 'AAA' ? accent : '#34d399',
                        }}>
                          {item.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Why dark UI</p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    The event takes place at night. A dark background reduces screen glare in low-light environments,
                    preserves night vision, and makes colored accents pop clearly — improving wayfinding speed
                    in the specific context where the app is used.
                  </p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Photography direction</p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    All venue photography shows places with human activity and urban life — not empty interiors.
                    Helps users recognize a venue from a distance and sets expectations about the social
                    experience waiting for them.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we didn't choose */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px" style={{ background: accent }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Design Decisions</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  What we didn&apos;t choose
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Traffic analysis revealed that reporting (3%), adding favorites (3%), and viewing venue capacity (4%)
                  represented only 20% of expected usage. Desirable features — but not primary interface priority.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Giving them primary navigation visibility would have cluttered the interface for a user who
                  is in motion and needs immediate orientation. These features were included — but de-prioritized
                  to secondary actions within their relevant sections.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-rose-500/20">
                  <p className="text-xs font-semibold text-rose-400 tracking-widest uppercase mb-3">Discarded — Primary prominence</p>
                  <div className="space-y-2">
                    {[
                      { feature: 'Report', usage: '3%' },
                      { feature: 'Add to Favorites', usage: '3%' },
                      { feature: 'View Capacity', usage: '4%' },
                    ].map((f) => (
                      <div key={f.feature} className="flex items-center justify-between py-1.5 border-b border-white/05 last:border-0">
                        <span className="text-sm text-white/60">{f.feature}</span>
                        <span className="text-xs font-semibold text-rose-400/70">{f.usage} usage</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 border border-emerald-500/20">
                  <p className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-3">Chosen — Primary prominence</p>
                  <div className="space-y-2">
                    {[
                      { feature: 'Bus stop locator', usage: '18%' },
                      { feature: 'Bus time display', usage: '17%' },
                      { feature: 'Directions to venue', usage: '15%' },
                    ].map((f) => (
                      <div key={f.feature} className="flex items-center justify-between py-1.5 border-b border-white/05 last:border-0">
                        <span className="text-sm text-white/60">{f.feature}</span>
                        <span className="text-xs font-semibold text-emerald-400">{f.usage} usage</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-xl p-4 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-2">Icon change after paper prototype</p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    The original filter icon was consistently confused with settings by paper prototype testers.
                    Changed to a convention already established in iOS and Android — backed by user evidence, not preference.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Impact</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">Results</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                value: '0',
                label: 'Task Failures (High-Frequency)',
                desc: 'Finding the nearest bus stop, getting directions, and checking bus times — zero failures across all paper prototype sessions.',
                color: '#34d399',
              },
              {
                value: '1',
                label: 'Tap — Critical Tasks',
                desc: 'Bus stop location and preset route viewing both accessible with a single tap from the app\'s home state.',
                color: accent,
              },
              {
                value: 'AA+',
                label: 'Accessibility Level',
                desc: 'All tested contrast pairs meet WCAG AA minimum. Primary text achieves AAA (7.39:1). Designed for low-light legibility.',
                color: '#c4b5fd',
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="font-display font-bold text-4xl mb-2" style={{ color: item.color }}>{item.value}</p>
                  <p className="font-semibold text-white text-sm mb-2">{item.label}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/08">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  See the full project
                </h2>
                <p className="text-white/50 text-sm">Interactive prototypes and design system live on Figma · Screens on Behance.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://www.figma.com/proto/uX1w83Lh1a3ssd1ozOlfRl/Mobile-App?node-id=176-639&p=f&t=UxjIlFdFkWiuCnqL-1&scaling=scale-down&content-scaling=fixed&page-id=2%3A4&starting-point-node-id=164%3A1450"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: `linear-gradient(135deg, ${accent}, #7c3aed)` }}
                >
                  View Prototype
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.figma.com/proto/zusgQ4eURnNd6pO2uDUT83/Design-System-Final--Copy-?node-id=383-29509&p=f&t=krXKfOFeMBmPAFEA-1&scaling=scale-down&content-scaling=fixed&page-id=81%3A723&starting-point-node-id=383%3A29509"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-semibold text-white/80 hover:text-white border transition-colors"
                  style={{ borderColor: `${accent}40` }}
                >
                  View Design System
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.behance.net/josecamposdesigner"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-white/60 hover:text-white transition-colors border border-white/08"
                >
                  View on Behance
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-white/60 hover:text-white transition-colors border border-white/08">
                  Back to portfolio
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 pt-16 border-t border-white/08">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Related Project</p>
              <Link href="/projects/sjo-turismo" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}>
                  🏛️
                </div>
                <div>
                  <p className="font-display font-bold text-white text-lg group-hover:text-pink-400 transition-colors">SJO Turismo App — Redesign</p>
                  <p className="text-sm text-white/40">Same city, different challenge: redesigning the Centro Histórico tourism app</p>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

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
          <p className="text-xs text-white/30">UX/UI Designer · Costa Rica</p>
        </div>
      </footer>
    </div>
  )
}
