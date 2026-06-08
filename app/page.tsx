import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { PainPointsSection } from '@/components/sections/pain-points-section'
import { ServicesSection } from '@/components/sections/services-section'
import { HowItWorksSection } from '@/components/sections/how-it-works-section'
import { MetricsSection } from '@/components/sections/metrics-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { CTASection } from '@/components/sections/cta-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative outline-none">
        <HeroSection />
        <PainPointsSection />
        <ServicesSection />
        <HowItWorksSection />
        <MetricsSection />
        <PortfolioSection />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
