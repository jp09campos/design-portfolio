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
        <div className="flex-1 w-px mt-2" style={{ background: `linear-gradient(to bottom, ${accent}60, transparent)` }} />
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
        <div className="glass rounded-xl p-4 border border-indigo-500/20">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: accent }}>Output</p>
          <p className="text-sm text-white/60 leading-relaxed">{result}</p>
        </div>
      </div>
    </div>
  )
}

export default function CECOAppCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 60])

  const accent = '#818cf8'

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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[120px]" style={{ background: `${accent}0e` }} />
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
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">2023</span>
            <span className="text-xs text-white/30 px-2.5 py-1 rounded-full glass border border-white/08">Cecotec · Spain</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            CECOApp<br />
            <span style={{
              background: `linear-gradient(135deg, ${accent}, #c4b5fd, #e9d5ff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Mobile E-commerce
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-lg mb-8 max-w-2xl"
          >
            Designing the first mobile app for Cecotec — a home appliances brand generating €510M in annual
            sales with zero mobile presence. Bridging the digital gap through research, prototyping, and
            user validation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {['Mobile UX', 'Double Diamond', 'Atomic Design', 'E-commerce', 'Usability Testing', 'Card Sorting'].map((tag) => (
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
              { value: '€510M', label: 'Annual Sales (No App)' },
              { value: '7', label: 'Usability Testers' },
              { value: '4', label: 'Product Pillars' },
              { value: '3', label: 'User Personas' },
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
                  Closing the mobile gap for a<br />€510M brand
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Cecotec generated more than €510 million in annual sales operating exclusively from the web.
                  The problem wasn&apos;t brand visibility — it was the absence of a mobile channel that could
                  accompany the user from product discovery through post-sale, at a moment when m-commerce
                  was already the primary digital shopping channel.
                </p>
                <p className="text-white/60 leading-relaxed">
                  This translated into low user loyalty, reduced digital conversion, and a growing competitive
                  disadvantage against brands with their own app.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">The Challenge</p>
                  <p className="text-white/70 text-sm leading-relaxed italic">
                    &ldquo;How do you design a first mobile app that doesn&apos;t just replicate the web — but builds
                    active loyalty with the user?&rdquo;
                  </p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Brand</p>
                  <p className="text-white/70 text-sm">Cecotec</p>
                  <p className="text-white/40 text-xs mt-1">Home Appliances · Spain</p>
                  <p className="text-white/40 text-xs">€510M+ Annual Revenue · No prior mobile app</p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Google Forms', 'Atomic Design', 'Double Diamond'].map((tool) => (
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
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Double Diamond — Design Process</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-16">
              Four phases,{' '}
              <span style={{
                background: `linear-gradient(135deg, ${accent}, #c4b5fd)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                one validated prototype
              </span>
            </h2>
          </Reveal>

          <div className="max-w-2xl">
            <Reveal delay={0.05}>
              <PhaseStep
                number="01"
                title="Discovery"
                accent={accent}
                activities={[
                  'Online surveys to map user behavior and purchase motivations',
                  'Semi-structured interviews to understand emotional drivers and pain points',
                  'Analysis of existing Cecotec web user journeys',
                  'Identification of key moments in the purchase cycle where mobile adds unique value',
                ]}
                result="Clear picture of user needs, motivations, and the specific moments where a mobile app creates more value than the web — especially for reordering, tracking, and loyalty."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <PhaseStep
                number="02"
                title="Definition"
                accent={accent}
                activities={[
                  'Benchmarking against leading e-commerce apps (Amazon, Zalando, Leroy Merlin)',
                  'Non-moderated card sorting to understand user mental models for category groupings',
                  '3 card sorting groupings emerged: Home & Appliances, Fitness & Personal Care, Home Maintenance',
                  'Definition of 3 user personas: Ejecutiva Exigente, Comprador Técnico, Usuario Tradicional',
                  'Feature prioritization matrix balancing user need, business value, and technical effort',
                ]}
                result="Information architecture validated against real user mental models — not replicated from the existing web structure. 3 clear navigation categories supported by card sorting data."
              />
            </Reveal>

            <Reveal delay={0.15}>
              <PhaseStep
                number="03"
                title="Development"
                accent={accent}
                activities={[
                  'Low-fidelity wireframes for all primary flows',
                  'Atomic Design system: Atoms → Molecules → Organisms → Templates → Pages',
                  'High-fidelity prototype covering all 4 product pillars',
                  'Interactive prototype built in Figma with real navigation flows',
                  'Accessibility and visual hierarchy review across all screens',
                ]}
                result="Complete high-fidelity interactive prototype with real purchase flows, order tracking, and community content (CecoClips) — ready for usability validation."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <PhaseStep
                number="04"
                title="Delivery"
                accent={accent}
                activities={[
                  'Moderated usability test with 7 participants covering all 3 personas',
                  'Tasks: product search, add to cart, checkout, order tracking, CecoClips',
                  'Friction identified in visual hierarchy, accessibility, and key action prioritization',
                  'All issues resolved in the prototype before final delivery',
                  'Final design system delivered with annotated specs for development handoff',
                ]}
                result="Functional prototype with validated purchase, tracking, and community flows — all usability frictions resolved. Zero unresolved issues at delivery."
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-12">
              Three profiles, one consistent experience
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ejecutiva Exigente',
                emoji: '👩‍💼',
                desc: 'Busy professional. Values speed, reliability, and premium feel. Judges the app by how fast she can reorder or track a delivery.',
                priorities: ['Quick reorder', 'Order tracking', 'Clean UI'],
                color: accent,
              },
              {
                name: 'Comprador Técnico',
                emoji: '🔧',
                desc: 'Researches specs in detail before buying. Reads all reviews. Wants complete product information and comparison tools.',
                priorities: ['Product details', 'Comparisons', 'Reviews'],
                color: '#c4b5fd',
              },
              {
                name: 'Usuario Tradicional',
                emoji: '🧑‍🦳',
                desc: 'Less experienced with mobile apps. Needs clear navigation, large touch targets, and guided flows without surprises.',
                priorities: ['Simple navigation', 'Accessibility', 'Clear CTAs'],
                color: '#e9d5ff',
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/08 h-full">
                  <span className="text-4xl mb-4 block">{p.emoji}</span>
                  <h3 className="font-display font-bold text-white text-lg mb-3">{p.name}</h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">{p.desc}</p>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-2">Priorities</p>
                    <div className="flex flex-wrap gap-2">
                      {p.priorities.map((pr) => (
                        <span key={pr} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${p.color}15`, color: p.color }}>
                          {pr}
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

      {/* Solution — 4 Pillars */}
      <section className="py-20 border-t border-white/06">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px" style={{ background: accent }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Solution</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              CECOApp — four pillars
            </h2>
            <p className="text-white/50 text-sm max-w-xl mb-12 leading-relaxed">
              The app was structured around four core pillars that address the full post-sale lifecycle,
              from discovery through community.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: '01',
                title: 'Product Discovery',
                desc: 'Personalized home feed, category browsing based on card sorting data (Home & Appliances, Fitness, Home Maintenance), and smart search with filters.',
                icon: '🔍',
                color: accent,
              },
              {
                number: '02',
                title: 'Simple & Efficient Purchase',
                desc: 'Streamlined checkout flow, saved addresses and payment methods, one-tap reorder. Designed to reduce friction for the Ejecutiva Exigente persona.',
                icon: '🛒',
                color: '#c4b5fd',
              },
              {
                number: '03',
                title: 'Real-Time Order Tracking',
                desc: 'Live order status updates, estimated delivery times, and push notifications. Eliminates the need to contact customer support for delivery status.',
                icon: '📦',
                color: '#e9d5ff',
              },
              {
                number: '04',
                title: 'CecoClips',
                desc: 'Community content module — short videos and reviews from real users showing products in context. Designed for active user retention and loyalty building.',
                icon: '🎬',
                color: '#f9a8d4',
              },
            ].map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/08">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${pillar.color}15` }}>
                      {pillar.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold" style={{ color: pillar.color }}>{pillar.number}</span>
                        <h3 className="font-semibold text-white">{pillar.title}</h3>
                      </div>
                      <p className="text-sm text-white/55 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Navigation structure */}
          <Reveal delay={0.15}>
            <div className="mt-8 glass rounded-2xl p-6 border border-white/08">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Navigation Structure</p>
              <p className="text-sm text-white/50 mb-5 leading-relaxed">
                Tab bar with 3 content categories validated by card sorting — not replicated from the web structure.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { tab: 'Hogar & Electrodomésticos', icon: '🏠', desc: 'Major appliances, kitchen, cleaning, climate' },
                  { tab: 'Fitness & Cuidado Personal', icon: '💪', desc: 'Sports equipment, personal care, health' },
                  { tab: 'Mantenimiento del Hogar', icon: '🔨', desc: 'Tools, garden, DIY, maintenance' },
                ].map((item) => (
                  <div key={item.tab} className="rounded-xl p-4 bg-white/03 border border-white/06">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-sm font-semibold text-white mb-1">{item.tab}</p>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
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
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>Design Decision</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  What we didn&apos;t choose
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Basing the architecture on the existing web navigation structure would have been the fastest path.
                  It was evaluated and explicitly rejected.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Benchmarking and card sorting revealed that the mobile user&apos;s mental model was distinctly
                  different from the web&apos;s. We traded immediate consistency with the existing platform for
                  clarity and reduced friction in the mobile context.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 border border-rose-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-2 h-2 rounded-full bg-rose-500/60 shrink-0" />
                    <p className="text-sm font-semibold text-rose-400">Discarded</p>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Mirror the existing Cecotec web navigation structure for the mobile app architecture.
                  </p>
                </div>

                <div className="glass rounded-2xl p-6 border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500/60 shrink-0" />
                    <p className="text-sm font-semibold text-emerald-400">Chosen</p>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Design the information architecture from scratch based on the 3 groupings that emerged from
                    non-moderated card sorting with real users — aligned with mobile mental models, not desktop ones.
                  </p>
                </div>

                <div className="glass rounded-xl p-4 border border-white/08">
                  <p className="text-xs text-white/40 leading-relaxed">
                    <span className="text-white/70 font-medium">Why it mattered: </span>
                    Mobile users browse by lifestyle context (fitness, home improvement) — not by product taxonomy.
                    The web structure optimized for SEO and catalog depth, not for how people think about their needs.
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
                label: 'Unresolved Frictions',
                desc: 'All visual hierarchy, accessibility, and CTA prioritization issues identified in usability testing were resolved before final delivery.',
                color: '#34d399',
              },
              {
                value: '4',
                label: 'Validated Flows',
                desc: 'Purchase, order tracking, product search, and CecoClips flows all validated with real users across 3 distinct personas.',
                color: accent,
              },
              {
                value: '✓',
                label: 'Dev-Ready Handoff',
                desc: 'Complete Atomic Design system and annotated Figma prototype delivered as functional specification — ready for development without ambiguity.',
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
                  See the full prototype on Figma
                </h2>
                <p className="text-white/50 text-sm">Complete flows, design system, and annotated specs available upon request.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: `linear-gradient(135deg, ${accent}, #7c3aed)` }}
                >
                  Request access
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
              <Link href="/projects/sjo-turismo" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}>
                  🏛️
                </div>
                <div>
                  <p className="font-display font-bold text-white text-lg group-hover:text-pink-400 transition-colors">SJO Turismo App — Redesign</p>
                  <p className="text-sm text-white/40">Mobile UX · UX Research · Tourism</p>
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
