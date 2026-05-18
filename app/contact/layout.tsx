import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for a free infrastructure audit. We respond within 24 hours and provide actionable recommendations for your DevOps setup.',
  openGraph: {
    title: 'Contact | DevOpsFlow',
    description: 'Get in touch for a free infrastructure audit. We respond within 24 hours and provide actionable recommendations for your DevOps setup.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
