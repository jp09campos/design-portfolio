'use client'
import { useState, useRef } from 'react'
const recommendations=[
{name:'Carolina Bolaños',role:'Senior UX Designer · Product Designer · Industrial Design Engineer',date:'July 28, 2025',translated:true,quote:'Since joining the team, José has demonstrated a strong ability to align business objectives with functional, accessible and intuitive user experiences. His structured approach, attention to detail and proactive attitude make him a highly valuable member of our team. He also stands out for his commitment to continuous learning and his ability to collaborate with multidisciplinary teams. He has clear professional goals and works consistently to achieve them.'},
{name:'Mary Yong',role:'UX/UI Designer',date:'July 22, 2025',translated:false,quote:'I had the opportunity to work with José Pablo during my time at Walmart, and I can say with full confidence that he is a passionate and dedicated designer. He approaches every project with commitment and isn’t afraid to take on new challenges. He adapts quickly, learns incredibly fast, and knows how to make the most of every tool at his disposal. He is truly a professional who makes a difference in any team.'},
{name:'Eugenia Solano Alvarez',role:'Financial Consulting · Corporate Banking · Credit Risk',date:'July 23, 2025',translated:true,quote:'I worked with José Pablo and witnessed his strong commitment to his work, not only through his dedication, commitment and excellent results, but also through his human qualities, respect and service toward colleagues and supervisors. José Pablo always goes beyond expectations and is constantly learning, which is reflected in his work. Having him on a team is definitely a competitive advantage. I wish him great success in his career and hope to see him go very far.'}
]
export default function RecommendationsSection(){
 const [index,setIndex]=useState(0)
 const start=useRef<{x:number,y:number}|null>(null)
 const move=(delta:number)=>setIndex(i=>(i+delta+recommendations.length)%recommendations.length)
 const r=recommendations[index]
 return <section id="recommendations" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
 <p className="text-xs uppercase tracking-widest text-sky-300 mb-4">Professional recommendations</p>
 <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] tracking-tight leading-tight">Good design starts with good collaboration.</h2>
 <p className="mt-4 text-white/65">Perspectives from people I have worked with.</p>
 <div className="mt-10 rounded-2xl border border-white/15 p-6 md:p-10 bg-white/[.025]" style={{touchAction:'pan-y pinch-zoom'}} onPointerDown={e=>{if(e.pointerType==='touch')start.current={x:e.clientX,y:e.clientY}}} onPointerCancel={()=>{start.current=null}} onPointerUp={e=>{const s=start.current;start.current=null;if(s&&Math.abs(e.clientX-s.x)>55&&Math.abs(e.clientX-s.x)>Math.abs(e.clientY-s.y))move(e.clientX<s.x?1:-1)}}>
 <div aria-live="polite"><span aria-hidden="true" className="text-5xl text-sky-300">“</span><blockquote className="text-lg md:text-2xl leading-relaxed text-white/90 max-w-4xl">{r.quote}</blockquote><div className="mt-8 border-t border-white/10 pt-6"><p className="font-semibold">{r.name}</p><p className="text-sm text-white/65 mt-1">{r.role}</p><p className="text-xs text-white/60 mt-2">{r.date} · Former or current teammate{r.translated?' · Translated from Spanish':''}</p></div></div>
 <div className="mt-8 flex items-center justify-between gap-4"><span className="text-sm text-white/65">{index+1} / {recommendations.length}</span><div className="flex gap-2"><button aria-label="Previous recommendation" onClick={()=>move(-1)} className="rounded-full border border-white/30 w-12 h-12 hover:bg-white hover:text-black">←</button><button aria-label="Next recommendation" onClick={()=>move(1)} className="rounded-full border border-white/30 w-12 h-12 hover:bg-white hover:text-black">→</button></div></div>
 </div><a href="https://www.linkedin.com/in/jose-pablo-campos-sequeira-b0a9b11bb/details/recommendations/" target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm text-sky-300 hover:underline">Read original LinkedIn recommendations ↗</a>
 </section>
}
