const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/christmas-lighting';

async function seedServices() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();

        const services = [
            {
                title: 'Residential Lighting',
                slug: 'residential-lighting',
                number: '01',
                icon: 'FaHome',
                color: '#10B981',
                status: 'published',
                showOnHomepage: true,
                order: 1,
                shortDescription: 'Coming home to a beautifully lit house makes the holidays even more special. We design and install custom residential displays tailored to your home and your style.',
                longDescription: 'Our residential lighting service transforms your home into a stunning holiday showcase. We start with a consultation to understand your vision, then create a custom design that highlights your home\'s architectural features.',
                features: ['Gutter and roofline lighting', 'Tree and shrub lighting', 'Custom Design and Warrantied Installation', 'Removal and Storage Included'],
                mainImage: '/images/gallery1.jpg',
                ctaText: 'Learn More',
                ctaLink: '/services/residential-lighting'
            },
            {
                title: 'Commercial Lighting',
                slug: 'commercial-lighting',
                number: '02',
                icon: 'FaBuilding',
                color: '#3B82F6',
                status: 'published',
                showOnHomepage: true,
                order: 2,
                shortDescription: 'Make your business stand out this season with professional holiday lighting. We design and install custom commercial displays tailored to your property and brand.',
                longDescription: 'Commercial properties deserve lighting that makes an impression. Our commercial holiday lighting services help businesses create eye-catching displays.',
                features: ['Building facade lighting', 'Storefront illumination', 'Landscape lighting', 'Parking lot lighting'],
                mainImage: '/images/commericaldemo.JPEG',
                ctaText: 'Learn More',
                ctaLink: '/services/commercial-lighting'
            },
            {
                title: 'Permanent Lighting',
                slug: 'permanent-lighting',
                number: '03',
                icon: 'FaStar',
                color: '#F59E0B',
                status: 'published',
                showOnHomepage: true,
                order: 3,
                shortDescription: 'Upgrade your home with permanent lighting you can enjoy all year long. Custom systems perfect for everyday curb appeal, holidays, game days, and special occasions — all controlled right from your phone.',
                longDescription: 'Imagine changing your home\'s lighting for any occasion with a tap on your phone. Our permanent lighting systems are professionally installed once and designed to last for years.',
                features: ['Smartphone app control', 'Millions of colors', 'Weatherproof LEDs', 'Schedule automatic changes'],
                mainImage: '/images/permenantlighting.jpg',
                ctaText: 'Learn More',
                ctaLink: '/services/permanent-lighting'
            }
        ];

        for (const service of services) {
            await db.collection('services').updateOne(
                { slug: service.slug },
                { $set: service },
                { upsert: true }
            );
            console.log('✓ Seeded:', service.title);
        }

        console.log('\n✅ All services seeded successfully!');

        const count = await db.collection('services').countDocuments();
        console.log('Total services in database:', count);

    } catch (error) {
        console.error('Error seeding services:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedServices();