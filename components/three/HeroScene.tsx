// @ts-nocheck
// Three.js r184 restructured its TS types — WebGL scene, no type checking needed
'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
      powerPreference: 'high-performance',
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

    // ── Particle field ────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 1800
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const palette = [
      new THREE.Color('#6366f1'), // indigo
      new THREE.Color('#8b5cf6'), // violet
      new THREE.Color('#ec4899'), // pink
      new THREE.Color('#a5b4fc'), // light indigo
      new THREE.Color('#c4b5fd'), // light violet
    ]
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── Floating wireframe icosahedron ────────────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 1)
    const icoMat = new THREE.MeshStandardMaterial({
      color: '#6366f1',
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      emissive: new THREE.Color('#6366f1'),
      emissiveIntensity: 0.4,
    })
    const icosahedron = new THREE.Mesh(icoGeo, icoMat)
    icosahedron.position.set(3.8, 0.3, -2)
    scene.add(icosahedron)

    // ── Floating wireframe torus ──────────────────────────────────────────────
    const torusGeo = new THREE.TorusGeometry(1.1, 0.28, 8, 28)
    const torusMat = new THREE.MeshStandardMaterial({
      color: '#8b5cf6',
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      emissive: new THREE.Color('#8b5cf6'),
      emissiveIntensity: 0.3,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.position.set(-3.6, 1.2, -3)
    scene.add(torus)

    // ── Octahedron accent ─────────────────────────────────────────────────────
    const octaGeo = new THREE.OctahedronGeometry(0.8)
    const octaMat = new THREE.MeshStandardMaterial({
      color: '#ec4899',
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      emissive: new THREE.Color('#ec4899'),
      emissiveIntensity: 0.3,
    })
    const octahedron = new THREE.Mesh(octaGeo, octaMat)
    octahedron.position.set(-1.5, -2.8, -1)
    scene.add(octahedron)

    // ── Dynamic lights ────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.08)
    scene.add(ambientLight)

    const light1 = new THREE.PointLight('#6366f1', 18, 14)
    scene.add(light1)
    const light2 = new THREE.PointLight('#ec4899', 12, 12)
    scene.add(light2)
    const light3 = new THREE.PointLight('#8b5cf6', 8, 10)
    light3.position.set(0, 3, 2)
    scene.add(light3)

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

      // Smooth mouse-reactive rotation on particle field
      targetRotation.x += (mouse.y * 0.12 - targetRotation.x) * 0.04
      targetRotation.y += (mouse.x * 0.18 - targetRotation.y) * 0.04
      particles.rotation.x = targetRotation.x + t * 0.008
      particles.rotation.y = targetRotation.y + t * 0.012

      // Floating geometry animations
      icosahedron.rotation.x = t * 0.28
      icosahedron.rotation.y = t * 0.18
      icosahedron.position.y = 0.3 + Math.sin(t * 0.7) * 0.5

      torus.rotation.x = t * 0.35 + Math.PI / 4
      torus.rotation.z = t * 0.12
      torus.position.y = 1.2 + Math.sin(t * 0.5 + 1) * 0.4

      octahedron.rotation.y = t * 0.45
      octahedron.rotation.x = t * 0.22
      octahedron.position.y = -2.8 + Math.sin(t * 0.6 + 2) * 0.3

      // Orbiting dynamic lights
      light1.position.set(
        Math.sin(t * 0.5) * 5,
        Math.cos(t * 0.3) * 4,
        Math.sin(t * 0.2) * 3,
      )
      light2.position.set(
        -Math.sin(t * 0.4) * 6,
        Math.sin(t * 0.6) * 3,
        Math.cos(t * 0.3) * 4,
      )

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)

      // Dispose geometries and materials
      particleGeo.dispose()
      particleMat.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      torusGeo.dispose()
      torusMat.dispose()
      octaGeo.dispose()
      octaMat.dispose()

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

      {/* Radial gradient overlays for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.13) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 60% 80%, rgba(236,72,153,0.08) 0%, transparent 55%)
          `,
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(13,13,13,0.7) 100%)',
        }}
      />
    </div>
  )
}
