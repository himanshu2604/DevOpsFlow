'use client'

import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { GlassCard } from '@/components/glass-card'

const stats = [
  {
    value: '< 5',
    suffix: ' min',
    label: 'Average deploy time',
    description: 'From git push to production',
  },
  {
    value: '99.9',
    suffix: '%',
    label: 'Uptime SLA',
    description: 'Guaranteed availability',
  },
  {
    value: '$2,400',
    suffix: '+',
    label: 'Avg. monthly AWS savings',
    description: 'After cost optimization',
  },
  {
    value: '10-14',
    suffix: ' days',
    label: 'Average delivery time',
    description: 'For full infrastructure setup',
  },
]

const testimonials = [
  {
    quote: "DevOpsFlow turned our 45-minute deploys into 3-minute automated pipelines. We ship twice a day now instead of twice a week.",
    author: 'Sarah Chen',
    role: 'CTO, DataPipe (YC W23)',
    avatar: 'SC',
  },
  {
    quote: "They found $3,200/month in wasted AWS resources we didn't even know about. The audit paid for itself in the first month.",
    author: 'Marcus Johnson',
    role: 'Founder, CloudSync',
    avatar: 'MJ',
  },
]

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Extract prefix and numeric value once
  const prefixMatch = value.match(/^[^0-9.]+/)
  const prefix = prefixMatch ? prefixMatch[0] : ''

  // Handle ranges (e.g., "10-14") by animating to the upper bound
  const numericString = value.split('-').pop()?.replace(/[^0-9.]/g, '') || '0'
  const numericValue = parseFloat(numericString)
  const isDecimal = value.includes('.')

  const count = useMotionValue(0)
  const displayValue = useTransform(count, (latest) => {
    if (latest >= numericValue) return value

    if (isDecimal) {
      return prefix + latest.toFixed(1)
    }
    return prefix + Math.round(latest).toLocaleString()
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isInView) {
      animate(count, numericValue, {
        duration: 1.5,
        ease: "easeOut",
      })
    }
  }, [isInView, mounted, count, numericValue])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-foreground inline-block">
      {mounted ? (
        <motion.span>{displayValue}</motion.span>
      ) : (
        <span>{value}</span>
      )}
      <span className="text-primary">{suffix}</span>
    </span>
  )
}

export function MetricsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with sparkles/glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
      
      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />

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
            Results
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance">
            Numbers that matter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real metrics from our client engagements. These are the results we deliver consistently.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <GlassCard
              key={stat.label}
              delay={index * 0.1}
              className="p-6 text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div className="mt-3">
                <div className="text-foreground font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex flex-col h-full">
                  {/* Quote icon */}
                  <svg className="w-8 h-8 text-primary/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  
                  {/* Quote */}
                  <p className="text-foreground text-lg leading-relaxed mb-6 flex-grow">
                    {testimonial.quote}
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
