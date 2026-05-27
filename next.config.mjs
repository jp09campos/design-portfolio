import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  webpack(config) {
    // Resolve `import * as THREE from 'three'` to the vendored build file.
    // This bypasses npm's file: protocol entirely, which crashes on Node 24.
    config.resolve.alias['three'] = path.resolve(
      __dirname,
      'vendor/three/build/three.module.js'
    )
    return config
  },
}

export default nextConfig
