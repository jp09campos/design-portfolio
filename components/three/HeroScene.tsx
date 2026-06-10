// @ts-nocheck
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ─── Tuning ──────────────────────────────────────────────────────────── */
const NODE_COUNT      = 210   // total floating nodes
const CONNECT_DIST    = 4.6   // max distance to draw a line
const MAX_CONNECTIONS = 1600  // pre-allocated line segment budget
const MOUSE_RADIUS    = 4.2   // repulsion zone radius (world units)
const MOUSE_STRENGTH  = 14    // repulsion force multiplier

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    /* ── Renderer ───────────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    /* ── Camera ─────────────────────────────────────────────────────────── */
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      54,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200,
    )
    camera.position.set(0, 0, 15)

    /* ── Mouse tracking ─────────────────────────────────────────────────── */
    const mouseNDC   = new THREE.Vector2(0, 0)
    const mouseWorld = new THREE.Vector3(0, 0, 0)
    let camRotX = 0, camRotY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseNDC.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouseNDC.y = -(e.clientY / window.innerHeight - 0.5) * 2
      mouseWorld.set(mouseNDC.x * 12, mouseNDC.y * 8, 0)
    }

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      mouseNDC.x =  (t.clientX / window.innerWidth  - 0.5) * 2
      mouseNDC.y = -(t.clientY / window.innerHeight - 0.5) * 2
      mouseWorld.set(mouseNDC.x * 12, mouseNDC.y * 8, 0)
    }

    const onTouchEnd = () => {
      // Smoothly decay — the animation loop's lerp will carry this back to zero
      mouseNDC.set(0, 0)
      mouseWorld.set(0, 0, 0)
    }

    window.addEventListener('mousemove', onMouseMove)
    mount.addEventListener('touchmove', onTouchMove, { passive: true })
    mount.addEventListener('touchend', onTouchEnd, { passive: true })

    /* ── Build nodes ────────────────────────────────────────────────────── */
    type Node = {
      base:  THREE.Vector3   // slowly drifting center
      pos:   THREE.Vector3   // rendered position (base + oscillation + repulsion)
      vel:   THREE.Vector3   // drift velocity
      phase: number          // individual wave phase offset
      isHub: boolean         // larger / brighter node
    }

    const nodes: Node[] = []
    const regularIdx: number[] = []
    const hubIdx: number[]     = []

    for (let i = 0; i < NODE_COUNT; i++) {
      // Cluster more nodes in the center third of the viewport
      const radial = Math.random() < 0.55 ? 0.8 : 1.4
      const base = new THREE.Vector3(
        (Math.random() - 0.5) * 26 * radial,
        (Math.random() - 0.5) * 17 * radial,
        (Math.random() - 0.5) * 9 - 1,
      )
      const isHub = Math.random() < 0.13
      nodes.push({
        base:  base.clone(),
        pos:   base.clone(),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.003,
        ),
        phase: Math.random() * Math.PI * 2,
        isHub,
      });
      (isHub ? hubIdx : regularIdx).push(i)
    }

    /* ── Points geometry — regular nodes ──────────────────────────────── */
    const regBuf  = new Float32Array(regularIdx.length * 3)
    const regGeo  = new THREE.BufferGeometry()
    const regAttr = new THREE.BufferAttribute(regBuf, 3)
    regAttr.setUsage(THREE.DynamicDrawUsage)
    regGeo.setAttribute('position', regAttr)
    scene.add(new THREE.Points(regGeo, new THREE.PointsMaterial({
      size: 0.042, color: 0xffffff, transparent: true,
      opacity: 0.52, sizeAttenuation: true,
    })))

    /* ── Points geometry — hub nodes (larger, brighter) ────────────────── */
    const hubBuf  = new Float32Array(hubIdx.length * 3)
    const hubGeo  = new THREE.BufferGeometry()
    const hubAttr = new THREE.BufferAttribute(hubBuf, 3)
    hubAttr.setUsage(THREE.DynamicDrawUsage)
    hubGeo.setAttribute('position', hubAttr)
    scene.add(new THREE.Points(hubGeo, new THREE.PointsMaterial({
      size: 0.11, color: 0xffffff, transparent: true,
      opacity: 0.88, sizeAttenuation: true,
    })))

    /* ── Line segments with per-vertex brightness ───────────────────────── */
    const lineBuf      = new Float32Array(MAX_CONNECTIONS * 6)
    const lineColorBuf = new Float32Array(MAX_CONNECTIONS * 6)
    const lineGeo      = new THREE.BufferGeometry()
    const linePosAttr  = new THREE.BufferAttribute(lineBuf, 3)
    const lineColAttr  = new THREE.BufferAttribute(lineColorBuf, 3)
    linePosAttr.setUsage(THREE.DynamicDrawUsage)
    lineColAttr.setUsage(THREE.DynamicDrawUsage)
    lineGeo.setAttribute('position', linePosAttr)
    lineGeo.setAttribute('color',    lineColAttr)
    lineGeo.setDrawRange(0, 0)
    scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 1,
    })))

    /* ── Resize ─────────────────────────────────────────────────────────── */
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    /* ── Animation loop ─────────────────────────────────────────────────── */
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      /* Camera parallax — smoothly trails mouse + slow breathing sway */
      const swayX = Math.sin(t * 0.11) * 0.018
      const swayY = Math.cos(t * 0.09) * 0.012
      camRotX += (mouseNDC.y * 0.09 + swayY - camRotX) * 0.03
      camRotY += (mouseNDC.x * 0.11 + swayX - camRotY) * 0.03
      camera.rotation.x = camRotX
      camera.rotation.y = camRotY

      /* Update all node positions */
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i]

        // Drift the base center
        n.base.addScaledVector(n.vel, 1)

        // Soft boundary wrap
        if (n.base.x >  14) n.base.x = -14
        if (n.base.x < -14) n.base.x =  14
        if (n.base.y >  10) n.base.y = -10
        if (n.base.y < -10) n.base.y =  10

        // Sinusoidal wave oscillation layered on drift
        n.pos.x = n.base.x + Math.sin(t * 0.27 + n.phase)         * 0.38
        n.pos.y = n.base.y + Math.cos(t * 0.21 + n.phase * 1.37)  * 0.3
        n.pos.z = n.base.z + Math.sin(t * 0.17 + n.phase * 0.73)  * 0.14

        // Mouse repulsion — quadratic falloff for organic feel
        const dx = n.pos.x - mouseWorld.x
        const dy = n.pos.y - mouseWorld.y
        const d2 = dx * dx + dy * dy
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0.001) {
          const d   = Math.sqrt(d2)
          const t01 = 1 - d / MOUSE_RADIUS
          const f   = t01 * t01 * MOUSE_STRENGTH
          n.pos.x  += (dx / d) * f
          n.pos.y  += (dy / d) * f
        }
      }

      /* Write regular node positions */
      for (let k = 0; k < regularIdx.length; k++) {
        const p = nodes[regularIdx[k]].pos
        regBuf[k * 3]     = p.x
        regBuf[k * 3 + 1] = p.y
        regBuf[k * 3 + 2] = p.z
      }
      regAttr.needsUpdate = true

      /* Write hub node positions */
      for (let k = 0; k < hubIdx.length; k++) {
        const p = nodes[hubIdx[k]].pos
        hubBuf[k * 3]     = p.x
        hubBuf[k * 3 + 1] = p.y
        hubBuf[k * 3 + 2] = p.z
      }
      hubAttr.needsUpdate = true

      /* Rebuild connection lines (triangular pair scan) */
      let lc = 0   // line count
      outer: for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (lc >= MAX_CONNECTIONS) break outer
          const a  = nodes[i].pos
          const b  = nodes[j].pos
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dz = a.z - b.z
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const d   = Math.sqrt(d2)
            // Brightness fades to 0 at max connect distance
            const br  = (1 - d / CONNECT_DIST) * 0.28

            const o = lc * 6
            // Vertex A
            lineBuf[o]     = a.x;  lineBuf[o + 1] = a.y;  lineBuf[o + 2] = a.z
            lineColorBuf[o]     = br; lineColorBuf[o + 1] = br; lineColorBuf[o + 2] = br
            // Vertex B
            lineBuf[o + 3] = b.x;  lineBuf[o + 4] = b.y;  lineBuf[o + 5] = b.z
            lineColorBuf[o + 3] = br; lineColorBuf[o + 4] = br; lineColorBuf[o + 5] = br
            lc++
          }
        }
      }
      linePosAttr.needsUpdate = true
      lineColAttr.needsUpdate = true
      lineGeo.setDrawRange(0, lc * 2)

      renderer.render(scene, camera)
    }

    animate()

    /* ── Cleanup ────────────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      mount.removeEventListener('touchmove', onTouchMove)
      mount.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', onResize)
      regGeo.dispose()
      hubGeo.dispose()
      lineGeo.dispose()
      renderer.dispose()
      if (mount?.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* WebGL canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Vignette — heavier at edges so text stays legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 55%, transparent 30%, rgba(8,8,8,0.72) 100%)',
        }}
      />
    </div>
  )
}
