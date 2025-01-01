'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

const Earth3D = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    // Eğer renderer zaten varsa, yeni bir tane oluşturmayalım
    if (rendererRef.current) {
      return
    }

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Earth geometry
    const geometry = new THREE.SphereGeometry(1.5, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      color: resolvedTheme === 'dark' ? 0xffffff : 0x666666,
      wireframe: true,
      transparent: true,
      opacity: resolvedTheme === 'dark' ? 0.8 : 0.6
    })
    const earth = new THREE.Mesh(geometry, material)
    scene.add(earth)

    camera.position.z = 4

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      earth.rotation.y += 0.005
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
        rendererRef.current = null
      }
    }
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      style={{
        width: '250px',
        height: '250px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        background: resolvedTheme === 'dark' ? 'transparent' : '#fff'
      }}
    />
  )
}

export default Earth3D 