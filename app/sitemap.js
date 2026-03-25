import { MongoClient } from 'mongodb';

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christmaswebsite-kappa.vercel.app';

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/services',
        '/gallery',
        '/service-area',
        '/contact',
        '/privacy',
        '/terms',
    ];

    // Service detail routes (dynamic from database)
    let serviceRoutes = [];
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db();
        const services = await db.collection('services').findOne();

        if (services?.items) {
            serviceRoutes = services.items.map(service => {
                const slug = service.title.toLowerCase().replace(/\s+/g, '-');
                return `/services/${slug}`;
            });
        }
        await client.close();
    } catch (error) {
        console.error('Error fetching services for sitemap:', error);
    }

    const allRoutes = [...staticRoutes, ...serviceRoutes];

    return allRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.includes('/services/') ? 0.8 : 0.6,
    }));
}