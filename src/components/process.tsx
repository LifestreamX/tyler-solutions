'use client';

import { FadeUp, StaggerContainer, motion, fadeUp } from '@/lib/motion';
import {
  MessageSquare,
  Search,
  FileCode2,
  Rocket,
  Headphones,
} from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'First Conversation',
    description:
      'We talk through what you need, what is getting in the way, and what success should look like.',
  },
  {
    icon: Search,
    number: '02',
    title: 'Plan and Price',
    description:
      'I send back the plan, timeline, and cost so you can decide with clear expectations.',
  },
  {
    icon: FileCode2,
    number: '03',
    title: 'Build and Review',
    description:
      'I build in stages and share progress as we go so feedback happens early and nothing disappears into a black box.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch Checks',
    description:
      'Before launch I check mobile layouts, forms, page speed, and tracking so the site is ready for real use.',
  },
  {
    icon: Headphones,
    number: '05',
    title: 'Support After Launch',
    description:
      'After launch I can help with updates, fixes, and the next phase if you want ongoing support.',
  },
];

export function Process() {
  return (
    <section
      id='process'
      className='section-shell bg-surface'
      aria-labelledby='process-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Section header */}
        <FadeUp>
          <div className='max-w-2xl section-heading'>
            <p className='label-mono mb-3'>/ process</p>
            <h2
              id='process-heading'
              className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'
            >
              How We Work Together
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              Clear, efficient, and built to keep the work moving.
            </p>
          </div>
        </FadeUp>

        {/* Steps */}
        <StaggerContainer className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className='relative group card-workstation'
            >
              <div className='p-5 sm:p-6 h-full'>
                {/* Accent top line */}
                <div className='absolute top-0 left-0 right-0 h-0.5 bg-accent scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100' />

                {/* Number */}
                <span className='font-mono text-[10px] text-accent tracking-widest uppercase mb-4 block'>
                  {step.number}
                </span>

                {/* Icon */}
                <div className='inline-flex p-2 bg-background border border-border rounded mb-4'>
                  <step.icon
                    className='h-4 w-4 text-muted-foreground'
                    aria-hidden='true'
                  />
                </div>

                {/* Title */}
                <h3 className='text-sm font-semibold text-foreground mb-2'>
                  {step.title}
                </h3>

                {/* Description */}
                <p className='text-xs text-muted-foreground leading-relaxed'>
                  {step.description}
                </p>
              </div>

              {/* Connector - desktop only, skip last */}
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute top-6 -right-2 h-[calc(100%-3rem)] w-px bg-border' />
              )}
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
