import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Fixed-price DevOps infrastructure packages for startups. CI/CD setup, Kubernetes infrastructure, and monthly retainers with transparent pricing.',
  openGraph: {
    title: 'Services | DevOpsFlow',
    description: 'Fixed-price DevOps infrastructure packages for startups. CI/CD setup, Kubernetes infrastructure, and monthly retainers with transparent pricing.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
