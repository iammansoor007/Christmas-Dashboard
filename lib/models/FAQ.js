import mongoose from 'mongoose';

const FAQItemSchema = new mongoose.Schema({
  question: String,
  answer: String,
  icon: String, // For icon name if needed
  category: String // Optional category
});

const FAQSchema = new mongoose.Schema({
  badge: String,
  title: String,
  subtitle: String,
  phone: String,
  items: [FAQItemSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

export default FAQ;