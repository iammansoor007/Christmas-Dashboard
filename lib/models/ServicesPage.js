import mongoose from 'mongoose';

const HeroSectionSchema = new mongoose.Schema({
  badge: {
    text: String,
    icon: String,
    backgroundColor: String,
    textColor: String
  },
  title: {
    prefix: String,
    text: String,
    gradientFrom: String,
    gradientTo: String
  },
  subtitle: String,
  cta: {
    text: String,
    phone: String,
    link: String,
    icon: String
  },
  backgroundImage: String,
  overlay: {
    from: String,
    to: String
  }
}, { _id: false });

const ServicesPageSchema = new mongoose.Schema({
  // Hero Section - Unique to Services Page
  hero: HeroSectionSchema,

  // Services Section Header
  servicesHeader: {
    badge: String,
    title: String,
    subtitle: String
  },

  // Bottom CTA Section
  bottomCta: {
    title: String,
    description: String,
    buttonText: String,
    buttonLink: String,
    backgroundGradient: {
      from: String,
      to: String
    }
  },

  // SEO
  seo: {
    metaTitle: String,
    metaDescription: String,
    ogImage: String
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const ServicesPage = mongoose.models.ServicesPage || mongoose.model('ServicesPage', ServicesPageSchema);

export default ServicesPage;