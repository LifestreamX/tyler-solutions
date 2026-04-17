'use client';

import { FadeUp, StaggerContainer, motion, fadeUp } from '@/lib/motion';

const capabilities = [
  {
    title: 'Secure Customer and Staff Access',
    description:
      'Logins, client areas, permissions, and secure workflows for the people who need the right information.',
    examples: [
      'Customer portals',
      'Staff logins',
      'Secure messaging',
      'Permissions',
    ],
  },
  {
    title: 'Payments and Connected Systems',
    description:
      'The pieces that collect money and move data between the tools you already use.',
    examples: [
      'Checkout flows',
      'Subscriptions',
      'Invoices',
      'CRM and email connections',
    ],
  },
  {
    title: 'Forms, Automation, and Reporting',
    description:
      'Operational pieces that reduce manual work and make follow-up easier.',
    examples: ['Lead forms', 'Automation flows', 'Dashboards', 'Approvals'],
  },
  {
    title: 'Ongoing Improvements',
    description:
      'Follow-up work that keeps the site easier to use, faster, and easier to maintain.',
    examples: [
      'Content updates',
      'Speed work',
      'Accessibility fixes',
      'Maintenance',
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
            <p className='label-mono mb-3'>/ more ways I help</p>
            <h2
              id='stack-heading'
              className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'
            >
              Common Features and Systems
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              Once the main site or store is in place, these are the extra
              pieces I often add to help a business run more smoothly.
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
              Not every project needs all of this. I recommend only the pieces
              that solve the current problem.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
