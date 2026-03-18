const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas-lighting';

async function seedTestimonials() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('testimonials');

    const data = {
      badge: "★ Customer Stories",
      title: {
        line1: "What Our",
        line2: "Clients Say"
      },
      subtitle: "Discover why homeowners and businesses trust us to transform their spaces into magical holiday experiences.",
      items: [
        {
          id: 1,
          quote: "Working with this team transformed our holiday display completely. The attention to detail and creative lighting solutions exceeded all our expectations.",
          author: "Sarah Johnson",
          role: "Homeowner",
          company: "Maple Street Residence",
          rating: 5,
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
          location: "Portland, OR",
          service: "Residential Lighting"
        },
        {
          id: 2,
          quote: "Professional, punctual, and absolutely stunning results. They turned our commercial property into a winter wonderland that attracted customers from miles around.",
          author: "Michael Chen",
          role: "Property Manager",
          company: "Grand Plaza Mall",
          rating: 5,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
          location: "Seattle, WA",
          service: "Commercial & Corporate"
        },
        {
          id: 3,
          quote: "As a busy family, we didn't have time to decorate. This team made our Christmas magical with minimal disruption.",
          author: "Emily Rodriguez",
          role: "Marketing Director",
          company: "Tech Innovations Inc",
          rating: 5,
          image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
          location: "San Francisco, CA",
          service: "Landscape Lighting"
        },
        {
          id: 4,
          quote: "The energy efficiency of their LED installations saved us 40% on our electricity bill compared to last year's decorations.",
          author: "Robert Williams",
          role: "Sustainability Officer",
          company: "Green Living Corp",
          rating: 5,
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
          location: "Boulder, CO",
          service: "Premium Custom Display"
        }
      ],
      lastUpdated: new Date()
    };

    await collection.deleteMany({});
    const result = await collection.insertOne(data);
    console.log('Testimonials data seeded successfully! ID:', result.insertedId);
    console.log(`Seeded ${data.items.length} testimonials`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedTestimonials();