import mongoose from 'mongoose';

const HowWeWorkSchema = new mongoose.Schema({
  badge: String,
  title: {
    text: String,
    prefix: String
  },
  subtitle: String,
  steps: [{
    number: String,
    title: String,
    description: String,
    icon: String,
    color: String,
    features: [String]
  }],
  cta: {
    title: String,
    description: String,
    buttons: {
      primary: String,
      secondary: String
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const HowWeWork = mongoose.models.HowWeWork || mongoose.model('HowWeWork', HowWeWorkSchema);

export default HowWeWork;