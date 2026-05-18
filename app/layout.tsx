import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DevOpsFlow | Elite Infrastructure for Fast-Moving Startups',
    template: '%s | DevOpsFlow',
  },
  description: 'Industrial-grade DevOps infrastructure for YC-backed startups. CI/CD, Kubernetes, AWS, monitoring, and cloud cost optimization. Ship faster, scale confidently.',
  keywords: ['DevOps', 'Infrastructure', 'Kubernetes', 'AWS', 'CI/CD', 'Cloud', 'Startup', 'YC', 'GitOps', 'Terraform'],
  authors: [{ name: 'DevOpsFlow' }],
  creator: 'DevOpsFlow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devopsflow.io',
    siteName: 'DevOpsFlow',
    title: 'DevOpsFlow | Elite Infrastructure for Fast-Moving Startups',
    description: 'Industrial-grade DevOps infrastructure for YC-backed startups. Ship faster, scale confidently.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevOpsFlow - Elite Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOpsFlow | Elite Infrastructure for Fast-Moving Startups',
    description: 'Industrial-grade DevOps infrastructure for YC-backed startups.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen overflow-x-hidden">
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        
        {children}
        
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
