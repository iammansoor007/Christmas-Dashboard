const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedWorkShowcase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('workshowcases');

    // Default images (these should exist in your public folder)
    const defaultImages = [
      "/images/gallery1.jpg",
      "/images/gallery2.jpg",
      "/images/gallery3.jpg",
      "/images/gallery4.jpg",
      "/images/gallery5.jpg",
      "/images/gallery6.jpg",
      "/images/gallery7.jpg",
      "/images/gallery8.jpg",
      "/images/gallery9.jpg",
      "/images/gallery10.jpg",
      "/images/gallery11.jpg",
      "/images/gallery12.jpg",
      "/images/gallery13.jpg",
      "/images/gallery14.jpg",
    ];

    const data = {
      badge: "Featured Installations",
      title: {
        prefix: "Our Holiday",
        main: "Masterpieces"
      },
      description: "Professional Christmas lighting installations that transform ordinary homes into magical holiday destinations",
      cta: {
        text: "View Our Portfolio",
        link: "/gallery"
      },
      images: defaultImages,
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('Work Showcase data seeded successfully! ID:', result.insertedId);
    console.log(`Seeded ${defaultImages.length} images`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedWorkShowcase();