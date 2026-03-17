'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import FAQ from '../components/FAQSection';
import CallToAction from '../components/CallToAction'
import ChristmasLightingMap from '../components/ChristmasLightingMap';
import {
  FaCheckCircle,
  FaArrowRight,
  FaGift as FaAward,
  FaMedal,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaUsers,
  FaTree,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaQuoteLeft,
  FaLightbulb,
  FaHome,
  FaTools,
  FaBoxOpen,
  FaTag,
  FaQuestionCircle,
  FaMinus,
  FaPlus,
  FaRibbon,
  FaGem,
  FaRegSnowflake,
  FaBuilding,
  FaLeaf,
  FaSnowman,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart,
  FaRocket,
  FaUser,
  FaSpinner,
  FaTimes
} from 'react-icons/fa';
import { GiSparkles, GiFruitTree, GiCrystalGrowth, GiChristmasTree } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';

const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('seasonal');
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef(null);
  const mainRef = useRef(null);
  const containerRef = useRef(null);
  const leftTreeRef = useRef(null);
  const rightTreeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
    setMounted(true);

    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
        setScrollProgress(progress);
      }
    };



    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  if (!mounted) {
    return null;
  }

  const handleCallClick = (e) => {
    e.preventDefault();
    if (data?.hero?.cta?.phone) {
      // Remove any non-numeric characters except +
      const phoneNumber = data.hero.cta.phone.replace(/[^\d+]/g, '');
      window.location.href = `tel:${phoneNumber}`;
    } else {
      console.warn('Phone number not found in data.json');
      // Fallback to contact page if no phone number
      window.location.href = '/contact';
    }
  };

  if (!data) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  const { hero } = data;

  // ConsultationModal component - fixed all issues
  const ConsultationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      serviceType: 'seasonal',
      preferredDate: '',
      preferredTime: '',
      message: '',
      hearAbout: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const modalRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const initialFocusRef = useRef(null);

    // Store scroll position when modal opens
    useEffect(() => {
      if (isOpen) {
        // Store current scroll position
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';

        // Focus first input after modal is mounted
        setTimeout(() => {
          if (initialFocusRef.current) {
            initialFocusRef.current.focus();
          }
        }, 100);
      }

      return () => {
        // Restore scroll position when modal closes
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';

        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Handle backdrop click
    const handleBackdropClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Prevent scroll propagation - fixed
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        e.stopPropagation();

        // If at the top and trying to scroll up, or at bottom and trying to scroll down
        if (
          (scrollTop === 0 && e.deltaY < 0) ||
          (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)
        ) {
          e.preventDefault();
        }
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');

      // Simulate API call (replace with actual API)
      setTimeout(() => {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            serviceType: 'seasonal',
            preferredDate: '',
            preferredTime: '',
            message: '',
            hearAbout: ''
          });
          onClose();
        }, 2000);
      }, 1500);
    };

    const timeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '1:00 PM', '2:00 PM',
      '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    const serviceTypes = [
      { value: 'seasonal', label: 'Seasonal Christmas Lighting' },
      { value: 'permanent', label: 'Permanent Lighting Installation' },
      { value: 'commercial', label: 'Commercial Property' },
      { value: 'consultation', label: 'General Consultation' }
    ];

    const hearOptions = [
      'Google Search',
      'Facebook',
      'Instagram',
      'Friend/Family Referral',
      'Previous Customer',
      'Other'
    ];

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[9999] overflow-hidden"
        onClick={handleBackdropClick}
      >
        {/* Backdrop with blur */}
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl transform transition-all duration-300 pointer-events-auto max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              aria-label="Close modal"
            >
              <FaTimes className="text-gray-600 w-4 h-4" />
            </button>

            {/* Success View */}
            {isSubmitted ? (
              <div className="p-8 text-center overflow-y-auto min-h-[300px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <FaCheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Consultation Scheduled!
                </h3>
                <p className="text-gray-600">
                  Thank you for scheduling a consultation. We'll contact you within 24 hours to confirm your appointment.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <GiFruitTree className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Schedule Free Consultation</h3>
                      <p className="text-emerald-100 text-sm">Christmas Lights Over Columbus</p>
                    </div>
                  </div>
                </div>

                {/* Scrollable Form Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto p-6"
                  onWheel={handleWheel}
                  style={{ maxHeight: 'calc(90vh - 120px)' }}
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Form Fields - All fields now have visible text */}
                    <div className="space-y-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaUser className="inline mr-2 text-emerald-600" />
                          Full Name *
                        </label>
                        <input
                          ref={initialFocusRef}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaEnvelope className="inline mr-2 text-emerald-600" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400"
                          placeholder="john@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaPhoneAlt className="inline mr-2 text-emerald-600" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400"
                          placeholder="(614) 555-0123"
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaHome className="inline mr-2 text-emerald-600" />
                          Service Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400"
                          placeholder="123 Main St, Columbus, OH 43215"
                        />
                      </div>

                      {/* Service Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaTree className="inline mr-2 text-emerald-600" />
                          Service Type *
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white"
                        >
                          {serviceTypes.map(type => (
                            <option key={type.value} value={type.value} className="text-gray-900">
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaCalendarAlt className="inline mr-2 text-emerald-600" />
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white"
                        />
                      </div>

                      {/* Preferred Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <FaClock className="inline mr-2 text-emerald-600" />
                          Preferred Time *
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white"
                        >
                          <option value="" className="text-gray-500">Select a time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="text-gray-900">{time}</option>
                          ))}
                        </select>
                      </div>

                      {/* How did you hear about us */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          How did you hear about us?
                        </label>
                        <select
                          name="hearAbout"
                          value={formData.hearAbout}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white"
                        >
                          <option value="" className="text-gray-500">Select an option</option>
                          {hearOptions.map(option => (
                            <option key={option} value={option} className="text-gray-900">{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Additional Details (Optional)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 bg-white placeholder-gray-400 resize-none"
                          placeholder="Tell us about your vision for your holiday display..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaSpinner className="animate-spin w-4 h-4" />
                          Scheduling...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <FaCalendarAlt className="w-4 h-4" />
                          Schedule Free Consultation
                        </span>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      By submitting, you agree to be contacted by Christmas Lights Over Columbus.
                    </p>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Founder information
  const founder = {
    name: 'Ethen',
    role: 'Owner, Christmas Lights Over Columbus',
    quote: "Hi, I'm Ethen, owner of Christmas Lights Over Columbus. We help families across Central Ohio create beautiful, welcoming holiday displays without the stress of ladders or tangled lights.",
    expertise: 'Serving Central Ohio families',
    philosophy: 'Making holiday memories stress-free',
    company: 'Christmas Lights Over Columbus',
    tagline: 'Installing Christmas lights. Serving your family.',
    location: 'Central Ohio'
  };

  // CTA Content
  const cta = {
    title: 'Ready to Transform Your Home Into a Holiday Wonderland?',
    description: 'Join hundreds of satisfied Central Ohio families who trust us to make their holiday lighting stress-free and spectacular. Get your free, no-obligation quote today!',
    buttons: {
      primary: 'Call Us Now: (614) 301-7100',
      secondary: 'Schedule Free Consultation'
    },
    features: [
      { icon: FaClock, text: 'Free Estimates' },
      { icon: FaShieldAlt, text: 'Fully Insured' },
      { icon: FaStar, text: '5-Star Service' }
    ]
  };

  // Handle button click without page jump
  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <main ref={mainRef} className="overflow-x-hidden w-full">
      {/* Modal Component */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center w-full overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <div
            className="relative w-full h-full transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px) scale(1.05)`,
            }}
          >
            <Image
              src="/images/hero-background2.jpg"
              alt="About Christmas Lights Over Columbus"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={100}
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
        </div>

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-amber-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Particle grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>



        {/* Scroll overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300"
          style={{ opacity: scrollProgress }}
        ></div>

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* About Us Badge with animation */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <HiOutlineSparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 text-sm font-medium tracking-wider">ABOUT US</span>
            </div>

            {/* Main Heading with animations */}
            <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              <span className="block animate-title-slide-up">
                GET TO KNOW{' '}
              </span>
              <span className="block relative animate-title-slide-up animation-delay-200">
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-red-400 bg-[length:200%_200%] animate-gradient-x">
                    YOUR LIGHTING TEAM
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-red-400/30 blur-3xl -z-10 scale-150"></span>
                </span>
              </span>
            </h1>

            {/* Description with animation */}
            <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
              {hero?.subtitle || "We're your neighbors in Central Ohio dedicated to making your holiday season magical and stress-free."}
            </p>

            {/* CTA Buttons with animations */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animation-delay-600">
              <button
                onClick={handleCallClick}
                className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                  <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span>{hero.cta.subtext || "Get My Free Quote"}</span>
                  <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </button>
            </div>

            {/* Trust badges with animation */}
            {hero?.trustBadges && hero.trustBadges.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm animate-fade-up animation-delay-800">
                {hero.trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300">
                    {badge.icon === 'shield' && <FaShieldAlt className="text-amber-400" />}
                    {badge.icon === 'clock' && <FaClock className="text-amber-400" />}
                    {badge.icon === 'medal' && <FaMedal className="text-amber-400" />}
                    {badge.icon === 'star' && <FaStar className="text-amber-400" />}
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Founder Section with ID for anchor link */}
      <section id="story" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245,158,11,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="relative order-2 lg:order-1 text-center lg:text-left">
                <div className="relative z-10">
                  {/* Section badge - reduced bottom margin */}
                  <div className="flex justify-center lg:justify-start mb-2 animate-fade-up">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-red-500/10 backdrop-blur-sm border border-amber-200/30 rounded-full px-4 py-1.5">
                      <FaAward className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-amber-700 text-xs font-medium tracking-wider">INSTALLING CHRISTMAS LIGHTS</span>
                    </div>
                  </div>

                  {/* Main heading - reduced top margin and adjusted spacing */}
                  <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight animate-title-slide-up">
                    <span className="block">Serving your</span>
                    <span className="block relative -mt-1">
                      <span className="relative inline-block">
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500 bg-[length:200%_200%] animate-gradient-x">
                          family
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-400/20 blur-3xl -z-10 scale-150"></span>
                      </span>
                    </span>
                  </h2>

                  {/* Content with adjusted top spacing */}
                  <div className="space-y-5 text-gray-600 leading-relaxed text-base sm:text-lg mt-4 animate-fade-up animation-delay-200">
                    <p className="text-lg sm:text-xl text-gray-700 ">
                      <FaQuoteLeft className="inline-block w-4 h-4 text-amber-400 mr-1 opacity-50" />
                      {founder.quote} < br />   From custom design and installation to takedown after the season, my team takes care of
                      everything so you can focus on what truly matters—making memories and enjoying time with
                      the people you love.
                    </p>


                    <div className="flex items-center justify-center lg:justify-start gap-3 pt-3 animate-fade-up animation-delay-400">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaGem className="text-amber-600 text-lg" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-500">Mission</div>
                        <div className="text-base font-semibold text-gray-900">{founder.philosophy}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-amber-100 to-red-100 rounded-full blur-3xl opacity-50 -z-10"></div>
              </div>

              <div className="relative order-1 lg:order-2 animate-fade-up animation-delay-200">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                    <Image
                      src="/images/aboutownerfamily.JPEG?t=1"
                      alt={founder.name}
                      className="w-full h-full object-cover"
                      width={800}
                      height={1000}
                      priority
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                  </div>

                  {/* Experience badge */}
                  <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white/90 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl max-w-[200px] sm:max-w-xs hidden lg:block border border-amber-100">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <FaCalendarAlt className="text-amber-500 text-base sm:text-lg md:text-xl" />
                      <span className="text-xs sm:text-xs font-medium text-gray-600">Serving</span>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{founder.expertise}</div>
                  </div>

                  {/* Decorative gradient */}
                  <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-amber-500/10 to-red-500/10 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChristmasLightingMap />
      {/* FAQ Section */}
      <FAQ />

      <section className="sm:-mt-12 lg:-mt-16 sm:p-6  lg:p-12 bg-gray-50"> <CallToAction /></section>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes titleSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 10s infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-title-slide-up {
          animation: titleSlideUp 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }

        .animation-delay-4000 {
          animation-delay: 4000ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        /* Improve modal scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }

        @media (max-width: 640px) {
          h1, h2, h3 {
            line-height: 1.2 !important;
          }
          
          .text-xl {
            font-size: 1.125rem !important;
          }
        }
      `}</style>
    </main>
  );
};

export default AboutUs;