'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { PROJECTS } from '@/lib/data'

const EASE = [0.16, 1, 0.3, 1] as const

// Map project ids → preview images
const PROJECT_PREVIEWS: Record<string, string> = {
  'onedesk':          '/onedesk-walmart-media-files/mockup-1.png',
  'cecoapp':          '/cecoapp-media-files/mockup-1.png',
  'art-city-tour':    '/sjo-turismo-media-files/mockup-1.png',
  'art-city-tour-nav':'/art-city-tour-media-files/mockup-1.png',
  'fulzer':           '/fulzer-media-files/graphic-1.png',
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const rowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return
    const rect = rowRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const previewSrc = PROJECT_PREVIEWS[project.id]

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      <Link href={`/projects/${project.id}`}>
        <motion.div
          className={`group flex items-center gap-6 py-6 border-t border-white/[0.07] cursor-pointer transition-colors duration-300 ${
            hovered ? 'bg-white/[0.022]' : ''
          } px-4 -mx-4 rounded-sm`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
        >
          {/* Index */}
          <span className="text-[11px] text-white/20 font-mono w-8 shrink-0 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title + category */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[18px] md:text-[22px] font-display font-semibold text-white/85 group-hover:text-white transition-colors duration-300 truncate">
              {project.title}
            </h3>
            <p className="text-[12px] text-white/30 mt-0.5 truncate">{project.category}</p>
          </div>

          {/* Year + tags + arrow */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <span className="text-[12px] text-white/25 font-mono tabular-nums">{project.year}</span>
            <div className="flex gap-2">
              {project.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-white/30 border border-white/[0.08] px-2.5 py-0.5 rounded-full"
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

      {/* Floating image preview — xl only */}
      <AnimatePresence>
        {hovered && previewSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 6 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="hidden xl:block absolute pointer-events-none z-30"
            style={{
              left: mousePos.x + 24,
              top: mousePos.y - 90,
            }}
          >
            <div className="w-72 h-44 rounded-xl overflow-hidden border border-white/[0.09] shadow-2xl shadow-black/60">
              <Image
                src={previewSrc}
                alt={project.title}
                fill
                className="object-cover"
                sizes="288px"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
            className="text-[11px] tracking-[0.2em] uppercase text-white/25 mb-4"
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
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/[0.07]" />
        </div>
      </div>
    </section>
  )
}
