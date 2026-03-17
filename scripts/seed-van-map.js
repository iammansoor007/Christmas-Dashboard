const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedVanMap() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('vanmaps');

    const data = {
      title: "Areas We Are Serving",
      description: "Custom lighting installed by professionals.",
      mapImage: "/images/realmap.jpeg",
      vanImage: "/images/car2.png",
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('Van Map data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedVanMap();