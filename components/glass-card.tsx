'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

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
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
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
