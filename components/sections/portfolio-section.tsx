'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { PRICING } from '@/lib/constants'

const projects = [
  {
    title: 'GitOps Pipeline',
    client: 'Series A Fintech',
    description: 'Implemented a complete GitOps workflow with ArgoCD, enabling the engineering team to ship 10x faster with full rollback capabilities.',
    metrics: [
      { label: 'Deploy Time', value: '45 min → 4 min' },
      { label: 'Deployments/Week', value: '3 → 28' },
      { label: 'Rollback Time', value: '< 30 sec' },
    ],
    techStack: ['ArgoCD', 'GitHub Actions', 'Kubernetes', 'Helm', 'Terraform'],
    gradient: 'from-primary/20 to-teal-500/20',
  },
  {
    title: 'AWS Infrastructure Foundation',
    client: 'YC-backed SaaS',
    description: 'Built production-ready AWS infrastructure from scratch with EKS, VPC networking, and comprehensive monitoring for a fast-growing startup.',
    metrics: [
      { label: 'Uptime', value: '99.95%' },
      { label: 'Monthly AWS Cost', value: '-42%' },
      { label: 'Time to Market', value: PRICING.INFRASTRUCTURE.timeline },
    ],
    techStack: ['AWS EKS', 'Terraform', 'Prometheus', 'Grafana', 'Loki'],
    gradient: 'from-secondary/20 to-purple-500/20',
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 xl:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 text-balance">
            Recent case studies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real projects with measurable impact. Here&apos;s how we&apos;ve helped startups scale their infrastructure.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid lg:grid-cols-2 gap-8 xl:items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="xl:h-full"
            >
              <GlassCard className="overflow-hidden xl:h-full group">
                <div className="flex flex-col h-full">
                  {/* Gradient header */}
                  <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

                  <div className="p-8 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-6">
                      <span className="text-sm text-primary font-mono mb-2 block">
                        {project.client}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-foreground">
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-t border-b border-border/50">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <div className="text-lg font-display font-bold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-card border border-border rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200 group"
                      >
                        Discuss your project
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
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
