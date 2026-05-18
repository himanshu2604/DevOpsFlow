'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard } from '@/components/glass-card'

const services = [
  {
    id: 'cicd',
    name: 'CI/CD Setup',
    price: '$4,500',
    timeline: '1-2 weeks',
    description: 'Complete CI/CD pipeline with automated testing, security scanning, and deployment workflows.',
    features: [
      { feature: 'GitHub Actions / GitLab CI setup', included: true },
      { feature: 'Automated testing pipeline', included: true },
      { feature: 'Docker containerization', included: true },
      { feature: 'Security scanning (Trivy, Snyk)', included: true },
      { feature: 'Staging & production environments', included: true },
      { feature: 'Deployment documentation', included: true },
      { feature: 'Kubernetes cluster', included: false },
      { feature: 'Monitoring & alerting', included: false },
      { feature: 'Ongoing support', included: false },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Setup',
    price: '$12,000',
    timeline: '2-3 weeks',
    description: 'Production-ready Kubernetes infrastructure with monitoring, security, and cost optimization.',
    features: [
      { feature: 'GitHub Actions / GitLab CI setup', included: true },
      { feature: 'Automated testing pipeline', included: true },
      { feature: 'Docker containerization', included: true },
      { feature: 'Security scanning (Trivy, Snyk)', included: true },
      { feature: 'Staging & production environments', included: true },
      { feature: 'Deployment documentation', included: true },
      { feature: 'Kubernetes cluster (EKS/GKE)', included: true },
      { feature: 'Monitoring & alerting', included: true },
      { feature: '30-day support included', included: true },
    ],
    highlighted: true,
  },
  {
    id: 'retainer',
    name: 'Monthly Retainer',
    price: '$3,500',
    timeline: '/month',
    description: 'Ongoing infrastructure support, optimization, and incident response with guaranteed SLA.',
    features: [
      { feature: 'Infrastructure maintenance', included: true },
      { feature: '24/7 incident response', included: true },
      { feature: 'Monthly optimization reviews', included: true },
      { feature: 'Security patch management', included: true },
      { feature: 'Capacity planning', included: true },
      { feature: '4-hour response SLA', included: true },
      { feature: 'Direct Slack channel', included: true },
      { feature: 'Monthly reporting', included: true },
      { feature: 'Priority scheduling', included: true },
    ],
  },
]

const faqs = [
  {
    question: 'What does the free audit include?',
    answer: 'Our free audit covers your current infrastructure, CI/CD pipelines, security posture, and cloud costs. You\'ll receive a detailed report with prioritized recommendations within 48 hours.',
  },
  {
    question: 'Do you work with any cloud provider?',
    answer: 'We specialize in AWS, but also have extensive experience with GCP and Azure. Our Terraform-based approach makes our infrastructure portable across providers.',
  },
  {
    question: 'What if the project takes longer than estimated?',
    answer: 'Our fixed-price guarantee means you pay what we quoted. If unexpected complexity arises, that\'s on us. We scope thoroughly upfront to avoid surprises.',
  },
  {
    question: 'Can you work with our existing infrastructure?',
    answer: 'Absolutely. Many clients come to us with existing setups that need improvement. We\'ll assess what you have and recommend incremental improvements.',
  },
  {
    question: 'What\'s included in the monthly retainer?',
    answer: 'The retainer covers ongoing maintenance, 24/7 incident response, monthly optimization reviews, security patches, and capacity planning. You get a dedicated Slack channel with 4-hour response SLA.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Yes, we sign NDAs with all clients. Your infrastructure details and business information are treated with strict confidentiality.',
  },
]

export default function ServicesPage() {
  return (
    <main className="relative">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 text-balance">
              Infrastructure that scales
              <br />
              <span className="text-gradient-primary">with your startup</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Fixed-price packages designed for seed-stage startups. No hourly billing, 
              no surprises—just production-ready infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6"></th>
                  {services.map((service) => (
                    <th key={service.id} className="text-center py-4 px-6">
                      <GlassCard 
                        className={`p-6 ${service.highlighted ? 'border-secondary glow-secondary' : ''}`}
                        spotlight={false}
                      >
                        {service.highlighted && (
                          <span className="text-xs font-bold text-secondary mb-2 block">MOST POPULAR</span>
                        )}
                        <h3 className="text-xl font-display font-bold text-foreground mb-2">
                          {service.name}
                        </h3>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-display font-bold text-foreground">
                            {service.price}
                          </span>
                          <span className="text-muted-foreground">{service.timeline}</span>
                        </div>
                      </GlassCard>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services[0].features.map((_, featureIndex) => (
                  <tr key={featureIndex} className="border-b border-border/30">
                    <td className="py-4 px-6 text-muted-foreground">
                      {services[0].features[featureIndex].feature}
                    </td>
                    {services.map((service) => (
                      <td key={`${service.id}-${featureIndex}`} className="text-center py-4 px-6">
                        {service.features[featureIndex].included ? (
                          <svg className="w-5 h-5 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-muted-foreground/30 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="py-6 px-6"></td>
                  {services.map((service) => (
                    <td key={`cta-${service.id}`} className="text-center py-6 px-6">
                      <Link
                        href="/contact"
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm rounded-lg transition-all duration-200 ${
                          service.highlighted
                            ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                            : 'bg-card border border-border hover:border-primary/50 text-foreground'
                        }`}
                      >
                        Get Started
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        
        {/* Spotlight background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Not sure which package is right?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a free audit and we&apos;ll recommend the best path forward for your infrastructure.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              Book Free Audit
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
