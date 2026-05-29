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

function DecisionRow({ discarded, reason }: { discarded: string; reason: string }) {
  return (
    <div className="grid grid-cols-2 gap-6 py-5 border-b border-white/06 text-sm last:border-0">
      <div className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-rose-500/60" />
        <span className="text-white/60 leading-relaxed">{discarded}</span>
      </div>
      <span className="text-white/50 leading-relaxed">{reason}</span>
    </div>
  )
}

export default function OneDeskCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 60])

  const accent = '#60a5fa'

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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[120px]" style={{ background: `${accent}10` }} />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px]" style={{ background: '#1e3a5f18' }} />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-8 h-px" style={{ background: accent }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Case Study</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">2025</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">Walmart Centroamérica</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            OneDesk<br />
            <span style={{
              background: `linear-gradient(135deg, ${accent}, #93c5fd, #bfdbfe)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Portal Unificado
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-lg mb-8 max-w-2xl"
          >
            Unified enterprise platform for Walmart Central America — warranty lifecycle management,
            digital ticket portal, and centralized fiscal document consultation under one ecosystem,
            with 5 user roles with radically different permissions coexisting without friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {['Enterprise UX', 'RBAC Design', 'Living Design System', 'HTML Prototyping', 'Multi-role UX', 'Walmart CA'].map((tag) => (
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
              { value: '3', label: 'Modules' },
              { value: '5', label: 'User Roles' },
              { value: '$434K', label: 'Yearly Savings Target' },
              { value: '3', label: 'Phases' },
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
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Context</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Four critical problems across<br />Central America & Mexico
            </h2>
            <p className="text-white/60 leading-relaxed max-w-2xl mb-12">
              Walmart operated across multiple countries with fragmented warranty management, physical ticket printing,
              and manual fiscal document handling — all disconnected systems generating four compounding operational problems.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '💸',
                title: 'Supply Cost',
                stat: '$434K / yr',
                desc: 'Physical ticket printing at checkout generating $434K/yr in paper and supply costs.',
                color: '#fbbf24',
              },
              {
                icon: '🔧',
                title: 'Untraceable Warranties',
                stat: 'No central tracking',
                desc: 'Warranty cases lacked centralized tracking across stores, SAC, workshops, and commercial teams.',
                color: accent,
              },
              {
                icon: '📄',
                title: 'Manual Fiscal Documents',
                stat: 'Hours of manual work',
                desc: 'Tax team handled government fiscal document requests manually — hours of work per request.',
                color: '#f472b6',
              },
              {
                icon: '📉',
                title: 'Post-Sale NPS',
                stat: 'Low satisfaction',
                desc: 'Low post-sale NPS driven by zero warranty status visibility for customers and staff.',
                color: '#34d399',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: `${item.color}20`, color: item.color }}>
                          {item.stat}
                        </span>
                      </div>
                      <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px" style={{ background: accent }} />
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>The Challenge</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  One platform,<br />three problems,<br />five user roles
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Design and iterate a unified platform — OneDesk — that resolved three distinct operational problems under
                  one ecosystem, with 5 user profiles with radically different needs and permissions coexisting in the same
                  interface without friction or unauthorized access.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Each role required a tailored experience: a store associate should never see the SLA approval flow, while
                  an administrator needs full visibility across all countries and stages.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Three modules · Three problems</p>
                {[
                  { problem: 'Post-sale warranty management', module: 'Portal de Garantías', phase: 'Phase 1', color: accent },
                  { problem: 'Progressive elimination of printed tickets', module: 'Portal Ticket Digital', phase: 'Phase 3', color: '#34d399' },
                  { problem: 'Centralized fiscal document consultation', module: 'Módulo Docs Fiscales', phase: 'New', color: '#f472b6' },
                ].map((row) => (
                  <div key={row.module} className="glass rounded-xl p-4 border border-white/08">
                    <span className="text-xs font-semibold" style={{ color: row.color }}>{row.phase}</span>
                    <p className="text-sm text-white/80 font-semibold mt-1">{row.module}</p>
                    <p className="text-xs text-white/40 mt-0.5">{row.problem}</p>
                  </div>
                ))}

                <div className="glass rounded-xl p-5 border border-white/08 mt-2">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">5 User Roles (RBAC)</p>
                  <div className="space-y-2">
                    {[
                      { role: 'TIENDA', desc: 'Sees only their country/store — locked' },
                      { role: 'CONSULTOR', desc: 'Initiates SLA approvals' },
                      { role: 'ADMIN', desc: 'Resolves SLA approvals, full access' },
                      { role: 'IMPUESTOS', desc: 'Docs Fiscales module access' },
                      { role: 'SAC', desc: 'Warranty tracking and customer service' },
                    ].map((r) => (
                      <div key={r.role} className="flex items-center gap-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${accent}15`, color: accent }}>{r.role}</span>
                        <span className="text-xs text-white/40">{r.desc}</span>
                      </div>
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
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>UX Methodology</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">
              Five practices,{' '}
              <span style={{
                background: `linear-gradient(135deg, ${accent}, #93c5fd)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                one validated system
              </span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'High-Fidelity Iterative Prototyping',
                desc: 'Functional HTML/CSS/JS SPA prototypes on GitHub Pages — evaluated with real users without backend dependency.',
              },
              {
                number: '02',
                title: 'Walmart Living Design System',
                desc: 'Design tokens, official LD Icons, and reusable components for brand coherence across all screens.',
              },
              {
                number: '03',
                title: 'Role-Based Design (RBAC)',
                desc: "Every screen designed from the consuming role's perspective — hiding irrelevant actions to reduce cognitive load.",
              },
              {
                number: '04',
                title: 'Critical Flow Validation',
                desc: 'SLA approvals, bulk document selection, and loading/empty/error states validated before development.',
              },
              {
                number: '05',
                title: 'Continuous Feedback Loop',
                desc: 'Iterative fixes from stakeholder reviews — badge logic, filter placement, and removal of redundant actions.',
              },
            ].map((item, i) => (
              <Reveal key={item.number} delay={i * 0.07}>
                <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                  <span className="font-display font-bold text-4xl block mb-4" style={{ color: `${accent}35` }}>{item.number}</span>
                  <h3 className="font-semibold text-white text-sm mb-3 leading-snug">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solution — 3 modules */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Solution</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Three modules, one ecosystem
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-16 leading-relaxed">
              Each module designed end-to-end with role-specific access, guided flows, and validated empty/loading/error states.
            </p>
          </Reveal>

          <div className="space-y-10">
            {/* Module 1 */}
            <Reveal>
              <div className="glass rounded-3xl border border-white/08 overflow-hidden">
                <div className="h-1" style={{ background: `linear-gradient(to right, ${accent}, #93c5fd)` }} />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                    <div>
                      <span className="text-xs font-semibold tracking-widest uppercase mb-1 block" style={{ color: accent }}>Phase 1</span>
                      <h3 className="font-display text-2xl font-bold text-white">Portal de Garantías</h3>
                      <p className="text-white/50 text-sm mt-1">End-to-end warranty lifecycle management</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Warranty Query', desc: 'Advanced filters (Country, Store, Status, Workshop, Dates), real-time search, and loading states with LD Icons.' },
                      { title: 'Warranty Registration', desc: 'Field validation and step-guided flow for creating new warranty cases.' },
                      { title: 'SLA Management', desc: 'Editable SLA matrix by country and stage. Approval flow: Consultant → Admin. Pending badges per affected country only.' },
                      { title: 'Role-Based Access', desc: 'TIENDA sees only their country/store (locked). CONSULTOR initiates approvals. ADMIN resolves them.' },
                      { title: 'Workshops Module', desc: 'Workshop management with role-restricted access.' },
                      { title: 'System Configuration', desc: 'Configuration module restricted to Admin role.' },
                    ].map((f) => (
                      <div key={f.title} className="rounded-xl p-4 border border-white/06 bg-white/[0.02]">
                        <p className="text-sm font-semibold text-white mb-1.5">{f.title}</p>
                        <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Module 2 */}
            <Reveal delay={0.05}>
              <div className="glass rounded-3xl border border-white/08 overflow-hidden">
                <div className="h-1" style={{ background: 'linear-gradient(to right, #10b981, #34d399)' }} />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                    <div>
                      <span className="text-xs font-semibold tracking-widest uppercase mb-1 block text-emerald-400">Phase 3</span>
                      <h3 className="font-display text-2xl font-bold text-white">Portal Ticket Digital</h3>
                      <p className="text-white/50 text-sm mt-1">Progressive elimination of physical checkout tickets</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shrink-0">
                      $434K/yr savings target
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Ticket Query & Filters', desc: 'Query, download, and send digital tickets (invoices) via multiple filter combinations.' },
                      { title: 'Bulk Selection', desc: 'Mass selection with download as Consolidated PDF or Individual PDFs — format choice only where it applies.' },
                      { title: 'Email Sending', desc: 'Recipient validation, personalized message, and success confirmation.' },
                      { title: 'Ticket Preview', desc: 'Full preview with product breakdown, taxes, and payment method.' },
                      { title: 'Guided States', desc: 'Empty state, loading state, and no-results state for a guided experience at every step.' },
                    ].map((f) => (
                      <div key={f.title} className="rounded-xl p-4 border border-white/06 bg-white/[0.02]">
                        <p className="text-sm font-semibold text-white mb-1.5">{f.title}</p>
                        <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Module 3 */}
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl border border-white/08 overflow-hidden">
                <div className="h-1" style={{ background: 'linear-gradient(to right, #ec4899, #f472b6)' }} />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                    <div>
                      <span className="text-xs font-semibold tracking-widest uppercase mb-1 block text-pink-400">New Module</span>
                      <h3 className="font-display text-2xl font-bold text-white">Módulo Docs Fiscales</h3>
                      <p className="text-white/50 text-sm mt-1">Centralized fiscal document consultation by store</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20 shrink-0">
                      Admin + Consultor only
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Advanced Filters', desc: 'Filter by country, date range, store ID, and store name.' },
                      { title: 'Alert Banner', desc: 'Proactive compliance alerts — days without sending consolidated documents.' },
                      { title: 'Bulk Selection & Download', desc: 'Direct PDF download (one PDF per document) with no format modal — friction removed where it doesn\'t apply.' },
                      { title: 'Email Sending', desc: 'Same validated email flow as the ticket portal.' },
                      { title: 'Role-Restricted Access', desc: 'Restricted to Administrator and Consultant roles — store-level users have no access.' },
                    ].map((f) => (
                      <div key={f.title} className="rounded-xl p-4 border border-white/06 bg-white/[0.02]">
                        <p className="text-sm font-semibold text-white mb-1.5">{f.title}</p>
                        <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Decisions */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Design Decisions</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              What we didn&apos;t choose — and why
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-10 leading-relaxed">
              Five alternatives evaluated and discarded, with their justification.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl border border-white/08 overflow-hidden">
              <div className="grid grid-cols-2 gap-6 px-6 py-3 border-b border-white/06 text-xs font-semibold tracking-widest uppercase">
                <span className="text-rose-400">Discarded Alternative</span>
                <span style={{ color: accent }}>Reason</span>
              </div>
              <div className="px-6">
                <DecisionRow
                  discarded="Format selection modal in Docs Fiscales (Consolidated PDF vs. Individual)"
                  reason="In Docs Fiscales it's always one PDF per document — the selection was unnecessary friction. Kept only in Tickets where format choice actually applies."
                />
                <DecisionRow
                  discarded="Country and Store inside the filter drawer"
                  reason="Moving them to the topbar keeps them always visible, reducing steps for the most-used filter pair. The drawer was reserved for secondary filters."
                />
                <DecisionRow
                  discarded="'Add' button in the SLA Totals table (Admin)"
                  reason="The correct flow is editing existing rows, not creating new ones. The button generated confusion about the data model."
                />
                <DecisionRow
                  discarded="Global 'Pending' badge for all countries when editing one stage"
                  reason="A change in CR should not affect the GT or HN display. Implemented per-country pending tracking for specifically affected countries."
                />
                <DecisionRow
                  discarded="Loading spinner on text search (per keystroke)"
                  reason="For real-time search a 1.3s delay creates friction. The spinner is reserved for 'Apply Filters' which simulates a backend query."
                />
              </div>
            </div>
          </Reveal>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">Projected outcomes</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-4">Portal Ticket Digital</p>
                <div className="space-y-4">
                  {[
                    { value: '−5%', label: 'Print Reduction', desc: '$434,000 USD / year in projected supply savings', color: '#34d399' },
                    { value: '↑', label: 'Post-Sale NPS', desc: 'Measurable increase after digital channel adoption', color: '#34d399' },
                    { value: '↓', label: 'JECA Support Tickets', desc: 'Fewer support requests caused by missing receipts', color: '#34d399' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 py-3 border-b border-white/05 last:border-0">
                      <span className="font-display font-bold text-2xl w-10 shrink-0" style={{ color: item.color }}>{item.value}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: accent }}>Portal de Garantías</p>
                <div className="space-y-4">
                  {[
                    { value: '↑', label: 'CS Resolution Rate', desc: 'Improved via real-time status and SLA visibility across all stages', color: accent },
                    { value: '↓', label: 'Tax Team Manual Work', desc: 'Reduced manual effort via Docs Fiscales centralized search and direct download', color: accent },
                    { value: '✓', label: 'SLA Compliance', desc: 'Active monitoring with per-country pending alerts before deadline expiry', color: accent },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 py-3 border-b border-white/05 last:border-0">
                      <span className="font-display font-bold text-2xl w-10 shrink-0" style={{ color: item.color }}>{item.value}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="md:col-span-2 glass rounded-2xl p-6 border border-white/08" style={{ borderColor: `${accent}25` }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
                    <svg className="w-5 h-5" fill="none" stroke={accent} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Delivered as functional dev specifications</p>
                    <p className="text-sm text-white/55 leading-relaxed">
                      The prototypes were designed to be handed off directly to the development team as high-fidelity functional specifications —
                      reducing discovery time and eliminating ambiguity in business flows without requiring backend infrastructure during the design phase.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Screens</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">Platform in action</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n, i) => (
              <Reveal key={n} delay={i * 0.04}>
                <div className="rounded-2xl overflow-hidden border border-white/08">
                  <Image src={`/onedesk-walmart-media-files/mockup-${n}.png`} alt={`OneDesk screen ${n}`} width={1600} height={900} className="w-full h-auto" />
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
                  Want to see the full prototype?
                </h2>
                <p className="text-white/50 text-sm">Available upon request — reach out directly.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: `linear-gradient(135deg, ${accent}, #3b82f6)` }}
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
              <Link href="/projects/cecoapp" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}>
                  📱
                </div>
                <div>
                  <p className="font-display font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">CECOApp</p>
                  <p className="text-sm text-white/40">Mobile UX · Product Design · E-commerce</p>
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
