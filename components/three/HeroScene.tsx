'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// CSS-based animated particle field that renders beautifully without Three.js
// Uses canvas API for performance and works on all browsers without WebGL

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    // Mouse parallax
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', onMouse)

    // Particle system
    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#a5b4fc', '#c4b5fd']
    const count = 120

    type Particle = {
      x: number; y: number; z: number
      vx: number; vy: number
      r: number; color: string; alpha: number
    }

    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      z: Math.random() * 2 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.2,
    }))

    let time = 0
    const draw = () => {
      time += 0.005
      const W = w()
      const H = h()
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particles) {
        // Parallax offset
        const px = p.x + (mx - 0.5) * 30 * p.z
        const py = p.y + (my - 0.5) * 20 * p.z

        // Drift
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        // Draw
        ctx.beginPath()
        ctx.arc(px, py, p.r * p.z, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(time * 2 + p.x))
        ctx.fill()
      }

      // Connection lines
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = '#6366f1'
            ctx.globalAlpha = (1 - dist / 100) * 0.12
            ctx.moveTo(a.x + (mx - 0.5) * 30 * a.z, a.y + (my - 0.5) * 20 * a.z)
            ctx.lineTo(b.x + (mx - 0.5) * 30 * b.z, b.y + (my - 0.5) * 20 * b.z)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Canvas particle field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.85 }}
      />

      {/* Floating geometric shapes via CSS/Framer */}
      <motion.div
        animate={{
          rotate: [0, 360],
          y: [0, -20, 0],
        }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute right-[10%] top-[20%] w-40 h-40 border border-indigo-500/20 rounded-xl"
        style={{ transform: 'rotate(12deg)' }}
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          y: [0, 15, 0],
        }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: 'linear' }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
        className="absolute right-[15%] top-[15%] w-24 h-24 border border-violet-500/20 rounded-full"
      />
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute left-[5%] bottom-[25%] w-16 h-16 border border-pink-500/20"
        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
      />

      {/* Glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
      />
    </div>
  )
}
