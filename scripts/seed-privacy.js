const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedPrivacy() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('privacypages');

        const data = {
            hero: {
                badge: "Privacy Policy",
                title: "Privacy Policy",
                subtitle: "How we collect, use, and protect your personal information",
                lastUpdatedText: "March 2026",
                backgroundImage: "",
                icon: "FaShieldAlt",
                overlay: { from: "rgba(16,185,129,0.2)", to: "rgba(17,24,39,0.9)" }
            },
            introduction: {
                title: "Our Commitment to Privacy",
                description: "At Christmas Lights Over Columbus, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information when you use our services or visit our website. By using our services, you consent to the practices described in this policy.",
                icon: "GiFruitTree"
            },
            sections: [
                {
                    icon: "FaDatabase",
                    title: "1. Information We Collect",
                    content: "",
                    subSections: [
                        {
                            title: "1.1 Personal Information",
                            content: "We may collect the following personal information:",
                            listItems: [
                                "Full name and contact information (address, phone number, email)",
                                "Property details relevant to lighting installation",
                                "Payment information (credit card details, billing address)",
                                "Service preferences and special requests",
                                "Communication history with our team"
                            ]
                        },
                        {
                            title: "1.2 Automatically Collected Information",
                            content: "When you visit our website, we automatically collect:",
                            listItems: [
                                "IP address and browser type",
                                "Pages visited and time spent on our site",
                                "Referring website or source",
                                "Device information (operating system, screen size)"
                            ]
                        }
                    ]
                },
                {
                    icon: "FaChartLine",
                    title: "2. How We Use Your Information",
                    content: "We use your information for the following purposes:",
                    subSections: [],
                    listItems: [
                        "Provide and deliver our lighting services",
                        "Process payments and manage your account",
                        "Communicate about appointments, updates, and promotions",
                        "Improve our services and website experience",
                        "Respond to your questions and support needs",
                        "Comply with legal obligations",
                        "Prevent fraud and ensure security"
                    ]
                },
                {
                    icon: "FaUserSecret",
                    title: "3. Information Sharing & Disclosure",
                    content: "We do not sell your personal information. We may share information only in these circumstances:",
                    subSections: [],
                    listItems: [
                        "Service Providers: With trusted partners who assist in delivering our services",
                        "Legal Requirements: When required by law or to protect our rights",
                        "Business Transfers: In connection with a merger, acquisition, or sale of assets",
                        "With Your Consent: When you explicitly authorize us to share information"
                    ]
                },
                {
                    icon: "FaLock",
                    title: "4. Data Security",
                    content: "We implement industry-standard security measures to protect your information:",
                    subSections: [],
                    listItems: [
                        "SSL encryption for all data transmission",
                        "Secure payment processing through PCI-compliant providers",
                        "Regular security audits and monitoring",
                        "Restricted access to personal information",
                        "Secure data storage with reputable hosting providers"
                    ],
                    note: "While we strive to protect your data, no method of transmission over the internet is 100% secure."
                }
            ],
            contactInfo: {
                title: "Privacy Questions? Contact Us",
                phone: "(614) 301-7100",
                email: "privacy@christmaslightsovercolumbus.com",
                address: "Columbus, Ohio 43215",
                responseTime: "2-3 business days",
                icon: "FaEnvelope"
            },
            footerLinks: {
                showLinks: true,
                links: [
                    { label: "Terms & Conditions", href: "/terms" },
                    { label: "Cookie Policy", href: "/cookie-policy" }
                ]
            },
            seo: {
                metaTitle: "Privacy Policy | Christmas Lights Over Columbus",
                metaDescription: "Learn how Christmas Lights Over Columbus collects, uses, and protects your personal information. Your privacy is important to us.",
                ogImage: ""
            },
            lastUpdated: new Date()
        };

        await collection.deleteMany({});
        const result = await collection.insertOne(data);
        console.log('Privacy page seeded successfully! ID:', result.insertedId);

    } catch (error) {
        console.error('Error seeding privacy page:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

seedPrivacy();