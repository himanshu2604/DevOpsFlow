'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export function AuroraBackground({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  
  // Transform scroll position into aurora effects
  const scrollProgress = useTransform(scrollY, [0, 800], [0, 1])
  const smoothProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30 })
  
  // Aurora blob movements based on scroll
  const blob1Y = useTransform(smoothProgress, [0, 1], [0, -100])
  const blob2Y = useTransform(smoothProgress, [0, 1], [0, -150])
  const blob3Y = useTransform(smoothProgress, [0, 1], [0, -80])
  
  // Opacity increases as user scrolls
  const auroraOpacity = useTransform(smoothProgress, [0, 1], [0.4, 0.6])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`bg-gradient-to-b from-[#050508] via-[#0a0f18] to-[#050508] ${className}`} />
    )
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0f18] to-[#050508]" />
      
      {/* Aurora container with scroll-based opacity */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: auroraOpacity }}
      >
        {/* Primary green aurora blob */}
        <motion.div
          className="absolute top-[-20%] left-[10%] w-[80%] h-[60%] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 230, 161, 0.4) 0%, rgba(0, 184, 212, 0.2) 40%, transparent 70%)',
            y: blob1Y,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary teal aurora blob */}
        <motion.div
          className="absolute top-[10%] right-[-10%] w-[60%] h-[50%] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 184, 212, 0.35) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
            y: blob2Y,
          }}
          animate={{
            x: [0, -40, 20, -10, 0],
            scale: [1, 0.9, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Accent indigo/purple blob */}
        <motion.div
          className="absolute top-[30%] left-[-5%] w-[50%] h-[40%] rounded-full blur-[90px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, rgba(0, 230, 161, 0.1) 60%, transparent 80%)',
            y: blob3Y,
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Small floating accent particles */}
        <motion.div
          className="absolute top-[15%] left-[60%] w-[20%] h-[20%] rounded-full blur-[60px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 230, 161, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.5, 0.8, 0.4, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-[40%] right-[20%] w-[15%] h-[15%] rounded-full blur-[50px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 184, 212, 0.35) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -25, 35, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.9, 1.3, 1],
            opacity: [0.4, 0.7, 0.3, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 8, 0.4) 100%)',
        }}
      />
    </div>
  )
}
