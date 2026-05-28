'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '@/lib/data'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-indigo-500" />
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-400">
            About Me
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <div>
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6"
            >
              Bridging the gap between{' '}
              <span className="gradient-text">design&nbsp;&amp;&nbsp;engineering</span>
            </motion.h2>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="space-y-4 text-white/55 leading-relaxed"
            >
              <p>
                I&apos;m José Pablo Campos Sequeira, a UX/UI Designer and Industrial Design Engineer
                from Costa Rica with over 5 years of experience designing digital products that
                people actually enjoy using.
              </p>
              <p>
                My background blends product thinking, human-centered research, and visual craft.
                I&apos;ve worked across fintech, e-commerce, tourism, government, and enterprise
                platforms — always with the same goal: reduce friction, increase delight, ship
                with intention.
              </p>
              <p>
                Fluent in English and Spanish, currently pursuing a Master&apos;s in User
                Experience Design at UNIR while designing enterprise tools at Walmart Central
                America.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="mt-8 space-y-3"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
                Education
              </p>
              {[
                {
                  degree: "Master's in User Experience Design",
                  school: 'UNIR',
                  year: 'Expected 2026',
                  active: true,
                },
                {
                  degree: 'Specialization in Creative UX/UI',
                  school: 'LCI Veritas',
                  year: '2024',
                  active: false,
                },
                {
                  degree: 'B.S. Industrial Design Engineering',
                  school: 'Instituto Tecnológico de Costa Rica',
                  year: '2020',
                  active: false,
                },
              ].map((edu) => (
                <div key={edu.degree} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${edu.active ? 'bg-indigo-400' : 'bg-white/20'}`} />
                  <div>
                    <span className="text-sm text-white/75 font-medium">{edu.degree}</span>
                    <span className="text-sm text-white/35"> · {edu.school}</span>
                    <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${edu.active ? 'bg-indigo-500/15 text-indigo-400' : 'text-white/30 bg-white/05'}`}>
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="flex flex-wrap gap-3 mt-8"
            >
              <a
                href="https://www.linkedin.com/in/jos%C3%A9-pablo-campos-sequeira-b0a9b11bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full glass hover:bg-white/10 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/josecamposdesigner"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full glass hover:bg-white/10 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Behance
              </a>
              <a
                href="https://www.twine.net/jp11sequeira4926/about"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full glass hover:bg-white/10 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Twine
              </a>
              <a
                href="/cv-jose-pablo-campos.pdf"
                download
                className="px-5 py-2.5 rounded-full glass hover:bg-white/10 text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </a>
            </motion.div>
          </div>

          {/* Right: stats + visual card */}
          <div className="space-y-6">
            {/* Animated stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i + 4}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? 'show' : 'hidden'}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="glass rounded-2xl p-6 card-glow"
                >
                  <div className="font-display text-4xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 font-medium tracking-wider uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Identity card */}
            <motion.div
              custom={8}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              className="glass rounded-2xl p-6 border border-indigo-500/20"
            >
              <div className="flex items-start gap-4">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg font-display shrink-0">
                  JP
                </div>
                <div>
                  <div className="font-display font-bold text-white text-base">
                    José Pablo Campos Sequeira
                  </div>
                  <div className="text-sm text-white/50 mt-0.5">
                    UX/UI Designer · Industrial Design Engineer
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-white/30">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    San José, Costa Rica
                  </div>
                </div>
              </div>

              {/* Tag row */}
              <div className="flex flex-wrap gap-2 mt-5">
                {['Figma', 'Framer', 'Next.js', 'Three.js', 'Design Thinking'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs bg-white/05 text-white/50 border border-white/08"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
