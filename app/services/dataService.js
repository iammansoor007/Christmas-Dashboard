// src/services/dataService.js
import { 
  FaStar, FaHome, FaShieldAlt, FaHeart, FaCalendarCheck, FaPhoneAlt,
  FaArrowRight, FaCheckCircle, FaQuoteRight, FaCalendarAlt, FaCouch,
  FaChair, FaQuestionCircle, FaDollarSign, FaClock, FaLightbulb,
  FaBuilding, FaTree, FaSnowflake, FaChevronDown
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';

// Import your data
import data from '../../public/data.json';

// Map icon strings to actual components
const iconMap = {
  FaStar, FaHome, FaShieldAlt, FaHeart, FaCalendarCheck, FaPhoneAlt,
  FaArrowRight, FaCheckCircle, FaQuoteRight, FaCalendarAlt, FaCouch,
  FaChair, FaQuestionCircle, FaDollarSign, FaClock, FaLightbulb,
  FaBuilding, FaTree, FaSnowflake, FaChevronDown,
  GiSparkles
};

// Helper function to get icon component
export const getIconComponent = (iconName) => {
  return iconMap[iconName] || FaCheckCircle;
};

// Data fetching functions
export const getHeroData = () => {
  const heroData = data.hero;
  // Map icons in stats
  heroData.stats = heroData.stats.map(stat => ({
    ...stat,
    icon: getIconComponent(stat.icon)
  }));
  return heroData;
};

export const getServicesData = () => {
  const servicesData = data.services;
  // Map icons in items
  servicesData.items = servicesData.items.map(item => ({
    ...item,
    icon: getIconComponent(item.icon)
  }));
  return servicesData;
};

export const getHowWeWorkData = () => {
  const workData = data.howWeWork;
  // Map icons in steps
  workData.steps = workData.steps.map(step => ({
    ...step,
    icon: getIconComponent(step.icon)
  }));
  return workData;
};

export const getFAQData = () => {
  const faqData = data.faq;
  // Map icons in items
  faqData.items = faqData.items.map(item => ({
    ...item,
    icon: getIconComponent(item.icon)
  }));
  return faqData;
};

export const getWorkShowcaseData = () => data.workShowcase;
export const getCTAData = () => data.cta;
export const getContactData = () => data.contact;

// Get all data
export const getAllData = () => data;