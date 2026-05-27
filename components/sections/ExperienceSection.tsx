'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE } from '@/lib/data'

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-violet-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-violet-400">
              Experience
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            A journey through{' '}
            <span className="gradient-text">purposeful work</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px timeline-line opacity-20 -translate-x-px hidden sm:block" />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => {
              const isEven = i % 2 === 0
              return (
                <ExperienceItem key={exp.id} exp={exp} index={i} isEven={isEven} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceItem({
  exp,
  index,
  isEven,
}: {
  exp: typeof EXPERIENCE[0]
  index: number
  isEven: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative grid md:grid-cols-2 gap-8 md:gap-16 ${
        isEven ? '' : 'md:direction-rtl'
      }`}
    >
      {/* Dot on center line */}
      <div className="hidden sm:block absolute left-6 md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1.5 z-10">
        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${exp.color}`} />
      </div>

      {/* Content card - alternates sides on desktop */}
      <div className={isEven ? 'md:col-start-1' : 'md:col-start-2'}>
        <motion.div
          whileHover={{ y: -4 }}
          className="glass rounded-2xl p-6 card-glow border border-white/05 hover:border-white/10 transition-colors"
        >
          {/* Top: role, period, type badge */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-display font-bold text-white text-lg leading-tight">
                {exp.role}
              </h3>
              <p className={`text-sm font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mt-0.5`}>
                {exp.company}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-xs text-white/30 bg-white/05 px-2.5 py-1 rounded-full border border-white/08 whitespace-nowrap">
                {exp.period}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                exp.type === 'full-time'
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                  : 'bg-pink-500/15 text-pink-300 border border-pink-500/20'
              }`}>
                {exp.type === 'full-time' ? 'Full-time' : 'Freelance'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed mb-4">
            {exp.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs text-white/40 bg-white/04 border border-white/08"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Empty column for staggered layout */}
      <div className={isEven ? 'md:col-start-2 hidden md:block' : 'md:col-start-1 hidden md:block'} />
    </motion.div>
  )
}
