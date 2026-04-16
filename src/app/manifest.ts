import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'https://solutions.tyler-allen.com',
    name: 'Tyler Allen Solutions',
    short_name: 'TA Solutions',
    description:
      'Websites, online stores, secure customer areas, internal tools, and after-launch help for businesses that want things to run more smoothly.',
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
