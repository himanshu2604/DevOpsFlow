import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="relative">
      <Navbar />

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
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Who We Are</h2>
                <p>
                  DevOpsFlow (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a DevOps-as-a-Service
                  business operated by Himanshu Nehete,
                  based in Nashik, Maharashtra, India.<br />
                  Website: <a href="https://devopsflow.dev" className="text-primary hover:underline">https://devopsflow.dev</a><br />
                  Contact: <a href="mailto:hello@devopsflow.dev" className="text-primary hover:underline">hello@devopsflow.dev</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. What Information We Collect</h2>
                <p>
                  We collect information you voluntarily provide when
                  you fill out our contact form, including:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Full name</li>
                  <li>Company name</li>
                  <li>Work email address</li>
                  <li>Description of your infrastructure challenges</li>
                  <li>Preferred contact timeline</li>
                </ul>
                <p className="mt-4">
                  We do not collect any payment information directly.
                  Payments are processed through third-party providers
                  (Wise, Razorpay) with their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p>
                  We use the information you provide solely to:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Respond to your enquiry</li>
                  <li>Send you a project proposal if requested</li>
                  <li>Schedule a discovery call</li>
                  <li>Communicate about potential or active projects</li>
                </ul>
                <p className="mt-4">
                  We do not use your information for marketing
                  without your explicit consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Data Storage</h2>
                <p>
                  Contact form submissions are stored securely
                  via our email provider (Zoho Mail) and are
                  accessible only to DevOpsFlow personnel.
                </p>
                <p className="mt-4">
                  We do not store your data in any third-party
                  CRM without your knowledge.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Cookies</h2>
                <p>
                  Our website uses minimal, functional cookies only.
                  We do not use advertising cookies or tracking
                  pixels of any kind. We do not use Google Analytics
                  or any behavioural tracking tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Third-Party Services</h2>
                <p>
                  Our website is hosted on Vercel.
                  Please refer to Vercel&apos;s privacy policy for
                  information on their data practices:<br />
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    https://vercel.com/legal/privacy-policy
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Data Sharing</h2>
                <p>
                  We do not sell, rent, or share your personal
                  information with any third parties,
                  except where required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Request a copy of any personal data we hold
                    about you</li>
                  <li>Request deletion of your personal data</li>
                  <li>Withdraw consent for us to contact you</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, email us at:<br />
                  <a href="mailto:hello@devopsflow.dev" className="text-primary hover:underline">hello@devopsflow.dev</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Data Retention</h2>
                <p>
                  We retain contact enquiry data for up to 24 months
                  for legitimate business purposes (project history,
                  proposal records). After this period, data is
                  deleted securely.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. Children&apos;s Privacy</h2>
                <p>
                  Our services are intended for business professionals
                  only. We do not knowingly collect data from
                  anyone under the age of 18.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">11. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time.
                  Any changes will be posted on this page with an
                  updated &quot;Last updated&quot; date.
                  Continued use of the website constitutes
                  acceptance of the updated policy.
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
  )
}
