'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE } from '@/lib/data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.2em] uppercase text-white/25 mb-4"
          >
            Experience
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.85, ease: EASE }}
              className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]"
            >
              Career
            </motion.h2>
          </div>
        </div>

        {/* Experience list */}
        <div>
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.07 }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 md:gap-8 py-8 border-t border-white/[0.07]"
            >
              {/* Period + type */}
              <div className="shrink-0">
                <p className="text-[12px] text-white/30 font-mono tabular-nums">{exp.period}</p>
                {exp.type && (
                  <p className="text-[11px] text-white/20 mt-1 tracking-wide">{exp.type}</p>
                )}
              </div>

              {/* Role + company + description */}
              <div className="min-w-0">
                <h3 className="text-[16px] font-display font-semibold text-white/85">
                  {exp.role}
                </h3>
                <p className="text-[14px] text-white/40 mt-0.5">{exp.company}</p>
                {exp.description && (
                  <p className="text-[13px] text-white/35 mt-3 leading-relaxed max-w-xl">
                    {exp.description}
                  </p>
                )}
              </div>

              {/* Tags */}
              {exp.tags && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:gap-1.5">
                  {exp.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-white/25 border border-white/[0.07] px-2.5 py-0.5 rounded-full whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/[0.07]" />
        </div>
      </div>
    </section>
  )
}
