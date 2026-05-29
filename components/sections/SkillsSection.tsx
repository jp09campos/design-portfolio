'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '@/lib/data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.2em] uppercase text-white/25 mb-4"
          >
            Capabilities
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.85, ease: EASE }}
              className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]"
            >
              Skills
            </motion.h2>
          </div>
        </div>

        {/* 2x2 skill grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.07]"
        >
          {SKILLS.slice(0, 4).map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="bg-[#080808] p-8"
            >
              <p className="text-[11px] tracking-[0.16em] uppercase text-white/25 mb-5">
                {skillGroup.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-[12px] text-white/50 border border-white/[0.07] px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
