'use client'
import {useEffect,useRef} from 'react'
import * as THREE from 'three'
export default function FluidArtwork(){
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{
 const el=ref.current;if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return
 let renderer:THREE.WebGLRenderer;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true})}catch{return}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));el.appendChild(renderer.domElement)
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.1,50);camera.position.z=7
 const group=new THREE.Group();scene.add(group)
 const geo=new THREE.TorusGeometry(1.05,.16,24,96)
 const mat=new THREE.MeshPhysicalMaterial({color:0xa6c6e9,metalness:.45,roughness:.19,clearcoat:1,clearcoatRoughness:.12})
 const rings=Array.from({length:4},(_,i)=>{const mesh=new THREE.Mesh(geo,mat);mesh.rotation.set(i*.62,i*.78,i*.25);group.add(mesh);return mesh})
 scene.add(new THREE.HemisphereLight(0xddeeff,0x263a63,2.5))
 const light=new THREE.DirectionalLight(0xffffff,4);light.position.set(-3,4,5);scene.add(light)
 const rim=new THREE.DirectionalLight(0x6d9fff,5);rim.position.set(4,-2,-2);scene.add(rim)
 let x=0,y=0,scroll=0,visible=true,frame=0
 const move=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;x=e.clientX/innerWidth-.5;y=e.clientY/innerHeight-.5}
 const onScroll=()=>{scroll=Math.min(1,Math.max(0,-el.getBoundingClientRect().top/Math.max(1,innerHeight)))}
 const resize=()=>{const w=Math.max(1,el.clientWidth),h=Math.max(1,el.clientHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)}
 const ro=new ResizeObserver(resize);ro.observe(el);resize()
 const io=new IntersectionObserver(e=>{visible=e[0]?.isIntersecting??false});io.observe(el)
 window.addEventListener('pointermove',move,{passive:true});window.addEventListener('scroll',onScroll,{passive:true})
 const draw=(ms:number)=>{frame=requestAnimationFrame(draw);if(!visible||document.hidden)return;const t=ms*.001;group.rotation.y+=(x*.8+scroll*.9+Math.sin(t*.35)*.25-group.rotation.y)*.045;group.rotation.x+=(y*.6+.3-group.rotation.x)*.045;rings.forEach((m,i)=>{m.rotation.z=i*.25+t*(i%2?-.15:.12);m.position.z=Math.sin(t*.65+i)*.15});renderer.render(scene,camera)}
 frame=requestAnimationFrame(draw)
 return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();window.removeEventListener('pointermove',move);window.removeEventListener('scroll',onScroll);geo.dispose();mat.dispose();renderer.dispose();renderer.domElement.remove()}
 },[])
 return <div aria-hidden="true" className="pointer-events-none relative h-40 w-40 md:h-64 md:w-64 shrink-0"><div className="absolute inset-0 rounded-full" style={{background:'radial-gradient(circle,rgba(100,150,220,.15),transparent 70%)'}}/><div ref={ref} className="absolute inset-0"/></div>
}
