'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const cases = [
 {id:'cart',name:'Abandoned cart recovery',question:'How can teams evaluate recovery journeys and recovered sales?',views:['summary','finance','categories','customers','coupons']},
 {id:'retention',name:'Customer retention',question:'How do contact channels and journey stages relate to conversion?',views:['summary','coupons','customers','items']},
 {id:'frequency',name:'Purchase frequency',question:'How does contact frequency relate to repeat purchases?',views:['summary','segments','touchpoints']},
 {id:'attribution',name:'Last-click attribution',question:'Which campaign touchpoints precede conversion?',views:['summary','details']},
 {id:'activation',name:'New customer activation',question:'How can campaigns encourage first-time e-commerce purchases?',views:['summary','customers']},
 {id:'recovery',name:'Service recovery',question:'How can teams monitor recovery after negative experiences?',views:['summary','customers']},
 {id:'coupons',name:'Automated coupons',question:'How do redemption and recovered value vary across channels?',views:['coupons']},
 {id:'loyalty',name:'Customer loyalty',question:'How do personalized event-based campaigns perform?',views:['summary']}
]
const labels: Record<string,string> = {summary:'Overview',finance:'Financial analysis',categories:'Category analysis',customers:'Customer analysis',coupons:'Coupon performance',items:'Item analysis',segments:'Segments',touchpoints:'Touchpoints',details:'Detailed analysis'}
export default function CRMAnalytics(){
 const [selected,setSelected]=useState(0)
 const [view,setView]=useState('summary')
 const dialog=useRef<HTMLDialogElement>(null)
 const current=cases[selected]
 const src='/crm-analytics/'+current.id+'-'+view+'.png'
 const [failed,setFailed]=useState(false)
 const change=(index:number)=>{setSelected(index);setView(cases[index].views[0]);setFailed(false)}
 return <main className="min-h-screen bg-[#080808] text-[#efefef]">
 <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
 <Link href="/#projects" className="text-sm text-white/70 hover:text-white">← All projects</Link>
 <motion.header initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="py-16">
 <p className="text-xs tracking-widest uppercase text-sky-400">Walmart Central America · 2025</p>
 <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-tight mt-5">CRM — Customer &amp; Campaign Intelligence</h1>
 <p className="mt-6 max-w-3xl text-lg text-white/70">A unified analytics design ecosystem for customer journeys, omnichannel campaigns and commercial performance.</p>
 </motion.header>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-white/10 py-8">
 {[[20,'Dashboard designs'],[8,'Analytical use cases'],[5,'Regional markets'],[4,'Communication channels']].map(([v,l])=><div key={l}><p className="text-4xl font-semibold text-sky-400">{v}</p><p className="text-sm text-white/70 mt-2">{l}</p></div>)}
 </div>
 <section className="py-14 grid md:grid-cols-3 gap-8">
 { [['My role','Product Designer — dashboard information architecture, visual design and high-fidelity Figma interfaces.'],['Business challenge','Translate campaign, audience and transactional requirements into consistent executive and detailed analytical views.'],['Platform context','Salesforce Marketing Cloud and Marketing Cloud Intelligence (Datorama); integrations were requirements, not verified production implementations.']].map(([h,p])=><div key={h}><h2 className="text-xs uppercase tracking-widest text-white/60 mb-3">{h}</h2><p className="leading-relaxed text-white/85">{p}</p></div>)}
 </section>
 <section className="py-12 border-t border-white/10"><h2 className="text-3xl font-display font-semibold">From business questions to analytical views</h2><p className="mt-4 text-white/70 max-w-3xl">The requirements define campaign objectives, channels, segmentation, inputs and acceptance criteria. The designs translate these into KPI summaries, prior-year comparisons, time and organizational filters, channel breakdowns and detailed tables.</p>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">{cases.map((c,i)=><button key={c.id} onClick={()=>{change(i);document.getElementById('gallery')?.scrollIntoView({block:'start'})}} className="text-left border border-white/15 rounded-xl p-5 hover:border-sky-400 focus-visible:outline focus-visible:outline-sky-400"><span className="text-xs text-sky-400">{c.views.length} views</span><h3 className="font-semibold mt-2">{c.name}</h3><p className="text-sm text-white/65 mt-2">{c.question}</p></button>)}</div></section>
 <section id="gallery" className="py-12 scroll-mt-24 border-t border-white/10"><h2 className="text-3xl font-display font-semibold">Explore the dashboard ecosystem</h2><p className="mt-3 text-white/70">Original design exports. All displayed figures and customer names are fictional demonstration data.</p>
 <label htmlFor="crm-case" className="block mt-8 text-sm text-white/70">Business use case</label><select id="crm-case" value={selected} onChange={e=>change(Number(e.target.value))} className="mt-2 w-full max-w-md bg-[#171717] border border-white/25 rounded-lg p-3">{cases.map((c,i)=><option key={c.id} value={i}>{c.name}</option>)}</select>
 <div className="flex flex-wrap gap-2 my-5">{current.views.map(v=><button key={v} aria-pressed={view===v} onClick={()=>{setView(v);setFailed(false)}} className={'rounded-full border px-4 py-2 text-sm '+(view===v?'bg-white text-black border-white':'border-white/25 text-white/80')}>{labels[v]}</button>)}</div>
 {failed?<div className="border border-white/15 rounded-xl p-12 text-center text-white/70">Dashboard image pending upload.</div>:<button onClick={()=>dialog.current?.showModal()} className="block w-full rounded-xl overflow-hidden border border-white/15 focus-visible:outline focus-visible:outline-sky-400" aria-label="Enlarge dashboard"><img key={src} src={src} alt={current.name+' — '+labels[view]+' dashboard design'} onError={()=>setFailed(true)} className="w-full h-auto" /></button>}
 <p className="text-sm text-white/60 mt-3">{current.name} · {labels[view]} · Select image to enlarge</p>
 <dialog ref={dialog} className="max-w-[96vw] max-h-[96vh] bg-[#111] text-white rounded-xl p-4 backdrop:bg-black/90"><div className="flex justify-between gap-4 mb-3"><span>{current.name} · {labels[view]}</span><button autoFocus onClick={()=>dialog.current?.close()} className="border border-white/30 rounded-full px-4 py-1">Close</button></div><img src={src} alt={current.name+' enlarged dashboard'} className="max-w-full max-h-[82vh] object-contain mx-auto"/></dialog>
 </section>
 <section className="py-12 border-t border-white/10"><h2 className="text-3xl font-display font-semibold">Consistent analytical design patterns</h2><div className="grid md:grid-cols-3 gap-6 mt-8">{[['Shared filters','Time, country, region, retail format and channel establish a consistent analytical context.'],['KPI hierarchy','Summary cards bring conversion, engagement and commercial indicators together with prior-year comparisons.'],['Progressive detail','Trend charts, channel comparisons, maps and tables support increasingly specific business questions.']].map(([h,p])=><div key={h} className="border border-white/15 rounded-xl p-6"><h3 className="font-semibold">{h}</h3><p className="mt-3 text-white/70">{p}</p></div>)}</div></section>
 <section className="py-12 border-t border-white/10"><h2 className="text-3xl font-display font-semibold">Design outcomes</h2><p className="mt-4 max-w-3xl text-white/75">Delivered 20 high-fidelity dashboard designs across eight analytical use cases. The intended value is a consistent way to investigate campaign effectiveness and customer behavior across markets. Production adoption and measured business impact have not been established here.</p></section>
 <Link href="/#projects" className="inline-block mt-8 text-white/80 hover:text-white">← Back to selected work</Link>
 </div></main>
}
