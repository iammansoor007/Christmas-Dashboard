import mongoose from 'mongoose';

const WorkShowcaseSchema = new mongoose.Schema({
  badge: String,
  title: {
    prefix: String,
    main: String
  },
  description: String,
  cta: {
    text: String,
    link: String
  },
  images: [String], // Array of image paths from uploads
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const WorkShowcase = mongoose.models.WorkShowcase || mongoose.model('WorkShowcase', WorkShowcaseSchema);

export default WorkShowcase;