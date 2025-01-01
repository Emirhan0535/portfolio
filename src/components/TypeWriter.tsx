'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface TypeWriterProps {
  text: string
  delay?: number
  className?: string
  speed?: number
}

export function TypeWriter({ 
  text, 
  delay = 0, 
  className = '',
  speed = 30 
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  })
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const startTyping = async () => {
      if (!inView || hasStarted) return
      
      setHasStarted(true)
      // Başlangıç gecikmesi
      await new Promise(resolve => setTimeout(resolve, delay * 1000))
      
      let currentIndex = 0
      const typeNextChar = () => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
          if (currentIndex > text.length) {
            setIsComplete(true)
          } else {
            timeout = setTimeout(typeNextChar, speed)
          }
        }
      }
      
      typeNextChar()
    }

    startTyping()

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [text, delay, speed, inView, hasStarted])

  return (
    <motion.div 
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayedText}
      {hasStarted && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block ml-1 -translate-y-1"
        >
          |
        </motion.span>
      )}
    </motion.div>
  )
} 