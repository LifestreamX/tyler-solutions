'use client';

import { FadeUp, StaggerContainer, motion, fadeUp } from '@/lib/motion';

const capabilities = [
  {
    title: 'Websites and Online Stores',
    description:
      'Customer-facing sites, landing pages, online stores, and customer logins for people using the business from the outside.',
    examples: ['Shopify stores', 'WordPress sites', 'Custom pages'],
  },
  {
    title: 'Team Tools and Reporting',
    description:
      'Dashboards, admin areas, reporting views, and connected tools that help a team work faster behind the scenes.',
    examples: ['Dashboards', 'Reports', 'Admin areas', 'Data imports'],
  },
  {
    title: 'Payments and Connected Tools',
    description:
      'Connections between the tools you already use so less work has to be done by hand and more information stays in sync.',
    examples: [
      'Billing',
      'Third-party connections',
      'Sales tracking',
      'Email marketing',
    ],
  },
  {
    title: 'Speed, Stability, and Ongoing Upkeep',
    description:
      'The behind-the-scenes setup that keeps a site fast, stable, secure, and easier to maintain after launch.',
    examples: [
      'Hosting',
      'Speed fixes',
      'Accessibility updates',
      'Security basics',
    ],
  },
] as const;

export function TechStack() {
  return (
    <section
      id='stack'
      className='section-shell bg-surface'
      aria-labelledby='stack-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Section header */}
        <FadeUp>
          <div className='max-w-3xl section-heading'>
            <p className='label-mono mb-3'>/ capabilities</p>
            <h2
              id='stack-heading'
              className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'
            >
              <span className='block'>Common Types of Work</span>
              <span className='block'>I Handle Often</span>
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              If some of these labels feel a little technical, that is okay. The
              main point is that I can work across websites, stores, payments,
              reporting, and behind-the-scenes setup without forcing a
              one-size-fits-all approach.
            </p>
          </div>
        </FadeUp>

        {/* Grid of tech categories */}
        <StaggerContainer className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {capabilities.map((capability) => (
            <motion.div
              key={capability.title}
              variants={fadeUp}
              className='card-workstation p-6 sm:p-8'
            >
              <h3 className='font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-6'>
                {capability.title}
              </h3>
              <p className='text-sm text-muted-foreground leading-relaxed mb-5'>
                {capability.description}
              </p>
              <p className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3'>
                Examples
              </p>
              <ul className='flex flex-wrap gap-2' role='list'>
                {capability.examples.map((item) => (
                  <li
                    key={item}
                    className='text-[11px] font-medium rounded-sm border border-border bg-card px-3 py-2 text-muted-foreground shadow-sm dark:shadow-none'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <div className='mt-8 rounded border border-border bg-card px-5 py-4 shadow-sm dark:shadow-none sm:px-6'>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              You do not need every piece at once. Sometimes the right next step
              is a new page, a faster checkout, a clearer report, or a cleaner
              handoff between the tools you already use.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
