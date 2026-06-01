'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const deploymentLines = [
  { text: 'git push origin main', type: 'command' },
  { text: '✓ Triggered: GitHub Actions CI', type: 'success' },
  { text: '✓ Docker build: 47s', type: 'success' },
  { text: '✓ Trivy scan: 0 critical, 0 high', type: 'success' },
  { text: '✓ SonarQube: Quality Gate PASSED', type: 'success' },
  { text: '✓ ArgoCD sync: Healthy', type: 'success' },
  { text: '✓ Kubernetes rollout: Complete', type: 'success' },
  { text: '🚀 v2.4.1 deployed to prod in 3m 42s', type: 'deploy' },
]

const TYPING_SPEED = 25
const LINE_DELAY = 200
const CYCLE_DURATION = 10000

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

  const getLineStyles = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-white'
      case 'success':
        return 'text-[#00e5a0]'
      case 'deploy':
        return 'text-[#00e5a0] font-bold'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="relative group">
      <div className="sr-only">
        An animated terminal window showing a deployment process: pushing to main, triggering CI,
        running Docker build and security scans, syncing with ArgoCD, and completing a
        Kubernetes rollout.
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00e5a0]/20 to-[#00e5a0]/0 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" aria-hidden="true"></div>
      <div className="relative bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] overflow-hidden shadow-2xl" aria-hidden="true">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-b border-[#1a1a1a]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-[10px] text-gray-500 font-mono select-none">~/devopsflow/deploy</div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-sm min-h-[300px]">
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
                    key={`${index}-${line.type}`}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${getLineStyles(line.type)}`}
                  >
                    {line.type === 'command' && <span className="text-white mr-2">$</span>}
                    <span>{line.displayText}</span>
                    {index === visibleLines.length - 1 && 
                     line.displayText.length < deploymentLines[index]?.text.length && (
                      <span className="inline-block w-2 h-4 bg-[#00e5a0] ml-0.5 animate-pulse align-middle" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
