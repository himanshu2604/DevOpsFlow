'use client'

// 🎨 Palette 2025-07-11: Improved Portfolio section accessibility with natural language metric descriptions, contextual CTA labels, and semantic grouping for tech stacks. — accessibility/UX impact

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { PRICING } from '@/lib/constants'

interface ProjectMetric {
  label: string
  value: string
  srValue?: string
}

interface Project {
  title: string
  client: string
  description: string
  metrics: ProjectMetric[]
  techStack: string[]
  gradient: string
}

const projects: Project[] = [
  {
    title: 'GitOps Pipeline',
    client: 'Series A Fintech',
    description: 'Implemented a complete GitOps workflow with ArgoCD, enabling the engineering team to ship 10x faster with full rollback capabilities.',
    metrics: [
      { label: 'Deploy Time', value: '45 min → 4 min', srValue: '45 minutes reduced to 4 minutes' },
      { label: 'Deployments/Week', value: '3 → 28', srValue: '3 increased to 28' },
      { label: 'Rollback Time', value: '< 30 sec', srValue: 'less than 30 seconds' },
    ],
    techStack: ['ArgoCD', 'GitHub Actions', 'Kubernetes', 'Helm', 'Terraform'],
    gradient: 'from-primary/20 to-teal-500/20',
  },
  {
    title: 'AWS Infrastructure Foundation',
    client: 'YC-backed SaaS',
    description: 'Built production-ready AWS infrastructure from scratch with EKS, VPC networking, and comprehensive monitoring for a fast-growing startup.',
    metrics: [
      { label: 'Uptime', value: '99.95%', srValue: '99.95 percent' },
      { label: 'Monthly AWS Cost', value: '-42%', srValue: 'reduced by 42 percent' },
      { label: 'Time to Market', value: PRICING.INFRASTRUCTURE.timeline, srValue: PRICING.INFRASTRUCTURE.timeline },
    ],
    techStack: ['AWS EKS', 'Terraform', 'Prometheus', 'Grafana', 'Loki'],
    gradient: 'from-secondary/20 to-purple-500/20',
  },
]

export function PortfolioSection() {
  const prefersReducedMotion = useReducedMotion()

  const headingAnims = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }

  const cardAnims = (index: number) => {
    if (prefersReducedMotion) return {}
    return {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index === 0 ? 0 : 0.15
      },
      viewport: { once: true, margin: "-100px" }
    }
  }

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 xl:px-6">
        {/* Section header */}
        <motion.div
          {...headingAnims}
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
              {...cardAnims(index)}
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
                            <span className="sr-only">{metric.label}: </span>
                            <span aria-hidden={!!metric.srValue}>{metric.value}</span>
                            {metric.srValue && (
                              <span className="sr-only">{metric.srValue}</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground" aria-hidden="true">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div
                      className="flex flex-wrap gap-2 mb-6"
                      role="group"
                      aria-label={`Technologies used in ${project.title}`}
                    >
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-card border border-border rounded-full text-muted-foreground hover:text-[#00e5a0] hover:border-[rgba(0,229,160,0.4)] transition-all duration-150 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        href="/contact"
                        className="relative inline-flex items-center gap-2 text-primary font-medium group"
                        aria-label={`Discuss the ${project.title} project for ${project.client}`}
                      >
                        <span className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                          Discuss your project
                        </span>
                        <svg
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
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
