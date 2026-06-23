'use client'

import { motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  spotlight?: boolean
  glowColor?: 'primary' | 'secondary'
  delay?: number
}

export function GlassCard({ 
  children, 
  className = '', 
  spotlight = true,
  glowColor = 'primary',
  delay = 0
}: GlassCardProps) {
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null)

  // Bolt: Cache bounding rect on mouse enter to avoid layout thrashing during mouse move.
  // We use document-relative coordinates to ensure accuracy even if the user scrolls.
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight) return
    const rect = e.currentTarget.getBoundingClientRect()
    rectRef.current = {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight) return

    // Bolt: If cache is missing (e.g. mouse already over element on mount), initialize it.
    if (!rectRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      rectRef.current = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      }
    }

    const { left, top, width, height } = rectRef.current

    // PageX/PageY are document-relative, which matches our cached document-relative offsets.
    // This eliminates the need for getBoundingClientRect() in this high-frequency event.
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100

    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      className={`relative glass rounded-2xl overflow-hidden ${spotlight ? 'spotlight' : ''} ${className}`}
    >
      <div className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        glowColor === 'primary' 
          ? 'bg-gradient-to-br from-primary/5 via-transparent to-transparent' 
          : 'bg-gradient-to-br from-secondary/5 via-transparent to-transparent'
      }`} />
      {children}
    </motion.div>
  )
}
