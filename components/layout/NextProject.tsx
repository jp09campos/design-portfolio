import Link from 'next/link'
import { PROJECTS } from '@/lib/data'

export default function NextProject({ currentId }: { currentId: string }) {
  const index = PROJECTS.findIndex(project => project.id === currentId)
  if (index < 0 || PROJECTS.length < 2) return null
  const next = PROJECTS[(index + 1) % PROJECTS.length]
  return (
    <nav aria-label="Next project">
      <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">Next Project</p>
      <Link href={'/projects/' + next.id} className="group flex items-center justify-between gap-4 py-4 border-t border-white/[0.07] hover:border-white/[0.14] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        <div className="min-w-0">
          <p className="font-display font-bold text-white text-lg">{next.title}</p>
          <p className="text-sm text-white/60">{next.category}</p>
        </div>
        <span aria-hidden="true" className="shrink-0 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all text-lg">→</span>
      </Link>
    </nav>
  )
}
