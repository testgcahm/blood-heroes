export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

export const baseImage = 'https://gmc-blood-heroes.vercel.app/Logo.png'

import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Helper to escape & in URLs for XML
    function escapeXmlUrl(url: string) {
        return url.replace(/&/g, '&amp;');
    }

    const staticRoutes = [
        {
            url: escapeXmlUrl(`${baseUrl}`),
            lastModified: new Date(),
            priority: 1,
            images: [escapeXmlUrl(baseImage)]
        }
    ];

    return staticRoutes;
}