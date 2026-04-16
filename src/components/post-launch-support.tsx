'use client';

import { FadeUp, StaggerContainer, ScaleIn } from '@/lib/motion';
import {
  Search,
  BarChart3,
  Accessibility,
  Shield,
  MapPin,
  Gauge,
  ScanSearch,
  MousePointerClick,
} from 'lucide-react';
import { trackBookCallClick } from '@/lib/analytics';

const gaps = [
  {
    icon: Search,
    title: 'Search Visibility and Google Basics',
    description:
      'Make sure people can find the site and that Google can understand it properly.',
  },
  {
    icon: BarChart3,
    title: 'Analytics and Lead Tracking',
    description:
      'See where inquiries come from, what people are clicking, and where they stop before contacting you or buying.',
  },
  {
    icon: Accessibility,
    title: 'Accessibility and Easier Site Use',
    description:
      'Make the site easier for more people to use and reduce problems that can hurt trust or create risk.',
  },
  {
    icon: Shield,
    title: 'Security, Updates, and Backups',
    description:
      'Keep updates, backups, and routine maintenance handled so the site stays dependable.',
  },
  {
    icon: MapPin,
    title: 'Local Search and Google Business Profile',
    description:
      'Important for local service businesses that need to show up in maps, reviews, and nearby searches.',
  },
  {
    icon: Gauge,
    title: 'Page Speed and Performance',
    description:
      'Keep pages fast as more content, images, and tools get added over time.',
  },
  {
    icon: ScanSearch,
    title: 'Better Google Listings',
    description:
      'Help Google show more useful details like services, FAQs, reviews, and other helpful information.',
  },
  {
    icon: MousePointerClick,
    title: 'More Leads from the Same Traffic',
    description:
      'Improve calls to action, forms, and page flow so more of the right visitors reach out.',
  },
] as const;

export function PostLaunchSupport() {
  return (
    <section
      id='after-launch'
      className='section-shell bg-surface'
      aria-labelledby='after-launch-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <FadeUp>
          <div className='max-w-3xl section-heading'>
            <p className='label-mono mb-3'>/ after launch help</p>
            <h2
              id='after-launch-heading'
              className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'
            >
              What Often Gets Missed After Launch
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              A site can be live and still leave money and time on the table.
              Search visibility, lead tracking, speed, and routine upkeep are
              usually where things start slipping.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
          {gaps.map((gap) => (
            <ScaleIn key={gap.title}>
              <article className='card-workstation h-full p-6'>
                <div className='mb-5 inline-flex rounded border border-border bg-card p-2.5'>
                  <gap.icon
                    className='h-5 w-5 text-accent'
                    aria-hidden='true'
                  />
                </div>
                <h3 className='mb-3 text-base font-semibold text-foreground'>
                  {gap.title}
                </h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {gap.description}
                </p>
              </article>
            </ScaleIn>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <div className='mt-8 rounded border border-border bg-background px-5 py-5 shadow-sm dark:shadow-none sm:px-6'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
              <div className='max-w-3xl'>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  If your site is already live, I can review it, tell you what
                  matters first, and help fix the issues holding it back.
                </p>
              </div>
              <a
                href='#schedule'
                onClick={() => trackBookCallClick('post_launch_support')}
                className='btn-accent inline-flex min-h-11 items-center justify-center rounded px-6 py-3 text-sm font-semibold text-accent-foreground'
              >
                Request a Site Review
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
