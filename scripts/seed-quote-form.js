const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedQuoteForm() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('quoteforms');

    const data = {
      badge: "Get A Fast Quote",
      title: "Get Your Fast Quote",
      subtitle: "We are so excited to light up your property 🙂",
      submitButtonText: "Submit: Get My Lighting Quote",
      successMessage: "We'll contact you within 24 hours with your custom quote.",
      fields: [
        {
          id: "fname",
          type: "text",
          label: "First Name",
          placeholder: "John",
          required: true,
          icon: "FaUser",
          width: "half",
          order: 0
        },
        {
          id: "lname",
          type: "text",
          label: "Last Name",
          placeholder: "Smith",
          required: true,
          icon: "FaUser",
          width: "half",
          order: 1
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          placeholder: "john@example.com",
          required: true,
          icon: "FaEnvelope",
          width: "half",
          order: 2
        },
        {
          id: "phone",
          type: "tel",
          label: "Phone",
          placeholder: "(614) 301-7100",
          required: true,
          icon: "FaPhone",
          width: "half",
          order: 3
        },
        {
          id: "address",
          type: "text",
          label: "Address",
          placeholder: "123 Main St",
          required: true,
          icon: "FaHome",
          width: "half",
          order: 4
        },
        {
          id: "city",
          type: "text",
          label: "City",
          placeholder: "Columbus",
          required: true,
          icon: "FaMapMarkerAlt",
          width: "half",
          order: 5
        },
        {
          id: "budget",
          type: "select",
          label: "Budget Range",
          required: true,
          placeholder: "Select your budget...",
          options: [
            "What Is Your Lighting Budget",
            "$900 - $1200 (Standard Front Rooflines)",
            "$1200 - $1500",
            "$1500 - $2500",
            "$2500 - $4000",
            "$4000 and up",
            "Give me your best lighting design, money is not a factor."
          ],
          width: "full",
          order: 6
        },
        {
          id: "lightingAreas",
          type: "heading",
          label: "Select Areas To Be Lit Up",
          width: "full",
          order: 7
        },
        {
          id: "house",
          type: "checkbox",
          label: "House",
          options: ["House"],
          width: "quarter",
          order: 8
        },
        {
          id: "ground",
          type: "checkbox",
          label: "Ground Lighting",
          options: ["Ground Lighting"],
          width: "quarter",
          order: 9
        },
        {
          id: "trees",
          type: "checkbox",
          label: "Trees",
          options: ["Trees"],
          width: "quarter",
          order: 10
        },
        {
          id: "shrubs",
          type: "checkbox",
          label: "Shrubs / Bushes",
          options: ["Shrubs / Bushes"],
          width: "quarter",
          order: 11
        },
        {
          id: "notes",
          type: "textarea",
          label: "Additional Notes",
          placeholder: "Please let us know any details you would like to share to help us create your quote...",
          width: "full",
          order: 12
        },
        {
          id: "photos",
          type: "file",
          label: "Upload Photos",
          placeholder: "Click to upload photos",
          helperText: "For the quickest turn-around time, upload a front facing photo of your home below 🙂",
          width: "full",
          order: 13
        }
      ],
      benefits: [
        { text: "Free Consultation", icon: "FaCheckCircle" },
        { text: "Professional design service", icon: "FaCheckCircle" },
        { text: "Quality LED lighting", icon: "FaCheckCircle" },
        { text: "Flexible scheduling", icon: "FaCheckCircle" }
      ],
      contactInfo: {
        phone: "(614) 301-7100",
        email: "Info@lightsovercolumbus.com",
        hours: "24/7",
        support: "24/7 Support"
      },
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('Quote Form data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedQuoteForm();