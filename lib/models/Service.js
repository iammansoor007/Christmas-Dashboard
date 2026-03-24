import mongoose from 'mongoose';

// Feature schema for homepage services section
const FeatureSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
  color: String
}, { _id: false });

// Detail feature schema for service detail pages
const DetailFeatureSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  // Section header fields
  badge: String,
  title: {
    text: String,
    prefix: String
  },
  subtitle: String,
  features: [FeatureSchema],
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
  // Service items array
  items: [{
    number: String,
    title: String,
    description: String,
    icon: String,
    color: String,
    features: [String],
    image: String,
    stat: String,
    ctaLink: String,
    ctaText: String,
    // Detail page fields
    longDescription: String,
    detailFeatures: [DetailFeatureSchema],
    whyChoose: {
      title: String,
      description: String,
      items: [String]
    },
    galleryImages: [String]
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// IMPORTANT: Check if model exists before creating
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

export default Service;