'use client'

import Link from 'next/link'
import { SOCIAL_LINKS } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand + year */}
        <p className="text-[13px] text-white/30 font-display tracking-wide">
          © {year} JP Campos
        </p>

        {/* Social links */}
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-white/30 hover:text-white/70 transition-colors duration-300 tracking-wide"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
