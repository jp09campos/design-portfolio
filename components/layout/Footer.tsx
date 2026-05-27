'use client'

import { motion } from 'framer-motion'
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

const TwineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13v6l5 3-1-1.732L11 13V7H11z" />
  </svg>
)

const ICON_MAP: Record<string, React.ComponentType> = {
  linkedin: LinkedInIcon,
  behance: BehanceIcon,
  twine: TwineIcon,
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/08 bg-[#0a0a0a] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-bold text-lg">
            <span className="gradient-text">JP</span>
            <span className="text-white/60 font-light"> Campos</span>
          </span>
          <p className="text-xs text-white/30">
            UX/UI Designer · Costa Rica · {year}
          </p>
        </div>

        {/* Center: quick links */}
        <div className="flex items-center gap-6 text-xs text-white/40">
          {['Work', 'About', 'Contact'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${label.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-white/80 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right: social links */}
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((link) => {
            const Icon = ICON_MAP[link.icon]
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <Icon />
              </motion.a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
