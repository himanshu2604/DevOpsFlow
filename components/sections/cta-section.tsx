'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)
  const prefersReducedMotion = useReducedMotion()

  const contentAnims = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  }

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background with beam effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Animated beams */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{ willChange: 'transform' }}
          // ⚡ Bolt: Pause beams when off-screen to save resources
          animate={isInView ? {
            x: ['-100%', '100%'],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/15 to-transparent"
          style={{ willChange: 'transform' }}
          // ⚡ Bolt: Pause beams when off-screen to save resources
          animate={isInView ? {
            x: ['100%', '-100%'],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          style={{ willChange: 'transform' }}
          // ⚡ Bolt: Pause beams when off-screen to save resources
          animate={isInView ? {
            x: ['-100%', '100%'],
          } : {}}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
            delay: 1,
          }}
        />
      </div>
      
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 xl:px-6 text-center">
        <motion.div
          {...contentAnims}
          className="space-y-8"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Free infrastructure audit
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight text-balance">
            Ready to stop firefighting
            <br />
            <span className="text-gradient-primary">infrastructure?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the startups that ship with confidence. Let us handle the infrastructure 
            so you can focus on what matters—building your product.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="h-auto py-4 px-8 text-lg font-semibold group"
            >
              <Link href="/contact">
                Book Free Audit
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto py-4 px-8 text-lg font-semibold"
            >
              <Link href="/#services">
                View Pricing
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No commitment required
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              24-hour response time
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Fixed-price guarantee
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
