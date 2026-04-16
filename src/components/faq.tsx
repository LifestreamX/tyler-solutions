'use client';

import { FadeUp, StaggerContainer, ScaleIn } from '@/lib/motion';

const faqs = [
  {
    question: 'How does pricing work?',
    answer:
      'Every project is quoted after I review what you need. Smaller fixes and reviews can usually be scoped quickly, and larger projects come with a clear plan, timeline, and price before work starts.',
  },
  {
    question: 'How long does a project usually take?',
    answer:
      'That depends on what needs to be done. Smaller updates can move quickly, while full websites or more involved tools take longer. Before anything starts, I will tell you what timeline makes sense for the work.',
  },
  {
    question: 'Can you improve what we already have?',
    answer:
      'Yes. A lot of projects start with an existing website, store, or internal setup. If a full rebuild is not the best move, I will not push one.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. I can stay involved for updates, fixes, speed improvements, lead tracking, search visibility work, and the next phase when you are ready.',
  },
  {
    question: 'Can you help with integrations, automations, or platform moves?',
    answer:
      'Yes. I can help connect payments, email tools, CRM systems, marketing tracking, customer accounts, and other software. I can also help with platform moves when the current setup is holding the business back.',
  },
  {
    question: 'Do I need a full plan before reaching out?',
    answer:
      'No. A short message is enough. If you know the problem, the goal, or what feels stuck, that is enough for me to help you figure out the best next step.',
  },
] as const;

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
              Questions People Usually Ask Before Reaching Out
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              If you are not sure whether now is the right time to ask, these
              are usually the first things people want to know.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {faqs.map((item) => (
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
              If you are still unsure, send a short note anyway. I can tell you
              whether it sounds like a fit and what I would recommend next.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
