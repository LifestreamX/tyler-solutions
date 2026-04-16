'use client';

import { FadeUp, StaggerContainer, motion, fadeUp } from '@/lib/motion';

const capabilities = [
  {
    title: 'Websites, Sales Pages, and Online Stores',
    description:
      'The pages customers see first, whether you need a full business website, a page built to bring in inquiries, or an online store.',
    examples: [
      'Business websites',
      'Sales pages',
      'Online stores',
      'Booking or sign-up pages',
    ],
  },
  {
    title: 'Private Customer Areas, Staff Tools, and Secure Workflows',
    description:
      'Password-protected areas, secure messaging, and internal tools that help customers and staff get what they need without extra back-and-forth.',
    examples: [
      'Customer logins',
      'Secure messaging',
      'Staff tools',
      'Invites and approvals',
    ],
  },
  {
    title: 'Payments, Automations, and Connected Systems',
    description:
      'The parts that collect information, take payments, and move the right details between the tools you already use.',
    examples: [
      'Payments',
      'Subscriptions',
      'Lead forms',
      'CRM and email tools',
      'Automation flows',
    ],
  },
  {
    title: 'Improvements, Support, and Ongoing Upkeep',
    description:
      'The work that keeps a site easier to use, faster to load, easier to trust, and easier to manage after it is live.',
    examples: [
      'Content updates',
      'Speed improvements',
      'Accessibility help',
      'Maintenance and backups',
      'Platform migrations',
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
              <span className='block'>Other Ways</span>
              <span className='block'>I Can Help</span>
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              Some businesses need a new website. Others need easier payments,
              private customer areas, automations, clearer reports, or better
              day-to-day tools. I can help with those pieces without making the
              process feel complicated.
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
              You do not need a giant rebuild to make progress. Sometimes the
              right next step is a clearer sales page, a simpler form, a better
              checkout, or a private area for customers or staff.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
