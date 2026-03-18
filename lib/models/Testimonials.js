import mongoose from 'mongoose';

const TestimonialItemSchema = new mongoose.Schema({
  id: Number,
  quote: String,
  author: String,
  role: String,
  company: String,
  rating: Number,
  image: String,
  location: String,
  service: String
});

const TestimonialsSchema = new mongoose.Schema({
  badge: String,
  title: {
    line1: String,
    line2: String
  },
  subtitle: String,
  items: [TestimonialItemSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Testimonials = mongoose.models.Testimonials || mongoose.model('Testimonials', TestimonialsSchema);

export default Testimonials;