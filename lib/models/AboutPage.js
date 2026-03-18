import mongoose from 'mongoose';

const TrustBadgeSchema = new mongoose.Schema({
  icon: String, // shield, clock, medal, star
  text: String
}, { _id: false });

const CTAButtonSchema = new mongoose.Schema({
  text: String,
  phone: String,
  link: String,
  icon: String
}, { _id: false });

const HeroSectionSchema = new mongoose.Schema({
  badge: {
    text: String,
    icon: String,
    backgroundColor: String,
    textColor: String
  },
  title: {
    line1: String,
    line2: String,
    highlighted: String,
    gradientFrom: String,
    gradientTo: String
  },
  subtitle: String,
  cta: CTAButtonSchema,
  trustBadges: [TrustBadgeSchema],
  backgroundImage: String,
  overlay: {
    from: String,
    to: String,
    opacity: Number
  }
}, { _id: false });

const FounderSectionSchema = new mongoose.Schema({
  badge: {
    text: String,
    icon: String
  },
  title: {
    prefix: String,
    highlighted: String
  },
  quote: String,
  description: String,
  mission: {
    label: String,
    value: String,
    icon: String
  },
  expertise: {
    label: String,
    value: String,
    icon: String
  },
  philosophy: {
    label: String,
    value: String,
    icon: String
  },
  image: String,
  imageAlt: String,
  experienceBadge: {
    icon: String,
    label: String,
    value: String,
    backgroundColor: String
  }
}, { _id: false });

const StatSchema = new mongoose.Schema({
  number: String,
  label: String,
  icon: String,
  color: String
}, { _id: false });

const MissionSectionSchema = new mongoose.Schema({
  badge: String,
  title: {
    prefix: String,
    main: String
  },
  description: String,
  points: [{
    text: String,
    icon: String
  }],
  image: String,
  imageAlt: String
}, { _id: false });

const FeatureSchema = new mongoose.Schema({
  icon: String,
  text: String
}, { _id: false });

const CTASectionSchema = new mongoose.Schema({
  badge: String,
  title: String,
  description: String,
  buttons: {
    primary: {
      text: String,
      link: String,
      icon: String
    },
    secondary: {
      text: String,
      link: String,
      icon: String
    }
  },
  features: [FeatureSchema],
  backgroundGradient: {
    from: String,
    to: String
  }
}, { _id: false });

const SEOSchema = new mongoose.Schema({
  metaTitle: String,
  metaDescription: String,
  ogImage: String,
  keywords: [String]
}, { _id: false });

const AboutPageSchema = new mongoose.Schema({
  // Page Metadata
  pageTitle: String,
  pageSubtitle: String,

  // Hero Section - EVERYTHING dynamic
  hero: HeroSectionSchema,

  // Founder/Story Section - EVERYTHING dynamic
  founder: FounderSectionSchema,

  // Stats Section (optional, can add multiple)
  stats: [StatSchema],

  // Mission Section - EVERYTHING dynamic
  mission: MissionSectionSchema,

  // Values/Features Section
  values: [FeatureSchema],

  // Team Section (optional)
  team: [{
    name: String,
    role: String,
    bio: String,
    image: String,
    socialLinks: [{
      platform: String,
      url: String,
      icon: String
    }]
  }],

  // CTA Section - EVERYTHING dynamic
  cta: CTASectionSchema,

  // SEO
  seo: SEOSchema,

  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const AboutPage = mongoose.models.AboutPage || mongoose.model('AboutPage', AboutPageSchema);

export default AboutPage;