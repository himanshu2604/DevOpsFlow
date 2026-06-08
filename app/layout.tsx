import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TooltipProvider } from '@/components/ui/tooltip'
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
  metadataBase: new URL('https://devopsflow.vercel.app'),
  title: {
    default: 'DevOpsFlow | Elite Infrastructure for Fast-Moving Startups',
    template: '%s | DevOpsFlow',
  },
  description: 'Industrial-grade DevOps infrastructure for YC-backed startups. CI/CD, Kubernetes, AWS, monitoring, and cloud cost optimization. Ship faster, scale confidently.',
  keywords: ['DevOps', 'Infrastructure', 'Kubernetes', 'AWS', 'CI/CD', 'Cloud', 'Startup', 'YC', 'GitOps', 'Terraform'],
  authors: [{ name: 'DevOpsFlow' }],
  creator: 'DevOpsFlow',
  alternates: {
    canonical: 'https://devopsflow.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devopsflow.vercel.app',
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
        <TooltipProvider delayDuration={0}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Skip to content
          </a>

          {/* Noise texture overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {children}

          {process.env.NODE_ENV === 'production' && <Analytics />}
        </TooltipProvider>
      </body>
    </html>
  )
}
