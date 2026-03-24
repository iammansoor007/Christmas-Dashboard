const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedServicesPage() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('servicespages');

    const data = {
      hero: {
        badge: {
          text: "PREMIUM SERVICES",
          icon: "GiSparkles",
          backgroundColor: "linear-gradient(to right, rgba(16,185,129,0.2), rgba(245,158,11,0.2))",
          textColor: "#ffffff"
        },
        title: {
          prefix: "PREMIUM",
          text: "CHRISTMAS LIGHTING",
          gradientFrom: "#10b981",
          gradientTo: "#f59e0b"
        },
        subtitle: "Transform your property with professional holiday lighting installations",
        cta: {
          text: "Get My Free Quote",
          phone: "+16143017100",
          link: "#",
          icon: "HiOutlineSparkles"
        },
        backgroundImage: "/images/hero-background2.jpg",
        overlay: {
          from: "rgba(16,185,129,0.2)",
          to: "rgba(17,24,39,0.9)"
        }
      },
      servicesHeader: {
        badge: "Our Services",
        title: "Our Lighting Collection",
        subtitle: "Professional holiday lighting solutions for every property"
      },
      bottomCta: {
        title: "Ready to transform your property?",
        description: "Get a free, no-obligation quote today and let us create your perfect holiday display.",
        buttonText: "Get Your Free Quote",
        buttonLink: "#freequote",
        backgroundGradient: {
          from: "#f59e0b",
          to: "#ef4444"
        }
      },
      seo: {
        metaTitle: "Professional Christmas Lighting Services | Christmas Lights Over Columbus",
        metaDescription: "Explore our premium Christmas lighting services including residential, commercial, and permanent lighting installations. Professional, reliable, and stress-free.",
        ogImage: "/images/services-og-image.jpg"
      },
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('Services Page data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedServicesPage();