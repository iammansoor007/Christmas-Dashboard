const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function importHero() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('christmas-lighting');
    const collection = db.collection('heros');

    // Read your data.json file
    const dataPath = path.join(__dirname, '../public/data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Extract hero data
    const heroData = {
      ...data.hero,
      lastUpdated: new Date()
    };

    // Clear existing hero data and insert new
    await collection.deleteMany({});
    const result = await collection.insertOne(heroData);

    console.log('Hero data imported successfully!');
    console.log('Inserted document ID:', result.insertedId);

  } catch (error) {
    console.error('Error importing hero:', error);
  } finally {
    await client.close();
  }
}

importHero();