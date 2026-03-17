import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  badge: {
    icon: String,
    text: String
  },
  title: {
    part1: String,
    part2: String,
    part3: String
  },
  subtitle: String,
  features: [String],
  cta: {
    subtext: String,
    phone: String,
    availability: String
  },
  stats: [{
    number: String,
    label: String,
    icon: String
  }],
  imageBadge: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Check if model exists before creating
const Hero = mongoose.models.Hero || mongoose.model('Hero', HeroSchema);

export default Hero;