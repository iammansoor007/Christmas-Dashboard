const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function migratePages() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();

        // Migrate Homepage
        const heroData = await db.collection('heros').findOne();
        if (heroData) {
            await db.collection('pages').updateOne(
                { slug: 'home' },
                {
                    $set: {
                        title: 'Home',
                        slug: 'home',
                        template: 'home',
                        status: 'published',
                        isHomepage: true,
                        showInNav: true,
                        navLabel: 'Home',
                        navOrder: 1,
                        content: { hero: heroData }
                    }
                },
                { upsert: true }
            );
            console.log('✓ Migrated Home page');
        }

        // Migrate About Page
        const aboutData = await db.collection('aboutpages').findOne();
        if (aboutData) {
            await db.collection('pages').updateOne(
                { slug: 'about' },
                {
                    $set: {
                        title: 'About Us',
                        slug: 'about',
                        template: 'about',
                        status: 'published',
                        showInNav: true,
                        navLabel: 'About',
                        navOrder: 2,
                        seo: aboutData.seo || {},
                        content: aboutData
                    }
                },
                { upsert: true }
            );
            console.log('✓ Migrated About page');
        }

        // Migrate Contact Page
        const contactData = await db.collection('contactpages').findOne();
        if (contactData) {
            await db.collection('pages').updateOne(
                { slug: 'contact' },
                {
                    $set: {
                        title: 'Contact Us',
                        slug: 'contact',
                        template: 'contact',
                        status: 'published',
                        showInNav: true,
                        navLabel: 'Contact',
                        navOrder: 5,
                        seo: contactData.seo || {},
                        content: contactData
                    }
                },
                { upsert: true }
            );
            console.log('✓ Migrated Contact page');
        }

        // Migrate Gallery Page
        const galleryData = await db.collection('gallerypages').findOne();
        if (galleryData) {
            await db.collection('pages').updateOne(
                { slug: 'gallery' },
                {
                    $set: {
                        title: 'Gallery',
                        slug: 'gallery',
                        template: 'gallery',
                        status: 'published',
                        showInNav: true,
                        navLabel: 'Gallery',
                        navOrder: 4,
                        seo: galleryData.seo || {},
                        content: galleryData
                    }
                },
                { upsert: true }
            );
            console.log('✓ Migrated Gallery page');
        }

        // Migrate Service Area Page
        const serviceAreaData = await db.collection('serviceareas').findOne();
        if (serviceAreaData) {
            await db.collection('pages').updateOne(
                { slug: 'service-area' },
                {
                    $set: {
                        title: 'Service Area',
                        slug: 'service-area',
                        template: 'service-area',
                        status: 'published',
                        showInNav: true,
                        navLabel: 'Service Area',
                        navOrder: 3,
                        seo: serviceAreaData.seo || {},
                        content: serviceAreaData
                    }
                },
                { upsert: true }
            );
            console.log('✓ Migrated Service Area page');
        }

        // Migrate Privacy Policy
        const privacyData = await db.collection('privacypages').findOne();
        if (privacyData) {
            await db.collection('pages').updateOne(
                { slug: 'privacy' },
                {
                    $set: {
                        title: 'Privacy Policy',
                        slug: 'privacy',
                        template: 'privacy',
                        status: 'published',
                        showInNav: false,
                        seo: privacyData.seo || {},
                        content: privacyData
                    }
                },
                { upsert: true }
            );
            console.log('✓ Migrated Privacy page');
        }

        // Migrate Terms & Conditions
        const termsData = await db.collection('termspages').findOne();
        if (termsData) {
            await db.collection('pages').updateOne(
                { slug: 'terms' },
                {
                    $set: {
                        title: 'Terms & Conditions',
                        slug: 'terms',
                        template: 'terms',
                        status: 'published',
                        showInNav: false,
                        seo: termsData.seo || {},
                        content: termsData
                    }
                },
                { upsert: true }
            );
            console.log('✓ Migrated Terms page');
        }

        // Migrate Services from old structure
        const servicesData = await db.collection('services').findOne();
        if (servicesData && servicesData.items) {
            for (const item of servicesData.items) {
                await db.collection('services').updateOne(
                    { slug: item.title.toLowerCase().replace(/\s+/g, '-') },
                    {
                        $set: {
                            title: item.title,
                            slug: item.title.toLowerCase().replace(/\s+/g, '-'),
                            number: item.number,
                            icon: item.icon,
                            color: item.color,
                            status: 'published',
                            showOnHomepage: true,
                            order: parseInt(item.number),
                            shortDescription: item.description,
                            longDescription: item.longDescription || item.description,
                            features: item.features || [],
                            detailFeatures: item.detailFeatures || [],
                            whyChoose: item.whyChoose || {},
                            galleryImages: item.galleryImages || [],
                            mainImage: item.image,
                            ctaText: item.ctaText || 'View Details',
                            ctaLink: item.ctaLink || `/services/${item.title.toLowerCase().replace(/\s+/g, '-')}`,
                            stat: item.stat || ''
                        }
                    },
                    { upsert: true }
                );
                console.log(`✓ Migrated service: ${item.title}`);
            }
        }

        console.log('\n🎉 Migration completed successfully!');

    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

migratePages();