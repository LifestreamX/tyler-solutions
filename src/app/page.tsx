import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { PostLaunchSupport } from '@/components/post-launch-support';
import { TechStack } from '@/components/tech-stack';
import { CaseStudies } from '@/components/case-studies';
import { About } from '@/components/about';
import { Process } from '@/components/process';
import { Testimonials } from '@/components/testimonials';
import { Faq } from '@/components/faq';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: {
    absolute: 'Tyler Allen Solutions | Websites and Business Tools',
  },
  description:
    'Websites, online stores, secure customer areas, and custom tools for businesses that want better sales, smoother operations, and dependable support after launch.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tyler Allen Solutions | Websites and Business Tools',
    description:
      'Tyler Allen helps businesses launch websites, improve online stores, add secure customer areas, and fix the things that get missed after launch.',
    url: '/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Tyler Allen Solutions websites, store help, secure customer areas, and business tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tyler Allen Solutions | Websites and Business Tools',
    description:
      'Websites, store help, secure customer areas, and business tools with dependable support after launch.',
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
        <PostLaunchSupport />
        <About />
        <TechStack />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
