"use client";
import React, { useState, useEffect } from "react";
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
  FaMedal,
  FaShieldAlt,
  FaClock,
  FaDollarSign,
  FaImage
} from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";

// Icon mapping
const iconMap = {
  FaCheckCircle, FaStar, FaMedal, FaShieldAlt, FaClock, FaDollarSign
};

const ModernQuoteForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    budget: "",
    notes: "",
    lightingAreas: {
      house: false,
      ground: false,
      trees: false,
      shrubs: false
    }
  });

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lighting areas with icons (static)
  const lightingAreas = [
    { id: "house", label: "House", emoji: "🏠" },
    { id: "ground", label: "Ground Lighting", emoji: "✨" },
    { id: "trees", label: "Trees", emoji: "🌲" },
    { id: "shrubs", label: "Shrubs / Bushes", emoji: "🌿" }
  ];

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/quote-form");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getIcon = (iconName) => {
    if (!iconName) return null;
    const Icon = iconMap[iconName];
    return Icon ? <Icon /> : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAreaChange = (areaId) => {
    setFormData(prev => ({
      ...prev,
      lightingAreas: {
        ...prev.lightingAreas,
        [areaId]: !prev.lightingAreas[areaId]
      }
    }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData, files);
    setIsSubmitted(true);
    setIsSubmitting(false);

    setFormData({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      budget: "",
      notes: "",
      lightingAreas: {
        house: false,
        ground: false,
        trees: false,
        shrubs: false
      }
    });
    setFiles([]);

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 px-3">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-600">Loading quote form...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 px-3">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-600">No form data found</div>
        </div>
      </div>
    );
  }

  const { badge, title, subtitle, submitButtonText, successMessage, fields, benefits, contactInfo } = data;

  return (
    <div id="freequote" className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 px-3 xs:p-4 sm:p-6 md:p-12 lg:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-red-600/10 rounded-full border border-amber-500/30 mb-4">
            <GiSparkles className="text-sm text-amber-500" />
            <span className="text-sm font-medium text-gray-800 uppercase">{badge || 'Get A Fast Quote'}</span>
          </div>

          <h1 className="text-2xl font-montserrat xs:text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {title || 'Get Your'}{' '}
            <span className="bg-gradient-to-r font-montserrat font-bold from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
              Fast
            </span>{' '}
            {title ? '' : 'Quote'}
          </h1>
          <p className="text-sm font-montserrat xs:text-base text-gray-600 max-w-2xl mx-auto px-2">
            {subtitle || "We are so excited to light up your property 🙂"}
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 p-4 xs:p-5 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-white text-lg xs:text-xl" />
              </div>
              <div>
                <h3 className="text-base xs:text-lg font-bold text-emerald-800">
                  Quote Request Sent!
                </h3>
                <p className="text-emerald-600 text-sm">
                  {successMessage || "We'll contact you within 24 hours with your custom quote."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 xs:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="p-4 xs:p-5 sm:p-6 bg-gradient-to-r from-red-600/5 via-amber-500/5 to-red-600/5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-r from-red-600 to-amber-500 rounded-lg flex items-center justify-center">
                    <FaQuoteRight className="text-white text-lg xs:text-xl" />
                  </div>
                  <div>
                    <h2 className="text-lg xs:text-xl font-bold text-gray-900">
                      Quote Details
                    </h2>
                    <p className="text-gray-600 text-xs xs:text-sm">
                      All fields marked * are required
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 xs:p-5 sm:p-6 space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      {fields?.firstName?.label || 'First Name'} {fields?.firstName?.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative group">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-500 transition-colors text-sm" />
                      <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        required={fields?.firstName?.required}
                        className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base text-gray-900 placeholder-gray-500"
                        placeholder={fields?.firstName?.placeholder || 'John'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      {fields?.lastName?.label || 'Last Name'} {fields?.lastName?.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative group">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-500 transition-colors text-sm" />
                      <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        required={fields?.lastName?.required}
                        className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base text-gray-900 placeholder-gray-500"
                        placeholder={fields?.lastName?.placeholder || 'Smith'}
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      {fields?.email?.label || 'Email'} {fields?.email?.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative group">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-500 transition-colors text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required={fields?.email?.required}
                        className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base text-gray-900 placeholder-gray-500"
                        placeholder={fields?.email?.placeholder || 'john@example.com'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      {fields?.phone?.label || 'Phone'} {fields?.phone?.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative group">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-500 transition-colors text-sm" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required={fields?.phone?.required}
                        className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base text-gray-900 placeholder-gray-500"
                        placeholder={fields?.phone?.placeholder || '(614) 301-7100'}
                      />
                    </div>
                  </div>
                </div>

                {/* Address & City */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      {fields?.address?.label || 'Address'} {fields?.address?.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative group">
                      <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-500 transition-colors text-sm" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required={fields?.address?.required}
                        className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base text-gray-900 placeholder-gray-500"
                        placeholder={fields?.address?.placeholder || '123 Main St'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">
                      {fields?.city?.label || 'City'} {fields?.city?.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative group">
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-500 transition-colors text-sm" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required={fields?.city?.required}
                        className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base text-gray-900 placeholder-gray-500"
                        placeholder={fields?.city?.placeholder || 'Columbus'}
                      />
                    </div>
                  </div>
                </div>

                {/* Budget Select */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    {fields?.budget?.label || 'Budget Range'} {fields?.budget?.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative group">
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-500 transition-colors text-sm z-10" />
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required={fields?.budget?.required}
                      className="w-full pl-10 pr-8 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base appearance-none text-gray-900"
                    >
                      <option value="">{fields?.budget?.placeholder || 'Select your budget...'}</option>
                      {fields?.budget?.options?.map((option, index) => (
                        <option key={index} value={option} className="text-gray-900">
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Lighting Areas */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-3">
                    {fields?.lightingAreas?.label || 'Select Areas To Be Lit Up'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {lightingAreas.map((area) => (
                      <div
                        key={area.id}
                        className={`relative group cursor-pointer transition-all duration-300`}
                        onClick={() => handleAreaChange(area.id)}
                      >
                        <div className={`p-3 sm:p-4 bg-gray-50 border-2 rounded-xl text-center transition-all duration-300 ${formData.lightingAreas[area.id]
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-200'
                          }`}>
                          <div className={`text-2xl sm:text-3xl mb-2 ${formData.lightingAreas[area.id] ? 'scale-110 text-amber-600' : 'text-gray-600'
                            } transition-transform`}>
                            {area.emoji}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-900 font-medium">
                            {area.label}
                          </p>
                          {formData.lightingAreas[area.id] && (
                            <div className="absolute top-1 right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                              <FaCheckCircle className="text-white text-xs" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    {fields?.notes?.label || 'Additional Notes'} {fields?.notes?.required && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    required={fields?.notes?.required}
                    rows="3"
                    className="w-full px-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base resize-none text-gray-900 placeholder-gray-500"
                    placeholder={fields?.notes?.placeholder || 'Please let us know any details you would like to share to help us create your quote...'}
                  />
                </div>

                {/* Photo Upload Section */}
                <div>
                  {fields?.fileUpload?.helperText && (
                    <p className="text-gray-700 text-sm mb-2 bg-amber-50 p-2 rounded-lg">
                      {fields.fileUpload.helperText}
                    </p>
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-all group"
                    >
                      <FaUpload className="text-gray-400 group-hover:text-amber-500 transition-colors" />
                      <span className="text-gray-900 text-sm">
                        {files.length > 0 ? `${files.length} file(s) selected` : (fields?.fileUpload?.placeholder || 'Click to upload photos')}
                      </span>
                    </label>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-gray-900 bg-gray-50 p-2 rounded">
                          <FaImage className="text-amber-500" />
                          <span className="truncate flex-1">{file.name}</span>
                          <span className="text-gray-600">
                            {(file.size / 1024).toFixed(0)}KB
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:from-red-500 hover:via-amber-400 hover:to-red-500 text-white font-semibold rounded-lg py-3 xs:py-3.5 px-4 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="relative flex items-center justify-center gap-2 xs:gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-sm xs:text-base">
                          Processing...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm xs:text-base font-bold">
                          {submitButtonText || 'Submit: Get My Lighting Quote'}
                        </span>
                        <FaArrowRight className="text-sm xs:text-base transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </button>

                {/* Form Footer */}
                <p className="text-center text-gray-500 text-xs xs:text-sm pt-2">
                  By submitting, you agree to our Privacy Policy. No obligation, free quote.
                </p>
              </form>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="hidden md:block space-y-6">
            {/* Benefits */}
            {benefits && benefits.length > 0 && (
              <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 p-4 xs:p-5 sm:p-6">
                <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-4">
                  What You Get
                </h3>
                <div className="space-y-3">
                  {benefits.map((item, index) => {
                    const Icon = iconMap[item.icon] || FaCheckCircle;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-white text-xs" />
                        </div>
                        <span className="text-sm xs:text-base font-medium text-gray-900">
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {contactInfo && (contactInfo.phone || contactInfo.email) && (
              <div className="bg-gradient-to-r from-red-600 to-amber-500 rounded-xl xs:rounded-2xl shadow-lg p-4 xs:p-5 sm:p-6 text-white">
                <h3 className="text-lg xs:text-xl font-bold text-white mb-3">
                  Need Immediate Help?
                </h3>
                <div className="space-y-3">
                  {contactInfo.phone && (
                    <a
                      href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                      className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
                    >
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaPhone className="text-sm xs:text-base text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-white/80">Call us {contactInfo.hours || '24/7'}</div>
                        <div className="text-base xs:text-lg font-bold text-white">
                          {contactInfo.phone}
                        </div>
                      </div>
                    </a>
                  )}
                  {contactInfo.email && (
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
                    >
                      <div className="w-8 h-8 xs:w-10 xs:h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaEnvelope className="text-sm xs:text-base text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-white/80">Email us</div>
                        <div className="text-sm xs:text-base font-bold text-white break-all">
                          {contactInfo.email}
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 374px) {
          input,
          select,
          textarea,
          button {
            font-size: 16px !important;
            min-height: 44px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @media screen and (max-width: 768px) {
          input,
          select,
          textarea {
            font-size: 16px;
          }
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px #f9fafb inset !important;
          box-shadow: 0 0 0px 1000px #f9fafb inset !important;
          -webkit-text-fill-color: #111827 !important;
          color: #111827 !important;
          background-color: #f9fafb !important;
        }
      `}</style>
    </div>
  );
};

export default ModernQuoteForm;