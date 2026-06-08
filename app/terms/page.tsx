import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Terms of Service',
}

export default function TermsOfServicePage() {
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
                  Terms of Service
                </h1>
                <p className="text-muted-foreground">
                  Last updated: May 2025
                </p>
              </header>

              <div className="space-y-8 text-foreground/90 leading-relaxed">
                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Agreement</h2>
                  <p>
                    By accessing devopsflow.dev or engaging
                    DevOpsFlow for services, you agree to be
                    bound by these Terms of Service.
                    If you do not agree, please do not use
                    our website or services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Services</h2>
                  <p>
                    DevOpsFlow provides DevOps consulting and
                    implementation services including but not limited to:
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>CI/CD pipeline setup and optimisation</li>
                    <li>Cloud infrastructure provisioning (AWS, GCP)</li>
                    <li>Kubernetes cluster setup and management</li>
                    <li>Monitoring and observability stack setup</li>
                    <li>Monthly DevOps retainer support</li>
                  </ul>
                  <p className="mt-4">
                    Specific deliverables, timelines, and pricing
                    for each engagement are defined in a separate
                    Statement of Work (SOW) or proposal document
                    signed by both parties.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Payment Terms</h2>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Project work requires 50% payment upfront
                      before work begins</li>
                    <li>Remaining 50% is due upon project delivery</li>
                    <li>Monthly retainers are billed on the 1st
                      of each month, payable in advance</li>
                    <li>All prices are quoted in USD unless
                      otherwise agreed in writing</li>
                    <li>Invoices unpaid after 14 days may result
                      in work being paused</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Intellectual Property</h2>
                  <p>
                    Upon receipt of full payment, the client owns
                    all custom code, configurations, Terraform files,
                    and documentation created specifically for
                    their project.
                  </p>
                  <p className="mt-4">
                    DevOpsFlow retains the right to use general
                    methodologies, frameworks, and non-client-specific
                    knowledge gained during engagements.
                  </p>
                  <p className="mt-4">
                    We may reference the engagement as a case study
                    (without disclosing confidential information)
                    unless you request otherwise in writing.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Confidentiality</h2>
                  <p>
                    We treat all client information — including
                    architecture details, credentials, business
                    logic, and infrastructure configuration —
                    as strictly confidential.
                  </p>
                  <p className="mt-4">
                    We will sign a Non-Disclosure Agreement (NDA)
                    upon request before any sensitive information
                    is shared.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Client Responsibilities</h2>
                  <p>
                    The client agrees to:
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Provide necessary access (AWS, GitHub, etc.)
                      in a timely manner</li>
                    <li>Respond to questions within 2 business days
                      to avoid project delays</li>
                    <li>Not hold DevOpsFlow liable for delays caused
                      by late access or approvals</li>
                    <li>Ensure they have the right to grant us
                      access to their systems</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                  <p>
                    DevOpsFlow&apos;s total liability for any claim
                    arising from our services shall not exceed
                    the total fees paid for the specific project
                    in question.
                  </p>
                  <p className="mt-4">
                    We are not liable for:
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Data loss (clients must maintain their own backups)</li>
                    <li>Business losses resulting from infrastructure
                      downtime beyond our control</li>
                    <li>Third-party service outages (AWS, GitHub, etc.)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. No Guarantee of Results</h2>
                  <p>
                    While we deliver production-grade infrastructure
                    following industry best practices, we cannot
                    guarantee specific business outcomes such as
                    revenue growth or user retention.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Termination</h2>
                  <p>
                    Either party may terminate a monthly retainer
                    with 14 days written notice via email.
                  </p>
                  <p className="mt-4">
                    For project-based work, termination after work
                    has begun will result in payment for all work
                    completed to date, calculated at a pro-rata rate.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. Governing Law</h2>
                  <p>
                    These Terms are governed by the laws of India.
                    Any disputes shall be subject to the jurisdiction
                    of courts in Nashik, Maharashtra, India.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">11. Changes to Terms</h2>
                  <p>
                    We reserve the right to update these Terms at
                    any time. Updated terms will be posted on this
                    page. Continued use of our services constitutes
                    acceptance of the revised terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">12. Contact</h2>
                  <p>
                    For any questions regarding these Terms:<br />
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
