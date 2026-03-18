import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  label: String,
  href: String
}, { _id: false });

const SocialMediaSchema = new mongoose.Schema({
  icon: String,
  label: String,
  href: String,
  key: String
}, { _id: false });

const FooterSchema = new mongoose.Schema({
  companyName: String,
  year: Number,
  logo: String,
  contact: {
    phone: String,
    email: String,
    hours: String,
    support: String
  },
  socialMedia: [SocialMediaSchema],
  links: {
    Services: [LinkSchema],
    Company: [LinkSchema]
  },
  certifications: String,
  copyrightText: String,
  designedBy: {
    name: String,
    url: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Footer = mongoose.models.Footer || mongoose.model('Footer', FooterSchema);

export default Footer;