import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'https://solutions.tyler-allen.com',
    name: 'Tyler Allen',
    short_name: 'Tyler Allen',
    description:
      'Practical web solutions for businesses that need websites, online stores, secure customer areas, and internal tools.',
    lang: 'en-US',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#020617',
    theme_color: '#2563eb',
    categories: ['business', 'productivity', 'shopping'],
  };
}
