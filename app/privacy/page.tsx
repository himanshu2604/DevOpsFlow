import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative outline-none">
        <div className="relative pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12 group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <div className="space-y-12">
              <header>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Privacy Policy
                </h1>
                <p className="text-muted-foreground">
                  Last updated: May 2025
                </p>
              </header>

              <div className="space-y-8 text-foreground/90 leading-relaxed">
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Overview</h2>
                  <p>
                    DevOpsFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy.
                    This policy explains how we handle information when you visit devopsflow.dev
                    or engage our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Information We Collect</h2>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Contact Information:</strong> Name, work email, and company name when you fill out our contact form.</li>
                    <li><strong>Service Data:</strong> Project details and infrastructure requirements shared during consultations.</li>
                    <li><strong>Usage Data:</strong> Anonymous analytics (via Vercel Analytics) to help us understand how visitors use our site.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. How We Use Information</h2>
                  <p>We use your information strictly to:</p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Provide DevOps consulting and implementation services.</li>
                    <li>Communicate with you about your project or inquiry.</li>
                    <li>Improve our website and service offerings.</li>
                  </ul>
                  <p className="mt-4">We do not sell, rent, or trade your personal information to third parties.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Data Security</h2>
                  <p>
                    We implement industrial-grade security measures to protect your information.
                    For service engagements, we follow strict confidentiality protocols and
                    use encrypted communication channels.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Third-Party Services</h2>
                  <p>We use the following trusted third-party services:</p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li><strong>Vercel:</strong> For website hosting and basic analytics.</li>
                    <li><strong>Formspree:</strong> To process contact form submissions.</li>
                    <li><strong>Cal.com:</strong> To manage meeting bookings.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Cookies</h2>
                  <p>
                    We use minimal cookies necessary for website functionality and
                    anonymous analytics. You can control cookie settings in your browser.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Your Rights</h2>
                  <p>
                    You have the right to access, correct, or request the deletion of your
                    personal information. To do so, please contact us at the email below.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Compliance</h2>
                  <p>
                    We operate in compliance with applicable data protection laws.
                    As we primarily serve business clients (B2B), our data collection
                    is limited to professional contact information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Data Retention</h2>
                  <p>
                    We retain contact information only as long as necessary to fulfill
                    the purposes for which it was collected or to comply with legal obligations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. International Transfers</h2>
                  <p>
                    If you are visiting from outside India, please note that your
                    information may be processed in servers located in various
                    jurisdictions where our third-party providers operate.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">11. Changes to Policy</h2>
                  <p>
                    We may update this policy from time to time. Any changes will be
                    posted on this page with an updated &quot;Last updated&quot; date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">12. Contact</h2>
                  <p>
                    For any privacy-related questions:<br />
                    📧 <a href="mailto:hello@devopsflow.dev" className="text-primary hover:underline">hello@devopsflow.dev</a><br />
                    🌐 <a href="https://devopsflow.dev" className="text-primary hover:underline">devopsflow.dev</a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
