'use client';

import { FadeUp, StaggerContainer, ScaleIn } from '@/lib/motion';
import { ArrowUpRight } from 'lucide-react';
import { trackBookCallClick } from '@/lib/analytics';

const accentClasses = {
  blue: {
    wrapper: 'accent-blue',
  },
  violet: {
    wrapper: 'accent-violet',
  },
  emerald: {
    wrapper: 'accent-emerald',
  },
} as const;

type AccentKey = keyof typeof accentClasses;

type CaseStudy = {
  tag: string;
  num: string;
  title: string;
  role: string;
  period: string;
  description: string;
  outcomes: string[];
  included: string[];
  accent: AccentKey;
};

const caseStudies: CaseStudy[] = [
  {
    tag: 'Team Operations',
    num: '01',
    title: 'Client Communication and Billing Hub',
    role: 'Planned, designed, built, and launched the full system',
    period: '2024 to Present',
    description:
      'Built a private online area that brought customer communication, login access, and billing into one place for the business.',
    outcomes: [
      'Made it easier for staff and clients to keep communication in one place',
      'Reduced back-and-forth and repetitive office work',
      'Let customers view accounts and handle billing in the same space',
      'Kept the right information visible to the right people',
      'Made everyday account management easier for the team',
    ],
    included: [
      'Secure messaging',
      'Subscription billing',
      'Private account area',
      'Invites and permissions',
      'Staff tools',
      'Business reporting',
    ],
    accent: 'blue',
  },
  {
    tag: 'Online Store',
    num: '02',
    title: 'Store Recovery and Growth Support',
    role: 'Fixed, improved, and stabilized an existing store',
    period: '2024',
    description:
      'Stepped into an online store that was losing sales because of speed and checkout problems, then stabilized and improved it so the business could keep growing.',
    outcomes: [
      'Removed checkout problems that were blocking sales',
      'Improved site speed so more shoppers could complete purchases',
      'Set up clearer marketing and sales reporting',
      'Added wholesale and partner-friendly features',
      'Made the store easier to manage day to day',
    ],
    included: [
      'Store updates',
      'Checkout fixes',
      'Sales reports',
      'Store move',
      'Speed improvements',
      'Wholesale and partner sales',
    ],
    accent: 'violet',
  },
  {
    tag: 'Custom Product',
    num: '03',
    title: 'Guided Search and Recommendation Experience',
    role: 'Took a client concept from idea to live product',
    period: 'Jan 2024 to Jun 2024',
    description:
      'Built a web experience that helped people narrow their options and reach the right choice faster.',
    outcomes: [
      'Moved the idea from planning to live launch',
      'Created a clearer step-by-step search experience',
      'Made the experience more reliable when people entered the wrong information',
      'Made it work cleanly across phone, tablet, and desktop',
      'Left the product easy to update and expand over time',
    ],
    included: [
      'Search flow',
      'Mobile-friendly design',
      'Content setup',
      'Logins and access',
      'Reliability improvements',
      'Launch support',
    ],
    accent: 'emerald',
  },
];

export function CaseStudies() {
  return (
    <section
      id='work'
      className='section-shell bg-background'
      aria-labelledby='work-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Section header */}
        <FadeUp>
          <div className='max-w-2xl section-heading'>
            <p className='label-mono mb-3'>/ client work</p>
            <h2
              id='work-heading'
              className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'
            >
              Recent Client Work
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              A few examples of work that made it easier to sell, serve
              customers, or run the business.
            </p>
          </div>
        </FadeUp>

        {/* Case study cards */}
        <StaggerContainer className='space-y-4'>
          {caseStudies.map((study) => {
            const accent = accentClasses[study.accent];

            return (
              <ScaleIn key={study.num}>
                <article
                  data-case-study={study.title}
                  aria-labelledby={`case-study-${study.num}`}
                  className={`group relative card-workstation accent-shadow-hover overflow-hidden ${accent.wrapper}`}
                >
                  {/* Left accent bar */}
                  <div className='accent-bg absolute left-0 top-0 bottom-0 w-0.75 transition-all duration-300' />

                  <div className='p-5 pl-6 sm:p-8 sm:pl-10 lg:p-10 lg:pl-12'>
                    <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8'>
                      {/* Number */}
                      <div className='hidden lg:block font-mono text-5xl font-bold text-border select-none shrink-0 leading-none pt-1'>
                        {study.num}
                      </div>

                      {/* Content */}
                      <div className='flex-1'>
                        {/* Meta row */}
                        <div className='mb-4 flex flex-wrap items-center gap-x-3 gap-y-2'>
                          <span className='accent-badge accent-text font-mono text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-widest border'>
                            {study.tag}
                          </span>
                          <span className='text-xs text-muted-foreground font-mono'>
                            {study.period}
                          </span>
                          <span className='basis-full text-xs text-muted-foreground sm:basis-auto'>
                            {study.role}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          id={`case-study-${study.num}`}
                          className='mb-3 flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl lg:text-2xl'
                        >
                          {study.title}
                          <ArrowUpRight
                            className='h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0'
                            aria-hidden='true'
                          />
                        </h3>

                        {/* Description */}
                        <p className='mb-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mb-6'>
                          {study.description}
                        </p>

                        <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6'>
                          {/* Outcomes */}
                          <div>
                            <h4 className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3'>
                              Key Outcomes
                            </h4>
                            <ul className='space-y-1.5' role='list'>
                              {study.outcomes.map((outcome) => (
                                <li
                                  key={outcome}
                                  className='flex items-start gap-2.5 text-xs text-muted-foreground'
                                >
                                  <span className='accent-bg mt-1.5 h-1 w-3 shrink-0 rounded-full' />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech */}
                          <div>
                            <h4 className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3'>
                              Included
                            </h4>
                            <ul className='flex flex-wrap gap-1.5' role='list'>
                              {study.included.map((item) => (
                                <li
                                  key={item}
                                  className='text-[11px] font-medium px-2.5 py-1 border border-border text-muted-foreground rounded-sm bg-card shadow-sm dark:shadow-none'
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </ScaleIn>
            );
          })}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className='mt-8 flex justify-center sm:mt-10'>
            <a
              href='#contact'
              onClick={() => trackBookCallClick('case_studies')}
              className='btn-accent inline-flex min-h-11 items-center justify-center rounded px-6 py-3 text-sm font-semibold text-accent-foreground'
            >
              See If I Can Help
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
