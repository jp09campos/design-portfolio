import Link from 'next/link'
import { ArrowDownRight, Download } from 'lucide-react'
export default function HeroSection(){
return <section id="home" className="max-w-7xl mx-auto px-6 pt-32 md:pt-44 pb-12">
<p className="text-xs uppercase tracking-[.18em] text-sky-300 mb-7">José Pablo Campos / Senior Product Designer</p>
<h1 className="font-display font-bold text-[clamp(3rem,7vw,7rem)] leading-[1.02] tracking-[-.055em] max-w-5xl">Making complexity <span className="text-white/55">feel simple.</span></h1>
<div className="mt-8 flex flex-wrap items-end justify-between gap-6"><p className="max-w-xl text-lg leading-relaxed text-white/75">I connect business strategy, user research and design systems to create intuitive enterprise products. Currently designing at Walmart Central America.</p><div className="flex flex-wrap gap-3"><Link href="#projects" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium">Explore my work <ArrowDownRight size={18}/></Link><a href="/cv-jose-pablo-campos.pdf" download className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm"><Download size={16}/> Résumé</a></div></div>
<div className="mt-12 border-y border-white/15 py-5 flex flex-wrap justify-between gap-4 text-xs uppercase tracking-widest text-white/65"><span>Based in Costa Rica</span><span>Enterprise UX / Design systems / Analytics</span><Link href="#contact">Let's connect ↗</Link></div>
</section>}
