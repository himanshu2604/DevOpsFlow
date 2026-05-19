'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { PRICING } from '@/lib/constants'

const services = [
  {
    name: 'CI/CD Setup',
    price: PRICING.CICD.price,
    timeline: PRICING.CICD.timeline,
    description: 'Complete CI/CD pipeline with automated testing, security scanning, and deployment.',
    features: [
      'GitHub Actions / GitLab CI setup',
      'Automated testing pipeline',
      'Docker containerization',
      'Security scanning (Trivy, Snyk)',
      'Staging & production environments',
      'Deployment documentation',
    ],
    highlighted: false,
  },
  {
    name: 'Infrastructure Setup',
    price: PRICING.INFRASTRUCTURE.price,
    timeline: PRICING.INFRASTRUCTURE.timeline,
    description: 'Production-ready Kubernetes infrastructure with monitoring and security best practices.',
    features: [
      'Everything in CI/CD Setup',
      'Kubernetes cluster (EKS/GKE)',
      'Terraform infrastructure-as-code',
      'Prometheus & Grafana monitoring',
      'Log aggregation (Loki)',
      'Alerting & on-call setup',
      'Cost optimization audit',
      'Security hardening',
    ],
    highlighted: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Monthly Retainer',
    price: PRICING.RETAINER.price,
    timeline: PRICING.RETAINER.timeline,
    description: 'Ongoing infrastructure support, optimization, and 24/7 incident response.',
    features: [
      'Infrastructure maintenance',
      '24/7 incident response',
      'Monthly optimization reviews',
      'Security patch management',
      'Capacity planning',
      '4-hour response SLA',
    ],
    highlighted: false,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#f0f0ff 1px, transparent 1px), linear-gradient(90deg, #f0f0ff 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      
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
            Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance">
            Fixed-price infrastructure packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No hourly billing surprises. Know exactly what you&apos;re paying for before we start.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${service.highlighted ? 'lg:-mt-4 lg:mb-[-16px]' : ''}`}
            >
              {/* Badge for highlighted card */}
              {service.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full whitespace-nowrap">
                    {service.badge}
                  </span>
                </div>
              )}
              
              <div className={`h-full rounded-2xl overflow-hidden ${
                service.highlighted 
                  ? 'bg-card border-2 border-secondary glow-secondary' 
                  : 'glass border border-border/50 hover:border-primary/30'
              } transition-all duration-300`}>
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {service.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-display font-bold text-foreground">
                        {service.price}
                      </span>
                      <span className="text-muted-foreground">
                        {service.timeline}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-200 ${
                      service.highlighted
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                        : 'bg-card border border-border hover:border-primary/50 text-foreground'
                    }`}
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
