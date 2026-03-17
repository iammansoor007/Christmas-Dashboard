'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CallToAction from '../components/CallToAction';
import Link from 'next/link';
import {
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaHome,
  FaBuilding,
  FaTree,
  FaLightbulb,
  FaTools,
  FaBoxOpen,
  FaPhoneAlt,
  FaCalendarAlt,
  FaGem,
  FaRuler,
  FaPalette,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaSpinner,
  FaAward,
  FaQuoteLeft,
  FaTag
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';

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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (initialFocusRef.current) {
          initialFocusRef.current.focus();
        }
      }, 100);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight;

        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
          e.stopPropagation();
        }
      }
    };

    if (isOpen) {
      const modalContent = scrollContainerRef.current;
      if (modalContent) {
        modalContent.addEventListener('wheel', handleWheel, { passive: false });
      }
      return () => {
        if (modalContent) {
          modalContent.removeEventListener('wheel', handleWheel);
        }
      };
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
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

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);

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
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      className="fixed inset-0 z-[100] overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl transform transition-all pointer-events-auto max-h-[90vh] flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 shadow-md hover:rotate-90 transform transition-all"
          >
            <FaTimes className="text-gray-600" />
          </button>

          {isSubmitted ? (
            <div className="p-8 text-center">
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
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-t-3xl p-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <GiSparkles className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Schedule Free Consultation</h3>
                    <p className="text-emerald-100 text-sm">Christmas Lights Over Columbus</p>
                  </div>
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto overscroll-contain p-6"
                style={{ maxHeight: 'calc(90vh - 120px)' }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaEnvelope className="inline mr-2 text-emerald-600" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black placeholder-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaPhoneAlt className="inline mr-2 text-emerald-600" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black placeholder-gray-400"
                        placeholder="(614) 555-0123"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaHome className="inline mr-2 text-emerald-600" />
                        Service Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black placeholder-gray-400"
                        placeholder="123 Main St, Columbus, OH 43215"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaTree className="inline mr-2 text-emerald-600" />
                        Service Type *
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black"
                      >
                        {serviceTypes.map(type => (
                          <option key={type.value} value={type.value} className="text-black">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FaCalendarAlt className="inline mr-2 text-emerald-600" />
                          Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FaClock className="inline mr-2 text-emerald-600" />
                          Time *
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black"
                        >
                          <option value="" className="text-black">Select</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time} className="text-black">{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How did you hear about us?
                      </label>
                      <select
                        name="hearAbout"
                        value={formData.hearAbout}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black"
                      >
                        <option value="" className="text-black">Select an option</option>
                        {hearOptions.map(option => (
                          <option key={option} value={option} className="text-black">{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-black placeholder-gray-400"
                        placeholder="Tell us about your vision for your holiday display..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <FaSpinner className="animate-spin" />
                        Scheduling...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FaCalendarAlt />
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

const ServicesPage = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const heroRef = useRef(null);

  // Load data and initial setup
  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);

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
  }, []);

  // Mouse move handler for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll handler for overlay
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const progress = Math.min(scrollY / (heroHeight * 0.5), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Visibility handler for CTA animation
  useEffect(() => {
    const handleVisibility = () => {
      const ctaSection = document.getElementById('cta-section');
      if (ctaSection) {
        const rect = ctaSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleVisibility);
    handleVisibility();

    return () => window.removeEventListener('scroll', handleVisibility);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+16143017100';
  };

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  if (!mounted) {
    return null;
  }

  if (!data) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  const { services, howWeWork } = data;

  // Default placeholder image
  const placeholderImage = '/images/placeholder-service.jpg';

  return (
    <main className="overflow-x-hidden w-full">
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
              alt="Services - Christmas Lights Over Columbus"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={100}
              onError={() => console.log('Hero image failed to load')}
            />
          </div>
          {/* Gradient overlay - darker version with amber/red */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-gray-900/90 to-red-500/30"></div>
        </div>

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-amber-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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


            {/* Main Heading with animations */}
            <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              <span className="block animate-title-slide-up">
                PREMIUM
              </span>
              <span className="block relative animate-title-slide-up animation-delay-200">
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400 bg-[length:200%_200%] animate-gradient-x">
                    CHRISTMAS LIGHTING
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-amber-400/30 blur-3xl -z-10 scale-150"></span>
                </span>
              </span>
            </h1>

            {/* Description with animation */}
            <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
              {services?.subtitle || "Transform your property with professional holiday lighting installations"}
            </p>

            {/* CTA Buttons with animations */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
              <button
                onClick={handleCallClick}
                className="relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <HiOutlineSparkles className="w-5 h-5" />
                  <span>Get My Free Quote</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Services Sections - Alternating Left/Right Layout with Fixed Height Cards */}
      <section id="services" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16,185,129,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-up">

              <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-gray-900 mt-4 mb-4">
                <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                  Our Lighting Collection
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {services?.subtitle || "Professional holiday lighting solutions for every property"}
              </p>
            </div>

            {/* Alternating Service Cards with Fixed Height */}
            {services?.items?.map((service, index) => {
              // Determine the correct link based on service title
              const serviceLink = service.title.toLowerCase().includes('residential')
                ? '/services/residential-lighting'
                : service.title.toLowerCase().includes('commercial')
                  ? '/services/commercial-lighting'
                  : service.title.toLowerCase().includes('permanent')
                    ? '/services/permanent-lighting'
                    : `/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`;

              // Use placeholder if image fails to load
              const imageSrc = imageErrors[index] ? placeholderImage : (service.image || placeholderImage);

              return (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch py-16 ${index !== 0 ? 'border-t border-gray-100' : ''
                    }`}
                >
                  {/* Content - alternating order */}
                  <div
                    className={`relative order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                      } animate-fade-up h-full`}
                    style={{ animationDelay: `${400 + index * 150}ms` }}
                  >
                    <div className="relative z-10 bg-white rounded-3xl p-8 h-full flex flex-col">
                      {/* Section badge */}
                      <div className="flex justify-center lg:justify-start mb-4">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color || '#10b981' }}></div>
                          <span className="text-emerald-700 text-xs font-medium tracking-wider">{service.number || `0${index + 1}`}</span>
                        </div>
                      </div>

                      <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-4">
                        <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                          {service.title}
                        </span>
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed flex-grow">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {service.features?.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="flex justify-center lg:justify-start mt-auto">
                        <Link
                          href={serviceLink}
                          className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-400 to-red-500 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <HiOutlineSparkles className="w-5 h-5" />
                            <span>Learn More</span>
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                        </Link>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                    </div>
                  </div>

                  {/* Image - alternating order with fixed height */}
                  <div
                    className={`relative order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                      } animate-fade-up h-full`}
                    style={{ animationDelay: `${500 + index * 150}ms` }}
                  >
                    <div className="relative h-full">
                      {/* Fixed height container for images */}
                      <div className="relative h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                        <Image
                          src={imageSrc}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                          priority={index === 0}
                          onError={() => handleImageError(index)}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      </div>

                      {/* Color accent */}
                      <div
                        className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30"
                        style={{ backgroundColor: service.color || '#10b981' }}
                      ></div>

                      {/* Decorative gradient */}
                      <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className=" bg-white p-8">
        <CallToAction />
      </section>



      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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

        @media (max-width: 640px) {
          h1, h2, h3 {
            line-height: 1.2 !important;
          }
          
          .text-xl {
            font-size: 1.125rem !important;
          }
          
          .h-\[400px\] {
            height: 300px !important;
          }
        }
      `}</style>
    </main>
  );
};

export default ServicesPage;