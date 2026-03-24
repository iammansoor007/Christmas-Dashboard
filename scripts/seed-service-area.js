const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

const cities = [
    { id: 1, city: "Columbus, OH", icon: "FaCity" },
    { id: 2, city: "Dublin, OH", icon: "FaCity" },
    { id: 3, city: "Westerville, OH", icon: "FaCity" },
    { id: 4, city: "Upper Arlington, OH", icon: "FaCity" },
    { id: 5, city: "Hilliard, OH", icon: "FaCity" },
    { id: 6, city: "Grove City, OH", icon: "FaCity" },
    { id: 7, city: "Worthington, OH", icon: "FaCity" },
    { id: 8, city: "New Albany, OH", icon: "FaCity" },
    { id: 9, city: "Delaware, OH", icon: "FaCity" },
    { id: 10, city: "Powell, OH", icon: "FaCity" },
    { id: 11, city: "Gahanna, OH", icon: "FaCity" },
    { id: 12, city: "Pickerington, OH", icon: "FaCity" },
    { id: 13, city: "Reynoldsburg, OH", icon: "FaCity" },
    { id: 14, city: "Canal Winchester, OH", icon: "FaCity" },
    { id: 15, city: "Pataskala, OH", icon: "FaCity" },
    { id: 16, city: "Sunbury, OH", icon: "FaCity" },
    { id: 17, city: "Johnstown, OH", icon: "FaCity" },
    { id: 18, city: "Granville, OH", icon: "FaCity" },
    { id: 19, city: "Newark, OH", icon: "FaCity" },
    { id: 20, city: "Lancaster, OH", icon: "FaCity" },
    { id: 21, city: "Circleville, OH", icon: "FaCity" },
    { id: 22, city: "Marysville, OH", icon: "FaCity" },
    { id: 23, city: "Plain City, OH", icon: "FaCity" },
];

async function seedServiceArea() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('serviceareas');

        const data = {
            hero: {
                badge: "OUR SERVICE AREA",
                title: {
                    line1: "CENTRAL OHIO",
                    line2: "SERVICE AREA"
                },
                subtitle: "Proudly serving Columbus and surrounding communities with premium holiday lighting services",
                cta: {
                    text: "Get My Free Quote",
                    phone: "+16143017100",
                    link: "#"
                },
                backgroundImage: "/images/hero-background2.jpg",
                overlay: {
                    from: "rgba(245,158,11,0.15)",
                    to: "rgba(17,24,39,0.9)"
                }
            },
            sectionHeader: {
                title: "Communities We Serve",
                subtitle: "From bustling city centers to quiet suburban neighborhoods, we bring holiday cheer to homes and businesses throughout Central Ohio."
            },
            cities: cities,
            bottomNotice: {
                text: "Don't see your area?",
                buttonText: "Contact us",
                icon: "FaBuilding"
            },
            seo: {
                metaTitle: "Service Area | Christmas Lights Over Columbus",
                metaDescription: "We proudly serve Columbus and surrounding communities in Central Ohio with premium holiday lighting services. Contact us to see if we serve your area.",
                ogImage: "/images/service-area-og-image.jpg"
            },
            lastUpdated: new Date()
        };

        await collection.deleteMany({});
        const result = await collection.insertOne(data);
        console.log('Service Area page seeded successfully! ID:', result.insertedId);
        console.log(`Seeded ${cities.length} cities`);

    } catch (error) {
        console.error('Error seeding service area:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedServiceArea();