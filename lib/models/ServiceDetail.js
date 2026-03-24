import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String
}, { _id: false });

const ProcessStepSchema = new mongoose.Schema({
  step: String,
  description: String
}, { _id: false });

const WhyChooseItemSchema = new mongoose.Schema({
  text: String
}, { _id: false });

const GalleryImageSchema = new mongoose.Schema({
  url: String,
  alt: String,
  position: String // 'main', 'top-right', 'bottom-left'
}, { _id: false });

const ServiceDetailSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    enum: ['residential-lighting', 'commercial-lighting', 'permanent-lighting']
  },
  title: String,
  subtitle: String,
  badgeText: String,
  number: String,
  description: String,
  longDescription: String,
  heroTitle: {
    line1: String,
    line2: String
  },
  heroHighlight: String,
  heroGradientFrom: String,
  heroGradientTo: String,
  features: [FeatureSchema],
  process: [ProcessStepSchema],
  whyChoose: {
    title: String,
    description: String,
    items: [WhyChooseItemSchema]
  },
  images: {
    hero: String,
    main: String,
    gallery: [GalleryImageSchema]
  },
  color: String,
  metaTitle: String,
  metaDescription: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const ServiceDetail = mongoose.models.ServiceDetail || mongoose.model('ServiceDetail', ServiceDetailSchema);

export default ServiceDetail;