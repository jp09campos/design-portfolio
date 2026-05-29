'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, #0d9488)` }}
        >
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
        <div className="glass rounded-xl p-4 border border-teal-500/20">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: accent }}>Output</p>
          <p className="text-sm text-white/60 leading-relaxed">{result}</p>
        </div>
      </div>
    </div>
  )
}

export default function FulzerCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 60])

  const accent = '#2dd4bf'

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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[120px]" style={{ background: `${accent}0d` }} />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px]" style={{ background: '#0d948818' }} />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-[1fr_420px] gap-10 items-end">
          <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-px" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Case Study</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">2021</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">Graduation Project · TEC</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            Fulzer<br />
            <span style={{
              background: `linear-gradient(135deg, ${accent}, #6ee7b7, #a7f3d0)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Food Truck Design
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-lg mb-8 max-w-2xl"
          >
            Graduation project in Industrial Design Engineering — an adaptive stainless steel
            furniture system for food trucks in Costa Rica, co-developed with Fulzer to solve
            ergonomic, spatial, and operational challenges in mobile kitchens.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {['Industrial Design', 'Ergonomics (RULA)', 'Modular System', 'User Research', 'Journey Mapping', 'Fulzer · CR'].map((tag) => (
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
              { value: '7', label: 'Food Trucks Studied' },
              { value: '49 cm', label: 'Narrowest Aisle Found' },
              { value: '~100 cm', label: 'Post-Design Aisle Width' },
              { value: 'RULA', label: 'Ergonomic Method' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 border border-white/08">
                <p className="font-display font-bold text-2xl text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="hidden md:block self-end pb-4"
          >
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              <Image src="/fulzer-media-files/graphic-1.png" alt="Fulzer food truck design" width={1200} height={900} className="w-full h-auto" />
            </div>
          </motion.div>
          </div>
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
                  A fast-growing industry<br />with improvised workspaces
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  The accelerated growth of food trucks in Costa Rica had increased operational demand —
                  but most were still using improvised, non-ergonomic furniture. Workers completed
                  shifts of up to 14 hours in mobile kitchens never designed for human workflow.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">The Challenge</p>
                  <p className="text-white/70 text-sm leading-relaxed italic">
                    &ldquo;How do you design adaptive furniture that works across different food truck types —
                    considering ergonomic constraints, minimal dimensions, sanitary requirements,
                    and real manufacturing restrictions?&rdquo;
                  </p>
                </div>
                <div className="rounded-3xl overflow-hidden border border-white/08 shadow-[0_24px_48px_rgba(0,0,0,0.4)]">
                  <Image src="/fulzer-media-files/graphic-2.png" alt="Fulzer RULA ergonomic analysis" width={1200} height={900} className="w-full h-auto" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Problem Space</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Six simultaneous problems
            </h2>
            <p className="text-white/60 leading-relaxed max-w-2xl mb-12">
              The project had to resolve multiple compounding problems at once — not sequentially.
              Every design decision had to satisfy spatial, ergonomic, sanitary, and manufacturing
              constraints simultaneously.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: '📐',
                title: 'Critically Narrow Aisles',
                desc: 'Some food trucks operated with internal aisles of just 49 cm — generating constant workflow interruptions when two workers had to pass each other.',
                stat: '49 cm',
              },
              {
                icon: '⚠️',
                title: 'Postural Risk (RULA Max)',
                desc: 'RULA ergonomic evaluation detected maximum postural risk levels caused by frying and elevated equipment placed on standard-height surfaces.',
                stat: 'RULA Level 7',
              },
              {
                icon: '🔄',
                title: 'Constant Worker Collisions',
                desc: 'Improvised furniture layouts created recurring physical collisions between workers during service — slowing throughput and creating safety risks.',
                stat: 'Daily friction',
              },
              {
                icon: '📏',
                title: 'Incorrect Surface Heights',
                desc: 'Standard table heights didn\'t account for the actual cooking equipment placed on them — fryers, griddles, and combi ovens raised effective working height significantly.',
                stat: 'Wrong ergonomics',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="glass rounded-2xl p-5 border border-white/08 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${accent}18`, color: accent }}>
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-8 rounded-3xl overflow-hidden border border-white/08">
              <Image src="/fulzer-media-files/graphic-3.png" alt="Fulzer 3D render" width={1200} height={900} className="w-full h-auto" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Research & Methodology</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-16">
              User-centered process —{' '}
              <span style={{
                background: `linear-gradient(135deg, ${accent}, #6ee7b7)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                applied to physical product
              </span>
            </h2>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal delay={0.05}>
              <PhaseStep
                number="01"
                title="Understand"
                accent={accent}
                activities={[
                  'Interviews with workers and owners of 7 different food trucks across Costa Rica',
                  'Mapped workflow patterns, operational problems, and food types per truck',
                  'Key finding: the primary problem was internal space constraint, not aesthetic or storage',
                ]}
                result="Clear hierarchy of user needs — circulation space and postural safety ranked highest across all 7 operators. Long shifts (up to 14h) made ergonomic improvements a health priority, not a preference."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <PhaseStep
                number="02"
                title="Explore"
                accent={accent}
                activities={[
                  'Personas and journey maps built from interview data',
                  'Anthropometric analysis: percentile-based reach zones and functional reach',
                  'Analysis of Fulzer\'s manufacturing processes and material constraints (SS304)',
                ]}
                result="Journey map revealed 4 high-friction moments during peak service. Anthropometric data established height ranges for adjustable surfaces across the worker population."
              />
            </Reveal>

            <Reveal delay={0.15}>
              <PhaseStep
                number="03"
                title="RULA Ergonomic Analysis"
                accent={accent}
                activities={[
                  'Applied RULA (Rapid Upper Limb Assessment) method to analyze postural risk',
                  'Results: Level 7 — maximum risk category, requiring urgent workstation redesign',
                  'Calculated required adjustment range based on 5th–95th percentile worker population',
                ]}
                result="RULA Level 7 (maximum risk) confirmed the urgency of the redesign. Defined a required height adjustment range of ±12 cm from the standard surface to eliminate postural hazards."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <PhaseStep
                number="04"
                title="Create"
                accent={accent}
                activities={[
                  'Selected concept: "Adaptive Minimalism" — modular, adjustable, visually clean',
                  'CAD development of the modular stainless steel 304 furniture system',
                  'Surface, joint, and adjustment mechanism design validated against SS304 fabrication',
                ]}
                result="Final design: adjustable-height modular furniture system using concentric tubes and set screws. Minimal surfaces for easy cleaning. Sliding doors to optimize space. Compatible with Fulzer's existing manufacturing lines."
              />
            </Reveal>

            <Reveal delay={0.25}>
              <PhaseStep
                number="05"
                title="Validate"
                accent={accent}
                activities={[
                  'Spatial simulation: new layout tested against circulation minimums',
                  'Ergonomic re-evaluation of redesigned workstation configurations',
                  'Final documentation: technical drawings, manufacturing specs, and design system',
                ]}
                result="Validated solution: aisles expanded from 49 cm to ~100 cm. Postural risk eliminated in tested configurations. Manufacturing viability confirmed by Fulzer's engineering team."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Solution</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Adaptive Minimalism
            </h2>
            <p className="text-white/60 leading-relaxed max-w-2xl mb-12">
              The design concept: functional, compact, and visually clean solutions that respond to multiple
              operational contexts. A modular stainless steel 304 system with adjustable height and
              dimensions optimized for mobile kitchen workflow.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: 'Adjustable Height System',
                desc: 'Concentric tube mechanism with set screws allows surface height adjustment across the required ±12 cm range — covering the full 5th–95th percentile worker population without tools.',
                icon: '↕️',
              },
              {
                title: 'Minimal, Sanitary Surfaces',
                desc: 'Stainless steel 304 with smooth joints and no hidden corners — meeting food safety and sanitation requirements while simplifying daily cleaning for kitchen staff.',
                icon: '✨',
              },
              {
                title: 'Sliding Doors',
                desc: 'Cabinet doors slide rather than swing — eliminating the space penalty of traditional hinged doors in spaces where every centimeter counts.',
                icon: '↔️',
              },
              {
                title: 'Equipment Compatibility',
                desc: 'Designed to accommodate different cooking equipment footprints — fryers, griddles, combi ovens, and coffee stations — without requiring custom configurations per truck.',
                icon: '🍳',
              },
              {
                title: 'Modular Assembly',
                desc: 'Components connect and reconfigure between different truck layouts and food types — a single system serving burger trucks, taco carts, and pastry kitchens.',
                icon: '🧩',
              },
              {
                title: 'Fulzer Manufacturing Alignment',
                desc: 'All structural decisions validated against Fulzer\'s production processes — enabling direct commercialization without retooling or custom fabrication per unit.',
                icon: '🏭',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="glass rounded-2xl p-5 border border-white/08 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${accent}15` }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1.5">{item.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="rounded-3xl overflow-hidden border border-white/08">
                <Image src="/fulzer-media-files/graphic-4.png" alt="Fulzer technical drawing" width={1200} height={900} className="w-full h-auto" />
              </div>
              <div className="rounded-3xl overflow-hidden border border-white/08">
                <Image src="/fulzer-media-files/mockup-4.png" alt="Fulzer furniture prototype" width={1200} height={900} className="w-full h-auto" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Design Decisions */}
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

                <div className="space-y-6">
                  <div>
                    <p className="font-semibold text-white mb-2">Enlarging the truck itself</p>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Expanding the physical dimensions of the food truck was structurally and economically
                      unfeasible. Instead, we optimized the furniture and spatial organization within
                      the existing footprint — the only viable path to improvement.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">High mechanical complexity</p>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Complex adjustable mechanisms (gas springs, linear actuators, motorized lifts) were
                      evaluated and rejected. The solution needed to be simple to maintain, cheap to produce,
                      and usable without training — a concentric tube with a set screw met all three criteria.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2">Visual differentiation over function</p>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Purely aesthetic concepts were discarded. &ldquo;Form follows function&rdquo; was applied literally —
                      every visual decision was backed by a functional requirement. Clean lines emerged
                      from sanitary constraints, not from stylistic preference.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Design Concept</p>
                  <p className="font-display font-bold text-white text-2xl mb-2">Adaptive Minimalism</p>
                  <p className="text-sm text-white/55 leading-relaxed">
                    Functional, compact, and visually clean — designed to respond to multiple operational
                    contexts without modification. Simplicity is not a stylistic choice; it&apos;s a
                    technical and sanitary requirement.
                  </p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Guiding Principles</p>
                  <div className="space-y-3">
                    {[
                      { principle: 'Easy to manufacture', desc: 'Standard SS304 processes, no custom tooling' },
                      { principle: 'Easy to maintain', desc: 'No hidden joints, accessible cleaning surfaces' },
                      { principle: 'Scalable production', desc: 'Compatible with Fulzer\'s existing lines' },
                      { principle: 'Realistic cost', desc: 'Priced for commercial food truck market' },
                    ].map((p) => (
                      <div key={p.principle} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />
                        <div>
                          <span className="text-sm font-semibold text-white">{p.principle}</span>
                          <span className="text-xs text-white/40 ml-2">{p.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
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
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Impact & Results</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">Results</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Reveal>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: accent }}>Spatial</p>
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-center">
                    <p className="font-display font-bold text-3xl text-rose-400">49 cm</p>
                    <p className="text-xs text-white/40 mt-1">Before (min. aisle)</p>
                  </div>
                  <svg className="w-6 h-6 text-white/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="text-center">
                    <p className="font-display font-bold text-3xl" style={{ color: accent }}>~100 cm</p>
                    <p className="text-xs text-white/40 mt-1">After (target aisle)</p>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Nearly doubled usable circulation space — eliminating constant worker collisions
                  and restoring operational flow during peak service.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: accent }}>Ergonomic</p>
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-center">
                    <p className="font-display font-bold text-3xl text-rose-400">7</p>
                    <p className="text-xs text-white/40 mt-1">RULA level (before)</p>
                  </div>
                  <svg className="w-6 h-6 text-white/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="text-center">
                    <p className="font-display font-bold text-3xl" style={{ color: accent }}>✓</p>
                    <p className="text-xs text-white/40 mt-1">Risk eliminated</p>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Postural risk postures eliminated in all tested task configurations through
                  the adjustable height system.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { value: '↑', label: 'Worker ergonomics', color: accent },
                { value: '↓', label: 'Postural risk postures', color: '#34d399' },
                { value: '✓', label: 'Manufacturing validated', color: accent },
                { value: '✓', label: 'Multi-truck compatible', color: '#34d399' },
              ].map((item, i) => (
                <div key={item.label} className="glass rounded-2xl p-4 border border-white/08 text-center">
                  <p className="font-display font-bold text-3xl mb-1" style={{ color: item.color }}>{item.value}</p>
                  <p className="text-xs text-white/50">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {['mockup-1.jpg','mockup-2.jpg','mockup-3.jpg'].map((f, i) => (
                <div key={f} className="rounded-2xl overflow-hidden border border-white/08">
                  <Image src={`/fulzer-media-files/${f}`} alt={`Fulzer product ${i+1}`} width={1200} height={900} className="w-full h-auto" />
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {['mockup-5.jpg'].map((f, i) => (
                <div key={f} className="rounded-2xl overflow-hidden border border-white/08">
                  <Image src={`/fulzer-media-files/${f}`} alt={`Fulzer product ${i+4}`} width={1200} height={900} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </Reveal>
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
                <p className="text-white/50 text-sm">
                  Technical drawings, 3D renders, and full research documentation available upon request.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: `linear-gradient(135deg, ${accent}, #0d9488)` }}
                >
                  Get in touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-white/60 hover:text-white transition-colors border border-white/08">
                  Back to portfolio
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 pt-16 border-t border-white/08">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Next Project</p>
              <Link href="/projects/art-city-tour-nav" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                  🌙
                </div>
                <div>
                  <p className="font-display font-bold text-white text-lg group-hover:text-violet-400 transition-colors">
                    Art City Tour — Navigation App
                  </p>
                  <p className="text-sm text-white/40">Mobile UX · Navigation Design · Tourism</p>
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
