'use client';

import { ArrowUpRight, CalendarDays, MessageSquareText } from 'lucide-react';
import { CalendlyEmbed } from '@/components/calendly-embed';
import { trackBookCallClick, trackCtaClick } from '@/lib/analytics';
import { FadeUp } from '@/lib/motion';

const DEFAULT_CALENDLY_URL = 'https://calendly.com/solutions-tylerallen/30min';

const scheduleHighlights = [
  {
    icon: CalendarDays,
    title: '30-minute intro call',
    description:
      'Pick a time that works without going back and forth over email.',
  },
  {
    icon: MessageSquareText,
    title: 'Clear next step',
    description:
      'You leave knowing whether the next move is a proposal, a fix, or a recommendation.',
  },
];

function getCalendlyUrl() {
  const rawValue = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  const candidate =
    rawValue && rawValue.length > 0 ? rawValue : DEFAULT_CALENDLY_URL;

  try {
    return new URL(candidate).toString();
  } catch {
    return DEFAULT_CALENDLY_URL;
  }
}

function getCalendlyEmbedUrl(calendlyUrl: string) {
  try {
    const embedUrl = new URL(calendlyUrl);
    embedUrl.searchParams.set('hide_gdpr_banner', '1');
    return embedUrl.toString();
  } catch {
    return `${DEFAULT_CALENDLY_URL}?hide_gdpr_banner=1`;
  }
}

export function Schedule() {
  const calendlyUrl = getCalendlyUrl();
  const calendlyEmbedUrl = getCalendlyEmbedUrl(calendlyUrl);

  return (
    <section
      id='schedule'
      className='section-shell bg-background'
      aria-labelledby='schedule-heading'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12'>
          <FadeUp>
            <div>
              <p className='label-mono mb-3'>/ schedule</p>
              <h2
                id='schedule-heading'
                className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6'
              >
                <span className='block'>Book a Discovery Call</span>
                <span className='block text-accent'>
                  Pick a Time That Works.
                </span>
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-8'>
                If a live conversation is the fastest way forward, pick a time
                here. We can cover the problem, the goal, and the best next
                step.
              </p>

              <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                {scheduleHighlights.map((highlight) => (
                  <article
                    key={highlight.title}
                    className='rounded border border-border bg-surface p-5 shadow-sm dark:shadow-none'
                  >
                    <div className='mb-3 inline-flex rounded border border-border bg-card p-2'>
                      <highlight.icon className='h-4 w-4 text-accent' />
                    </div>
                    <h3 className='mb-2 text-sm font-semibold text-foreground'>
                      {highlight.title}
                    </h3>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {highlight.description}
                    </p>
                  </article>
                ))}
              </div>

              <div className='mt-6 rounded border border-border bg-surface p-5 shadow-sm dark:shadow-none'>
                <p className='mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground'>
                  Prefer email first?
                </p>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  If you would rather send the details first, use the contact
                  form below.
                </p>
                <a
                  href='#contact'
                  onClick={() =>
                    trackCtaClick('schedule_to_contact_form', 'schedule')
                  }
                  className='mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent'
                >
                  Go to the contact form
                  <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
                </a>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className='-mx-4 sm:mx-0'>
              <div className='card-workstation overflow-hidden p-0 sm:p-4'>
                <div className='bg-background p-4 sm:rounded sm:border sm:border-border sm:p-5'>
                  <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <p className='font-mono text-[10px] uppercase tracking-widest text-muted-foreground'>
                      Calendly booking
                    </p>
                    <a
                      href={calendlyUrl}
                      target='_blank'
                      rel='noreferrer'
                      onClick={() =>
                        trackBookCallClick('schedule_full_calendar')
                      }
                      className='inline-flex min-h-11 w-full items-center justify-center gap-2 rounded border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-px hover:border-accent/40 hover:text-accent hover:shadow-md dark:shadow-none dark:hover:shadow-none sm:w-auto'
                    >
                      Open Full Calendar
                      <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
                    </a>
                  </div>

                  <div className='overflow-x-auto border-y border-border bg-card sm:overflow-hidden sm:rounded sm:border'>
                    <CalendlyEmbed
                      url={calendlyEmbedUrl}
                      title='Schedule a call with Tyler Allen on Calendly'
                      className='h-190 min-w-[320px] lg:h-205'
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
