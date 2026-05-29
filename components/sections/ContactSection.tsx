'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[0.2em] uppercase text-white/25 mb-16"
        >
          Contact
        </motion.p>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — editorial CTA */}
          <div>
            <h2 className="font-display font-bold leading-[1.0] tracking-[-0.03em] mb-10">
              {["Let's build", 'something worth', 'using.'].map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.span
                    className={`block text-[clamp(2rem,4.5vw,4rem)] ${
                      i === 1 ? 'text-white/32' : 'text-white'
                    }`}
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="mailto:jp09campos@gmail.com"
                className="text-[13px] font-medium text-[#080808] bg-white px-6 py-3 rounded-full tracking-wide hover:bg-white/90 transition-colors duration-200 text-center"
              >
                Send an email
              </Link>
              <Link
                href="https://linkedin.com/in/jp-campos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-white/60 border border-white/20 px-6 py-3 rounded-full tracking-wide hover:text-white hover:border-white/40 transition-all duration-200 text-center"
              >
                LinkedIn
              </Link>
            </motion.div>
          </div>

          {/* Right — contact details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="flex flex-col gap-8 md:pt-4"
          >
            {/* Email */}
            <div className="border-b border-white/[0.07] pb-6">
              <p className="text-[11px] tracking-[0.16em] uppercase text-white/20 mb-2">Email</p>
              <Link
                href="mailto:jp09campos@gmail.com"
                className="text-[15px] text-white/60 hover:text-white transition-colors duration-300 link-underline"
              >
                jp09campos@gmail.com
              </Link>
            </div>

            {/* Location */}
            <div className="border-b border-white/[0.07] pb-6">
              <p className="text-[11px] tracking-[0.16em] uppercase text-white/20 mb-2">Location</p>
              <p className="text-[15px] text-white/60">San José, Costa Rica</p>
            </div>

            {/* Social */}
            <div>
              <p className="text-[11px] tracking-[0.16em] uppercase text-white/20 mb-4">Social</p>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-white/40 hover:text-white/80 transition-colors duration-300 link-underline w-fit"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
