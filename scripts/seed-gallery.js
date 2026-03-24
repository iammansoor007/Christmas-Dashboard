const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

const galleryImages = [
    { id: 1, src: "/images/gallery1.jpg", title: "Residential Holiday Display", location: "Columbus, OH", category: "residential" },
    { id: 2, src: "/images/gallery2.jpg", title: "Commercial Roofline Lighting", location: "Dublin, OH", category: "commercial" },
    { id: 3, src: "/images/gallery3.jpg", title: "Custom Residential Design", location: "Westerville, OH", category: "residential" },
    { id: 4, src: "/images/gallery4.jpg", title: "Tree & Landscape Lighting", location: "New Albany, OH", category: "residential" },
    { id: 5, src: "/images/gallery5.jpg", title: "Shopping Center Display", location: "Columbus, OH", category: "commercial" },
    { id: 6, src: "/images/gallery6.jpg", title: "Permanent Lighting Installation", location: "Hilliard, OH", category: "permanent" },
    { id: 7, src: "/images/gallery7.jpg", title: "Home Roofline Lighting", location: "Gahanna, OH", category: "residential" },
    { id: 8, src: "/images/gallery8.jpg", title: "Business Storefront", location: "Worthington, OH", category: "commercial" },
    { id: 9, src: "/images/gallery9.jpg", title: "Residential Entryway", location: "Powell, OH", category: "residential" },
    { id: 10, src: "/images/gallery10.jpg", title: "Commercial Building Facade", location: "Columbus, OH", category: "commercial" },
    { id: 11, src: "/images/gallery11.jpg", title: "Permanent Roofline System", location: "Upper Arlington, OH", category: "permanent" },
    { id: 12, src: "/images/gallery12.jpg", title: "Holiday Tree Lighting", location: "Dublin, OH", category: "residential" },
    { id: 13, src: "/images/gallery13.jpg", title: "Full Property Display", location: "Westerville, OH", category: "residential" },
    { id: 14, src: "/images/gallery14.jpg", title: "Commercial Holiday Showcase", location: "Columbus, OH", category: "commercial" }
];

async function seedGallery() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('gallerypages');

        const data = {
            hero: {
                badge: "OUR PORTFOLIO",
                title: {
                    line1: "HOLIDAY LIGHTING",
                    line2: "GALLERY"
                },
                subtitle: "Explore our collection of stunning residential and commercial transformations",
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
            images: galleryImages,
            bottomCta: {
                title: "Ready to Create Your Own Masterpiece?",
                description: "Let our expert team transform your property into a breathtaking holiday destination.",
                buttonText: "Call Us Now: (614) 301-7100",
                buttonLink: "#"
            },
            seo: {
                metaTitle: "Christmas Lighting Gallery | Christmas Lights Over Columbus",
                metaDescription: "Explore our stunning gallery of residential and commercial Christmas lighting installations. See how we transform homes and businesses into magical holiday displays.",
                ogImage: "/images/gallery-og-image.jpg"
            },
            lastUpdated: new Date()
        };

        await collection.deleteMany({});
        const result = await collection.insertOne(data);
        console.log('Gallery page seeded successfully! ID:', result.insertedId);
        console.log(`Seeded ${galleryImages.length} gallery images`);

    } catch (error) {
        console.error('Error seeding gallery:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedGallery();