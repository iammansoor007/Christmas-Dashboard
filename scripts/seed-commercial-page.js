const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedCommercialPage() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('commercialpages');

        const data = {
            hero: {
                badge: "02 • COMMERCIAL",
                title: {
                    line1: "Make Your Business",
                    line2: "Unforgettable This Holiday Season"
                },
                subtitle: "Make your business stand out this season with professional holiday lighting. We design and install custom commercial displays tailored to your property and brand, helping you welcome customers and spread seasonal cheer.",
                cta: {
                    text: "Get Your Free Quote",
                    phone: "+16143017100",
                    link: "#"
                },
                backgroundImage: "/images/hero-background2.jpg",
                overlay: {
                    from: "rgba(16,185,129,0.2)",
                    to: "rgba(17,24,39,0.9)"
                }
            },
            overview: {
                badge: "OVERVIEW",
                title: "Complete Commercial Lighting",
                description: "Commercial properties deserve lighting that makes an impression. Our commercial holiday lighting services help businesses create eye-catching displays that attract customers and enhance the look of your property during the holiday season. We work with shopping centers, office buildings, restaurants, hotels, and retail spaces to design and install custom lighting displays that fit your property.",
                image: "/images/commericaldemo.JPEG"
            },
            features: {
                badge: "WHAT WE OFFER",
                title: "Complete Commercial Lighting Services",
                subtitle: "Professional installation with premium materials and full-service support.",
                items: [
                    { icon: "FaHome", title: "Building Facade Lighting", description: "Professional installation along building facades" },
                    { icon: "FaTree", title: "Landscape Lighting", description: "Beautifully lit trees and landscaping" },
                    { icon: "FaLightbulb", title: "Commercial Grade LEDs", description: "3x brighter with better color consistency" },
                    { icon: "FaTools", title: "Professional Installation", description: "Licensed and insured commercial team" },
                    { icon: "FaStore", title: "Storefront Illumination", description: "Custom displays that attract customers" },
                    { icon: "FaShieldAlt", title: "Warranty Included", description: "Full warranty on all lights and installation" }
                ]
            },
            whyChoose: {
                badge: "WHY CHOOSE US",
                title: "Professional Grade, Business Ready",
                description: "We understand the unique needs of commercial properties. Our team delivers stunning results while respecting your business operations and schedule.",
                benefits: [
                    "Fully licensed, bonded, and insured for commercial work",
                    "Installation during off-hours to minimize disruption",
                    "Custom designs that align with your brand identity",
                    "Volume discounts for multi-property portfolios"
                ],
                image: "/images/commericaldemo2.JPEG",
                galleryImages: ["/images/commericaldemo2.JPEG"]
            },
            bottomCta: {
                title: "Ready to transform your business?",
                description: "Get a free, no-obligation quote today and let us create your perfect holiday display.",
                buttonText: "Get Your Free Quote",
                buttonLink: "#",
                gradient: {
                    from: "#f59e0b",
                    to: "#ef4444"
                }
            },
            seo: {
                metaTitle: "Commercial Christmas Lighting | Christmas Lights Over Columbus",
                metaDescription: "Professional commercial Christmas lighting installation. Custom designs, commercial-grade LEDs, and full-service support for businesses.",
                ogImage: "/images/commercial-og-image.jpg"
            },
            lastUpdated: new Date()
        };

        await collection.deleteMany({});
        const result = await collection.insertOne(data);
        console.log('Commercial Page seeded successfully! ID:', result.insertedId);

    } catch (error) {
        console.error('Error seeding Commercial Page:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedCommercialPage();