import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://tyler-allen.com',
    sitemap: 'https://tyler-allen.com/sitemap.xml',
  };
}
