"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CallToAction from "../components/CallToAction";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaTree,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteRight,
  FaMapMarkerAlt,
  FaUpload,
  FaStar,
  FaClock,
  FaDollarSign,
  FaImage,
  FaTimes,
  FaSpinner,
  FaCalendarAlt,
  FaPhoneAlt
} from "react-icons/fa";
import { GiSparkles, GiFruitTree } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
import * as Icons from "react-icons/fa";

const getIcon = (iconName) => {
  if (!iconName) return null;
  return Icons[iconName] || null;
};

const ContactPage = () => {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const heroRef = useRef(null);
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const initialFocusRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    fname: "", lname: "", email: "", phone: "", address: "", city: "",
    budget: "", notes: "", lightingAreas: { house: false, ground: false, trees: false, shrubs: false }
  });
  const [files, setFiles] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/contact-page");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  // Smooth parallax effect
  useEffect(() => {
    let rafId;
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0;

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        targetX = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8;
        targetY = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8;
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMousePosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        setScrollProgress(Math.min(scrollY / (heroHeight * 0.5), 1));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isModalOpen) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Focus first input
  useEffect(() => {
    if (isModalOpen && initialFocusRef.current) {
      setTimeout(() => initialFocusRef.current.focus(), 100);
    }
  }, [isModalOpen]);

  // Handle modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
    setError("");
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAreaChange = (areaId) => {
    setFormData(prev => ({
      ...prev,
      lightingAreas: { ...prev.lightingAreas, [areaId]: !prev.lightingAreas[areaId] }
    }));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData, files);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (!mounted || loading) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  const { hero, form, benefits, contactInfo, map } = data;
  const lightingAreas = form?.lightingAreas || [
    { id: "house", label: "House", emoji: "🏠" },
    { id: "ground", label: "Ground Lighting", emoji: "✨" },
    { id: "trees", label: "Trees", emoji: "🌲" },
    { id: "shrubs", label: "Shrubs / Bushes", emoji: "🌿" }
  ];

  return (
    <main className="overflow-x-hidden w-full bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full transition-transform duration-[50ms] ease-out will-change-transform">
            <Image
              src={hero?.backgroundImage || "/images/hero-background2.jpg"}
              alt="Contact Us"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-amber-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob-slow"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob-slow animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob-slow animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300" style={{ opacity: scrollProgress }}></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <HiOutlineSparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 text-sm font-medium tracking-wider">{hero?.badge || 'CONTACT US'}</span>
            </div>

            <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              <span className="block animate-title-slide-up">{hero?.title?.line1 || 'GET IN TOUCH'}</span>
              <span className="block relative animate-title-slide-up animation-delay-200">
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-red-400 bg-[length:200%_200%] animate-gradient-x">
                    {hero?.title?.line2 || 'WITH US'}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-red-400/30 blur-3xl -z-10 scale-150"></span>
                </span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
              {hero?.subtitle || 'We\'d love to hear from you. Fill out the form below and we\'ll get back to you within 24 hours.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-red-600/5 via-amber-500/5 to-red-600/5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-amber-500 rounded-lg flex items-center justify-center">
                      <FaQuoteRight className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{form?.badge || 'Get A Fast Quote'}</h2>
                      <p className="text-gray-600 text-sm">* Required fields</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                      <input type="text" name="fname" value={formData.fname} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                      <input type="text" name="lname" value={formData.lname} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none" placeholder="Smith" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none" placeholder="(614) 301-7100" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Address *</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none" placeholder="123 Main St" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none" placeholder="Columbus" />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget Range *</label>
                    <div className="relative">
                      <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10" />
                      <select name="budget" value={formData.budget} onChange={handleChange} required className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none appearance-none">
                        <option value="">Select your budget...</option>
                        {form?.budgetOptions?.map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Lighting Areas */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Areas To Be Lit Up</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {lightingAreas.map((area) => (
                        <div key={area.id} onClick={() => handleAreaChange(area.id)} className={`relative p-3 sm:p-4 bg-gray-50 border-2 rounded-xl text-center cursor-pointer transition-colors ${formData.lightingAreas[area.id] ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-200'}`}>
                          <div className={`text-2xl sm:text-3xl mb-2 ${formData.lightingAreas[area.id] ? 'scale-110 text-amber-600' : 'text-gray-600'}`}>{area.emoji}</div>
                          <p className="text-xs sm:text-sm text-gray-900 font-medium">{area.label}</p>
                          {formData.lightingAreas[area.id] && <div className="absolute top-1 right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center"><FaCheckCircle className="text-white text-xs" /></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none resize-none" placeholder="Any details to help create your quote..." />
                  </div>

                  {/* File Upload */}
                  <div>
                    <p className="text-gray-700 text-sm mb-2 bg-amber-50 p-2 rounded-lg">Upload a front-facing photo for faster quotes 🙂</p>
                    <div>
                      <input type="file" id="file-upload" onChange={handleFileChange} multiple accept="image/*" className="hidden" />
                      <label htmlFor="file-upload" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500">
                        <FaUpload className="text-gray-400" />
                        <span className="text-gray-900 text-sm">{files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload photos'}</span>
                      </label>
                      {files.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {files.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-gray-900 bg-gray-50 p-2 rounded">
                              <FaImage className="text-amber-500 flex-shrink-0" />
                              <span className="truncate">{file.name}</span>
                              <span className="text-gray-600 flex-shrink-0">{(file.size / 1024).toFixed(0)}KB</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:from-red-500 hover:via-amber-400 hover:to-red-500 text-white font-semibold rounded-lg py-3.5 px-4 shadow-lg active:scale-[0.98] transition-all disabled:opacity-70">
                    <div className="flex items-center justify-center gap-2">
                      {isSubmitting ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Processing...</span></> : <><span className="font-bold">{form?.submitButtonText || 'Get My Lighting Quote'}</span><FaArrowRight className="text-sm" /></>}
                    </div>
                  </button>

                  <p className="text-center text-gray-500 text-xs sm:text-sm">By submitting, you agree to our Privacy Policy.</p>
                </form>
              </div>
            </div>

            {/* Benefits & Contact Info */}
            <div className="space-y-6">
              {/* Benefits */}
              {benefits && benefits.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What You Get</h3>
                  <div className="space-y-3">
                    {benefits.map((benefit, idx) => {
                      const Icon = getIcon(benefit.icon);
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                            {Icon && <Icon className="text-white text-xs" />}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{benefit.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo?.phone && (
                    <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="flex items-center gap-3 hover:opacity-90">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><FaPhoneAlt className="text-white" /></div>
                      <div><div className="text-xs text-white/80">Call us {contactInfo.hours || '24/7'}</div><div className="font-bold">{contactInfo.phone}</div></div>
                    </a>
                  )}
                  {contactInfo?.email && (
                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 hover:opacity-90">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><FaEnvelope className="text-white" /></div>
                      <div><div className="text-xs text-white/80">Email us</div><div className="font-bold break-all">{contactInfo.email}</div></div>
                    </a>
                  )}
                  {contactInfo?.address && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0"><FaMapMarkerAlt className="text-white" /></div>
                      <div><div className="text-xs text-white/80">Visit us</div><div className="text-sm font-bold">{contactInfo.address}</div></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white p-8">
        <CallToAction />
      </section>

      <style jsx global>{`
        @keyframes blob-slow { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(20px, -30px) scale(1.05); } 66% { transform: translate(-15px, 15px) scale(0.95); } 100% { transform: translate(0px, 0px) scale(1); } }
        .animate-blob-slow { animation: blob-slow 15s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes fade-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 0.8s ease-out forwards; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        @keyframes title-slide-up { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-title-slide-up { animation: title-slide-up 0.8s ease-out forwards; opacity: 0; }
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
      `}</style>
    </main>
  );
};

export default ContactPage;