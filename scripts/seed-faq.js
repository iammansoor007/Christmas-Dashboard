const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedFAQ() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('faqs');

    const data = {
      badge: "Frequently Asked Questions",
      title: "Questions & Answers",
      subtitle: "Everything you need to know about our premium holiday lighting services. Can't find your answer?",
      phone: "(614) 301-7100",
      items: [
        {
          question: "What services are included with professional Christmas light installation?",
          answer: "Our professional installation includes custom lighting design tailored to your home or business, all Christmas lights and décor provided and professionally installed, ongoing maintenance throughout the holiday season, full takedown after the season ends, and all lights removed and stored at our facility — no storage required on your end.",
          category: "Service",
          icon: "FaConciergeBell"
        },
        {
          question: "What kind of lights do you install?",
          answer: "We install two types of lighting: Seasonal Lighting – commercial-grade C9 LED bulbs that are 3x brighter than anything you'll find at a big-box store, with every display custom-fit to your home. Permanent Lighting – Invisilights permanent lighting systems.",
          category: "Products",
          icon: "FaLightbulb"
        },
        {
          question: "Am I buying the lights?",
          answer: "● Seasonal Lighting - No. All seasonal lights and décor are leased and maintained by our team, so you never have to worry about repairs, storage, or climbing ladders. If anything needs attention during the season, we handle it. ● Permanent Lighting – Yes. Permanent lighting systems are purchased and professionally installed on your home.",
          category: "Pricing",
          icon: "FaFileContract"
        },
        {
          question: "Do you install the lights I own?",
          answer: "We don't — and here's why: we use professional-grade Christmas lighting on every project so we can guarantee quality, safety, and reliability all season long.",
          category: "Installation",
          icon: "FaTools"
        },
        {
          question: "Are any discounts available?",
          answer: "Yes, we offer discounts for installations completed before November, as well as loyalty discounts for continuous years of service.",
          category: "Pricing",
          icon: "FaPercent"
        }
      ],
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('FAQ data seeded successfully! ID:', result.insertedId);
    console.log(`Seeded ${data.items.length} FAQs`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedFAQ();