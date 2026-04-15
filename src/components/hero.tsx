'use client';

import { FadeUp, FadeIn } from '@/lib/motion';
import { ArrowRight, ChevronDown, Code2 } from 'lucide-react';
import {
  trackBookCallClick,
  trackCtaClick,
  trackSeeWorkClick,
} from '@/lib/analytics';

const servicePills = [
  'New websites',
  'Site improvements',
  'Team tools',
  'Ongoing support',
];

export function Hero() {
  return (
    <section
      id='hero'
      className='relative flex min-h-svh items-center justify-center overflow-hidden bg-background pt-14'
      aria-labelledby='hero-heading'
    >
      {/* Dot-matrix background */}
      <div className='absolute inset-0 bg-dots opacity-60' />
      {/* Subtle vignette */}
      <div className='absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-background/80' />
      {/* Electric blue glow */}
      <div className='absolute bottom-0 right-0 h-100 w-150 rounded-full bg-accent/8 blur-[120px] pointer-events-none' />
      {/* Faint left accent */}
      <div className='absolute top-1/3 -left-32 h-100 w-100 rounded-full bg-accent/5 blur-[100px] pointer-events-none' />

      <div className='relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24'>
        <div className='max-w-4xl'>
          {/* Status badge */}
          <FadeUp>
            <div className='inline-flex items-center gap-2.5 border border-accent/30 bg-accent/8 text-accent-glow px-3 py-1.5 rounded text-xs font-mono uppercase tracking-widest mb-10'>
              <span className='relative flex h-1.5 w-1.5' aria-hidden='true'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75' />
                <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-accent' />
              </span>
              Now booking client work
            </div>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.1}>
            <h1
              id='hero-heading'
              className='text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-foreground'
            >
              <span className='block'>Websites, store improvements,</span>
              <span className='block'>and internal tools</span>
              <span className='block text-accent'>
                that make the business easier to run.
              </span>
            </h1>
          </FadeUp>

          {/* Subheadline */}
          <FadeUp delay={0.2}>
            <p className='text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed'>
              If you need something new, help fixing what already exists, or
              better tools behind the scenes, I handle the work directly with
              clear communication from the first plan through launch.
            </p>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.3}>
            <div className='flex flex-col sm:flex-row gap-3'>
              <a
                href='#contact'
                onClick={() => trackBookCallClick('hero')}
                className='btn-accent group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded px-6 py-3 text-sm font-semibold text-accent-foreground sm:w-auto'
              >
                Book a Call
                <ArrowRight className='h-4 w-4 group-hover:translate-x-0.5 transition-transform' />
              </a>
              <a
                href='#work'
                onClick={() => trackSeeWorkClick('hero')}
                className='inline-flex min-h-11 w-full items-center justify-center gap-2 rounded border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-px hover:border-accent/50 hover:shadow-md dark:shadow-none dark:hover:shadow-none sm:w-auto'
              >
                <Code2 className='h-4 w-4 text-muted-foreground' />
                View Client Work
              </a>
            </div>

            <div className='mt-5 flex flex-wrap gap-2'>
              {servicePills.map((pill) => (
                <span
                  key={pill}
                  className='inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm dark:shadow-none'
                >
                  {pill}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* Stats strip */}
          <FadeIn delay={0.5}>
            <div className='mt-14 grid grid-cols-1 gap-3 border-t border-surface pt-6 sm:mt-16 sm:pt-8 sm:grid-cols-2'>
              {[
                {
                  title: 'Direct communication',
                  description:
                    'You work with me from the first conversation through launch.',
                },
                {
                  title: 'Clear scope',
                  description:
                    'You get priorities, cost, and next steps before work starts.',
                },
                {
                  title: 'New or existing work',
                  description:
                    'I can build from scratch or improve what you already have.',
                },
                {
                  title: 'Support after launch',
                  description:
                    'If you need updates later, I can stay involved.',
                },
              ].map((point) => (
                <div
                  key={point.title}
                  className='rounded border border-border bg-surface p-4 shadow-sm dark:shadow-none'
                >
                  <h3 className='text-sm font-semibold text-foreground mb-1'>
                    {point.title}
                  </h3>
                  <p className='text-xs text-muted-foreground leading-relaxed'>
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
        <FadeIn delay={0.9}>
          <a
            href='#services'
            onClick={() => trackCtaClick('scroll_to_services', 'hero_scroll')}
            className='flex min-h-11 min-w-11 flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground'
            aria-label='Scroll to services'
          >
            <span className='text-[10px] font-mono tracking-[0.2em] uppercase'>
              Scroll
            </span>
            <ChevronDown
              className='h-3.5 w-3.5 animate-bounce'
              aria-hidden='true'
            />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
