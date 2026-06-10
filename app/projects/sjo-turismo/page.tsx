'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

const GALLERY_IMAGES = [
  { src: '/sjo-turismo-media-files/mockup-2.png', alt: 'SJO Turismo screen 2' },
  { src: '/sjo-turismo-media-files/mockup-3.png', alt: 'SJO Turismo screen 3' },
]

function Lightbox({ images, activeIndex, onClose }: { images: { src: string; alt: string }[]; activeIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(activeIndex)
  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [prev, next, onClose])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.92)' }} onClick={onClose}>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-white/40 tabular-nums tracking-widest">{current + 1} / {images.length}</div>
      <button onClick={onClose} className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors text-2xl leading-none">×</button>
      <motion.div key={current} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25 }} className="relative max-w-xs sm:max-w-sm md:max-w-md w-full mx-6" onClick={e => e.stopPropagation()}>
        <Image src={images[current].src} alt={images[current].alt} width={390} height={844} className="w-full h-auto" />
      </motion.div>
      <button onClick={e => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-colors">←</button>
      <button onClick={e => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/40 transition-colors">→</button>
    </motion.div>
  )
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'show' : 'hidden'}
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] } } }}>
      {children}
    </motion.div>
  )
}

function PhaseStep({ number, title, activities, result }: { number: string; title: string; activities: string[]; result: string }) {
  const accent = 'rgba(200,200,200,0.55)'
  return (
    <div className="relative flex gap-6 pb-10">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>{number}</div>
        <div className="flex-1 w-px mt-2" style={{ background: 'linear-gradient(to bottom, rgba(200,200,200,0.35), transparent)' }} />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-bold text-white text-lg mb-3">{title}</h3>
        <ul className="space-y-2 mb-4">{activities.map((a, i) => (<li key={i} className="flex items-start gap-2 text-sm text-white/55"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />{a}</li>))}</ul>
        <div className="glass rounded-xl p-4 border border-white/[0.08]">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: accent }}>Result</p>
          <p className="text-sm text-white/60 leading-relaxed">{result}</p>
        </div>
      </div>
    </div>
  )
}

function StatBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-white/50 w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/08 overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }} className="h-full rounded-full" style={{ background: 'rgba(200,200,200,0.45)' }} />
      </div>
      <span className="text-xs font-semibold text-white/70 w-12 text-right">{pct}%</span>
    </div>
  )
}

function CompareRow({ task, apkTime, protoTime, improvement }: { task: string; apkTime: string; protoTime: string; improvement: string }) {
  return (
    <div className="grid grid-cols-4 gap-4 py-4 border-b border-white/06 text-sm">
      <span className="text-white/60 col-span-1">{task}</span>
      <span className="text-rose-400 font-medium">{apkTime}</span>
      <span className="text-emerald-400 font-medium">{protoTime}</span>
      <span className="text-sky-400 font-semibold">{improvement}</span>
    </div>
  )
}

export default function SJOTurismoCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, 60])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const accent = 'rgba(200,200,200,0.55)'
  const highlight = '#0384D5'

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#efefef] overflow-x-hidden">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="fixed top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/80 transition-colors duration-300">← Back to work</Link>
      </motion.div>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pt-20 md:pt-0 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(8,8,8,0.7) 100%)' }} />
        <motion.div style={{ y: heroY }} className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-[1fr_3fr] gap-10 items-end">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px" style={{ background: accent }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Case Study</span>
                <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">I–II Sem 2021</span>
                <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">TEC · Escuela de Diseño Industrial</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
                SJO Turismo<br /><span className="text-white/45">App Redesign</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-white/50 text-lg mb-8 max-w-2xl">
                UX redesign of the SJO Turismo app for the Centro Histórico de San José — a collaboration between the Instituto Tecnológico de Costa Rica and the Municipalidad de San José.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap gap-3 mb-10">
                {['Mobile UX', 'UX Research', 'Atomic Design', 'Material Design', 'San José · CR', 'Academic Project'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs text-white/50 glass border border-white/08">{tag}</span>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="grid grid-cols-2 gap-4">
                {[{ value: '3', label: 'Design Stages' }, { value: '120', label: 'Survey Responses' }, { value: '10', label: 'Usability Testers' }, { value: '2', label: 'Semesters' }].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-4 border border-white/08">
                    <p className="font-display font-bold text-2xl" style={{ color: highlight }}>{stat.value}</p>
                    <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55 }} className="hidden md:flex justify-center items-end self-end pb-4">
              <Image src="/sjo-turismo-media-files/mockup-1.png" alt="SJO Turismo app screen" width={390} height={844} className="w-full max-w-none h-auto" priority />
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
                <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: accent }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Context</span></div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Redesigning the city&apos;s cultural compass</h2>
                <p className="text-white/60 leading-relaxed mb-4">The Municipalidad de San José had an existing APK to help visitors navigate the historic center — museums, theaters, parks, and cultural events. But usability problems made it harder to use than not having it at all.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Team</p>
                  <div className="space-y-2">
                    {[{ name: 'José Pablo Campos', role: 'UX/UI Designer' }, { name: 'Felipe Víctor Benavides', role: 'UX/UI Designer' }, { name: 'Maria del Carmen Valverde Solano', role: 'Professor Advisor' }].map((m) => (
                      <div key={m.name} className="flex items-center justify-between"><p className="text-white/70 text-sm">{m.name}</p><p className="text-xs text-white/30">{m.role}</p></div>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Institution</p>
                  <p className="text-white/70 text-sm">Instituto Tecnológico de Costa Rica (TEC)</p>
                  <p className="text-white/40 text-xs mt-1">Escuela de Diseño Industrial · Special Assistantship — I & II Semester 2021</p>
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
                      <span key={tool} className="px-2.5 py-1 rounded-full text-xs text-white/50 bg-white/04 border border-white/08">{tool}</span>
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
            <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: highlight }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: highlight }}>Impact</span></div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">APK vs. Prototype — task performance</h2>
            <p className="text-white/50 text-sm max-w-xl mb-3 leading-relaxed">Participants who tested the original APK were retested on the new prototype. All tasks showed meaningful time reductions.</p>
            <div className="glass rounded-xl p-4 border mb-10 max-w-2xl" style={{ borderColor: `${highlight}30` }}>
              <p className="text-sm font-semibold" style={{ color: highlight }}>Downloading the Museos route dropped from 2 min 44 sec to 1 min 9 sec — a 58% improvement on a single task.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl border border-white/08 overflow-hidden mb-8">
              <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-white/06 text-xs font-semibold tracking-widest uppercase">
                <span className="text-white/30">Task</span><span className="text-rose-400">APK avg time</span><span className="text-emerald-400">Prototype avg</span><span style={{ color: accent }}>Improvement</span>
              </div>
              <div className="px-6">
                <CompareRow task="Find Museo Nacional info" apkTime="24 sec" protoTime="13 sec" improvement="−46%" />
                <CompareRow task="Find Teatro El Triciclo" apkTime="55 sec" protoTime="51 sec" improvement="−7%" />
                <CompareRow task="Visit Favorites tab" apkTime="N/A" protoTime="7 sec" improvement="New feature" />
                <CompareRow task="Download Museos route" apkTime="2 min 44 sec" protoTime="1 min 9 sec" improvement="−58%" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6 border border-white/08 text-center">
                <p className="font-display font-bold text-4xl md:text-5xl mb-2 leading-none" style={{ color: highlight }}>−58%</p>
                <p className="text-sm font-semibold text-white/70">Best task improvement</p>
                <p className="text-xs text-white/30 mt-1">Download Museos route</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/08 text-center">
                <p className="font-display font-bold text-4xl md:text-5xl mb-2 leading-none" style={{ color: highlight }}>−46%</p>
                <p className="text-sm font-semibold text-white/70">Find Museo Nacional</p>
                <p className="text-xs text-white/30 mt-1">24 sec → 13 sec</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-2">Worst APK case</p>
                <p className="font-display font-bold text-3xl text-rose-400 mb-1">6 min 25 sec</p>
                <p className="text-xs text-white/50 leading-relaxed">Finding Museo Nacional when the user accidentally navigated to the map — unable to locate the information there.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Design Stages */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: accent }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>I Semester 2021 — Design Process</span></div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-16">Three stages, <span className="text-white/45">one validated design</span></h2>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal delay={0.1}><PhaseStep number="01" title="Diagnosis APK" activities={['Google Forms survey to validate functionalities (added Favorites; removed low-demand Tour Operators)', 'Usability tests with 10 participants on the existing APK — problems in Design Patterns, Interaction Flow, and UX', 'Feature definition workshops with the municipality team and legal scope review', 'Arquitectura Alfa: all content organized into 5 sections — Descubrir, Actividades, Rutas, Movilidad, Ajustes']} result="Arquitectura Alfa — 5 sections validated via user-assigned associations." /></Reveal>
            <Reveal delay={0.15}><PhaseStep number="02" title="Pattern Hunting & Proposal" activities={['Competitive analysis for dominant design patterns in urban tourism apps', 'Applied Atomic Design (Atoms → Molecules → Organisms → Templates → Pages)', 'Material Design nav bar with 5 tabs; celeste as primary interactive color from the Centro Histórico brand book', 'High-fidelity prototype for all 5 sections']} result="High-fidelity interactive prototype ready for validation." /></Reveal>
            <Reveal delay={0.2}><PhaseStep number="03" title="Usability Testing & Validation" activities={['Heuristic usability tests comparing task times: original APK vs. new prototype', '120-response survey to prioritize categories; 93-participant icon validation for "Rutas"', 'Figma Design System and prototype delivered to the computing team on June 24 for SCRUM development']} result="Task time reductions across all tasks. Design system handed off for SCRUM development." /></Reveal>
          </div>
        </div>
      </section>

      {/* Design System */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: accent }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Design System</span></div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">Atomic Design + Material Design</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Reveal delay={0.05}>
              <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Methodology</p>
                <p className="text-sm font-bold text-white mb-3">Atomic Design</p>
                <p className="text-sm text-white/55 leading-relaxed mb-5">Atoms (colors, type, icons) → Molecules (buttons, cards) → Organisms → Templates → Pages.</p>
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="px-2 py-1 rounded glass border border-white/08">Atoms</span><span>→</span><span className="px-2 py-1 rounded glass border border-white/08">Molecules</span><span>→</span><span className="px-2 py-1 rounded glass border border-white/08">Organisms</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Color System</p>
                <p className="text-xs text-white/40 leading-relaxed mb-4">Based on the Centro Histórico brand book + Material Design proportions. Celeste applied exclusively to interactive elements.</p>
                <div className="space-y-3">
                  {[{ name: 'Primary (Celeste)', color: '#38bdf8', note: 'Interactive elements, active states' }, { name: 'Secondary (Navy)', color: '#1e3a5f', note: 'Headers, navigation bar' }, { name: 'Text Gray', color: '#444444', note: 'General body text' }, { name: 'Inactive Gray', color: '#888888', note: 'Leading icons, input borders' }, { name: 'App Background', color: '#f5f5f5', note: 'Main surface — light, minimal' }].map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl shrink-0 border border-white/08" style={{ background: c.color }} />
                      <div><p className="text-xs font-medium text-white/70">{c.name}</p><p className="text-xs text-white/30">{c.note}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Category Prioritization */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: accent }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Validation — 120 responses</span></div>
                <h2 className="font-display text-3xl font-bold text-white mb-3">Content category ranking</h2>
                <div className="glass rounded-xl p-3 border mb-6" style={{ borderColor: `${highlight}30` }}>
                  <p className="text-sm font-semibold" style={{ color: highlight }}>85.8% ranked museums as their top category — the clear anchor for &quot;Descubrir.&quot;</p>
                </div>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">120 participants rated each category 1–5. Results drove the navigation order within &quot;Descubrir.&quot;</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-3">
                  {[{ label: 'Museos', pct: 85.8 }, { label: 'Teatros', pct: 83.5 }, { label: 'Patrimonios', pct: 78.3 }, { label: 'Galerías', pct: 78.2 }, { label: 'Arte Público', pct: 77.7 }, { label: 'Monumentos', pct: 73.2 }, { label: 'Parques', pct: 71.0 }, { label: 'Boulevares', pct: 61.2 }, { label: 'Mercados', pct: 59.8 }, { label: 'Iglesias', pct: 55.8 }].map((item) => (
                    <StatBar key={item.label} label={item.label} pct={item.pct} />
                  ))}
                </div>
              </Reveal>
            </div>
            <div>
              <Reveal delay={0.1}>
                <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: accent }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Validation — 93 responses</span></div>
                <h2 className="font-display text-3xl font-bold text-white mb-3">Route icon recognition</h2>
                <div className="glass rounded-xl p-3 border mb-6" style={{ borderColor: `${highlight}30` }}>
                  <p className="text-sm font-semibold" style={{ color: highlight }}>42% recognized the original fork icon — the highest score, so it was kept unchanged.</p>
                </div>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">93 participants tested 5 icon options for the &quot;Rutas&quot; tab.</p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="glass rounded-2xl p-6 border border-white/08 space-y-4">
                  {[{ icon: 'Y', label: 'Fork/route split (original)', pct: 42, isHighlight: true }, { icon: '↗', label: 'Navigation arrow', pct: 28, isHighlight: false }, { icon: '⊞', label: 'Map pin', pct: 12, isHighlight: false }, { icon: '⇄', label: 'Bidirectional arrows', pct: 9.5, isHighlight: false }, { icon: '▣', label: 'Bookmark / open book', pct: 8.5, isHighlight: false }].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold shrink-0" style={{ background: item.isHighlight ? `${accent}20` : 'rgba(255,255,255,0.04)', border: item.isHighlight ? `1px solid ${accent}40` : '1px solid rgba(255,255,255,0.06)', color: item.isHighlight ? accent : 'rgba(255,255,255,0.3)' }}>{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1"><p className="text-xs text-white/60">{item.label}</p><p className="text-xs font-semibold" style={{ color: item.isHighlight ? accent : 'rgba(255,255,255,0.4)' }}>{item.pct}%</p></div>
                        <div className="h-1.5 rounded-full bg-white/06 overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${(item.pct / 42) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full rounded-full" style={{ background: item.isHighlight ? accent : 'rgba(255,255,255,0.15)' }} /></div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-white/30 pt-2 border-t border-white/06">Decision: Original icon retained with 42% recognition — highest score among alternatives.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* II Semester Handoff */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: accent }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>II Semester 2021 — Handoff & Development</span></div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">From design to development</h2>
            <p className="text-white/50 text-sm max-w-2xl mb-12 leading-relaxed">The validated design was handed off to a computing team (Scrum Master: Alonso Obando) for SCRUM implementation.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ phase: 'Stage 01', activities: ['Storyboard for onboarding flow', 'Requirements list with development team', 'Developer-ready asset preparation', 'Progress follow-up'] }, { phase: 'Stage 02', activities: ['Second APK version validation', 'UX review of implemented screens', 'Progress follow-up meetings'] }, { phase: 'Stage 03', activities: ['Correction iterations', 'Design system documentation for future designers', 'Progress follow-up', 'Official launch'] }].map((s, i) => (
              <Reveal key={s.phase} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: accent }}>{s.phase}</p>
                  <ul className="space-y-2 mt-3">{s.activities.map((a) => (<li key={a} className="flex items-start gap-2 text-sm text-white/55"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />{a}</li>))}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reflection */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: accent }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Reflection</span></div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Key learnings</h2>
                <p className="text-white/60 leading-relaxed mb-4">Testing against a real baseline made it possible to quantify design impact — not just describe it. Task times dropped by up to 58%.</p>
                <p className="text-white/60 leading-relaxed mb-4">Legal constraints on private venues required stakeholder negotiation and mid-project IA pivots — institutional design requires flexibility.</p>
                <p className="text-white/60 leading-relaxed">Atomic Design from the start meant the handoff was a self-documenting Design System — specification and reference guide in one Figma file.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4">
                {[{ title: 'Quantified impact', desc: 'APK baseline made improvements measurable — not just perceived. Up to 58% task time reduction.' }, { title: 'Stakeholder navigation', desc: 'Legal constraints on private venues forced mid-project IA pivots. Institutional design requires flexibility.' }, { title: 'Data-driven decisions', desc: '120-person survey and 93-person icon test replaced assumptions with evidence.' }, { title: 'Design system as handoff doc', desc: 'Building with Atomic Design meant the system was its own documentation — no extra annotation needed.' }].map((item) => (
                  <div key={item.title} className="glass rounded-2xl p-5 border border-white/08 flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: highlight }} />
                    <div><p className="font-semibold text-white text-sm mb-1">{item.title}</p><p className="text-xs text-white/50 leading-relaxed">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4"><span className="w-6 h-px" style={{ background: accent }} /><span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Screens</span></div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10">All screens</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ columns: 2, columnGap: '15px' }}>
              {GALLERY_IMAGES.map((img, i) => (
                <div key={img.src} style={{ marginBottom: '15px', breakInside: 'avoid', display: 'inline-block', width: '100%' }}>
                  <motion.button onClick={() => openLightbox(i)} className="w-full block cursor-zoom-in group" whileHover={{ opacity: 0.85 }} transition={{ duration: 0.2 }}>
                    <Image src={img.src} alt={img.alt} width={390} height={844} className="w-full h-auto" />
                  </motion.button>
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
              <div><h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">See the full design</h2><p className="text-white/50 text-sm">Interactive prototype live on Figma.</p></div>
              <div className="flex flex-wrap gap-3">
                <motion.a href="https://www.figma.com/proto/uX1w83Lh1a3ssd1ozOlfRl/Mobile-App?node-id=176-639&p=f&t=UxjIlFdFkWiuCnqL-1&scaling=scale-down&content-scaling=fixed&page-id=2%3A4&starting-point-node-id=164%3A1450" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#080808] text-sm font-medium hover:bg-white/90 transition-colors">
                  View Prototype
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </motion.a>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-white/60 hover:text-white transition-colors border border-white/08">Back to portfolio</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-16 pt-16 border-t border-white/08">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Next Project</p>
              <Link href="/projects/onedesk" className="group flex items-center justify-between py-4 border-t border-white/[0.07] hover:border-white/[0.14] transition-colors">
                <div><p className="font-display font-bold text-white text-lg">OneDesk — Walmart Centroamérica</p><p className="text-sm text-white/40">Enterprise UX · Product Design · SaaS</p></div>
                <span className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all text-lg">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-[13px] text-white/30 font-display tracking-wide">© 2026 JP Campos</p>
          <Link href="/" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">← Back to work</Link>
        </div>
      </footer>

      <AnimatePresence>{lightboxIndex !== null && <Lightbox images={GALLERY_IMAGES} activeIndex={lightboxIndex} onClose={closeLightbox} />}</AnimatePresence>
    </div>
  )
}
