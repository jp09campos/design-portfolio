'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Work',       href: '#projects'   },
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.05]'
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="text-white font-display font-semibold text-sm tracking-[0.08em] uppercase">
            JP Campos
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-white/50 hover:text-white/90 transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="mailto:jp09campos@gmail.com"
              className="text-[13px] font-medium text-[#080808] bg-white px-4 py-2 rounded-full tracking-wide hover:bg-white/90 transition-colors duration-200"
            >
              Hire me
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white/70 origin-center transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-white/70"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white/70 origin-center transition-all"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#080808]/96 backdrop-blur-xl flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-3xl font-display font-semibold text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07 + 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4"
              >
                <Link
                  href="mailto:jp09campos@gmail.com"
                  onClick={() => setMobileOpen(false)}
                  className="inline-block text-[13px] font-medium text-[#080808] bg-white px-6 py-3 rounded-full tracking-wide"
                >
                  Hire me
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
