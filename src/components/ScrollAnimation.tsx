'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
  once?: boolean
}

export function ScrollAnimation({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '',
  once = true
}: ScrollAnimationProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: 0.2
  })

  const directions = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 }
  }

  return (
    <motion.div
      ref={ref}
      initial={directions[direction]}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : directions[direction]}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.43, 0.13, 0.23, 0.96] // Özel easing fonksiyonu
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 