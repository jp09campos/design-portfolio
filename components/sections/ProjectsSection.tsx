import Link from 'next/link'
import { PROJECTS } from '@/lib/data'
const covers: Record<string,string> = {'onedesk':'/onedesk-walmart-media-files/mockup-1.png','crm-analytics':'/crm-analytics/cart-summary.png','cecoapp':'/cecoapp-media-files/mockup-1.png'}
const highlights: Record<string,string> = {onedesk:'3 operational modules · 5 user roles','crm-analytics':'20 dashboards · 8 business use cases',cecoapp:'31 card sorting participants · 4 tested journeys','ecommerce-wm':'16 research sessions · 4 checkout issues'}
export default function ProjectsSection(){
 return <section id="projects" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
 <div className="flex flex-wrap items-end justify-between gap-5 mb-12"><div><p className="text-xs uppercase tracking-widest text-sky-300 mb-4">02 / Selected work</p><h2 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] tracking-tight leading-none">Design in practice.</h2></div><p className="max-w-xs text-white/65 text-sm leading-relaxed">Complex challenges, thoughtful systems and evidence-led experiences.</p></div>
 <div className="grid md:grid-cols-2 gap-x-6 gap-y-12">
 {PROJECTS.slice(0,4).map((p,i)=><Link key={p.id} href={'/projects/'+p.id} className="group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
 <div className={'relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br '+p.bgGradient}>
 {covers[p.id]?<img src={covers[p.id]} alt={p.title+' project preview'} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-contain p-5 transition-transform duration-500 motion-safe:group-hover:scale-105"/>:<div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12"><span className="text-xs tracking-widest uppercase text-amber-300">Research / Two markets</span><div className="mt-5 text-[clamp(2.5rem,6vw,5rem)] font-display font-bold text-white">6.4 <span className="text-white/50">/ 8.9</span></div><p className="mt-2 text-sm text-white/70">CSAT vs. competitive benchmark</p><div className="mt-6 h-px bg-white/25"/></div>}
 <span className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white">{String(i+1).padStart(2,'0')}</span>
 </div>
 <div className="mt-5 flex items-start justify-between gap-4"><div><p className="text-xs text-white/60">{p.category} · {p.year}</p><h3 className="mt-2 font-display font-semibold text-2xl">{p.title}</h3><p className="mt-2 text-sm text-white/65">{highlights[p.id]}</p></div><span className="rounded-full border border-white/20 p-3 group-hover:bg-white group-hover:text-black transition-colors shrink-0" aria-hidden="true">↗</span></div>
 </Link>)}
 </div>
 <h3 className="mt-20 mb-5 text-xs tracking-widest uppercase text-white/60">Earlier work / 2022–2023</h3>
 {PROJECTS.slice(4).map(p=><Link key={p.id} href={'/projects/'+p.id} className="flex items-center justify-between gap-4 border-t border-white/15 py-5 hover:text-sky-300"><div><h4 className="font-display text-xl font-semibold">{p.title}</h4><p className="text-sm text-white/60 mt-1">{p.category}</p></div><span aria-hidden="true">↗</span></Link>)}
 </section>
}
