'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const deploymentLines = [
  { text: '$ git push origin main', type: 'command' },
  { text: '✓ Triggered: GitHub Actions CI', type: 'success' },
  { text: '✓ Docker build: 47s', type: 'success' },
  { text: '✓ Trivy scan: 0 critical', type: 'success' },
  { text: '✓ SonarQube: Quality Gate PASSED', type: 'success' },
  { text: '✓ ArgoCD sync: Healthy', type: 'success' },
  { text: '✓ Kubernetes rollout: Complete', type: 'success' },
  { text: '🚀 v2.4.1 deployed to prod in 3m 42s', type: 'deploy' },
]

const TYPING_SPEED = 25
const LINE_DELAY = 200
const CYCLE_DURATION = 8000

export function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState<{ text: string; type: string; displayText: string }[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const resetAnimation = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      setVisibleLines([])
      setCurrentLineIndex(0)
      setCurrentCharIndex(0)
      setIsVisible(true)
    }, 500)
  }, [])

  // Typing effect
  useEffect(() => {
    if (!isVisible) return
    if (currentLineIndex >= deploymentLines.length) return

    const currentLine = deploymentLines[currentLineIndex]
    
    if (currentCharIndex === 0 && currentLineIndex > 0) {
      // Add delay between lines
      const lineDelayTimer = setTimeout(() => {
        setVisibleLines(prev => [
          ...prev.slice(0, currentLineIndex),
          { ...currentLine, displayText: '' }
        ])
        setCurrentCharIndex(1)
      }, LINE_DELAY)
      return () => clearTimeout(lineDelayTimer)
    }

    if (currentCharIndex === 0 && currentLineIndex === 0) {
      // Start first line immediately
      setVisibleLines([{ ...currentLine, displayText: '' }])
      setCurrentCharIndex(1)
      return
    }

    if (currentCharIndex <= currentLine.text.length) {
      const typingTimer = setTimeout(() => {
        setVisibleLines(prev => {
          const updated = [...prev]
          if (updated[currentLineIndex]) {
            updated[currentLineIndex] = {
              ...updated[currentLineIndex],
              displayText: currentLine.text.slice(0, currentCharIndex)
            }
          }
          return updated
        })
        setCurrentCharIndex(prev => prev + 1)
      }, TYPING_SPEED)
      return () => clearTimeout(typingTimer)
    } else {
      // Move to next line
      if (currentLineIndex < deploymentLines.length - 1) {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }
    }
  }, [currentLineIndex, currentCharIndex, isVisible])

  // Cycle animation
  useEffect(() => {
    const cycleTimer = setInterval(() => {
      resetAnimation()
    }, CYCLE_DURATION)
    return () => clearInterval(cycleTimer)
  }, [resetAnimation])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-foreground'
      case 'success':
        return 'text-primary'
      case 'deploy':
        return 'text-[#00ff88]'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md animate-float"
      style={{ perspective: 1000 }}
    >
      {/* Glow effect behind terminal */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-2xl opacity-50" />
      
      {/* Terminal window */}
      <div className="relative glass rounded-xl overflow-hidden border border-border/50">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a12] border-b border-border/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-2">
            ~/devopsflow/deploy
          </span>
        </div>
        
        {/* Terminal content */}
        <div className="p-4 min-h-[240px] bg-[#050508]/80">
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-1.5"
              >
                {visibleLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`font-mono text-sm ${getLineColor(line.type)}`}
                  >
                    <span>{line.displayText}</span>
                    {index === visibleLines.length - 1 && 
                     line.displayText.length < deploymentLines[index]?.text.length && (
                      <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse align-middle" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
