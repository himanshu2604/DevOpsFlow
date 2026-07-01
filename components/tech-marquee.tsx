'use client'

const techStack = [
  'AWS', 'Kubernetes', 'Terraform', 'Docker', 'ArgoCD', 
  'Prometheus', 'Grafana', 'Helm', 'Trivy', 'SonarQube',
  'GitHub Actions', 'GitLab CI', 'Jenkins', 'Ansible', 'Vault'
]

import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function TechMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)

  return (
    <div ref={containerRef} className="relative overflow-hidden py-8" aria-hidden="true">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div
        className="flex animate-marquee"
        style={{
          willChange: 'transform',
          // ⚡ Bolt: Pause marquee when off-screen to save resources
          animationPlayState: isInView ? 'running' : 'paused'
        }}
      >
        {[...techStack, ...techStack].map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="flex items-center gap-3 mx-6 whitespace-nowrap"
          >
            <span className="text-primary text-lg">◆</span>
            <span className="text-muted-foreground font-mono text-sm tracking-wide">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
