'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/glass-card'

const painPoints = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Slow Deployments',
    description: 'Manual deploys taking hours? Your competitors ship daily while you wait for someone to ssh into prod.',
    stat: '4+ hours',
    statLabel: 'avg deploy time without CI/CD',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Zero Observability',
    description: "Finding out about outages from your users on Twitter? That's not a monitoring strategy.",
    stat: '40 min',
    statLabel: 'avg time to detect issues',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Runaway Cloud Costs',
    description: 'AWS bill growing faster than revenue? Unused resources and over-provisioned instances are killing your runway.',
    stat: '30%+',
    statLabel: 'typical cloud waste',
  },
]

export function PainPointsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
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
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance">
            Sound familiar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These are the infrastructure problems we solve every day for fast-moving startups.
          </p>
        </motion.div>

        {/* Pain point cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {painPoints.map((point, index) => (
            <GlassCard
              key={point.title}
              delay={index * 0.1}
              className="p-8 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="space-y-6">
                {/* Icon */}
                <div className="text-primary">
                  {point.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-foreground">
                  {point.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
                
                {/* Stat */}
                <div className="pt-4 border-t border-border/50">
                  <div className="text-2xl font-display font-bold text-warning">
                    {point.stat}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {point.statLabel}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
