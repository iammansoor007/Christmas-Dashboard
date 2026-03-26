"use client";
import { useRef, useEffect, useState } from "react";
import CallToAction from "./CallToAction";
import {
  FaPhoneAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaQuoteRight,
  FaCalendarCheck,
  FaChair,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaHome,
  FaTree,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaStar
} from "react-icons/fa";
import { GiFruitTree } from "react-icons/gi";
import * as Icons from "react-icons/fa";

// Icon mapping
const iconMap = {
  FaQuoteRight,
  FaCalendarCheck,
  FaChair,
  FaStar,
  ...Icons
};

// Custom CheckCircle component
const CheckCircleIcon = ({ color, size = "text-sm", className = "" }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className={`${size} ${className}`}
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: color || undefined }}
  >
    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
  </svg>
);

// Safe icon component
const SafeIconComponent = ({ iconName, color, className }) => {
  const [isClient, setIsClient] = useState(false);
  const Icon = iconMap[iconName] || FaStar;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        className={`w-6 h-6 ${className} bg-gray-200 animate-pulse rounded`}
      />
    );
  }

  return <Icon className={className} style={{ color: color || undefined }} />;
};

// Consultation Modal Component (keep exactly as is)
const ConsultationModal = ({ isOpen, onClose }) => {
  // ... (keep your existing modal code exactly as it was in the working version)
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
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

  // Close on click outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Prevent scroll propagation
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (
        (scrollTop === 0 && e.deltaY < 0) ||
        (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)
      ) {
        e.preventDefault();
      } else {
        e.stopPropagation();
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

    try {
      const response = await fetch('/api/schedule-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
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
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM',
    '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Service types
  const serviceTypes = [
    { value: 'seasonal', label: 'Seasonal Christmas Lighting' },
    { value: 'permanent', label: 'Permanent Lighting Installation' },
    { value: 'commercial', label: 'Commercial Property' },
    { value: 'consultation', label: 'General Consultation' }
  ];

  // How did you hear about us
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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Modal Container - Centered */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl transform transition-all pointer-events-auto max-h-[90vh] flex flex-col"
          onWheel={handleWheel}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 shadow-md"
            aria-label="Close modal"
          >
            <FaTimes className="text-gray-600" />
          </button>

          {/* Success View */}
          {isSubmitted ? (
            <div className="p-8 text-center overflow-y-auto">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-t-3xl p-6 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
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
                className="flex-1 overflow-y-auto overscroll-contain p-6"
                style={{ maxHeight: 'calc(90vh - 120px)' }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaUser className="inline mr-2 text-emerald-600" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="(614) 555-0123"
                      />
                    </div>

                    {/* Address */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="123 Main St, Columbus, OH 43215"
                      />
                    </div>

                    {/* Service Type */}
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        {serviceTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <FaClock className="inline mr-2 text-emerald-600" />
                        Preferred Time *
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    {/* How did you hear about us */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How did you hear about us?
                      </label>
                      <select
                        name="hearAbout"
                        value={formData.hearAbout}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select an option</option>
                        {hearOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        placeholder="Tell us about your vision for your holiday display..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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

const HowWeWorkSection = ({ data: propData }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(propData || null);
  const [loading, setLoading] = useState(!propData);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    if (propData) {
      setData(propData);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/how-we-work');
        if (!response.ok) throw new Error('Failed to fetch');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [propData]);

  // Detect screen size
  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (loading) {
    return (
      <section className="w-full min-h-[600px] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 m-auto text-2xl text-amber-500 animate-pulse">✨</div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="w-full min-h-[600px] flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Failed to load content</p>
        </div>
      </section>
    );
  }

  const { badge, title, subtitle, steps, cta } = data;

  return (
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 min-w-[280px]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #e5e7eb 2px, transparent 2px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-1">
            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-white rounded-full shadow-sm mb-3 xs:mb-4 sm:mb-5 md:mb-6 border border-gray-100">
                <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-xs xs:text-sm font-medium text-gray-700 uppercase tracking-wide">
                  {badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h2 className="text-center font-montserrat text-4xl md:text-5xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                {title?.prefix} {title?.text}
              </span>
            </h2>

            {/* Subtitle */}
            {subtitle && (
              <p
                className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-2 xs:px-3 leading-relaxed text-center"
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />
            )}
          </div>

          {/* Steps Grid */}
          <div className="relative">
            {/* Connection Line - Desktop Only */}
            {!isMobile && isClient && (
              <div className="absolute top-1/2 left-0 right-0 h-0.5 md:h-1 -translate-y-1/2 hidden md:block">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 opacity-20" />
              </div>
            )}

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {steps?.map((step, index) => (
                <div key={index} className="relative group w-full">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 xs:-top-4 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg xs:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: step.color, color: "white" }}
                    >
                      <span className="text-xs xs:text-sm sm:text-base font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="relative h-full bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 shadow-md border border-gray-100 overflow-hidden flex flex-col">
                    {/* Top Border */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 xs:h-1.5"
                      style={{ backgroundColor: step.color }}
                    />

                    {/* Icon */}
                    <div className="flex justify-center mt-2 xs:mt-3 mb-3 xs:mb-4">
                      <div
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-md"
                        style={{
                          backgroundColor: `${step.color}15`,
                          color: step.color,
                        }}
                      >
                        <SafeIconComponent
                          iconName={step.icon}
                          color={step.color}
                          className="text-xl xs:text-2xl sm:text-3xl"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 text-center">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <div className="mb-3 xs:mb-4 flex-grow">
                      <p className="text-gray-600 text-xs xs:text-sm sm:text-sm md:text-base text-center">
                        {step.description}
                      </p>
                    </div>

                    {/* Features */}
                    {step.features && step.features.length > 0 && (
                      <div className="space-y-1.5 xs:space-y-2 mt-auto pt-2 xs:pt-3 border-t border-gray-100">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 xs:gap-2">
                            <div
                              className="flex-shrink-0 w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center mt-0.5"
                              style={{ backgroundColor: `${step.color}15` }}
                            >
                              <CheckCircleIcon
                                color={step.color}
                                className="text-xs"
                              />
                            </div>
                            <span className="text-gray-700 text-xs xs:text-xs sm:text-sm flex-1">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Decorative Corner */}
                    <div
                      className="absolute -bottom-4 -right-4 w-16 h-16 xs:w-20 xs:h-20 opacity-10"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          {cta && <CallToAction />}
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HowWeWorkSection;