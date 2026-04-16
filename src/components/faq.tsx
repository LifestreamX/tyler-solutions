'use client';

import { FadeUp, StaggerContainer, ScaleIn } from '@/lib/motion';
import { faqItems } from '@/lib/site-content';

export function Faq() {
  return (
    <section
      id='faq'
      className='section-shell bg-surface'
      aria-labelledby='faq-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <FadeUp>
          <div className='max-w-3xl section-heading'>
            <p className='label-mono mb-3'>/ common questions</p>
            <h2
              id='faq-heading'
              className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'
            >
              Questions I Hear Before People Reach Out
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              If you are still deciding whether to get in touch, these are the
              questions I hear most.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {faqItems.map((item) => (
            <ScaleIn key={item.question}>
              <article className='card-workstation h-full p-6'>
                <h3 className='mb-3 text-base font-semibold text-foreground'>
                  {item.question}
                </h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {item.answer}
                </p>
              </article>
            </ScaleIn>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <div className='mt-8 rounded border border-border bg-background px-5 py-4 shadow-sm dark:shadow-none sm:px-6'>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              If you are still not sure, send a short note anyway. I can tell
              you whether it sounds like a fit and what I&apos;d suggest next.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
