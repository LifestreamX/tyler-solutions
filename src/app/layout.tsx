import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AnalyticsTracker } from '@/components/analytics-tracker';
import { ThemeProvider } from '@/components/theme-provider';
import { WebVitals } from '@/components/web-vitals';
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
    default: 'Tyler Allen',
    template: '%s | Tyler Allen',
  },
  description:
    'Tyler Allen helps businesses launch websites, improve online stores, add secure customer areas, and build internal tools that save time.',
  applicationName: 'Tyler Allen',
  keywords: [
    'business website development',
    'website redesign',
    'online store improvements',
    'custom business tools',
    'customer logins',
    'business automation',
    'subscription billing setup',
    'business process improvements',
    'website accessibility support',
    'website speed improvements',
    'analytics and tracking setup',
    'Shopify support',
    'WordPress support',
    'website migrations',
    'Tyler Allen',
    'Practical Web Solutions',
    'Massachusetts website consultant',
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
    title: 'Tyler Allen | Practical Web Solutions',
    description:
      'Websites, store fixes, secure customer areas, and internal tools for businesses that want straightforward help and solid follow-through.',
    siteName: 'Tyler Allen',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Tyler Allen websites, store help, secure customer areas, and business tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tyler Allen | Practical Web Solutions',
    description:
      'Websites, store fixes, secure customer areas, and internal tools for businesses that want straightforward help and reliable follow-through.',
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
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#3b82f6' },
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
        'Tyler Allen helps businesses launch websites, improve online stores, and build secure customer areas and internal tools.',
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
      name: 'Tyler Allen',
      description:
        'Websites, online stores, secure customer areas, and internal tools for businesses that want practical help and reliable follow-through.',
      publisher: { '@id': 'https://solutions.tyler-allen.com/#person' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://solutions.tyler-allen.com/#service',
      name: 'Tyler Allen',
      url: 'https://solutions.tyler-allen.com',
      description:
        'Website builds, store improvements, secure customer areas, internal tools, tracking, speed fixes, and ongoing support for growing businesses.',
      provider: { '@id': 'https://solutions.tyler-allen.com/#person' },
      areaServed: 'United States',
      serviceType: [
        'Website Design and Development',
        'Website Redesign',
        'Online Store Development',
        'Shopify Support',
        'WordPress Support',
        'Customer Logins and Portals',
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
              name: 'Customer Logins, Internal Tools, and Business Tools',
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
          <WebVitals />
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        </ThemeProvider>
      </body>
    </html>
  );
}
