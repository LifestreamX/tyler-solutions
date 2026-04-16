'use client';

import { FadeUp, FadeIn } from '@/lib/motion';

const reasons = [
  {
    title: 'Plain-language communication',
    description:
      'You talk to the person doing the work, so questions move faster and the recommendations stay easy to understand.',
    tone: 'accent-blue',
  },
  {
    title: 'One person throughout',
    description:
      'I stay involved from early planning through launch instead of passing the work around between different people.',
    tone: 'accent-violet',
  },
  {
    title: 'Advice tied to the business',
    description:
      'I look at what the business actually needs instead of forcing the same answer on every project.',
    tone: 'accent-emerald',
  },
] as const;

export function Testimonials() {
  return (
    <section
      id='trust'
      className='section-shell bg-background'
      aria-labelledby='trust-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <FadeUp>
          <div className='max-w-2xl section-heading'>
            <p className='label-mono mb-3'>/ why work with me</p>
            <h2
              id='trust-heading'
              className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'
            >
              <span className='block'>Why Businesses</span>
              <span className='block text-accent'>Like Working With Me</span>
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              Most business owners want the work explained clearly, handled
              responsibly, and kept moving. They want clear advice, practical
              work, and one person who stays accountable from start to finish.
            </p>
          </div>
        </FadeUp>

        <FadeIn delay={0.1}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5'>
            <div className='card-workstation p-6 sm:p-8 md:col-span-2 lg:p-10'>
              <p className='font-mono text-[10px] text-accent uppercase tracking-widest mb-4'>
                How I Work
              </p>
              <div className='max-w-2xl space-y-5'>
                <h3 className='text-xl lg:text-2xl font-semibold text-foreground'>
                  You work with the person doing the work from the first
                  conversation through launch.
                </h3>
                <p className='text-sm lg:text-base text-muted-foreground leading-relaxed'>
                  Clients usually hire me because they want someone who can
                  understand the business, explain the options clearly, and keep
                  the work moving without confusion.
                </p>
                <p className='text-sm lg:text-base text-muted-foreground leading-relaxed'>
                  I handle planning, design, build, launch, and follow-up
                  support when needed. That keeps communication simpler and
                  responsibility in one place.
                </p>
              </div>
            </div>

            <div className='grid gap-4'>
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className={`card-workstation ${reason.tone} flex min-h-32 flex-col justify-center p-6 text-left`}
                >
                  <h3 className='accent-text mb-2 text-base font-semibold leading-tight'>
                    {reason.title}
                  </h3>
                  <p className='text-xs text-muted-foreground leading-relaxed'>
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
