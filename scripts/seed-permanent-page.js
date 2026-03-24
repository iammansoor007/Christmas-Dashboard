const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedPermanentPage() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('permanentpages');

        const data = {
            hero: {
                badge: "03 • PERMANENT",
                title: {
                    line1: "Light Up Every",
                    line2: "Occasion, All Year Long"
                },
                subtitle: "Upgrade your home with permanent lighting you can enjoy all year long. Custom systems perfect for everyday curb appeal, holidays, game days, and special occasions — all controlled right from your phone.",
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
                title: "Complete Permanent Lighting",
                description: "Imagine changing your home's lighting for any occasion with a tap on your phone. Our permanent lighting systems are professionally installed once and designed to last for years. With customizable colors and lighting patterns, you can celebrate holidays, game days, and special events—or simply add elegant accent lighting to your home. Everything is weather-resistant, energy-efficient, and controlled from your smartphone.",
                image: "/images/permenantlighting.jpg"
            },
            features: {
                badge: "WHAT WE OFFER",
                title: "Complete Permanent Lighting Services",
                subtitle: "Professional installation with premium materials and full-service support.",
                items: [
                    { icon: "FaMobile", title: "App Controlled", description: "Change colors and effects instantly from your smartphone" },
                    { icon: "FaLightbulb", title: "Color Customization", description: "Commercial grade LED permanent lighting system" },
                    { icon: "FaRegSun", title: "Weatherproof", description: "Built to withstand Ohio weather year-round" },
                    { icon: "FaTools", title: "Professional Installation", description: "Licensed and insured team with years of experience" },
                    { icon: "FaWifi", title: "WiFi Enabled", description: "Control from anywhere in the world" },
                    { icon: "FaShieldAlt", title: "Warranty Included", description: "Full warranty on all lights and installation" }
                ]
            },
            whyChoose: {
                badge: "WHY CHOOSE US",
                title: "Professional Quality, Smart Technology",
                description: "InvisiLights' customizable permanent lighting — invisible during the day, bright lights at night.",
                benefits: [
                    "Fully licensed, bonded, and insured for your protection",
                    "Professional installation with discreet mounting",
                    "Easy-to-use app with thousands of preset scenes",
                    "Weatherproof connections rated for all seasons"
                ],
                image: "/images/permenantdemo2.jpg",
                galleryImages: ["/images/permenantdemo1.jpg", "/images/permenantdemo2.jpg", "/images/permenantdemo3.jpg"]
            },
            bottomCta: {
                title: "Ready to light up your home year-round?",
                description: "Get a free, no-obligation quote today and let us create your perfect permanent lighting system.",
                buttonText: "Get Your Free Quote",
                buttonLink: "#",
                gradient: {
                    from: "#f59e0b",
                    to: "#ef4444"
                }
            },
            seo: {
                metaTitle: "Permanent Christmas Lighting | Christmas Lights Over Columbus",
                metaDescription: "Professional permanent holiday lighting installation. Smart, weatherproof LED systems controlled from your phone. Year-round curb appeal.",
                ogImage: "/images/permanent-og-image.jpg"
            },
            lastUpdated: new Date()
        };

        await collection.deleteMany({});
        const result = await collection.insertOne(data);
        console.log('Permanent Page seeded successfully! ID:', result.insertedId);

    } catch (error) {
        console.error('Error seeding Permanent Page:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedPermanentPage();