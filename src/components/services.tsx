'use client';

import { FadeUp, StaggerContainer, ScaleIn } from '@/lib/motion';
import { LayoutGrid, Wrench, Settings2, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: LayoutGrid,
    tag: '01',
    title: 'New Websites, Sales Pages, and Online Stores',
    description:
      'If you need a new website, a page built to bring in inquiries, or a better online sales experience, I can handle the planning, design, setup, and launch.',
    features: [
      'Business websites and service pages',
      'Online stores with product, cart, and checkout setup',
      'Private customer areas and logins',
      'Mobile-friendly pages your team can update',
    ],
  },
  {
    icon: Wrench,
    tag: '02',
    title: 'Fixes, Updates, and Growth Improvements',
    description:
      'If the site you have now is outdated, difficult to manage, or costing you leads or sales, I can improve it without pushing a full rebuild unless that is truly the best move.',
    features: [
      'Design refreshes and content updates',
      'Fixes for slow pages, broken forms, and checkout problems',
      'Tracking and reports so you can see what is working',
      'Moves to a better platform if the current setup is holding you back',
    ],
  },
  {
    icon: Settings2,
    tag: '03',
    title: 'Internal Tools, Automations, and Time-Saving Systems',
    description:
      'I also build the behind-the-scenes tools that help teams save time, stay organized, and stop doing repetitive work by hand.',
    features: [
      'Internal tools and simple reports',
      'Secure logins, invites, and permission setup',
      'Automations between forms, email, payments, and other tools',
      'Tools built around how your business already works',
    ],
  },
];

const alsoAvailable = [
  'Accessibility and easier site use',
  'Lead tracking and reports',
  'Google Business Profile help',
  'Payments and subscriptions',
  'Shopify and WordPress support',
  'Email and software connections',
  'CRM and marketing automation',
  'Data imports and cleanup',
  'Speed improvements',
  'Security, backups, and maintenance',
  'Content updates',
  'AI chat and support tools',
  'Platform migrations',
  'Wholesale and partner sales setup',
  'Sensitive or compliance-aware workflows',
  'Site reviews and improvement plans',
  'Ongoing support',
];

export function Services() {
  return (
    <section
      id='services'
      className='section-shell bg-background'
      aria-labelledby='services-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Section header */}
        <FadeUp>
          <div className='max-w-2xl section-heading'>
            <p className='label-mono mb-3'>/ what I solve</p>
            <h2
              id='services-heading'
              className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'
            >
              What Clients Usually Hire Me For
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              Whether you need something customer-facing, help behind the
              scenes, or improvements to what you already have, I can usually
              step in without turning it into a bigger project than it needs to
              be.
            </p>
          </div>
        </FadeUp>

        {/* Service cards */}
        <StaggerContainer className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {services.map((service) => (
            <ScaleIn key={service.tag}>
              <article className='group relative card-workstation h-full overflow-hidden p-5 sm:p-8'>
                {/* Accent top line on hover */}
                <div className='absolute top-0 left-0 right-0 h-0.5 bg-accent scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100' />

                {/* Tag number */}
                <p className='font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-6'>
                  {service.tag}
                </p>

                {/* Icon */}
                <div className='inline-flex p-2.5 bg-card border border-border rounded mb-6'>
                  <service.icon
                    className='h-5 w-5 text-accent'
                    aria-hidden='true'
                  />
                </div>

                {/* Title */}
                <h3 className='text-lg font-semibold text-foreground mb-3 flex items-start justify-between gap-2'>
                  {service.title}
                  <ArrowUpRight
                    className='h-4 w-4 text-muted-foreground group-hover:text-accent shrink-0 transition-colors mt-0.5'
                    aria-hidden='true'
                  />
                </h3>

                {/* Description */}
                <p className='text-sm text-muted-foreground leading-relaxed mb-6'>
                  {service.description}
                </p>

                {/* Feature list */}
                <ul className='space-y-2' role='list'>
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className='flex items-center gap-2.5 text-xs text-muted-foreground'
                    >
                      <span className='h-px w-4 bg-accent shrink-0' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </ScaleIn>
          ))}
        </StaggerContainer>

        {/* Also available */}
        <FadeUp delay={0.2}>
          <div className='rounded border border-border bg-surface px-5 py-5 shadow-sm dark:shadow-none flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 sm:px-6'>
            <span className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest shrink-0'>
              Other common requests:
            </span>
            <ul className='flex flex-wrap gap-2' role='list'>
              {alsoAvailable.map((item) => (
                <li
                  key={item}
                  className='text-xs font-medium px-3 py-1 border border-border text-muted-foreground rounded-sm hover:border-accent/50 hover:text-foreground transition-colors cursor-default'
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
