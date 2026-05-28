'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/data'

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.336.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-.154 1.37s-.985.64-1.593.8c-.61.16-1.26.24-1.945.24H0V4.51h6.938v-.007zm-.4 5.77c.595 0 1.077-.14 1.45-.42.37-.28.557-.73.557-1.35 0-.34-.07-.62-.2-.85-.14-.23-.32-.4-.56-.54-.24-.13-.51-.22-.82-.26-.31-.04-.63-.06-.96-.06H3.24v3.48h3.3zm.2 6.03c.37 0 .72-.04 1.05-.1.33-.07.62-.18.87-.34.25-.16.44-.38.59-.65.14-.27.21-.62.21-1.05 0-.84-.23-1.44-.68-1.79-.46-.36-1.07-.54-1.84-.54H3.24v4.48h3.5zm10.35-9.3h5.91v1.35h-5.91V7.003zm-1.17 5.76c0-.7.14-1.33.41-1.87.28-.54.66-1 1.14-1.37.48-.37 1.04-.65 1.67-.84.63-.19 1.29-.29 1.98-.29.68 0 1.32.1 1.94.3.62.2 1.16.49 1.62.87.46.38.83.84 1.09 1.38.27.54.4 1.16.4 1.86v1.02h-8.05c.03.84.25 1.48.67 1.93.42.45 1.04.67 1.87.67.62 0 1.14-.14 1.57-.43.43-.28.7-.7.8-1.24h2.2c-.3 1.28-.9 2.2-1.8 2.77-.9.57-1.97.85-3.2.85-.73 0-1.4-.11-2.01-.34-.61-.23-1.13-.55-1.56-.97-.43-.42-.76-.94-.98-1.54-.22-.61-.33-1.28-.33-2.01v-.5zm7.63-.9c-.03-.7-.25-1.27-.65-1.7-.4-.43-.95-.64-1.63-.64-.37 0-.7.06-.99.18-.28.12-.52.28-.72.49-.2.21-.35.45-.46.73-.1.28-.16.56-.18.87h4.63l.05.07z" />
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const ICON_MAP: Record<string, React.ComponentType> = {
  linkedin: LinkedInIcon,
  behance: BehanceIcon,
  twine: GlobeIcon,
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Build mailto link as a simple form action
    const subject = encodeURIComponent(`Portfolio contact from ${formState.name}`)
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)
    window.open(`mailto:j.p11sequeira@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-pink-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-pink-400">
              Get in Touch
            </span>
            <span className="w-8 h-px bg-pink-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
            Let&apos;s build something{' '}
            <span className="gradient-text">amazing together</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            Have a project in mind? I&apos;m always open to discussing design work, collaborations,
            or creative challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div className="glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-xl text-white">Message sent!</h3>
                <p className="text-white/40 text-sm">Your email client should have opened. I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs text-white/40 font-medium tracking-wider uppercase mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/05 border border-white/10 text-white placeholder-white/20 text-sm outline-none focus:border-indigo-500/50 focus:bg-indigo-500/05 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-white/40 font-medium tracking-wider uppercase mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/05 border border-white/10 text-white placeholder-white/20 text-sm outline-none focus:border-indigo-500/50 focus:bg-indigo-500/05 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs text-white/40 font-medium tracking-wider uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/05 border border-white/10 text-white placeholder-white/20 text-sm outline-none focus:border-indigo-500/50 focus:bg-indigo-500/05 transition-colors resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm tracking-wide transition-colors shadow-[0_0_30px_rgba(99,102,241,0.25)]"
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right: contact info + social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Direct email */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">
                Direct Email
              </p>
              <a
                href="mailto:j.p11sequeira@gmail.com"
                className="text-white/80 hover:text-white transition-colors text-lg font-medium font-display"
              >
                j.p11sequeira@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">
                Location
              </p>
              <p className="text-white/70 font-medium">San José, Costa Rica</p>
              <p className="text-white/30 text-sm mt-1">Available for remote work worldwide</p>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-4">
                Find me online
              </p>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = ICON_MAP[link.icon]
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
                    >
                      <span className="w-9 h-9 rounded-full bg-white/05 border border-white/08 flex items-center justify-center group-hover:border-white/20 transition-colors">
                        <Icon />
                      </span>
                      <span className="font-medium text-sm">{link.name}</span>
                      <svg className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
