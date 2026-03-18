const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedAbout() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('aboutpages');

    const data = {
      pageTitle: "About Us - Christmas Lights Over Columbus",
      pageSubtitle: "Your trusted local holiday lighting experts",

      hero: {
        badge: {
          text: "ABOUT US",
          icon: "HiOutlineSparkles",
          backgroundColor: "linear-gradient(to right, rgba(245,158,11,0.2), rgba(239,68,68,0.2))",
          textColor: "#ffffff"
        },
        title: {
          line1: "GET TO KNOW",
          line2: "",
          highlighted: "YOUR LIGHTING TEAM",
          gradientFrom: "#fbbf24",
          gradientTo: "#ef4444"
        },
        subtitle: "We're your neighbors in Central Ohio dedicated to making your holiday season magical and stress-free.",
        cta: {
          text: "Get My Free Quote",
          phone: "+16143017100",
          link: "#",
          icon: "HiOutlineSparkles"
        },
        trustBadges: [
          { icon: "FaShieldAlt", text: "Licensed & Insured" },
          { icon: "FaClock", text: "24/7 Support" },
          { icon: "FaMedal", text: "5-Star Service" },
          { icon: "FaStar", text: "500+ Happy Clients" }
        ],
        backgroundImage: "/images/hero-background2.jpg",
        overlay: {
          from: "rgba(245,158,11,0.15)",
          to: "rgba(17,24,39,0.9)"
        }
      },

      founder: {
        badge: {
          text: "INSTALLING CHRISTMAS LIGHTS",
          icon: "FaAward"
        },
        title: {
          prefix: "Serving your",
          highlighted: "family"
        },
        quote: "Hi, I'm Ethen, owner of Christmas Lights Over Columbus. We help families across Central Ohio create beautiful, welcoming holiday displays without the stress of ladders or tangled lights.",
        description: "From custom design and installation to takedown after the season, my team takes care of everything so you can focus on what truly matters—making memories and enjoying time with the people you love.",
        mission: {
          label: "Mission",
          value: "Making holiday memories stress-free",
          icon: "FaGem"
        },
        expertise: {
          label: "Serving",
          value: "Central Ohio families",
          icon: "FaCalendarAlt"
        },
        philosophy: {
          label: "Philosophy",
          value: "Customer-first approach",
          icon: "FaHeart"
        },
        image: "/images/aboutownerfamily.JPEG",
        imageAlt: "Ethen - Owner of Christmas Lights Over Columbus",
        experienceBadge: {
          icon: "FaCalendarAlt",
          label: "Serving",
          value: "Central Ohio families",
          backgroundColor: "rgba(255,255,255,0.9)"
        }
      },

      stats: [
        { number: "500+", label: "Happy Clients", icon: "FaStar", color: "#f59e0b" },
        { number: "15+", label: "Years Experience", icon: "FaClock", color: "#ef4444" },
        { number: "24/7", label: "Support", icon: "FaShieldAlt", color: "#10b981" },
        { number: "100%", label: "Satisfaction", icon: "FaHeart", color: "#ec4899" }
      ],

      mission: {
        badge: "OUR MISSION",
        title: {
          prefix: "Making",
          main: "Holidays Magical"
        },
        description: "We believe every home deserves to shine during the holiday season. Our mission is to bring joy to families through stunning light displays while eliminating the stress and danger of DIY installation.",
        points: [
          { text: "Stress-free holiday lighting", icon: "FaCheckCircle" },
          { text: "Professional installation", icon: "FaTools" },
          { text: "Quality guaranteed", icon: "FaStar" }
        ],
        image: "/images/mission-image.jpg",
        imageAlt: "Christmas Lights Installation"
      },

      values: [
        { icon: "FaShieldAlt", text: "Licensed & Insured" },
        { icon: "FaClock", text: "24/7 Support" },
        { icon: "FaStar", text: "5-Star Service" }
      ],

      cta: {
        badge: "GET STARTED",
        title: "Ready to Transform Your Home?",
        description: "Join hundreds of satisfied Central Ohio families who trust us to make their holiday lighting spectacular.",
        buttons: {
          primary: {
            text: "Call Us Now: (614) 301-7100",
            link: "tel:+16143017100",
            icon: "FaPhone"
          },
          secondary: {
            text: "Schedule Free Consultation",
            link: "#",
            icon: "FaCalendarAlt"
          }
        },
        features: [
          { icon: "FaClock", text: "Free Estimates" },
          { icon: "FaShieldAlt", text: "Fully Insured" },
          { icon: "FaStar", text: "5-Star Service" }
        ],
        backgroundGradient: {
          from: "#f59e0b",
          to: "#ef4444"
        }
      },

      seo: {
        metaTitle: "About Christmas Lights Over Columbus | Holiday Lighting Experts",
        metaDescription: "Meet the team behind Central Ohio's most magical holiday displays. Learn about our mission, values, and commitment to stress-free Christmas lighting.",
        ogImage: "/images/about-og-image.jpg",
        keywords: ["Christmas lights", "holiday lighting", "Columbus Ohio", "professional installation"]
      },

      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('About page data seeded successfully! ID:', result.insertedId);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedAbout();