const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedChristmasLighting() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('christmaslightings');

    const data = {
      title: "Serving Columbus With Stress Free Holiday Lighting",
      paragraphs: [
        "The holiday season is all about making memories, and nothing brings that magic to life like a beautifully lit home. At Christmas Lights Over Columbus, we take the stress out of decorating with professional Christmas lighting services designed just for you.",
        "From custom design and installation to maintenance, removal, and storage, we handle everything — so all you have to do is enjoy the season. Let us create a stunning display while you focus on what matters most."
      ],
      cta: {
        primary: {
          text: "Get My Free Quote",
          link: "#freequote"
        },
        secondary: {
          text: "View Gallery",
          link: "/gallery"
        }
      },
      image: "/images/heroowner.jpg",
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('Christmas Lighting data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedChristmasLighting();