const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedContactPage() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('contactpages');

        const data = {
            hero: {
                badge: "CONTACT US",
                title: {
                    line1: "GET IN TOUCH",
                    line2: "WITH US"
                },
                subtitle: "We'd love to hear from you. Fill out the form below and we'll get back to you within 24 hours.",
                backgroundImage: "/images/hero-background2.jpg",
                overlay: {
                    from: "rgba(245,158,11,0.15)",
                    to: "rgba(17,24,39,0.9)"
                }
            },
            form: {
                badge: "Get A Fast Quote",
                title: "Contact Us For Your Fast Free Quote",
                subtitle: "We look forward to helping light up your property 🙂",
                submitButtonText: "Get My Lighting Quote",
                successMessage: "Quote Request Sent! We'll contact you within 24 hours.",
                budgetOptions: [
                    "What Is Your Lighting Budget",
                    "$900 - $1200 (Standard Front Rooflines)",
                    "$1200 - $1500",
                    "$1500 - $2500",
                    "$2500 - $4000",
                    "$4000 and up",
                    "Give me your best lighting design, money is not a factor."
                ],
                lightingAreas: [
                    { id: "house", label: "House", emoji: "🏠" },
                    { id: "ground", label: "Ground Lighting", emoji: "✨" },
                    { id: "trees", label: "Trees", emoji: "🌲" },
                    { id: "shrubs", label: "Shrubs / Bushes", emoji: "🌿" }
                ]
            },
            benefits: [
                { text: "Free consultation & design", icon: "FaCheckCircle" },
                { text: "Professional installation", icon: "FaCheckCircle" },
                { text: "Commercial-grade LEDs", icon: "FaCheckCircle" },
                { text: "Maintenance included", icon: "FaCheckCircle" },
                { text: "Take-down & storage", icon: "FaCheckCircle" }
            ],
            contactInfo: {
                phone: "(614) 301-7100",
                email: "Info@lightsovercolumbus.com",
                hours: "Mon-Fri: 8AM-6PM",
                support: "24/7 Support",
                address: "123 Holiday Lane, Columbus, OH 43215"
            },
            map: {
                title: "Our Location",
                subtitle: "Visit our office or give us a call",
                embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.5!2d-83.045!3d39.962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88388f8e2e8e8e8f%3A0x8e8e8e8e8e8e8e8e!2sColumbus%2C%20OH!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus",
                showMap: true
            },
            seo: {
                metaTitle: "Contact Us | Christmas Lights Over Columbus",
                metaDescription: "Contact Christmas Lights Over Columbus for professional holiday lighting. Get a free quote, ask questions, or schedule a consultation.",
                ogImage: "/images/contact-og-image.jpg"
            },
            lastUpdated: new Date()
        };

        await collection.deleteMany({});
        const result = await collection.insertOne(data);
        console.log('Contact page seeded successfully! ID:', result.insertedId);

    } catch (error) {
        console.error('Error seeding contact page:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedContactPage();