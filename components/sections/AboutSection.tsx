'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const EDITORIAL_LINES = ['I design products', 'that people enjoy', 'coming back to.']

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.2em] uppercase text-white/25 mb-16"
        >
          About
        </motion.p>

        {/* Editorial statement */}
        <div className="mb-20">
          <h2 className="font-display font-bold leading-[1.0] tracking-[-0.03em]">
            {EDITORIAL_LINES.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.span
                  className={`block text-[clamp(2.2rem,5.5vw,5rem)] ${
                    i === 1 ? 'text-white/32' : 'text-white'
                  }`}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h2>
        </div>

        {/* 3-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-white/[0.07] pt-12"
        >
          {/* Bio */}
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-white/25 mb-4">Bio</p>
            <p className="text-[14px] text-white/55 leading-relaxed">
              UX/UI Designer and Industrial Design Engineer from Costa Rica. I work at the intersection of research, strategy, and craft — designing digital products people genuinely want to use.
            </p>
            <p className="text-[14px] text-white/55 leading-relaxed mt-4">
              Currently designing enterprise tools at Walmart Global Tech. Formerly at Cecotec, Fulzer, and multiple early-stage startups.
            </p>
          </div>

          {/* Philosophy */}
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-white/25 mb-4">Philosophy</p>
            <p className="text-[14px] text-white/55 leading-relaxed">
              Good design is invisible — it removes friction rather than adds decoration. I treat every interaction as a conversation between product and user, where clarity always wins over cleverness.
            </p>
            <p className="text-[14px] text-white/55 leading-relaxed mt-4">
              I value craft, specificity, and shipping work that holds up under real conditions.
            </p>
          </div>

          {/* Education + availability */}
          <div>
            <p className="text-[11px] tracking-[0.16em] uppercase text-white/25 mb-4">Education</p>
            <p className="text-[14px] text-white/55 leading-relaxed">
              B.S. Industrial Design Engineering<br />
              <span className="text-white/30">Universidad Veritas, Costa Rica</span>
            </p>
            <div className="mt-6 pt-6 border-t border-white/[0.07]">
              <p className="text-[11px] tracking-[0.16em] uppercase text-white/25 mb-3">Availability</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-[13px] text-white/55">Open to new opportunities</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
