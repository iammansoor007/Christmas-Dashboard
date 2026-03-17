const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedHowWeWork() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('howweworks');

    const data = {
      badge: "Simple Process",
      title: {
        text: "Couldn't Be Easier",
        prefix: "Working With Us"
      },
      subtitle: "Get Professional Christmas Lighting In Just <strong>3 Easy Steps</strong>",
      steps: [
        {
          number: "01",
          title: "Get A Quote",
          description: "We've made getting professional lighting services as simple as possible. Fill out our quote request form or call us at (614) 301-7100. We will receive your request, look at your property information, and get back to you within 24-48 hours with multiple pricing options.",
          icon: "FaQuoteRight",
          color: "#10B981",
          features: [
            "Fill out form or call (614) 301-7100",
            "24-48 hour turnaround",
            "Multiple pricing options"
          ]
        },
        {
          number: "02",
          title: "Get Scheduled",
          description: "Once you've received our lighting package options and have chosen the one that fits your needs, we can then get your project booked right away! We offer flexible installation dates and work around your schedule to ensure our service fits perfectly with your availability.",
          icon: "FaCalendarCheck",
          color: "#F59E0B",
          features: [
            "Flexible installation dates",
            "We work around your schedule",
            "Quick booking process"
          ]
        },
        {
          number: "03",
          title: "Sit Back and Relax",
          description: "Once you're on the schedule, you can sit back and relax. Our all-inclusive lighting services mean you don't have to do a single thing. Installations take 3-8 hours depending on home size, and we handle takedown and storage after the holiday season.",
          icon: "FaChair",
          color: "#EF4444",
          features: [
            "All-inclusive – no work required",
            "Installation in 3-8 hours",
            "Takedown and storage included"
          ]
        }
      ],
      cta: {
        title: "Ready to Light Up Your Holidays?",
        description: "Start with a free, no-obligation quote today. Call us at (614) 301-7100 or fill out our quick form!",
        buttons: {
          primary: "Call Us (614) 301-7100",
          secondary: "Schedule Consultation"
        }
      },
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('How We Work data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedHowWeWork();