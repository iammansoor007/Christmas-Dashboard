import mongoose from 'mongoose';

const DropdownItemSchema = new mongoose.Schema({
  path: String,
  label: String,
  description: String,
  icon: String
}, { _id: false });

const NavItemSchema = new mongoose.Schema({
  path: String,
  label: String,
  dropdown: [DropdownItemSchema],
  isActive: Boolean
}, { _id: false });

const CTASchema = new mongoose.Schema({
  text: String,
  phone: String,
  icon: String
}, { _id: false });

const ContactInfoSchema = new mongoose.Schema({
  email: String,
  text: String
}, { _id: false });

const NavbarSchema = new mongoose.Schema({
  logo: String,
  logoAlt: String,
  navItems: [NavItemSchema],
  cta: CTASchema,
  contactInfo: ContactInfoSchema,
  colors: {
    background: String,
    text: String,
    hover: String,
    active: String,
    dropdownBg: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Navbar = mongoose.models.Navbar || mongoose.model('Navbar', NavbarSchema);

export default Navbar;