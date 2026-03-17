import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  badge: String,
  title: {
    text: String,
    prefix: String
  },
  subtitle: String,
  features: [{
    title: String,
    description: String,
    icon: String,
    color: String
  }],
  trustIndicators: {
    homesCount: String,
    rating: String,
    reviewsCount: String
  },
  infoCard: {
    title: String,
    description: String
  },
  buttons: {
    primary: String,
    secondary: String
  },
  colors: {
    primaryRed: String,
    primaryGold: String,
    primaryEmerald: String,
    primaryNavy: String,
    gradient: String,
    background: String
  },
  items: [{
    number: String,
    title: String,
    description: String,
    icon: String,
    color: String,
    features: [String],
    image: String,
    stat: String,
    ctaLink: String,  // Add this for individual service CTA
    ctaText: String   // Add this for individual service CTA text
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

export default Service;