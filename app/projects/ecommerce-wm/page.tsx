'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const ACCENT = '#fbbf24'

/* ── Reveal wrapper ───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Phase step component ─────────────────────────────────────── */
function PhaseStep({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex gap-5">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black"
        style={{ background: ACCENT }}
      >
        {number}
      </div>
      <div className="pt-1">
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-sm text-white/55 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

/* ── Stat card ────────────────────────────────────────────────── */
function StatCard({
  value,
  label,
  sub,
}: {
  value: string
  label: string
  sub?: string
}) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <div className="text-3xl font-bold mb-1" style={{ color: ACCENT }}>
        {value}
      </div>
      <div className="text-sm font-semibold text-white/80">{label}</div>
      {sub && <div className="text-xs text-white/40 mt-0.5">{sub}</div>}
    </div>
  )
}

/* ── Bug card ─────────────────────────────────────────────────── */
function BugCard({
  number,
  title,
  detail,
  impact,
}: {
  number: string
  title: string
  detail: string
  impact: string
}) {
  return (
    <div className="glass rounded-2xl p-6 border border-red-500/20">
      <div className="flex items-start gap-4 mb-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-xs font-bold text-red-400">
          {number}
        </span>
        <h4 className="font-semibold text-white text-sm leading-snug pt-1">{title}</h4>
      </div>
      <p className="text-sm text-white/55 leading-relaxed mb-3">{detail}</p>
      <div className="flex items-center gap-2 text-xs text-red-400 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
        {impact}
      </div>
    </div>
  )
}

/* ── Competitor row ───────────────────────────────────────────── */
function CompetitorRow({
  name,
  score,
  highlight,
}: {
  name: string
  score: string
  highlight?: boolean
}) {
  const pct = (parseFloat(score) / 10) * 100
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl ${highlight ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-white/03'}`}>
      <span className={`text-sm font-medium w-36 flex-shrink-0 ${highlight ? 'text-amber-300' : 'text-white/70'}`}>
        {name}
      </span>
      <div className="flex-1 bg-white/08 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: highlight
              ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
              : 'rgba(255,255,255,0.25)',
          }}
        />
      </div>
      <span className={`text-sm font-bold w-10 text-right ${highlight ? 'text-amber-400' : 'text-white/60'}`}>
        {score}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function EcommerceWMPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── Back nav ── */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/#projects"
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors glass px-4 py-2 rounded-full"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-12 blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* category pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: `${ACCENT}22`, color: ACCENT, border: `1px solid ${ACCENT}44` }}
            >
              UX Research · Ecommerce · 2026
            </span>
          </motion.div>

          {/* title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Ecommerce{' '}
            <span
              className="inline-block"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #f59e0b, #fb923c)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Analysis WM
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/55 max-w-3xl leading-relaxed mb-12"
          >
            Digital Tours research study across 16 sessions in Costa Rica and Guatemala,
            diagnosing why Walmart CA's ecommerce CSAT scores 6.4 vs the 8.9 industry
            benchmark — and identifying the 4 critical bugs behind purchase abandonment.
          </motion.p>

          {/* stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard value="16" label="Sessions" sub="9 CR · 7 GT" />
            <StatCard value="6.4" label="WM CSAT" sub="vs 8.9 competition" />
            <StatCard value="4" label="Critical Bugs" sub="blocking checkout" />
            <StatCard value="−3.9" label="CR Gap" sub="pts vs benchmark" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTEXT
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: ACCENT }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>
                Context
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
              Why is Walmart CA's e-commerce underperforming?
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-8 h-full">
                <div className="text-3xl mb-4">🌎</div>
                <h3 className="font-semibold text-white mb-3">The Study</h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  <strong className="text-white/80">Estudio Experiencia — Tour Digitales 2026</strong> was
                  commissioned to understand real end-to-end shopping flows in two key markets. Sessions
                  were conducted as moderated Digital Tours — guided shopping tasks performed by
                  participants on Walmart's live ecommerce platform, recorded and analyzed for friction
                  points, task completion rates, and sentiment.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="glass rounded-3xl p-8 h-full">
                <div className="text-3xl mb-4">📍</div>
                <h3 className="font-semibold text-white mb-3">Two Markets, Two Stories</h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  Costa Rica (9 sessions) and Guatemala (7 sessions) painted starkly different pictures.
                  While GT users showed relatively positive satisfaction (CSAT 8.1), CR users averaged
                  only <strong className="text-white/80">5.1/10</strong> — a full{' '}
                  <strong style={{ color: ACCENT }}>−3.9 points</strong> below the competitive benchmark.
                  Understanding why required going beyond surveys: watching real purchases break in real
                  time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          METHODOLOGY
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: 'rgba(251,191,36,0.03)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: ACCENT }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>
                Methodology
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              Digital Tours — Seeing real purchases break
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Reveal delay={0.1}>
                <PhaseStep
                  number="1"
                  title="Session Design"
                  description="Structured 16 moderated sessions around a standardized task flow: browse product categories, add items to cart, apply discounts/coupons, proceed to checkout, and complete payment. Each session was screen-recorded and annotated for friction events."
                />
              </Reveal>
              <Reveal delay={0.15}>
                <PhaseStep
                  number="2"
                  title="Digital Tour Execution"
                  description="Participants navigated the live Walmart CA ecommerce platform on their own devices. Researchers observed in real time via screen share, noting hesitations, error encounters, and workarounds without intervening — allowing authentic failure patterns to surface."
                />
              </Reveal>
              <Reveal delay={0.2}>
                <PhaseStep
                  number="3"
                  title="Post-Reception Analysis"
                  description="A subset of 5 participants received their orders and were followed up on product quality, price accuracy, and order completeness. This validated whether issues were UX-layer problems or deeper supply-chain failures."
                />
              </Reveal>
              <Reveal delay={0.25}>
                <PhaseStep
                  number="4"
                  title="Competitive Benchmark"
                  description="Parallel sessions evaluated Uber Eats, Amazon, WM USA / Canada / Mexico, PriceSmart, and local competitors across the same task flow. CSAT scores and friction taxonomies were compiled to produce a gap analysis."
                />
              </Reveal>
            </div>

            <Reveal delay={0.1} className="glass rounded-3xl p-8 self-start">
              <h3 className="font-semibold text-white mb-6">Session Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Costa Rica (CR)</span>
                    <span className="font-semibold text-white">9 sessions</span>
                  </div>
                  <div className="bg-white/08 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: '56%', background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Guatemala (GT)</span>
                    <span className="font-semibold text-white">7 sessions</span>
                  </div>
                  <div className="bg-white/08 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: '44%', background: 'rgba(255,255,255,0.3)' }}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-white/08">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Post-reception follow-up</span>
                    <span className="font-semibold text-white">5 participants</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {['✓ Quality OK', '✓ Prices OK', '⚠ 1 incomplete order'].map((r) => (
                      <div key={r} className="text-xs text-white/50 bg-white/05 rounded-lg px-2 py-1.5 text-center">
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CSAT RESULTS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: ACCENT }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>
                CSAT Results
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              The satisfaction gap
            </h2>
            <p className="text-white/50 mb-12 max-w-2xl">
              Overall Walmart CA CSAT: <strong className="text-white">6.4/10</strong> against a
              competitive benchmark of <strong style={{ color: ACCENT }}>8.9/10</strong>. The split
              between markets tells the real story.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* CR card */}
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-8 border border-red-500/15">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🇨🇷</span>
                  <div>
                    <div className="font-semibold text-white">Costa Rica</div>
                    <div className="text-xs text-white/40">9 sessions</div>
                  </div>
                  <div className="ml-auto text-4xl font-bold text-red-400">5.1</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/55">Repurchase intent (high)</span>
                    <span className="text-red-400 font-semibold">11%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">Repurchase intent (low)</span>
                    <span className="text-red-400 font-semibold">56%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">Gap vs benchmark</span>
                    <span className="text-red-400 font-semibold">−3.9 pts</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* GT card */}
            <Reveal delay={0.15}>
              <div className="glass rounded-3xl p-8 border border-green-500/15">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🇬🇹</span>
                  <div>
                    <div className="font-semibold text-white">Guatemala</div>
                    <div className="text-xs text-white/40">7 sessions</div>
                  </div>
                  <div className="ml-auto text-4xl font-bold text-green-400">8.1</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/55">Repurchase intent (high)</span>
                    <span className="text-green-400 font-semibold">57%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">Repurchase intent (low)</span>
                    <span className="text-green-400 font-semibold">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">Gap vs benchmark</span>
                    <span className="text-green-400 font-semibold">−0.6 pts</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Combined bar */}
          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white/60">Total WM CA</span>
                <span className="text-2xl font-bold" style={{ color: ACCENT }}>6.4 / 10</span>
              </div>
              <div className="bg-white/08 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '64%',
                    background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/35">
                <span>0</span>
                <span className="text-white/50">Benchmark: 8.9 ▲</span>
                <span>10</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CRITICAL BUGS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: 'rgba(239,68,68,0.03)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-red-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-red-400">
                Critical Findings
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              4 bugs blocking purchase completion
            </h2>
            <p className="text-white/50 mb-12 max-w-2xl">
              The Digital Tours revealed that low satisfaction wasn't caused by product quality
              or pricing — it was caused by four specific technical failures at checkout.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0.1}>
              <BugCard
                number="1"
                title="Misleading tiquete/factura error message"
                detail="Users selecting factura (tax invoice) received an error indicating the option was unavailable in Costa Rica — but the message was confusing enough that users interpreted it as a payment failure. CR-only issue."
                impact="3 purchase abandonments observed across sessions"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <BugCard
                number="2"
                title="Associate discount not applying"
                detail="Employee discount codes failed to apply during checkout in all 16 sessions across both CR and GT markets. The UI accepted the code without error but the cart total remained unchanged."
                impact="16/16 sessions affected — both countries"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <BugCard
                number="3"
                title="Coupon 7AHORRO broken"
                detail="The promotional coupon code 7AHORRO consistently failed validation in Costa Rica sessions. Users who entered it received a generic 'invalid code' response despite the promotion being actively advertised."
                impact="CR sessions only — erodes trust in promotions"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <BugCard
                number="4"
                title="Frozen payment screen"
                detail="During Costa Rica sessions 5 and 9, the payment confirmation screen stopped responding after form submission. No success or error feedback was displayed, leaving users uncertain if the purchase was completed."
                impact="2 CR sessions — complete checkout block"
              />
            </Reveal>
          </div>

          {/* Key insight */}
          <Reveal delay={0.3}>
            <div
              className="mt-10 rounded-3xl p-8 border"
              style={{
                background: `${ACCENT}10`,
                borderColor: `${ACCENT}30`,
              }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-bold text-white mb-2">The Core Insight</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Post-reception results showed 5/5 participants rated product quality as acceptable
                    and 5/5 found prices correct. Only 1 order was incomplete at delivery. The problem
                    was never the product. <strong style={{ color: ACCENT }}>It was the checkout bugs.</strong>{' '}
                    Fixing these four issues would address the majority of the CR satisfaction gap
                    without changing a single SKU.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          COMPETITIVE BENCHMARK
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: ACCENT }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>
                Competitive Benchmark
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How the market compares
            </h2>
            <p className="text-white/50 mb-10 max-w-2xl">
              Sessions evaluated Walmart CA against regional and global ecommerce players
              across the same Digital Tour task flow and CSAT methodology.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8 space-y-3">
              <CompetitorRow name="Competition avg." score="8.9" />
              <CompetitorRow name="PriceSmart" score="9.1" />
              <CompetitorRow name="Uber Eats" score="8.8" />
              <CompetitorRow name="Amazon" score="8.7" />
              <CompetitorRow name="WM USA" score="8.5" />
              <CompetitorRow name="WM Mexico" score="8.3" />
              <CompetitorRow name="WM Canada" score="8.2" />
              <div className="border-t border-white/08 pt-3">
                <CompetitorRow name="Walmart CA (GT)" score="8.1" />
              </div>
              <CompetitorRow name="Walmart CA (total)" score="6.4" highlight />
              <CompetitorRow name="Walmart CA (CR)" score="5.1" highlight />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          IMPACT & RECOMMENDATIONS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: 'rgba(251,191,36,0.03)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: ACCENT }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>
                Recommendations
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              Prioritized remediation roadmap
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6 border border-red-500/20">
                <div className="text-xs font-semibold tracking-wider uppercase text-red-400 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                  P0 — Immediate
                </div>
                <ul className="space-y-3 text-sm text-white/60">
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Fix frozen payment screen (CR)</li>
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Fix associate discount logic (CR + GT)</li>
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Repair 7AHORRO coupon validation (CR)</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="glass rounded-2xl p-6 border border-amber-500/20">
                <div className="text-xs font-semibold tracking-wider uppercase mb-4 flex items-center gap-2" style={{ color: ACCENT }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ACCENT }} />
                  P1 — Short term
                </div>
                <ul className="space-y-3 text-sm text-white/60">
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Rewrite tiquete/factura error message copy</li>
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Add real-time discount feedback in cart</li>
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Implement payment confirmation toast</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-white/08">
                <div className="text-xs font-semibold tracking-wider uppercase text-white/40 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
                  P2 — Medium term
                </div>
                <ul className="space-y-3 text-sm text-white/60">
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Repeat Digital Tours post-fix (CR focus)</li>
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> CSAT tracking dashboard (weekly cadence)</li>
                  <li className="flex gap-2"><span style={{ color: ACCENT }}>→</span> Competitive parity review quarterly</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Impact projection */}
          <Reveal delay={0.25}>
            <div
              className="mt-10 rounded-3xl p-8 border"
              style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}25` }}
            >
              <h3 className="font-semibold text-white mb-6">Expected impact after P0 fixes</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1" style={{ color: ACCENT }}>5.1 → 7.5+</div>
                  <div className="text-xs text-white/50">CR CSAT projection</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">+45%</div>
                  <div className="text-xs text-white/50">CR repurchase intent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1" style={{ color: ACCENT }}>0</div>
                  <div className="text-xs text-white/50">checkout abandonments from bugs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1" style={{ color: ACCENT }}>16/16</div>
                  <div className="text-xs text-white/50">discount sessions resolved</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA — Next project
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="glass rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-06 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${ACCENT} 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: ACCENT }}>
                  Next Case Study
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  OneDesk — Walmart Centroamérica
                </h2>
                <p className="text-white/50 mb-8 max-w-xl mx-auto">
                  A unified enterprise platform for warranty management, digital ticketing,
                  and fiscal document consultation across 5 roles and 3 phases.
                </p>
                <Link
                  href="/projects/onedesk"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-black transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #f59e0b)` }}
                >
                  View Case Study
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
