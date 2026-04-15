import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { AnalyticsTracker } from '@/components/analytics-tracker';
import { ThemeProvider } from '@/components/theme-provider';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tyler Allen | Websites, Store Improvements, and Internal Tools',
    template: '%s | Tyler Allen',
  },
  description:
    'Tyler Allen builds websites, improves online stores, and creates internal tools for businesses that want direct communication and dependable delivery.',
  applicationName: 'Tyler Allen',
  keywords: [
    'business website development',
    'website redesign',
    'online store improvements',
    'internal tools development',
    'client portal development',
    'dashboard development',
    'workflow improvements for businesses',
    'website accessibility improvements',
    'website performance improvements',
    'Shopify development',
    'WordPress support',
    'Massachusetts web developer',
    'Tyler Allen',
  ],
  authors: [{ name: 'Tyler Allen', url: 'https://tyler-allen.com' }],
  creator: 'Tyler Allen',
  publisher: 'Tyler Allen',
  category: 'business',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://tyler-allen.com'),
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Websites, Store Improvements, and Internal Tools',
    description:
      'Websites, store improvements, and internal tools built around real business goals, clear communication, and dependable delivery.',
    siteName: 'Tyler Allen',
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
      'Websites, store improvements, and internal tools for businesses that want direct communication and dependable delivery.',
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
      '@id': 'https://tyler-allen.com/#person',
      name: 'Tyler Allen',
      url: 'https://tyler-allen.com',
      email: 'tylerallen@live.com',
      telephone: '+17742791607',
      jobTitle: 'Website and Systems Partner',
      image: 'https://tyler-allen.com/opengraph-image',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'MA',
        addressCountry: 'US',
      },
      description:
        'Tyler Allen builds websites, improves online stores, and creates internal tools with a focus on clear communication and dependable delivery.',
      sameAs: [
        'https://linkedin.com/in/tylerallen1',
        'https://github.com/LifestreamX',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://tyler-allen.com/#website',
      url: 'https://tyler-allen.com',
      name: 'Tyler Allen | Websites, Store Improvements, and Internal Tools',
      description:
        'Websites, store improvements, and internal tools for businesses that need clear communication and dependable delivery.',
      publisher: { '@id': 'https://tyler-allen.com/#person' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://tyler-allen.com/#service',
      name: 'Tyler Allen Digital Solutions',
      url: 'https://tyler-allen.com',
      description:
        'Websites, store improvements, accessibility upgrades, tracking improvements, and internal tools for businesses.',
      provider: { '@id': 'https://tyler-allen.com/#person' },
      areaServed: 'United States',
      serviceType: [
        'Website Design and Development',
        'Website Redesign',
        'Online Store Development',
        'Shopify Development',
        'WordPress Development',
        'Client Portals',
        'Internal Tools',
        'Accessibility Improvements',
        'Tracking and Performance Improvements',
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
              name: 'Internal Tools and Workflow Improvements',
            },
          },
        ],
      },
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
