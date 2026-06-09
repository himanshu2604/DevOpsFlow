'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const navLinks = [
  { href: '/#hero', label: 'Home', id: 'hero' },
  { href: '/#services', label: 'Services', id: 'services' },
  { href: '/#how-it-works', label: 'How It Works', id: 'how-it-works' },
  { href: '/#portfolio', label: 'Portfolio', id: 'portfolio' },
  { href: '/contact', label: 'Contact', id: 'contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Bolt: Use Framer Motion's optimized scroll listener instead of a manual window event listener
  // This reduces the number of listeners on the main thread and leverages the existing useScroll hook.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 50
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled)
    }
  })

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sectionIds = ['hero', 'services', 'how-it-works', 'portfolio']
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [pathname])

  const menuRef = useRef<HTMLDivElement>(null)
  const lastFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll('a, button')
        const first = focusable[0] as HTMLElement
        const last = focusable[focusable.length - 1] as HTMLElement
        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault()
        }
      }
    }

    if (isMobileMenuOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
      setTimeout(() => (menuRef.current?.querySelector('a') as HTMLElement)?.focus(), 100)
    } else {
      document.body.style.overflow = ''
      lastFocusedElement.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      const id = href.replace('/#', '')
      const element = document.getElementById(id)
      if (element) {
        setIsMobileMenuOpen(false)
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
        style={{ scaleX, backgroundColor: '#00e5a0' }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-3 h-3">
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse-glow" />
                <div className="absolute inset-0.5 bg-primary rounded-full" />
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                DevOpsFlow
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id || (pathname === link.href && !link.href.includes('#'))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`relative text-sm transition-colors duration-150 group ${
                      isActive ? 'text-white' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[2px] bg-primary"
                      initial={false}
                      animate={{
                        width: isActive ? '100%' : '0%',
                        backgroundColor: '#00e5a0'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild size="lg" className="h-10 px-5 py-2.5">
                    <Link href="/contact">
                      <span className="relative flex h-2 w-2">
                        <motion.span
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"
                        />
                      </span>
                      Book Free Audit
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="mb-2">
                  We are currently accepting new projects
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-foreground origin-center transition-colors"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-foreground transition-colors"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-foreground origin-center transition-colors"
                />
              </div>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.id || (pathname === link.href && !link.href.includes('#'))
                return (
                  <motion.div
                    key={link.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavLinkClick(e, link.href)}
                      className={`relative text-2xl font-display font-medium transition-colors duration-150 ${
                        isActive ? 'text-white' : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {link.label}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[2px] bg-primary"
                        initial={false}
                        animate={{
                          width: isActive ? '100%' : '0%',
                          backgroundColor: '#00e5a0'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-4"
              >
                <Button asChild size="lg" className="px-6 py-3">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative flex h-2 w-2">
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"
                      />
                    </span>
                    Book Free Audit
                  </Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
