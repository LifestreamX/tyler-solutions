'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import {
  trackNavClick,
  trackMobileMenuToggle,
  trackBookCallClick,
} from '@/lib/analytics';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Client Work' },
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Capabilities' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const focusable = mobileDialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (!focusable?.length || event.key !== 'Tab' || !first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  function handleMobileToggle() {
    const next = !mobileOpen;
    setMobileOpen(next);
    trackMobileMenuToggle(next ? 'open' : 'close');
  }

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/80'>
        <nav
          className='max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between'
          aria-label='Main navigation'
        >
          {/* Logo */}
          <a
            href='#'
            aria-label='Back to top'
            className='inline-flex min-h-11 items-center text-foreground font-bold tracking-tight transition-colors hover:text-accent'
          >
            Tyler Allen
          </a>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center gap-6'>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => trackNavClick(link.label, false)}
                className='inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors duration-200 font-medium hover:text-foreground'
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href='#contact'
              onClick={() => trackBookCallClick('navbar')}
              className='btn-accent inline-flex min-h-11 items-center justify-center rounded px-4 py-2 text-sm font-semibold text-accent-foreground'
            >
              Book a Call
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            ref={menuButtonRef}
            type='button'
            onClick={handleMobileToggle}
            className='md:hidden flex min-h-11 min-w-11 items-center justify-center rounded border border-border bg-card text-muted-foreground shadow-sm transition-all duration-200 hover:border-accent/30 hover:text-foreground hover:shadow-md dark:shadow-none'
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls='mobile-navigation'
          >
            {mobileOpen ? (
              <X className='h-5 w-5' aria-hidden='true' />
            ) : (
              <Menu className='h-5 w-5' aria-hidden='true' />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu - full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileDialogRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            id='mobile-navigation'
            className='md:hidden fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/98 pt-14 backdrop-blur-xl'
            aria-modal='true'
            role='dialog'
            aria-label='Mobile navigation menu'
          >
            <nav className='flex flex-col flex-1 px-6 pt-8 pb-12'>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    trackNavClick(link.label, true);
                  }}
                  className='inline-flex min-h-11 items-center border-b border-border py-5 text-2xl font-semibold text-muted-foreground transition-colors hover:text-foreground last:border-0'
                >
                  {link.label}
                </a>
              ))}
              <div className='mt-6'>
                <ThemeToggle />
              </div>
              <a
                href='#contact'
                onClick={() => {
                  setMobileOpen(false);
                  trackBookCallClick('navbar_mobile');
                }}
                className='btn-accent mt-8 inline-flex min-h-11 items-center justify-center rounded px-6 py-4 text-base font-semibold text-accent-foreground'
              >
                Book a Call
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
