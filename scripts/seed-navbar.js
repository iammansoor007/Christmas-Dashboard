const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedNavbar() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('navbars');

    const data = {
      logo: "/images/mainlogo.png",
      logoAlt: "Luminous Holiday Logo",
      navItems: [
        { path: "/", label: "Home", dropdown: [] },
        { path: "/about", label: "About", dropdown: [] },
        {
          path: "/services",
          label: "Services",
          dropdown: [
            {
              path: "/services/residential-lighting",
              label: "Residential Lighting",
              description: "Custom home lighting solutions",
              icon: "🏠"
            },
            {
              path: "/services/commercial-lighting",
              label: "Commercial Lighting",
              description: "Professional business installations",
              icon: "🏢"
            },
            {
              path: "/services/permanent-lighting",
              label: "Permanent Lighting",
              description: "Year-round architectural lighting",
              icon: "✨"
            }
          ]
        },
        { path: "/gallery", label: "Gallery", dropdown: [] },
        { path: "/service-area", label: "Service Area", dropdown: [] },
        { path: "/contact", label: "Contact", dropdown: [] }
      ],
      cta: {
        text: "Call Now",
        phone: "(614) 301-7100",
        icon: "phone"
      },
      contactInfo: {
        email: "Info@lightsovercolumbus.com",
        text: "Email us"
      },
      colors: {
        background: "bg-dark-navy/95",
        text: "text-warm-white",
        hover: "text-holiday-gold",
        active: "text-holiday-gold",
        dropdownBg: "bg-dark-navy/95"
      },
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('Navbar data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedNavbar();