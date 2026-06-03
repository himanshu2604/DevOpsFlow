'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard } from '@/components/glass-card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const services = [
  { id: 'cicd', label: 'CI/CD Setup' },
  { id: 'infrastructure', label: 'Infrastructure Setup' },
  { id: 'retainer', label: 'Monthly Retainer' },
  { id: 'audit', label: 'Free Audit' },
]

const timelines = [
  { id: 'immediate', label: 'Immediate (ASAP)' },
  { id: '1-2-weeks', label: '1-2 Weeks' },
  { id: 'month', label: 'Within a Month' },
  { id: 'exploring', label: 'Just exploring' },
]

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  error?: string
  isTouched?: boolean
  isTextArea?: boolean
}

function FloatingInput({ label, error, isTouched, isTextArea, className, ...props }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = props.value !== ''
  const isValid = isTouched && !error && hasValue

  const InputComponent = isTextArea ? 'textarea' : 'input'

  return (
    <motion.div
      className="relative group"
      animate={error ? { x: [-1, 1, -1, 1, 0], transition: { duration: 0.2 } } : {}}
    >
      <div className={cn(
        "relative rounded-lg border bg-card transition-all duration-200",
        isFocused ? "border-primary ring-1 ring-primary/20" : "border-border",
        error ? "border-destructive ring-destructive/20" :
        isValid ? "border-primary/50" : "group-hover:border-white/20"
      )}>
        <InputComponent
          {...(props as any)}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          className={cn(
            "w-full bg-transparent px-4 pt-6 pb-2 text-foreground outline-none transition-all",
            isTextArea && "min-h-[120px] resize-none",
            className
          )}
          placeholder=" " // Required for the peer-placeholder-shown trick or custom logic
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none text-muted-foreground",
            (isFocused || hasValue)
              ? "text-[10px] uppercase tracking-wider font-bold top-2 text-primary"
              : "text-base top-4"
          )}
        >
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>

        {error && (
          <div className="absolute right-3 top-4">
            <svg className="w-5 h-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}

        {isValid && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-3 top-4"
          >
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-destructive text-xs mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    timeline: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = (name: string, value: string) => {
    let error = ''
    if (name === 'name' && !value.trim()) error = 'Name is required'
    if (name === 'company' && !value.trim()) error = 'Company is required'
    if (name === 'email') {
      if (!value.trim()) error = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email'
    }
    if (name === 'service' && !value) error = 'Please select a service'
    if (name === 'timeline' && !value) error = 'Please select a timeline'
    if (name === 'message' && !value.trim()) error = 'Message is required'
    
    setErrors(prev => ({ ...prev, [name]: error }))
    return !error
  }

  const validateForm = () => {
    const fields = ['name', 'company', 'email', 'service', 'timeline', 'message']
    let isValid = true
    fields.forEach(field => {
      if (!validateField(field, (formState as any)[field])) {
        isValid = false
      }
    })
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitError(false)
    
    try {
      const response = await fetch('https://formspree.io/f/mqakpzoz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formState,
          _replyto: formState.email
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        setSubmitError(true)
      }
    } catch (err) {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'message' && value.length > 500) return

    setFormState((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      validateField(name, value)
    }
    if (submitError) setSubmitError(false)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const getMessageCounterColor = (length: number) => {
    if (length >= 500) return 'text-red-500'
    if (length >= 400) return 'text-amber-500'
    return 'text-muted-foreground'
  }

  return (
    <main className="relative">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Aurora-like gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 text-balance">
              Let&apos;s build your
              <br />
              <span className="text-gradient-primary">infrastructure</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Start with a free audit. We&apos;ll analyze your setup and deliver actionable 
              recommendations within 48 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FloatingInput
                        label="Name"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name}
                        isTouched={touched.name}
                        required
                      />
                      <FloatingInput
                        label="Company"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.company}
                        isTouched={touched.company}
                        required
                      />
                    </div>

                    <FloatingInput
                      label="Email"
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                      isTouched={touched.email}
                      required
                    />

                    <div className="relative">
                      <FloatingInput
                        isTextArea
                        label="Tell us about your project"
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.message}
                        isTouched={touched.message}
                        required
                      />
                      <div className={cn(
                        "absolute right-4 bottom-2 text-[10px] font-mono transition-colors",
                        getMessageCounterColor(formState.message.length)
                      )}>
                        {formState.message.length}/500
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className={cn(
                        "relative rounded-lg border bg-card transition-all duration-200",
                        formState.service ? "border-primary/50" : "border-border",
                        errors.service ? "border-destructive ring-1 ring-destructive/20" : "group-hover:border-white/20"
                      )}>
                        <select
                          id="service"
                          name="service"
                          value={formState.service}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full bg-transparent px-4 pt-6 pb-2 text-foreground outline-none appearance-none cursor-pointer"
                          required
                        >
                          <option value="" disabled className="bg-background">Select a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id} className="bg-background">
                              {service.label}
                            </option>
                          ))}
                        </select>
                        <label
                          className={cn(
                            "absolute left-4 transition-all duration-200 pointer-events-none text-muted-foreground",
                            formState.service
                              ? "text-[10px] uppercase tracking-wider font-bold top-2 text-primary"
                              : "text-base top-4"
                          )}
                        >
                          Service interested in
                          <span className="text-destructive ml-1">*</span>
                        </label>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                          {touched.service && !errors.service ? (
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <AnimatePresence>
                        {errors.service && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-destructive text-xs mt-1 ml-1"
                          >
                            {errors.service}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="relative group">
                      <div className={cn(
                        "relative rounded-lg border bg-card transition-all duration-200",
                        formState.timeline ? "border-primary/50" : "border-border",
                        errors.timeline ? "border-destructive ring-1 ring-destructive/20" : "group-hover:border-white/20"
                      )}>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formState.timeline}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full bg-transparent px-4 pt-6 pb-2 text-foreground outline-none appearance-none cursor-pointer"
                          required
                        >
                          <option value="" disabled className="bg-background">Select a timeline</option>
                          {timelines.map((timeline) => (
                            <option key={timeline.id} value={timeline.id} className="bg-background">
                              {timeline.label}
                            </option>
                          ))}
                        </select>
                        <label
                          className={cn(
                            "absolute left-4 transition-all duration-200 pointer-events-none text-muted-foreground",
                            formState.timeline
                              ? "text-[10px] uppercase tracking-wider font-bold top-2 text-primary"
                              : "text-base top-4"
                          )}
                        >
                          Preferred Timeline
                          <span className="text-destructive ml-1">*</span>
                        </label>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                          {touched.timeline && !errors.timeline ? (
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <AnimatePresence>
                        {errors.timeline && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-destructive text-xs mt-1 ml-1"
                          >
                            {errors.timeline}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        variant={isSubmitted ? "outline" : "default"}
                        className={cn(
                          "w-full py-6 text-base transition-all duration-300",
                          isSubmitted && "border-primary text-primary hover:bg-primary/5"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Deploying...
                          </>
                        ) : isSubmitted ? (
                          <>Request Deployed ✓</>
                        ) : submitError ? (
                          <>Transmission Failed</>
                        ) : (
                          <>
                            Deploy Request
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </Button>

                      <AnimatePresence>
                        {isSubmitted && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-sm text-primary font-medium"
                          >
                            We&apos;ve received your transmission. A senior engineer will respond within 2 hours.
                          </motion.p>
                        )}
                        {submitError && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-sm text-destructive font-medium"
                          >
                            Something went wrong. Please try again or email us directly at{' '}
                            <a href="mailto:hello@devopsflow.dev" className="underline hover:text-white transition-colors">
                              hello@devopsflow.dev
                            </a>
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="pt-6 mt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { text: 'Fixed-price guarantee', icon: '🤝' },
                          { text: '2h Response time', icon: '⚡' },
                          { text: 'No spam, ever', icon: '🔐' }
                        ].map((item) => (
                          <div key={item.text} className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                            <span className="text-xs">{item.icon}</span>
                            {item.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* System Status Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-3 h-3">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50" />
                      <div className="relative bg-primary rounded-full w-3 h-3" />
                    </div>
                    <span className="font-semibold text-foreground">System Status</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="text-primary">&lt; 2h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Availability</span>
                      <span className="text-primary">Available</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">New Projects</span>
                      <span className="text-primary">Accepting</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassCard className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Get in touch</h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:hello@devopsflow.dev"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      hello@devopsflow.dev
                    </a>
                    <a
                      href="https://cal.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book a call
                    </a>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Remote-first, worldwide
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassCard className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">The DevOpsFlow Advantage</h3>
                  <ul className="space-y-4">
                    {[
                      { title: 'Fixed-Price Guarantee', desc: 'No hidden costs or scope creep, ever.' },
                      { title: 'YC-Backed Experience', desc: 'We move at the speed of high-growth startups.' },
                      { title: 'SOC 2 Ready', desc: 'Infrastructure built with security as a first-class citizen.' },
                      { title: '48h Audit Delivery', desc: 'Get actionable insights within two business days.' },
                    ].map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-foreground leading-none mb-1">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
