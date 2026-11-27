'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}) } catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    mount.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 100)
    camera.position.z = 9
    const group = new THREE.Group()
    scene.add(group)
    const geometry = new THREE.TorusKnotGeometry(1.65, .48, 180, 24, 2, 3)
    const material = new THREE.MeshStandardMaterial({color:0x7997bb, metalness:.72, roughness:.32})
    const mesh = new THREE.Mesh(geometry, material)
    group.add(mesh)
    const wireGeometry = new THREE.TorusKnotGeometry(1.69,.49,120,12,2,3)
    const wireMaterial = new THREE.MeshBasicMaterial({color:0xbadfff, wireframe:true, transparent:true, opacity:.13})
    group.add(new THREE.Mesh(wireGeometry,wireMaterial))
    scene.add(new THREE.AmbientLight(0x9ebcff, 1.3))
    const key = new THREE.DirectionalLight(0xffffff, 4)
    key.position.set(-3,4,5); scene.add(key)
    const rim = new THREE.DirectionalLight(0x447eff, 5)
    rim.position.set(3,-1,-3); scene.add(rim)
    const pointer = new THREE.Vector2()
    let dragId: number | null = null, lastX = 0, lastTime = 0, spin = 0, angle = 0
    const move = (e: PointerEvent) => { if(e.pointerType==='touch'){if(dragId!==e.pointerId)return;const dx=e.clientX-lastX;angle+=dx*.012;spin=Math.max(-.045,Math.min(.045,dx*.012/Math.max(1,e.timeStamp-lastTime)*16));lastX=e.clientX;lastTime=e.timeStamp;return} const r=mount.getBoundingClientRect(); pointer.set((e.clientX-r.left)/Math.max(1,r.width)*2-1, (e.clientY-r.top)/Math.max(1,r.height)*2-1) }
    const down=(e:PointerEvent)=>{if(e.pointerType!=='touch'||dragId!==null)return;dragId=e.pointerId;lastX=e.clientX;lastTime=e.timeStamp;spin=0;mount.setPointerCapture(e.pointerId)}
    const up=(e:PointerEvent)=>{if(dragId!==e.pointerId)return;if(e.type==='pointercancel'||e.timeStamp-lastTime>100)spin=0;dragId=null}
    mount.addEventListener('pointerdown',down);mount.addEventListener('pointerup',up);mount.addEventListener('pointercancel',up);mount.addEventListener('lostpointercapture',up)
    const reset = () => pointer.set(0,0)
    mount.addEventListener('pointermove',move); mount.addEventListener('pointerleave',reset)
    const resize=()=>{const w=Math.max(1,mount.clientWidth),h=Math.max(1,mount.clientHeight); camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h)}
    const observer=new ResizeObserver(resize); observer.observe(mount); resize()
    let frame=0, visible=true
    const animate=(now:number)=>{frame=requestAnimationFrame(animate);if(!visible||document.hidden)return;const t=now*.001;if(dragId===null){angle+=spin;spin*=.94}group.rotation.y+=(angle+pointer.x*.55+Math.sin(t*.25)*.25-group.rotation.y)*.09;group.rotation.x+=(-pointer.y*.4+.25-group.rotation.x)*.045;group.rotation.z=t*.075;renderer.render(scene,camera)}
    const intersection=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false});intersection.observe(mount)
    frame=requestAnimationFrame(animate)
    return ()=>{cancelAnimationFrame(frame);intersection.disconnect();observer.disconnect();mount.removeEventListener('pointermove',move);mount.removeEventListener('pointerleave',reset);mount.removeEventListener('pointerdown',down);mount.removeEventListener('pointerup',up);mount.removeEventListener('pointercancel',up);mount.removeEventListener('lostpointercapture',up);geometry.dispose();wireGeometry.dispose();material.dispose();wireMaterial.dispose();renderer.dispose();renderer.domElement.remove()}
  },[])
  return <div aria-hidden="true" className="absolute inset-0"><div className="absolute inset-0 opacity-60" style={{background:'radial-gradient(ellipse at center, #253c59 0%, transparent 68%)'}}/><div ref={mountRef} className="absolute inset-0" style={{touchAction:"pan-y pinch-zoom"}}/></div>
}
