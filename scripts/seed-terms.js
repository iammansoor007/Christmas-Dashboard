const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedTerms() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('termspages');

        const data = {
            hero: {
                badge: "Terms & Conditions",
                title: "Terms & Conditions",
                subtitle: "Please read these terms carefully before using our services",
                lastUpdatedText: "March 2026",
                backgroundImage: "",
                icon: "FaFileContract",
                overlay: { from: "rgba(16,185,129,0.2)", to: "rgba(17,24,39,0.9)" }
            },
            introduction: {
                title: "Agreement to Terms",
                description: "These Terms and Conditions ('Terms') govern your use of the services provided by Christmas Lights Over Columbus ('Company,' 'we,' 'us,' or 'our'). By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these Terms, please do not use our services.",
                icon: "GiFruitTree"
            },
            sections: [
                {
                    icon: "FaFileSignature",
                    title: "1. Service Agreement",
                    content: "",
                    subSections: [
                        { title: "1.1 Service Scope", content: "Christmas Lights Over Columbus agrees to provide professional holiday lighting installation, maintenance, and removal services as described in your service agreement.", listItems: [] },
                        { title: "1.2 Service Period", content: "The service period begins on the installation date and continues through the agreed-upon removal date. Any changes to this schedule require written notice at least 48 hours in advance.", listItems: [] },
                        { title: "1.3 Weather Delays", content: "We reserve the right to reschedule services due to inclement weather or unsafe conditions. We will make every effort to notify you promptly and reschedule at the earliest available time.", listItems: [] }
                    ]
                },
                {
                    icon: "FaMoneyBillWave",
                    title: "2. Pricing & Payments",
                    content: "",
                    subSections: [
                        { title: "2.1 Pricing", content: "All prices are quoted in USD and are valid for 30 days from the date of the quote. Prices include labor, materials, and standard installation unless otherwise specified.", listItems: [] },
                        { title: "2.2 Payment Terms", content: "A 50% deposit is required to secure your installation date. The remaining balance is due upon completion of installation. We accept major credit cards, checks, and electronic payments.", listItems: [] },
                        { title: "2.3 Cancellation Policy", content: "Cancellations made more than 7 days before installation receive a full refund of deposit. Cancellations within 7 days of installation may forfeit the deposit.", listItems: [] }
                    ]
                },
                {
                    icon: "FaShieldAlt",
                    title: "3. Liability & Insurance",
                    content: "",
                    subSections: [
                        { title: "3.1 Insurance Coverage", content: "Christmas Lights Over Columbus carries full liability insurance and workers' compensation coverage. Proof of insurance is available upon request.", listItems: [] },
                        { title: "3.2 Property Damage", content: "We take utmost care with your property. In the unlikely event of damage, we will work with you and our insurance provider to address the issue promptly.", listItems: [] },
                        { title: "3.3 Equipment", content: "All lights and equipment remain the property of Christmas Lights Over Columbus unless explicitly purchased. Any damage to our equipment due to customer negligence may result in replacement costs.", listItems: [] }
                    ]
                }
            ],
            contactInfo: {
                title: "Questions? Contact Us",
                phone: "(614) 301-7100",
                email: "info@christmaslightsovercolumbus.com",
                address: "Columbus, Ohio 43215",
                icon: "FaEnvelope"
            },
            footerLinks: {
                showLinks: true,
                links: [
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Cookie Policy", href: "/cookie-policy" }
                ]
            },
            seo: {
                metaTitle: "Terms & Conditions | Christmas Lights Over Columbus",
                metaDescription: "Read the terms and conditions for Christmas Lights Over Columbus. Understand our service agreement, payment terms, and policies.",
                ogImage: ""
            },
            lastUpdated: new Date()
        };

        await collection.deleteMany({});
        const result = await collection.insertOne(data);
        console.log('Terms page seeded successfully! ID:', result.insertedId);

    } catch (error) {
        console.error('Error seeding terms page:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedTerms();