'use client';

import { FadeUp, StaggerContainer, ScaleIn } from '@/lib/motion';
import { LayoutGrid, Wrench, Settings2, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: LayoutGrid,
    tag: '01',
    title: 'New Websites and Online Stores',
    description:
      'I can take a project from idea to launch, including the site design, build, checkout setup, and the customer experience around it.',
    features: [
      'Marketing sites and landing pages',
      'Online stores with product, cart, and checkout setup',
      'Customer logins and team tools',
      'Built to load fast, work well on mobile, and stay easy to manage',
    ],
  },
  {
    icon: Wrench,
    tag: '02',
    title: 'Fixes and Improvements for Existing Sites',
    description:
      'If your current site or store is outdated, broken, slow, or hard to manage, I can improve it without pushing a rebuild unless that is truly the better choice.',
    features: [
      'Design refreshes and content updates',
      'Fixes for slow pages, forms, and sales tracking',
      'Checkout improvements to reduce drop-off',
      'Moves to a better setup when the current one is holding you back',
    ],
  },
  {
    icon: Settings2,
    tag: '03',
    title: 'Team Tools and Better Workflows',
    description:
      'I also build the tools behind the scenes that help teams save time, reduce manual work, and see what is happening more clearly.',
    features: [
      'Dashboards and reports for day-to-day visibility',
      'Admin areas and team logins',
      'Connections between the tools you already use',
      'Organized access that stays easy to manage',
    ],
  },
];

const alsoAvailable = [
  'Accessibility reviews and fixes',
  'Reporting dashboards',
  'Analytics and conversion tracking',
  'Payments and subscriptions',
  'Shopify and WordPress help',
  'Email setups and third-party connections',
  'Hosting and performance setup',
  'Security and compliance reviews',
  'Content updates and maintenance',
  'AI chatbot and support tools',
  'Platform migrations',
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
              Most projects fall into one of these buckets: something new,
              improvements to what already exists, or better tools behind the
              scenes.
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
