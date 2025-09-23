import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.URL!
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}