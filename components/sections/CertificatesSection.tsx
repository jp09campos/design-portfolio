'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const CERTS = [
  {
    title: 'Creative UX/UI: User Experience, Interface & Business Design',
    issuer: 'LCI Education · Universidad Veritas',
    date: 'Feb 2024',
    image: null, // no JPEG available, use icon
    color: '#0384D5',
  },
  {
    title: 'AI for Designers',
    issuer: 'IxDF · Interaction Design Foundation',
    date: 'Jun 2024',
    image: '/certifications/AI for Designers.jpeg',
    color: '#0384D5',
  },
  {
    title: 'Curso LabDesign Project',
    issuer: 'UNIR · Universidad Internacional de La Rioja',
    date: 'Jul 2025',
    image: '/certifications/Curso LabDesign Project.jpeg',
    color: '#0384D5',
  },
]

export default function CertificatesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certificates" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.2em] uppercase text-white/25 mb-4"
          >
            Education
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.85, ease: EASE }}
              className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-white tracking-[-0.02em] leading-[1.05]"
            >
              Certificates
            </motion.h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.1 }}
              className="glass rounded-2xl border border-white/08 overflow-hidden flex flex-col"
            >
              {/* Certificate image or placeholder */}
              <div className="relative aspect-[4/3] bg-white/[0.03] flex items-center justify-center overflow-hidden">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <span className="text-[11px] text-white/20 tracking-wide uppercase">Certificate</span>
                  </div>
                )}
                {/* Date badge */}
                <span
                  className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${cert.color}20`, color: cert.color }}
                >
                  {cert.date}
                </span>
              </div>

              {/* Text */}
              <div className="p-5 flex-1 flex flex-col gap-1.5">
                <p className="text-[13px] font-semibold text-white leading-snug">{cert.title}</p>
                <p className="text-[12px] text-white/35 leading-snug">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all on LinkedIn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          className="flex justify-center"
        >
          <a
            href="https://www.linkedin.com/in/jos%C3%A9-pablo-campos-sequeira-b0a9b11bb/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-white/35 hover:text-white/70 transition-colors duration-300 border border-white/[0.07] px-5 py-2.5 rounded-full hover:border-white/20"
          >
            View all certificates on LinkedIn
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
