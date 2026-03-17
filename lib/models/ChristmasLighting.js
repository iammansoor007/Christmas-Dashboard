import mongoose from 'mongoose';

const ChristmasLightingSchema = new mongoose.Schema({
  title: String,
  paragraphs: [String],
  cta: {
    primary: {
      text: String,
      link: String
    },
    secondary: {
      text: String,
      link: String
    }
  },
  image: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const ChristmasLighting = mongoose.models.ChristmasLighting || mongoose.model('ChristmasLighting', ChristmasLightingSchema);

export default ChristmasLighting;