'use client';

import Image from 'next/image';
import { FadeUp, StaggerContainer, ScaleIn } from '@/lib/motion';
import { BriefcaseBusiness, CheckSquare } from 'lucide-react';

const promises = [
  'Direct communication from planning through launch',
  'Clear updates while work is active',
  'Transparent scope and pricing before work begins',
  'Something that stays easy to update after launch',
];

const goodFit = [
  'You want one person to own the work from start to finish',
  'Your current site or store needs fixes before a full rebuild',
  'Your team is losing time to manual work or scattered tools',
];

export function About() {
  return (
    <section
      id='about'
      className='section-shell bg-surface'
      aria-labelledby='about-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16'>
          {/* Left - Photo + Bio */}
          <div className='lg:col-span-3'>
            <FadeUp>
              {/* Photo */}
              <div className='relative mb-8 w-fit sm:mb-10 mx-auto lg:mx-0'>
                <Image
                  src='/tyler.jpeg'
                  alt='Portrait of Tyler Allen'
                  width={560}
                  height={640}
                  sizes='(min-width: 640px) 260px, 220px'
                  className='rounded w-55 object-cover object-top border border-border shadow-md dark:shadow-none sm:w-65'
                />
                <div
                  className='absolute -bottom-3 -right-3 h-12 w-12 border-r-2 border-b-2 border-accent pointer-events-none'
                  aria-hidden='true'
                />
              </div>

              <p className='label-mono mb-3'>/ about</p>
              <h2
                id='about-heading'
                className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6'
              >
                <span className='block'>
                  One Partner From Planning to Launch.
                </span>
                <span className='block text-accent'>No agency hand-offs.</span>
              </h2>
              <div className='space-y-5 text-muted-foreground leading-relaxed text-sm lg:text-base'>
                <p>
                  I work directly with business owners who need a new website, a
                  better-performing store, or a custom tool for their team. I
                  handle planning, design, build, and launch, so the project
                  stays clear, accountable, and easy to move forward.
                </p>
                <p>
                  I have worked across online stores, service businesses,
                  customer logins, reporting dashboards, and custom web tools.
                  That range helps me connect the customer-facing side of a
                  business with the day-to-day work happening behind it.
                </p>
                <p>
                  Clients usually come to me because they want direct
                  communication, practical thinking, and one person who can stay
                  accountable from the first plan through launch and later
                  improvements. No layers of account managers, no hand-offs, and
                  no confusion about who owns the outcome.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right - Credentials */}
          <div className='lg:col-span-2'>
            <StaggerContainer className='space-y-3'>
              {/* Commitments */}
              <ScaleIn>
                <div className='card-workstation p-6'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='p-2 bg-surface border border-border rounded'>
                      <CheckSquare className='h-4 w-4 text-accent' />
                    </div>
                    <span className='font-mono text-[10px] text-accent uppercase tracking-widest'>
                      What You Can Expect
                    </span>
                  </div>
                  <ul className='space-y-2.5' role='list'>
                    {promises.map((p) => (
                      <li
                        key={p}
                        className='flex items-start gap-2.5 text-xs text-muted-foreground'
                      >
                        <span className='mt-1.5 h-1 w-3 shrink-0 bg-accent' />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScaleIn>

              <ScaleIn>
                <div className='card-workstation p-6'>
                  <div className='mb-4 flex items-center gap-3'>
                    <div className='rounded border border-border bg-surface p-2'>
                      <BriefcaseBusiness className='h-4 w-4 text-accent' />
                    </div>
                    <span className='font-mono text-[10px] text-accent uppercase tracking-widest'>
                      Good Fit If
                    </span>
                  </div>
                  <ul className='space-y-2.5' role='list'>
                    {goodFit.map((item) => (
                      <li
                        key={item}
                        className='flex items-start gap-2.5 text-xs text-muted-foreground'
                      >
                        <span className='mt-1.5 h-1 w-3 shrink-0 bg-accent' />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScaleIn>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
