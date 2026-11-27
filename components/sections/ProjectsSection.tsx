'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '@/lib/data'

const EASE = [0.16, 1, 0.3, 1] as const

const CASE_STUDY_HIGHLIGHTS: Record<string, string> = {
  onedesk: '3 operational modules · 5 user roles · $434K annual savings target',
  cecoapp: 'Master’s project · 31 card sorting participants · 4 validated journeys',
  'ecommerce-wm': '16 research sessions · 4 critical checkout issues identified',
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number]
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/projects/${project.id}`} className="block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        <motion.div
          className={`group flex items-center gap-3 md:gap-6 py-6 border-t border-white/[0.07] cursor-pointer transition-colors duration-300 ${
            hovered ? 'bg-white/[0.022]' : ''
          } px-4 -mx-4 rounded-sm`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
        >
          {/* Index */}
          <span className="text-[11px] text-white/50 font-mono w-8 shrink-0 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title + category */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[18px] md:text-[22px] font-display font-semibold text-white/85 group-hover:text-white transition-colors duration-300 break-words">
              {project.title}
            </h3>
            <p className="text-[12px] text-white/50 mt-0.5">{project.category}</p>
            {CASE_STUDY_HIGHLIGHTS[project.id] && (
              <p className="mt-2 text-[12px] leading-relaxed text-white/65">{CASE_STUDY_HIGHLIGHTS[project.id]}</p>
            )}
          </div>

          {/* Year + tags + arrow */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <span className="text-[12px] text-white/50 font-mono tabular-nums">{project.year}</span>
            <div className="flex gap-2">
              {project.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-white/60 border border-white/[0.15] px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-white/30 group-hover:text-white/70 transition-colors text-sm"
            >
              →
            </motion.span>
          </div>

          {/* Mobile arrow */}
          <span className="md:hidden text-white/25 text-sm shrink-0">→</span>
        </motion.div>
      </Link>
    </div>
  )
}

export default function ProjectsSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.2em] uppercase text-white/60 mb-4"
          >
            Selected Work
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.85, ease: EASE }}
              className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]"
            >
              Projects
            </motion.h2>
          </div>
        </div>

        {/* Project list */}
        <div className="relative">
          {PROJECTS.slice(0, 3).map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
          <h3 className="mt-12 mb-4 text-sm font-medium tracking-widest uppercase text-white/60">Earlier work</h3>
          {PROJECTS.slice(3).map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i + 3} />
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/[0.07]" />
        </div>
      </div>
    </section>
  )
}
