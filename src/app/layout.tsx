import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AnalyticsTracker } from '@/components/analytics-tracker';
import { ThemeProvider } from '@/components/theme-provider';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { faqItems } from '@/lib/site-content';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tyler Allen Solutions',
    template: '%s | Tyler Allen Solutions',
  },
  description:
    'Tyler Allen Solutions builds business websites, improves online stores, creates private customer areas, and delivers custom tools and after-launch support that make day-to-day work easier.',
  applicationName: 'Tyler Allen Solutions',
  keywords: [
    'business website development',
    'website redesign',
    'online store improvements',
    'custom business tools',
    'private customer areas',
    'business automation',
    'subscription billing setup',
    'business process improvements',
    'website accessibility support',
    'website speed improvements',
    'analytics and tracking setup',
    'Shopify support',
    'WordPress support',
    'website migrations',
    'Tyler Allen Solutions',
    'Massachusetts website consultant',
    'Tyler Allen',
  ],
  authors: [{ name: 'Tyler Allen', url: 'https://solutions.tyler-allen.com' }],
  creator: 'Tyler Allen',
  publisher: 'Tyler Allen',
  category: 'business',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://solutions.tyler-allen.com'),
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Tyler Allen Solutions | Websites and Business Tools',
    description:
      'Business websites, store support, private customer areas, and business tools built around clear communication and dependable delivery.',
    siteName: 'Tyler Allen Solutions',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Tyler Allen Solutions websites, store support, private customer areas, and business tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tyler Allen Solutions | Websites and Business Tools',
    description:
      'Business websites, store support, private customer areas, and business tools for companies that want clear communication and dependable delivery.',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://solutions.tyler-allen.com/#person',
      name: 'Tyler Allen',
      url: 'https://solutions.tyler-allen.com',
      email: 'tylerallen@live.com',
      telephone: '+17742791607',
      jobTitle: 'Website and Business Systems Partner',
      image: 'https://solutions.tyler-allen.com/tyler.jpeg',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'MA',
        addressCountry: 'US',
      },
      description:
        'Tyler Allen builds business websites, improves online stores, and creates private customer areas and business tools with clear communication and dependable delivery.',
      sameAs: [
        'https://linkedin.com/in/tylerallen1',
        'https://github.com/LifestreamX',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'tylerallen@live.com',
          telephone: '+17742791607',
          areaServed: 'US',
          availableLanguage: ['English'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://solutions.tyler-allen.com/#website',
      url: 'https://solutions.tyler-allen.com',
      name: 'Tyler Allen Solutions',
      description:
        'Business websites, online store improvements, private customer areas, and business tools for companies that need clear communication and dependable delivery.',
      publisher: { '@id': 'https://solutions.tyler-allen.com/#person' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://solutions.tyler-allen.com/#service',
      name: 'Tyler Allen Solutions',
      url: 'https://solutions.tyler-allen.com',
      description:
        'Business websites, online store support, private customer areas, payments, reports, after-launch help, and custom tools for growing businesses.',
      provider: { '@id': 'https://solutions.tyler-allen.com/#person' },
      areaServed: 'United States',
      serviceType: [
        'Website Design and Development',
        'Website Redesign',
        'Online Store Development',
        'Shopify Support',
        'WordPress Support',
        'Private Customer Areas',
        'Business Automations and Internal Tools',
        'Accessibility Improvements',
        'Analytics and Tracking Setup',
        'Website Speed Improvements',
        'Website Migrations',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Consulting Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'New Websites and Online Stores',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Website and Store Improvements',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Private Customer Areas, Internal Tools, and Business Tools',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'After-Launch Support, Tracking, and Website Reviews',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://solutions.tyler-allen.com/#faq',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className='min-h-screen flex flex-col bg-background text-foreground'>
        <ThemeProvider>
          {children}
          <AnalyticsTracker />
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        </ThemeProvider>
      </body>
    </html>
  );
}
