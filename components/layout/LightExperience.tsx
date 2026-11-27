'use client'
import {useEffect,useRef} from 'react'
export default function LightExperience(){
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{
 const el=ref.current,root=el?.parentElement;if(!el||!root)return
 const media=window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
 let frame=0,x=0,y=0,active=false
 const paint=()=>{frame=0;el.style.setProperty('--lx',x+'px');el.style.setProperty('--ly',y+'px');root.style.setProperty('--light-x',x+'px');root.style.setProperty('--light-y',y+'px');const target=document.elementFromPoint(x,y);const action=target?.closest('a,button,summary,[role="button"]');el.dataset.action=action?'true':'false';el.dataset.project=target?.closest('.fluid-preview')?'true':'false';el.dataset.active=active?'true':'false'}
 const move=(e:PointerEvent)=>{if(!media.matches||e.pointerType!=='mouse'){hide();return}x=e.clientX;y=e.clientY;active=true;if(!frame)frame=requestAnimationFrame(paint)}
 const hide=()=>{active=false;el.dataset.active='false';root.dataset.lighting='false'}
 const onScroll=()=>{if(active&&!frame)frame=requestAnimationFrame(paint)}
 const update=()=>{if(!media.matches)hide()}
 const onMove=(e:PointerEvent)=>{move(e);root.dataset.lighting=active?'true':'false'}
 window.addEventListener('pointermove',onMove,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});document.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);media.addEventListener('change',update)
 return()=>{cancelAnimationFrame(frame);window.removeEventListener('pointermove',onMove);window.removeEventListener('scroll',onScroll);document.removeEventListener('pointerleave',hide);window.removeEventListener('blur',hide);media.removeEventListener('change',update);delete root.dataset.lighting}
 },[])
 return <div ref={ref} aria-hidden="true" className="light-experience"><div className="light-halo"/><div className="light-reticle"><span/></div></div>
}
