'use client'

import { useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

const EASE = [0.16, 1, 0.3, 1] as const

const HEADLINE_LINES = ['Designing digital', 'experiences', 'that matter.']

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity   = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Three.js atmospheric layer */}
      <HeroScene />

      {/* Bottom-aligned content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mt-auto pb-16 md:pb-20 px-6 max-w-7xl mx-auto w-full"
      >
        {/* Role label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="text-[12px] font-medium tracking-[0.18em] uppercase text-white/35 mb-6"
        >
          UX / UI Designer · Industrial Design Engineer
        </motion.p>

        {/* Main headline — staggered line reveal */}
        <h1 className="font-display font-bold leading-[1.0] tracking-[-0.03em] mb-10">
          {HEADLINE_LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.span
                className={`block text-[clamp(2.8rem,7.5vw,7rem)] ${
                  i === 1 ? 'text-white/38' : 'text-white'
                }`}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.05, ease: EASE, delay: 0.3 + i * 0.1 }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Sub-tagline + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <p className="text-[15px] text-white/40 max-w-xs leading-relaxed">
            Building intuitive, beautiful products — from research to pixel.
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="#projects"
              className="text-[13px] font-medium text-[#080808] bg-white px-6 py-3 rounded-full tracking-wide hover:bg-white/90 transition-colors duration-200"
            >
              View work
            </Link>
            <Link
              href="#contact"
              className="text-[13px] font-medium text-white/60 border border-white/20 px-6 py-3 rounded-full tracking-wide hover:text-white hover:border-white/40 transition-all duration-200"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 right-6 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
        />
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 [writing-mode:vertical-rl]">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
