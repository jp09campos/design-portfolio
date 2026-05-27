'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '@/lib/data'

const CATEGORY_COLORS: Record<string, string> = {
  Design: 'from-indigo-500 to-violet-500',
  Tools: 'from-violet-500 to-pink-500',
  Development: 'from-emerald-500 to-teal-500',
  Methodologies: 'from-amber-500 to-orange-500',
}

const PILL_HOVER: Record<string, string> = {
  Design: 'hover:border-indigo-500/40 hover:bg-indigo-500/08',
  Tools: 'hover:border-violet-500/40 hover:bg-violet-500/08',
  Development: 'hover:border-emerald-500/40 hover:bg-emerald-500/08',
  Methodologies: 'hover:border-amber-500/40 hover:bg-amber-500/08',
}

function SkillPill({ label, category, index }: { label: string; category: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className={`inline-block px-3.5 py-2 rounded-full text-sm text-white/70 bg-white/04 border border-white/08 cursor-default transition-colors ${PILL_HOVER[category] ?? ''}`}
    >
      {label}
    </motion.span>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-pink-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">
              Skills &amp; Tools
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            What I bring{' '}
            <span className="gradient-text">to the table</span>
          </h2>
        </motion.div>

        {/* Skill categories */}
        <div className="grid sm:grid-cols-2 gap-8">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: gi * 0.12 }}
              className="glass rounded-2xl p-7"
            >
              {/* Category title */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${CATEGORY_COLORS[group.category]}`} />
                <h3 className="font-display font-bold text-white text-lg">
                  {group.category}
                </h3>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <SkillPill
                    key={skill}
                    label={skill}
                    category={group.category}
                    index={gi * 10 + si}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
