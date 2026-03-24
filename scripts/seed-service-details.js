const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedServiceDetails() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('servicedetails');

    const services = [
      {
        slug: 'residential-lighting',
        title: 'Complete Residential Lighting',
        badgeText: '01 • RESIDENTIAL',
        number: '01',
        description: "Coming home to a beautifully lit house makes the holidays even more special. We design and install custom residential displays tailored to your home and your style. From design to professional installation, we handle everything – so you can skip the ladders and tangled lights.",
        longDescription: "Our residential lighting service transforms your home into a stunning holiday showcase. We start with a consultation to understand your vision, then create a custom design that highlights your home's architectural features. Our team handles every aspect of the installation, using only commercial-grade LED lights that are 3x brighter than store-bought options. Throughout the season, we provide ongoing maintenance to ensure your display stays perfect. When the holidays end, we return to carefully remove and store everything at our facility.",
        heroTitle: {
          line1: "Make your home stand",
          line2: "out this holiday season"
        },
        heroHighlight: "out this holiday season",
        heroGradientFrom: "#10b981",
        heroGradientTo: "#f59e0b",
        color: "#10B981",
        features: [
          { icon: "FaHome", title: "Roof & Gutter Lines", description: "Professional installation along rooflines and gutters for that classic holiday look" },
          { icon: "FaTree", title: "Tree & Shrub Wrapping", description: "Beautifully wrapped trees and bushes to complete your landscape" },
          { icon: "FaLightbulb", title: "Commercial Grade LEDs", description: "3x brighter than store-bought lights with better color consistency" },
          { icon: "FaTools", title: "Professional Installation", description: "Licensed and insured team with years of holiday lighting experience" },
          { icon: "FaBoxOpen", title: "Free Storage", description: "We store your lights after the season ends - no clutter in your garage" },
          { icon: "FaShieldAlt", title: "Warranty Included", description: "Full warranty on all lights and installation throughout the season" }
        ],
        whyChoose: {
          title: "Professional Quality, Personal Service",
          description: "We focus on delivering beautiful holiday lighting while making the entire process easy and hassle-free for you.",
          items: [
            { text: "Free Quotes" },
            { text: "Commercial grade LED lights custom fit to your home" },
            { text: "Maintenance & Take down" },
            { text: "Free storage in our climate-controlled facility" },
            { text: "Fully insured to protect your home and property" }
          ]
        },
        images: {
          hero: "/images/hero-background2.jpg",
          main: "/images/gallery3.jpg",
          gallery: [
            { url: "/images/gallery12.jpg", alt: "Professional lighting installation", position: "bottom-left" },
            { url: "/images/gallery13.jpg", alt: "Beautiful holiday lights display", position: "top-right" }
          ]
        }
      },
      {
        slug: 'commercial-lighting',
        title: 'Complete Commercial Lighting',
        badgeText: '02 • COMMERCIAL',
        number: '02',
        description: "Make your business stand out this season with professional holiday lighting. We design and install custom commercial displays tailored to your property and brand, helping you welcome customers and spread seasonal cheer.",
        longDescription: "Commercial properties deserve lighting that makes an impression. Our commercial holiday lighting services help businesses create eye-catching displays that attract customers and enhance the look of your property during the holiday season. We work with shopping centers, office buildings, restaurants, hotels, and retail spaces to design and install custom lighting displays that fit your property.",
        heroTitle: {
          line1: "Make Your Business",
          line2: "Unforgettable This Holiday Season"
        },
        heroHighlight: "Unforgettable This Holiday Season",
        heroGradientFrom: "#10b981",
        heroGradientTo: "#f59e0b",
        color: "#10B981",
        features: [
          { icon: "FaHome", title: "Building Facade Lighting", description: "Professional installation along building facades" },
          { icon: "FaTree", title: "Landscape Lighting", description: "Beautifully lit trees and landscaping" },
          { icon: "FaLightbulb", title: "Commercial Grade LEDs", description: "3x brighter with better color consistency" },
          { icon: "FaTools", title: "Professional Installation", description: "Licensed and insured commercial team" },
          { icon: "FaStore", title: "Storefront Illumination", description: "Custom displays that attract customers" },
          { icon: "FaShieldAlt", title: "Warranty Included", description: "Full warranty on all lights and installation" }
        ],
        whyChoose: {
          title: "Professional Grade, Business Ready",
          description: "We understand the unique needs of commercial properties. Our team delivers stunning results while respecting your business operations and schedule.",
          items: [
            { text: "Fully licensed, bonded, and insured for commercial work" },
            { text: "Installation during off-hours to minimize disruption" },
            { text: "Custom designs that align with your brand identity" },
            { text: "Volume discounts for multi-property portfolios" }
          ]
        },
        images: {
          hero: "/images/hero-background2.jpg",
          main: "/images/commericaldemo.JPEG",
          gallery: [
            { url: "/images/commericaldemo2.JPEG", alt: "Commercial lighting installation", position: "bottom-left" }
          ]
        }
      },
      {
        slug: 'permanent-lighting',
        title: 'Complete Permanent Lighting',
        badgeText: '03 • PERMANENT',
        number: '03',
        description: "Upgrade your home with permanent lighting you can enjoy all year long. Custom systems perfect for everyday curb appeal, holidays, game days, and special occasions — all controlled right from your phone.",
        longDescription: "Imagine changing your home's lighting for any occasion with a tap on your phone. Our permanent lighting systems are professionally installed once and designed to last for years. With customizable colors and lighting patterns, you can celebrate holidays, game days, and special events—or simply add elegant accent lighting to your home.",
        heroTitle: {
          line1: "Light Up Every",
          line2: "Occasion, All Year Long"
        },
        heroHighlight: "Occasion, All Year Long",
        heroGradientFrom: "#10b981",
        heroGradientTo: "#f59e0b",
        color: "#10B981",
        features: [
          { icon: "FaMobile", title: "App Controlled", description: "Change colors and effects instantly from your smartphone" },
          { icon: "FaLightbulb", title: "Color Customization", description: "Commercial grade LED permanent lighting system" },
          { icon: "FaRegSun", title: "Weatherproof", description: "Built to withstand Ohio weather year-round" },
          { icon: "FaTools", title: "Professional Installation", description: "Licensed and insured team with years of experience" },
          { icon: "FaWifi", title: "WiFi Enabled", description: "Control from anywhere in the world" },
          { icon: "FaShieldAlt", title: "Warranty Included", description: "Full warranty on all lights and installation" }
        ],
        whyChoose: {
          title: "Professional Quality, Smart Technology",
          description: "InvisiLights' customizable permanent lighting — invisible during the day, bright lights at night.",
          items: [
            { text: "Fully licensed, bonded, and insured for your protection" },
            { text: "Professional installation with discreet mounting" },
            { text: "Easy-to-use app with thousands of preset scenes" },
            { text: "Weatherproof connections rated for all seasons" }
          ]
        },
        images: {
          hero: "/images/hero-background2.jpg",
          main: "/images/permenantlighting.jpg",
          gallery: [
            { url: "/images/permenantdemo1.jpg", alt: "Smart home lighting control", position: "bottom-left" },
            { url: "/images/permenantdemo2.jpg", alt: "Professional smart lighting installation", position: "top-right" },
            { url: "/images/permenantdemo3.jpg", alt: "Weatherproof LED lighting", position: "main" }
          ]
        }
      }
    ];

    for (const service of services) {
      await collection.updateOne(
        { slug: service.slug },
        { $set: service },
        { upsert: true }
      );
      console.log(`Seeded: ${service.slug}`);
    }

    console.log('All service details seeded successfully!');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedServiceDetails();