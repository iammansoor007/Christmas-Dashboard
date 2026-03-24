const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedResidentialPage() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('residentialpages');

        const data = {
            hero: {
                badge: "01 • RESIDENTIAL",
                title: {
                    line1: "Make your home stand",
                    line2: "out this holiday season"
                },
                subtitle: "Coming home to a beautifully lit house makes the holidays even more special. We design and install custom residential displays tailored to your home and your style. From design to professional installation, we handle everything – so you can skip the ladders and tangled lights.",
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
                title: "Complete Residential Lighting",
                description: "Our residential lighting service transforms your home into a stunning holiday showcase. We start with a consultation to understand your vision, then create a custom design that highlights your home's architectural features. Our team handles every aspect of the installation, using only commercial-grade LED lights that are 3x brighter than store-bought options. Throughout the season, we provide ongoing maintenance to ensure your display stays perfect. When the holidays end, we return to carefully remove and store everything at our facility.",
                image: "/images/gallery3.jpg"
            },
            features: {
                badge: "WHAT WE OFFER",
                title: "Complete Residential Lighting Services",
                subtitle: "Professional installation with premium materials and full-service support.",
                items: [
                    { icon: "FaHome", title: "Roof & Gutter Lines", description: "Professional installation along rooflines and gutters for that classic holiday look" },
                    { icon: "FaTree", title: "Tree & Shrub Wrapping", description: "Beautifully wrapped trees and bushes to complete your landscape" },
                    { icon: "FaLightbulb", title: "Commercial Grade LEDs", description: "3x brighter than store-bought lights with better color consistency" },
                    { icon: "FaTools", title: "Professional Installation", description: "Licensed and insured team with years of holiday lighting experience" },
                    { icon: "FaBoxOpen", title: "Free Storage", description: "We store your lights after the season ends - no clutter in your garage" },
                    { icon: "FaShieldAlt", title: "Warranty Included", description: "Full warranty on all lights and installation throughout the season" }
                ]
            },
            whyChoose: {
                badge: "WHY CHOOSE US",
                title: "Professional Quality, Personal Service",
                description: "We focus on delivering beautiful holiday lighting while making the entire process easy and hassle-free for you.",
                benefits: [
                    "Free Quotes",
                    "Commercial grade LED lights custom fit to your home",
                    "Maintenance & Take down",
                    "Free storage in our climate-controlled facility",
                    "Fully insured to protect your home and property"
                ],
                image: "/images/gallery11.jpg",
                galleryImages: ["/images/gallery12.jpg", "/images/gallery13.jpg"]
            },
            bottomCta: {
                title: "Ready to transform your home?",
                description: "Get a free, no-obligation quote today and let us create your perfect holiday display.",
                buttonText: "Get Your Free Quote",
                buttonLink: "#",
                gradient: {
                    from: "#f59e0b",
                    to: "#ef4444"
                }
            },
            seo: {
                metaTitle: "Residential Christmas Lighting | Christmas Lights Over Columbus",
                metaDescription: "Professional residential Christmas lighting installation. Custom designs, commercial-grade LEDs, and full-service support including maintenance and storage.",
                ogImage: "/images/residential-og-image.jpg"
            },
            lastUpdated: new Date()
        };

        await collection.deleteMany({});
        const result = await collection.insertOne(data);
        console.log('Residential Page seeded successfully! ID:', result.insertedId);

    } catch (error) {
        console.error('Error seeding Residential Page:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedResidentialPage();