'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Free Infrastructure Audit',
    description: 'We analyze your current setup, identify bottlenecks, and deliver a comprehensive report with prioritized recommendations.',
    duration: '1-2 days',
  },
  {
    number: '02',
    title: 'Fixed-Price Proposal',
    description: 'You receive a detailed scope of work with exact pricing, timeline, and deliverables. No surprises, no hourly billing.',
    duration: '24 hours',
  },
  {
    number: '03',
    title: 'Production-Ready Delivery',
    description: 'We implement, document, and hand over a battle-tested infrastructure. Your team gets full training and ongoing support.',
    duration: '1-3 weeks',
  },
]

export function HowItWorksSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From audit to production in weeks, not months. Our streamlined process gets your infrastructure shipping fast.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Animated SVG connection line - desktop */}
          <div className="hidden lg:block absolute top-8 left-[calc(16.67%-32px)] right-[calc(16.67%-32px)] h-px">
            <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="8"
                x2="100%"
                y2="8"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="1" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Animated SVG connection line - mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-8 w-4">
            <svg className="w-4 h-full overflow-visible" preserveAspectRatio="none">
              <motion.line
                x1="8"
                y1="32"
                x2="8"
                y2="calc(100% - 32px)"
                stroke="rgb(16, 185, 129)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative pl-20 lg:pl-0"
              >
                {/* Step number circle - green filled */}
                <div className="absolute left-0 lg:relative lg:mx-auto lg:mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center relative shadow-lg shadow-primary/30"
                  >
                    <span className="text-2xl font-display font-bold text-primary-foreground">
                      {step.number}
                    </span>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl -z-10" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="lg:text-center">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>
                  {/* Time badge */}
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-sm text-primary font-mono">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
