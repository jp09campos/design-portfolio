'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/* ─── Animation helpers ───────────────────────────────────────────────────── */
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
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Phone frame mockup ──────────────────────────────────────────────────── */
function PhoneFrame({
  label,
  accentColor,
  children,
}: {
  label: string
  accentColor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-28 h-52 md:w-32 md:h-60 rounded-3xl overflow-hidden shadow-2xl border border-white/12 relative"
        style={{ background: '#1a1f2e' }}
      >
        {/* Status bar */}
        <div
          className="h-5 flex items-center justify-between px-3 text-white shrink-0"
          style={{ background: accentColor }}
        >
          <span className="text-[8px] font-semibold opacity-90">12:30</span>
          <div className="flex gap-1 items-center">
            {[5, 7, 9, 11].map((h) => (
              <div key={h} className="w-0.5 rounded-sm bg-white/80" style={{ height: h }} />
            ))}
          </div>
        </div>
        {/* Screen content */}
        <div className="flex-1 h-full flex flex-col px-2 pt-3 gap-2">
          {children}
        </div>
        {/* Nav bar */}
        <div className="absolute bottom-0 inset-x-0 h-8 border-t border-white/08 flex items-center justify-around px-2"
          style={{ background: '#1a1f2e' }}>
          {['⌂', '⊞', '◎', 'Y', '⚙'].map((icon, i) => (
            <span key={i} className="text-[10px]" style={{ color: i === 0 ? accentColor : '#ffffff40' }}>
              {icon}
            </span>
          ))}
        </div>
      </div>
      <span className="text-xs text-white/40 font-medium tracking-wide text-center">{label}</span>
    </div>
  )
}

/* ─── Process step ────────────────────────────────────────────────────────── */
function PhaseStep({
  number,
  title,
  activities,
  result,
}: {
  number: string
  title: string
  activities: string[]
  result: string
}) {
  return (
    <div className="relative flex gap-6 pb-10">
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #38bdf8, #1e3a5f)' }}
        >
          {number}
        </div>
        <div className="flex-1 w-px mt-2" style={{ background: 'linear-gradient(to bottom, #38bdf870, transparent)' }} />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-bold text-white text-lg mb-3">{title}</h3>
        <ul className="space-y-2 mb-4">
          {activities.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/55">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#38bdf8' }} />
              {a}
            </li>
          ))}
        </ul>
        <div className="glass rounded-xl p-4 border border-sky-500/20">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#38bdf8' }}>
            Result
          </p>
          <p className="text-sm text-white/60 leading-relaxed">{result}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Stat bar ────────────────────────────────────────────────────────────── */
function StatBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-white/50 w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/08 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(to right, #38bdf8, #1d4ed8)' }}
        />
      </div>
      <span className="text-xs font-semibold text-white/70 w-12 text-right">{pct}%</span>
    </div>
  )
}

/* ─── Comparison row ──────────────────────────────────────────────────────── */
function CompareRow({
  task,
  apkTime,
  protoTime,
  improvement,
}: {
  task: string
  apkTime: string
  protoTime: string
  improvement: string
}) {
  return (
    <div className="grid grid-cols-4 gap-4 py-4 border-b border-white/06 text-sm">
      <span className="text-white/60 col-span-1">{task}</span>
      <span className="text-rose-400 font-medium">{apkTime}</span>
      <span className="text-emerald-400 font-medium">{protoTime}</span>
      <span className="text-sky-400 font-semibold">{improvement}</span>
    </div>
  )
}

/* ─── Main page ───────────────────────────────────────────────────────────── */
export default function ArtCityTourCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 60])

  /* accent = celeste/sky blue — from the project's brand book */
  const accent = '#38bdf8'
  const accentDark = '#1e3a5f'

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-slate-100 overflow-x-hidden">

      {/* ── Back nav ──────────────────────────────────────────────────────── */}
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

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-20 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}40, transparent)` }} />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[120px]"
            style={{ background: `${accent}12` }} />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px]"
            style={{ background: `${accentDark}18` }} />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative max-w-7xl mx-auto px-6 w-full">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-px" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Case Study</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">
              I–II Sem 2021
            </span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">
              TEC · Escuela de Diseño Industrial
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            Aplicación<br />
            <span style={{
              background: `linear-gradient(135deg, ${accent}, #60a5fa, #93c5fd)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Centro Histórico
            </span>
          </motion.h1>

          {/* Sub-title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-lg mb-8 max-w-2xl"
          >
            Mobile UX redesign for the historic center tourism app of San José, Costa Rica —
            a collaboration between the Instituto Tecnológico de Costa Rica and the Municipalidad de San José.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {['Mobile UX', 'UX Research', 'Atomic Design', 'Material Design', 'San José · CR', 'Academic Project'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs text-white/50 glass border border-white/08">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
          >
            {[
              { value: '3', label: 'Design Stages' },
              { value: '120', label: 'Survey Responses' },
              { value: '10', label: 'Usability Testers' },
              { value: '2', label: 'Semesters' },
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
                  <span className="w-6 h-px" style={{ background: accent }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Context</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Redesigning the city's cultural compass
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  The Municipalidad de San José had developed an existing APK (Android application package)
                  to help visitors navigate the historic center of San José, Costa Rica — home to museums,
                  theaters, parks, heritage sites, public art, and cultural events.
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  However, usability testing of the existing app revealed significant problems across three
                  areas: design patterns, interaction flow, and overall user experience. Tasks that should
                  take seconds were taking users several minutes.
                </p>
                <p className="text-white/60 leading-relaxed">
                  As part of a special assistantship at TEC's Escuela de Diseño Industrial, our team was
                  commissioned to conduct a full UX redesign — from research and feature definition,
                  through design and validation, to handoff for development.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Team</p>
                  <div className="space-y-2">
                    {[
                      { name: 'José Pablo Campos', role: 'UX/UI Designer' },
                      { name: 'Felipe Víctor Benavides', role: 'UX/UI Designer' },
                      { name: 'Maria del Carmen Valverde Solano', role: 'Professor Advisor' },
                    ].map((m) => (
                      <div key={m.name} className="flex items-center justify-between">
                        <p className="text-white/70 text-sm">{m.name}</p>
                        <p className="text-xs text-white/30">{m.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Institution</p>
                  <p className="text-white/70 text-sm">Instituto Tecnológico de Costa Rica (TEC)</p>
                  <p className="text-white/40 text-xs mt-1">Escuela de Diseño Industrial</p>
                  <p className="text-white/40 text-xs">Special Assistantship — I & II Semester 2021</p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Client</p>
                  <p className="text-white/70 text-sm">Municipalidad de San José</p>
                  <p className="text-white/40 text-xs mt-1">Centro Histórico de San José, Costa Rica</p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Google Forms', 'Material Design', 'Atomic Design', 'SCRUM'].map((tool) => (
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

      {/* ── Design Stages ─────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
                I Semester 2021 — Design Process
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-16">
              Three stages,{' '}
              <span style={{
                background: `linear-gradient(135deg, ${accent}, #60a5fa)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>one validated design</span>
            </h2>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal delay={0.1}>
              <PhaseStep
                number="01"
                title="Diagnosis APK"
                activities={[
                  'Google Forms survey to understand what functionalities users wanted in a San José tourism app',
                  'Validated feature importance levels from the existing APK',
                  'Added "Agregar a Favoritos" (Add to Favorites) based on user requests',
                  'Removed "Tour Operators" feature — low demand',
                  'Digital prototyping usability tests with 10 participants (ages 16–60, beginner to expert)',
                  'Identified problems in 3 areas: Design Patterns, Interaction Flow, and User Experience',
                  'Feature definition workshops with the municipality team',
                  'Defined legal scope (e.g. restrictions on including private venues like hotels/restaurants)',
                ]}
                result="Arquitectura Alfa — all validated content organized into logical groupings based on user-assigned associations, covering 5 main sections: Descubrir, Actividades, Rutas, Movilidad, and Ajustes."
              />
            </Reveal>

            <Reveal delay={0.15}>
              <PhaseStep
                number="02"
                title="Pattern Hunting & Proposal"
                activities={[
                  'Competitive analysis of existing urban tourism apps to identify dominant design patterns',
                  'Documented color usage, image presentation, and location display conventions',
                  'Produced an information architecture with assigned design patterns per section',
                  'Applied Atomic Design methodology: Atoms → Molecules → Organisms → Templates → Pages',
                  'Material Design navigation bar with 5 primary tabs: Descubrir, Actividades, Movilidad, Rutas, Ajustes',
                  'Color system based on the Centro Histórico brand book — celeste (sky blue) as primary interactive color',
                  'Iconography from Material Design + custom icons for domain-specific categories',
                  'Designed high-fidelity screens for all 5 sections; implemented interactive digital prototype',
                ]}
                result="A fully designed, interactive prototype ready for usability validation — using Material Design patterns for consistency, with celeste as the primary accent color applied to all interactive elements."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <PhaseStep
                number="03"
                title="Usability Testing & Validation"
                activities={[
                  'Ran heuristic usability tests with selected participants (including repeat testers from Stage 01)',
                  'Compared task completion times: original APK vs. new prototype',
                  'Survey with 120 responses to rank and prioritize content categories by user interest',
                  'Icon validation survey with 93 participants for the "Rutas" navigation icon',
                  'Category hierarchy reordered based on user-assigned relevance scores',
                  'Delivered Figma Design System and prototype to the development team on June 24',
                ]}
                result="Significant reduction in task completion times across all measured tasks. Users reported greater satisfaction. The design system and prototype were handed off to the computing team for implementation using the SCRUM methodology."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Color system ──────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Design System</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">
              Atomic Design + Material Design
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Methodology */}
            <Reveal delay={0.05}>
              <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Methodology</p>
                <p className="text-sm font-bold text-white mb-3">Atomic Design</p>
                <p className="text-sm text-white/55 leading-relaxed mb-5">
                  Components were designed from the smallest unit upward: atoms (colors, type, icons) combined
                  into molecules (buttons, cards, nav bars), assembled into organisms, placed in templates,
                  and delivered as complete pages.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="px-2 py-1 rounded glass border border-white/08">Atoms</span>
                  <span>→</span>
                  <span className="px-2 py-1 rounded glass border border-white/08">Molecules</span>
                  <span>→</span>
                  <span className="px-2 py-1 rounded glass border border-white/08">Organisms</span>
                </div>
              </div>
            </Reveal>

            {/* Color system */}
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Color System</p>
                <p className="text-xs text-white/40 leading-relaxed mb-4">
                  Based on the Centro Histórico brand book + Material Design color proportions.
                  Celeste is applied exclusively to interactive elements.
                </p>
                <div className="space-y-3">
                  {[
                    { name: 'Primary (Celeste)', color: '#38bdf8', note: 'Interactive elements, active states' },
                    { name: 'Secondary (Navy)', color: '#1e3a5f', note: 'Headers, navigation bar' },
                    { name: 'Text Gray', color: '#444444', note: 'General body text' },
                    { name: 'Inactive Gray', color: '#888888', note: 'Leading icons, input borders' },
                    { name: 'App Background', color: '#f5f5f5', note: 'Main surface — light, minimal' },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl shrink-0 border border-white/08" style={{ background: c.color }} />
                      <div>
                        <p className="text-xs font-medium text-white/70">{c.name}</p>
                        <p className="text-xs text-white/30">{c.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Navigation */}
            <Reveal delay={0.15}>
              <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
                  Navigation Structure
                </p>
                <p className="text-xs text-white/40 mb-5 leading-relaxed">
                  Material Design navigation bar with 5 primary tabs. Content categories
                  ordered by user relevance scores from 120-person survey.
                </p>
                <div className="space-y-2">
                  {[
                    { section: 'Descubrir', desc: 'Parks, boulevards, museums, galleries, heritage, art', icon: '⌂' },
                    { section: 'Actividades', desc: 'GAM Cultural calendar', icon: '⊞' },
                    { section: 'Rutas', desc: 'SJO routes, custom routes, nearby', icon: 'Y' },
                    { section: 'Movilidad', desc: 'Bike rental, train stops', icon: '◎' },
                    { section: 'Ajustes', desc: 'Profile, favorites, settings, help', icon: '⚙' },
                  ].map((item) => (
                    <div key={item.section} className="flex items-start gap-3">
                      <span className="text-xs w-5 mt-0.5" style={{ color: accent }}>{item.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-white/80">{item.section}</p>
                        <p className="text-xs text-white/35">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Phone mockups */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-8">
              <PhoneFrame label="Home — Descubrir" accentColor="#38bdf8">
                <div className="space-y-1.5">
                  <div className="h-4 rounded" style={{ background: '#38bdf820', width: '60%' }} />
                  <div className="flex gap-2 overflow-hidden">
                    {['PARQUES', 'BULEVARES', 'PATRIMONIO'].map((t) => (
                      <span key={t} className="text-[6px] font-bold whitespace-nowrap px-1.5 py-0.5 rounded"
                        style={{ color: t === 'PARQUES' ? '#38bdf8' : '#ffffff40', borderBottom: t === 'PARQUES' ? '1px solid #38bdf8' : 'none' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[8px] text-white/50 font-semibold">Cerca de mí</p>
                <div className="grid grid-cols-2 gap-1 flex-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg bg-white/06 aspect-square" />
                  ))}
                </div>
                <p className="text-[8px] text-white/50 font-semibold mt-1">Recomendados</p>
              </PhoneFrame>

              <PhoneFrame label="Place Detail" accentColor="#38bdf8">
                <div className="w-full h-16 rounded-xl bg-white/08" />
                <div className="space-y-1.5 mt-1">
                  <div className="h-3 rounded bg-white/15 w-4/5" />
                  <div className="h-2 rounded bg-white/08 w-3/5" />
                  <div className="border-t border-white/06 pt-1.5 space-y-1">
                    {[
                      { icon: '📍', text: 'Calle Central, Avenida 1-3' },
                      { icon: '🕐', text: 'M–V 8:00–16:30' },
                      { icon: '📞', text: '+506 2007-7475' },
                    ].map((row) => (
                      <div key={row.text} className="flex items-center gap-1.5">
                        <span className="text-[8px]">{row.icon}</span>
                        <span className="text-[7px] text-white/40">{row.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </PhoneFrame>

              <PhoneFrame label="Rutas (Routes)" accentColor="#1e3a5f">
                <div className="space-y-1.5 flex-1">
                  <p className="text-[8px] text-white/50 font-semibold">Rutas SJO</p>
                  {['Ruta Museos', 'Ruta Patrimonio', 'Ruta Arte Público'].map((r) => (
                    <div key={r} className="flex items-center justify-between p-2 rounded-xl bg-white/06 border border-white/06">
                      <span className="text-[7px] text-white/60">{r}</span>
                      <span className="text-[7px]" style={{ color: '#38bdf8' }}>↓</span>
                    </div>
                  ))}
                  <p className="text-[8px] text-white/50 font-semibold mt-2">Cerca de mí</p>
                  <div className="h-12 rounded-xl bg-white/06" />
                </div>
              </PhoneFrame>

              <PhoneFrame label="Favoritos" accentColor="#38bdf8">
                <p className="text-[8px] text-white/50 font-semibold">Mis Favoritos</p>
                <div className="space-y-1.5 flex-1">
                  {['Museo Nacional', 'Teatro Nacional', 'Iglesia El Carmen'].map((item) => (
                    <div key={item} className="flex items-center gap-2 p-2 rounded-xl bg-white/06">
                      <div className="w-6 h-6 rounded-lg bg-white/10 shrink-0" />
                      <span className="text-[7px] text-white/60">{item}</span>
                      <span className="ml-auto text-[8px]" style={{ color: '#38bdf8' }}>♥</span>
                    </div>
                  ))}
                </div>
              </PhoneFrame>

              <PhoneFrame label="Ajustes" accentColor="#1e3a5f">
                <div className="flex flex-col items-center py-2 gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="h-2 rounded bg-white/20 w-16" />
                  <div className="h-1.5 rounded bg-white/10 w-12" />
                </div>
                <div className="space-y-1 flex-1">
                  {['Idioma', 'Notificaciones', 'Contacto', 'Ayuda', 'Términos'].map((item) => (
                    <div key={item} className="flex items-center justify-between px-2 py-1 rounded-lg bg-white/04">
                      <span className="text-[7px] text-white/50">{item}</span>
                      <span className="text-[8px] text-white/20">›</span>
                    </div>
                  ))}
                </div>
              </PhoneFrame>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Usability Results ─────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
                Usability Results
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              APK vs. Prototype — task performance
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-10">
              Participants who tested the original APK were retested on the new prototype.
              All measured tasks showed meaningful time reductions.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl border border-white/08 overflow-hidden mb-8">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-white/06 text-xs font-semibold tracking-widest uppercase">
                <span className="text-white/30">Task</span>
                <span className="text-rose-400">APK avg time</span>
                <span className="text-emerald-400">Prototype avg</span>
                <span style={{ color: accent }}>Improvement</span>
              </div>
              <div className="px-6">
                <CompareRow
                  task="Find Museo Nacional info"
                  apkTime="24 sec"
                  protoTime="13 sec"
                  improvement="−46%"
                />
                <CompareRow
                  task="Find Teatro El Triciclo"
                  apkTime="55 sec"
                  protoTime="51 sec"
                  improvement="−7%"
                />
                <CompareRow
                  task="Visit Favorites tab"
                  apkTime="N/A"
                  protoTime="7 sec"
                  improvement="New feature"
                />
                <CompareRow
                  task="Download Museos route"
                  apkTime="2 min 44 sec"
                  protoTime="1 min 9 sec"
                  improvement="−58%"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-2">Worst APK case</p>
                <p className="font-display font-bold text-3xl text-rose-400 mb-1">6 min 25 sec</p>
                <p className="text-sm text-white/50 leading-relaxed">
                  Finding Museo Nacional info when the user accidentally navigated to the map first,
                  unable to locate the information there.
                </p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-2">Key finding</p>
                <p className="text-sm text-white/60 leading-relaxed">
                  Residual timing issues in the prototype were attributed to <span className="text-white/80">prototype load times and desktop testing conditions</span>,
                  not to the interface itself — confirming the design decisions were sound.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Category prioritization ───────────────────────────────────────── */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px" style={{ background: accent }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
                    Validation — 120 responses
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  Content category ranking
                </h2>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">
                  A 120-person survey asked users to rate each content category 1–5.
                  Results were used to reorder the navigation hierarchy within the "Descubrir" section.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-3">
                  {[
                    { label: 'Museos', pct: 85.8 },
                    { label: 'Teatros', pct: 83.5 },
                    { label: 'Patrimonios', pct: 78.3 },
                    { label: 'Galerías', pct: 78.2 },
                    { label: 'Arte Público', pct: 77.7 },
                    { label: 'Monumentos', pct: 73.2 },
                    { label: 'Parques', pct: 71.0 },
                    { label: 'Boulevares', pct: 61.2 },
                    { label: 'Mercados', pct: 59.8 },
                    { label: 'Iglesias', pct: 55.8 },
                  ].map((item) => (
                    <StatBar key={item.label} label={item.label} pct={item.pct} />
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Icon validation */}
            <div>
              <Reveal delay={0.1}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px" style={{ background: accent }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
                    Validation — 93 responses
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  Route icon recognition
                </h2>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">
                  Usability testing revealed confusion with the "Rutas" navigation icon.
                  A survey of 93 participants tested 5 icon options to validate collective mental models.
                  The original icon scored highest — it was kept.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="glass rounded-2xl p-6 border border-white/08 space-y-4">
                  {[
                    { icon: 'Y', label: 'Fork/route split (original)', pct: 42, highlight: true },
                    { icon: '↗', label: 'Navigation arrow', pct: 28, highlight: false },
                    { icon: '⊞', label: 'Map pin', pct: 12, highlight: false },
                    { icon: '⇄', label: 'Bidirectional arrows', pct: 9.5, highlight: false },
                    { icon: '▣', label: 'Bookmark / open book', pct: 8.5, highlight: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                        style={{
                          background: item.highlight ? `${accent}20` : 'rgba(255,255,255,0.04)',
                          border: item.highlight ? `1px solid ${accent}40` : '1px solid rgba(255,255,255,0.06)',
                          color: item.highlight ? accent : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-white/60">{item.label}</p>
                          <p className="text-xs font-semibold" style={{ color: item.highlight ? accent : 'rgba(255,255,255,0.4)' }}>
                            {item.pct}%
                          </p>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/06 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(item.pct / 42) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: item.highlight ? accent : 'rgba(255,255,255,0.15)' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-white/30 pt-2 border-t border-white/06">
                    Decision: Original icon retained with 42% recognition — the highest score among alternatives.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── II Semester handoff ───────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
                II Semester 2021 — Handoff & Development
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              From design to development
            </h2>
            <p className="text-white/50 text-sm max-w-2xl mb-12 leading-relaxed">
              The second semester focused on transitioning the validated design into a working application.
              The Figma Design System and interactive prototype were handed off to a computing team who
              implemented the app using the SCRUM methodology, with Alonso Obando as Scrum Master.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                phase: 'Stage 01',
                activities: [
                  'Storyboard for onboarding flow',
                  'Requirements list with development team',
                  'Developer-ready asset preparation',
                  'Progress follow-up',
                ],
              },
              {
                phase: 'Stage 02',
                activities: [
                  'Second APK version validation',
                  'UX review of implemented screens',
                  'Progress follow-up meetings',
                ],
              },
              {
                phase: 'Stage 03',
                activities: [
                  'Correction iterations',
                  'Design system documentation for future designers',
                  'Progress follow-up',
                  'Official launch',
                ],
              },
            ].map((s, i) => (
              <Reveal key={s.phase} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: accent }}>
                    {s.phase}
                  </p>
                  <ul className="space-y-2 mt-3">
                    {s.activities.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-white/55">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reflection ────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px" style={{ background: accent }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
                    Reflection
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Key learnings
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  This project demonstrated the value of testing against a real baseline. Having the original
                  APK as a benchmark made it possible to quantify the impact of design decisions — not just
                  describe them. Task times dropped by up to 58% in direct comparisons.
                </p>
                <p className="text-white/60 leading-relaxed mb-4">
                  Working directly with the municipal client taught us to navigate institutional constraints:
                  the legal complexity of including private venues required negotiation with stakeholders
                  and reshaped the information architecture mid-project.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Using Atomic Design from the start meant the final handoff was a complete,
                  self-documenting Design System — not just a set of screens. The computing team
                  received a Figma file they could use as both specification and reference guide.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4">
                {[
                  {
                    title: 'Quantified impact',
                    desc: 'Baseline APK vs prototype comparison gave concrete evidence of design improvements — not just preference.',
                  },
                  {
                    title: 'Stakeholder navigation',
                    desc: 'Legal constraints on private venues forced mid-project IA pivots. Institutional design requires flexibility.',
                  },
                  {
                    title: 'Atomic Design as handoff',
                    desc: 'Building components bottom-up meant the Design System was ready for developers from day one.',
                  },
                  {
                    title: 'Data-driven decisions',
                    desc: '120-person category survey and 93-person icon test replaced assumptions with evidence for key navigation choices.',
                  },
                  {
                    title: 'Material Design pays off',
                    desc: 'Familiar navigation patterns reduced learning curve. Users leveraged prior knowledge to explore the app faster.',
                  },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-2xl p-5 border border-white/08 flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/08">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  See the full design on Behance
                </h2>
                <p className="text-white/50 text-sm">
                  Complete screens, design system, and prototype available on Behance.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://www.behance.net/gallery/146062185/Art-City-Tour-Maps-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: `linear-gradient(135deg, ${accent}, #1d4ed8)` }}
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

          {/* Next project */}
          <Reveal delay={0.1}>
            <div className="mt-16 pt-16 border-t border-white/08">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Next Project</p>
              <Link href="/projects/fulzer" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}>
                  🚚
                </div>
                <div>
                  <p className="font-display font-bold text-white text-lg group-hover:text-teal-400 transition-colors">
                    Fulzer — Food Truck Design
                  </p>
                  <p className="text-sm text-white/40">Industrial Design · Ergonomics · Product Design</p>
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
          <p className="text-xs text-white/30">UX/UI Designer · Costa Rica</p>
        </div>
      </footer>
    </div>
  )
}
