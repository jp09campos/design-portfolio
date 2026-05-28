'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '@/lib/data'

/* Projects that have a dedicated case study page */
const PROJECT_ROUTES: Record<string, string> = {
  'onedesk': '/projects/onedesk',
  'cecoapp': '/projects/cecoapp',
  'art-city-tour': '/projects/art-city-tour',
  'art-city-tour-nav': '/projects/art-city-tour-nav',
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const href = PROJECT_ROUTES[project.id]

  const inner = (
    <>
      {/* Gradient top strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

      {/* Icon + year badge */}
      <div className={`relative overflow-hidden p-8 pb-4 bg-gradient-to-br ${project.bgGradient}`}>
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{project.icon}</span>
          <span className="text-xs text-white/30 font-medium tracking-wider bg-white/05 px-2.5 py-1 rounded-full border border-white/08">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-white leading-tight mb-1">
          {project.title}
        </h3>
        <p className="text-xs text-white/40 font-medium tracking-wide mb-4">
          {project.category}
        </p>

        {/* Description */}
        <p className="text-sm text-white/55 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="px-8 pb-6 pt-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs text-white/40 bg-white/04 border border-white/08"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay arrow */}
      <div className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* "Case Study" badge for linked projects */}
      {href && (
        <div className="absolute top-5 right-5">
          <span className="text-xs font-semibold tracking-wider uppercase text-white/50 px-2.5 py-1 rounded-full bg-white/08 border border-white/10">
            Case Study →
          </span>
        </div>
      )}
    </>
  )

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      whileHover={{ y: -6 }}
      className="group relative glass rounded-3xl overflow-hidden card-glow cursor-pointer"
    >
      {href ? (
        <Link href={href} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400">
              Selected Work
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Projects that{' '}
            <span className="gradient-text">define my craft</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
