// @ts-nocheck
// Three.js r184 restructured its TS types — WebGL scene, no type checking needed
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene setup ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'default',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const mouse = new THREE.Vector2(0, 0)
    const targetRotation = new THREE.Vector2(0, 0)
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Particle field — neutral white, sparse ────────────────────────────────
    const PARTICLE_COUNT = 600
    const positions = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 26
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      color: new THREE.Color('#d4d4d4'),
      transparent: true,
      opacity: 0.38,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── Minimal ambient light only ────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.04)
    scene.add(ambientLight)

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────────────────────
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Extremely slow drift — barely perceptible
      targetRotation.x += (mouse.y * 0.025 - targetRotation.x) * 0.025
      targetRotation.y += (mouse.x * 0.04  - targetRotation.y) * 0.025
      particles.rotation.x = targetRotation.x + t * 0.003
      particles.rotation.y = targetRotation.y + t * 0.004

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Three.js WebGL canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle centered vignette only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(8,8,8,0.65) 100%)',
        }}
      />
    </div>
  )
}
