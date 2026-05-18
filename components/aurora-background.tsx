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
  const blob1Y = useTransform(smoothProgress, [0, 1], [0, -150])
  const blob2Y = useTransform(smoothProgress, [0, 1], [0, -200])
  const blob3Y = useTransform(smoothProgress, [0, 1], [0, -100])
  
  // Opacity increases as user scrolls
  const auroraOpacity = useTransform(smoothProgress, [0, 1], [1, 1])

  useEffect(() => {
    setMounted(true)
    console.log('[v0] AuroraBackground mounted')
  }, [])

  if (!mounted) {
    return (
      <div className={`bg-[#050508] ${className}`} />
    )
  }

  return (
    <div ref={containerRef} className={`${className}`}>
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#050508]" />
      
      {/* Aurora container */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: auroraOpacity }}
      >
        {/* Primary green aurora blob - larger and more visible */}
        <motion.div
          className="absolute top-[-10%] left-[5%] w-[90%] h-[70%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 230, 161, 0.25) 0%, rgba(0, 184, 212, 0.15) 40%, transparent 70%)',
            filter: 'blur(80px)',
            y: blob1Y,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary teal aurora blob */}
        <motion.div
          className="absolute top-[5%] right-[-15%] w-[70%] h-[60%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 184, 212, 0.2) 0%, rgba(16, 185, 129, 0.12) 50%, transparent 70%)',
            filter: 'blur(70px)',
            y: blob2Y,
          }}
          animate={{
            x: [0, -50, 30, -20, 0],
            scale: [1, 0.9, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Left side accent blob */}
        <motion.div
          className="absolute top-[20%] left-[-10%] w-[60%] h-[50%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.18) 0%, rgba(0, 230, 161, 0.08) 60%, transparent 80%)',
            filter: 'blur(60px)',
            y: blob3Y,
          }}
          animate={{
            x: [0, 60, -40, 30, 0],
            scale: [1, 1.2, 0.85, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating accent particle 1 */}
        <motion.div
          className="absolute top-[10%] left-[55%] w-[25%] h-[25%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 230, 161, 0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.3, 0.7, 1],
            opacity: [0.6, 1, 0.4, 0.6],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating accent particle 2 */}
        <motion.div
          className="absolute top-[35%] right-[15%] w-[20%] h-[20%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 184, 212, 0.25) 0%, transparent 70%)',
            filter: 'blur(35px)',
          }}
          animate={{
            x: [0, -35, 45, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.8, 1.4, 1],
            opacity: [0.5, 0.9, 0.3, 0.5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Bottom glow */}
        <motion.div
          className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 230, 161, 0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 8, 0.5) 100%)',
        }}
      />
    </div>
  )
}
