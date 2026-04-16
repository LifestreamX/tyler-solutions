'use client';

import Image from 'next/image';
import { FadeUp, StaggerContainer, ScaleIn } from '@/lib/motion';
import { BriefcaseBusiness, CheckSquare } from 'lucide-react';

const promises = [
  'Plain-English communication from start to finish',
  'Regular updates while the work is moving',
  'A clear plan and price before work starts',
  'Work your business can keep using after launch',
];

const goodFit = [
  'You want one person handling the work from start to finish',
  'Your current site or store needs improvements before a full rebuild',
  'Your team is wasting time in emails, spreadsheets, or disconnected tools',
  'You want clear advice instead of technical explanations',
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
          <div className='lg:col-span-3'>
            <FadeUp>
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
                <span className='block'>You Work With Me Directly</span>
                <span className='block text-accent'>From First Call to Launch.</span>
              </h2>
              <div className='space-y-5 text-muted-foreground leading-relaxed text-sm lg:text-base'>
                <p>
                  I work directly with business owners who need a new website, a
                  better online store, a secure customer area, or a custom tool
                  that saves time. I handle the planning, design, build, and
                  launch so the work stays clear and keeps moving.
                </p>
                <p>
                  I&apos;ve worked across service businesses, online stores,
                  healthcare and other privacy-sensitive workflows,
                  subscriptions, internal tools, automations, and after-launch
                  improvements. That range helps me connect what customers see
                  with what your team has to manage behind the scenes.
                </p>
                <p>
                  People usually come to me because they want straight answers,
                  practical advice, and one person responsible for the work. No
                  agency layers, no hand-offs, and no guessing about who is
                  doing what.
                </p>
              </div>
            </FadeUp>
          </div>

          <div className='lg:col-span-2'>
            <StaggerContainer className='space-y-3'>
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
                    {promises.map((promise) => (
                      <li
                        key={promise}
                        className='flex items-start gap-2.5 text-xs text-muted-foreground'
                      >
                        <span className='mt-1.5 h-1 w-3 shrink-0 bg-accent' />
                        {promise}
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
