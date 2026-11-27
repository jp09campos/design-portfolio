'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowDownRight, Download } from 'lucide-react'
const HeroScene=dynamic(()=>import('@/components/three/HeroScene'),{ssr:false})
export default function HeroSection(){
 return <section id="home" className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-12">
  <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 items-center min-h-[65vh]">
   <div className="relative z-10">
    <p className="text-xs tracking-[.18em] uppercase text-sky-300 mb-7">José Pablo Campos / Senior Product Designer</p>
    <h1 className="font-display font-bold text-[clamp(3rem,7vw,6.8rem)] leading-[.98] tracking-[-.055em] text-white">Making complexity <span className="text-white/55">feel simple.</span></h1>
    <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/70">I design enterprise products, intuitive workflows and scalable analytics experiences at Walmart Central America.</p>
    <div className="flex flex-wrap gap-3 mt-8">
     <Link href="#projects" className="inline-flex items-center gap-3 rounded-full bg-white text-black px-6 py-3 font-medium text-sm">Explore my work <ArrowDownRight size={18}/></Link>
     <a href="/cv-jose-pablo-campos.pdf" download="CV-Jose-Pablo-Campos.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm text-white"><Download size={16}/> Download résumé</a>
    </div>
   </div>
   <div className="relative min-h-[320px] lg:min-h-[540px] rounded-3xl overflow-hidden border border-white/10 bg-[#0c1118]">
    <HeroScene/>
    <div className="absolute top-5 left-5 text-[10px] uppercase tracking-widest text-white/60 pointer-events-none">01 / Systems in motion</div>
    <div className="absolute bottom-5 right-5 text-[10px] uppercase tracking-widest text-white/60 pointer-events-none">Interactive study</div>
   </div>
  </div>
  <div className="mt-12 border-y border-white/15 py-5 flex flex-wrap justify-between gap-4 text-xs uppercase tracking-widest text-white/60"><span>Based in Costa Rica</span><span>Enterprise UX / Design systems / Data visualization</span><Link href="#contact" className="text-white">Let's connect ↗</Link></div>
 </section>
}
