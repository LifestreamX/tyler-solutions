import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'https://solutions.tyler-allen.com',
    name: 'Tyler Allen Solutions',
    short_name: 'TA Solutions',
    description:
      'Business websites, online store support, private customer areas, business tools, and after-launch help built with clear communication and dependable delivery.',
    lang: 'en-US',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#020617',
    theme_color: '#020617',
    categories: ['business', 'productivity', 'shopping'],
  };
}
