const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedFooter() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('footers');

    const data = {
      companyName: "Christmas Lights Over Columbus",
      year: 2026,
      logo: "/images/mainlogo.png",
      contact: {
        phone: "(614) 301-7100",
        email: "info@lightsovercolumbus.com",
        hours: "Mon-Fri: 8AM-6PM",
        support: "24/7 Support"
      },
      socialMedia: [
        {
          icon: "FaFacebookF",
          label: "Facebook",
          href: "https://facebook.com",
          key: "facebook"
        },
        {
          icon: "FaInstagram",
          label: "Instagram",
          href: "https://instagram.com",
          key: "instagram"
        },
        {
          icon: "FaTwitter",
          label: "Twitter",
          href: "https://twitter.com",
          key: "twitter"
        },
        {
          icon: "BsPinterest",
          label: "Pinterest",
          href: "https://pinterest.com",
          key: "pinterest"
        },
        {
          icon: "SiTiktok",
          label: "TikTok",
          href: "https://tiktok.com",
          key: "tiktok"
        }
      ],
      links: {
        Services: [
          { label: "Residential Lighting", href: "/services/residential-lighting" },
          { label: "Commercial Lighting", href: "/services/commercial-lighting" },
          { label: "Permanent Holiday Lighting", href: "/services/permanent-lighting" }
        ],
        Company: [
          { label: "About Us", href: "/about" },
          { label: "Gallery", href: "/gallery" },
          { label: "Contact Us", href: "/contact" }
        ]
      },
      certifications: "Licensed • Insured • Professional Installers • Free Estimates Available",
      copyrightText: "All rights reserved.",
      designedBy: {
        name: "Mohsin Designs",
        url: "https://mohsindesigns.com/"
      },
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('Footer data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedFooter();