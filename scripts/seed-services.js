const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedServices() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('services');

    const servicesData = {
      badge: "Premium Services",
      title: {
        text: "Christmas Lighting",
        prefix: "Premium"
      },
      subtitle: "Custom holiday lighting designed to make your home stand out.",
      features: [
        {
          title: "Warrantied Product & Service",
          description: "Full coverage on all materials and installation work",
          icon: "FaShieldAlt",
          color: "#E63946"
        },
        {
          title: "48-Hour Maintenance",
          description: "Free maintenance within 48 hours of installation",
          icon: "FaTools",
          color: "#F4A261"
        },
        {
          title: "Professional Installation",
          description: "Licensed, insured, certified technicians",
          icon: "FaCheckCircle",
          color: "#2A9D8F"
        }
      ],
      trustIndicators: {
        homesCount: "500+",
        rating: "4.9/5",
        reviewsCount: "248 reviews"
      },
      infoCard: {
        title: "Premium Maintenance Guarantee",
        description: "48-hour response for maintenance. Your display stays perfect all season."
      },
      buttons: {
        primary: "Get Quote",
        secondary: "View Gallery"
      },
      colors: {
        primaryRed: "#E63946",
        primaryGold: "#F4A261",
        primaryEmerald: "#2A9D8F",
        primaryNavy: "#1D3557",
        gradient: "linear-gradient(135deg, #E63946 0%, #F4A261 50%, #2A9D8F 100%)",
        background: "linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)"
      },
      items: [
        {
          number: "01",
          title: "Residential Lighting",
          description: "Coming home to a beautifully lit house makes the holidays even more special. We design and install custom residential displays tailored to your home and your style.",
          icon: "FaHome",
          color: "#10B981",
          features: [
            "Gutter and roofline lighting",
            "Tree & shrub lighting",
            "Custom Design & Warrantied Installation",
            "Removal and Storage Included"
          ],
          image: "/images/gallery1.jpg",
          stat: "500+ Homes",
          ctaText: "View Details",
          ctaLink: "/services/residential-lighting"
        },
        {
          number: "02",
          title: "Commercial Lighting",
          description: "Make your business stand out this season with professional holiday lighting. We design and install custom commercial displays tailored to your property and brand.",
          icon: "FaBuilding",
          color: "#3B82F6",
          features: [
            "Gutter and roofline lighting",
            "Tree & shrub lighting",
            "Custom Design & Warrantied Installation",
            "Removal and Storage Included"
          ],
          image: "/images/commericaldemo.JPEG",
          stat: "100+ Businesses",
          ctaText: "View Details",
          ctaLink: "/services/commercial-lighting"
        },
        {
          number: "03",
          title: "Permanent Lighting",
          description: "Upgrade your home with permanent lighting you can enjoy all year long. Custom systems perfect for everyday curb appeal, holidays, game days, and special occasions.",
          icon: "FaStar",
          color: "#F59E0B",
          features: [
            "Fast and efficient installation",
            "Endless customization from your phone",
            "Durable and weather resistant",
            "Year-round curb appeal"
          ],
          image: "/images/permenantlighting.jpg",
          stat: "Custom Designs",
          ctaText: "View Details",
          ctaLink: "/services/permanent-lighting"
        }
      ],
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(servicesData);
    console.log('Services data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedServices();