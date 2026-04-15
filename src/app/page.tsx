import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { TechStack } from '@/components/tech-stack';
import { CaseStudies } from '@/components/case-studies';
import { About } from '@/components/about';
import { Process } from '@/components/process';
import { Testimonials } from '@/components/testimonials';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Websites, Store Improvements, and Internal Tools',
  description:
    'New websites, store improvements, and internal tools for business owners who want direct communication and dependable delivery.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Websites, Store Improvements, and Internal Tools',
    description:
      'Tyler Allen helps businesses launch websites, improve stores, and build internal tools that make day-to-day work easier.',
    url: '/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Tyler Allen websites, store improvements, and internal tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tyler Allen | Websites, Store Improvements, and Internal Tools',
    description:
      'New websites, store improvements, and internal tools built with direct communication and practical delivery.',
    images: ['/twitter-image'],
  },
};

export default function Home() {
  return (
    <>
      <a
        href='#main-content'
        className='sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:inline-flex focus-visible:min-h-11 focus-visible:items-center focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:px-4 focus-visible:py-2 focus-visible:rounded font-medium text-sm'
      >
        Skip to main content
      </a>
      <Navbar />
      <main id='main-content' className='section-stack flex-1'>
        <Hero />
        <Services />
        <CaseStudies />
        <Testimonials />
        <About />
        <TechStack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
