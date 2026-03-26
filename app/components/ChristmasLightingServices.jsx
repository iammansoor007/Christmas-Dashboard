"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaLightbulb
} from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import * as Icons from "react-icons/fa";

const AwardWinningServicesSection = ({ data: propData }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [services, setServices] = useState([]);
  const [sectionData, setSectionData] = useState(propData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const loadContent = async () => {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            
            console.log('Data loaded:', data);
            // Check if data is array or object
            if (Array.isArray(data)) {
              // New API returns array of services
              setServices(data.filter(s => s.status === 'published' && s.showOnHomepage === true));
              if (!propData) {
                  setSectionData({
                    badge: "Premium Services",
                    title: { prefix: "Premium", text: "Christmas Lighting" },
                    subtitle: "Custom holiday lighting designed to make your home stand out.",
                    buttons: { primary: "View All Services" }
                  });
              }
            } else if (data && data.items) {
              // Old API structure
              setServices(data.items.filter(s => s.status === 'published' && s.showOnHomepage !== false));
              if (!propData) {
                  setSectionData({
                    badge: data.badge,
                    title: data.title,
                    subtitle: data.subtitle,
                    buttons: data.buttons
                  });
              }
            }
            setLoading(false);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    loadContent();
  }, [propData]);

  const getIcon = (iconName) => {
    if (!iconName) return FaStar;
    return Icons[iconName] || FaStar;
  };

  // Fixed positions for floating lights
  const floatingLights = [
    { left: 5, top: 10, color: '#f59e0b' },
    { left: 15, top: 25, color: '#ef4444' },
    { left: 25, top: 40, color: '#10b981' },
    { left: 35, top: 55, color: '#f59e0b' },
    { left: 45, top: 70, color: '#ef4444' },
    { left: 55, top: 85, color: '#10b981' },
    { left: 65, top: 15, color: '#f59e0b' },
    { left: 75, top: 30, color: '#ef4444' },
    { left: 85, top: 45, color: '#10b981' },
    { left: 95, top: 60, color: '#f59e0b' },
    { left: 10, top: 75, color: '#ef4444' },
    { left: 20, top: 90, color: '#10b981' },
    { left: 30, top: 5, color: '#f59e0b' },
    { left: 40, top: 20, color: '#ef4444' },
    { left: 50, top: 35, color: '#10b981' },
  ];

  const animationDelays = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8];
  const animationDurations = [4, 5, 6, 7, 8, 4, 5, 6, 7, 8, 4, 5, 6, 7, 8];

  if (loading) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center bg-white">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          <GiSparkles className="absolute inset-0 m-auto text-3xl text-amber-500 animate-pulse" />
        </div>
      </section>
    );
  }

  if (error || !services || services.length === 0) {
    return (
      <section className="relative w-full py-20 flex items-center justify-center bg-white">
        <div className="text-center">
          <GiSparkles className="text-6xl text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No services available</h2>
          <p className="text-gray-600">Please add services from the admin panel.</p>
        </div>
      </section>
    );
  }

  const { badge, title, subtitle, buttons } = sectionData;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-8 xl:py-6"
    >
      {/* Light theme background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#fcd34d20_1px,transparent_1px)] bg-[length:24px_24px] xs:bg-[length:28px_28px] sm:bg-[length:32px_32px]" />
        <div className="absolute top-0 left-0 right-0 h-32 xs:h-40 sm:h-48 lg:h-64 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 xs:h-40 sm:h-48 lg:h-64 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Decorative light elements */}
      <div className="absolute top-20 left-5 xs:left-10 w-40 xs:w-56 sm:w-72 lg:w-96 h-40 xs:h-56 sm:h-72 lg:h-96 bg-amber-200/30 rounded-full blur-2xl xs:blur-3xl" />
      <div className="absolute bottom-20 right-5 xs:right-10 w-48 xs:w-64 sm:w-80 lg:w-[500px] h-48 xs:h-64 sm:h-80 lg:h-[500px] bg-red-200/30 rounded-full blur-2xl xs:blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] xs:w-[350px] sm:w-[400px] lg:w-[500px] h-[280px] xs:h-[350px] sm:h-[400px] lg:h-[500px] bg-gradient-to-r from-amber-100/30 to-red-100/30 rounded-full blur-2xl xs:blur-3xl" />

      {/* Floating Christmas lights */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingLights.map((light, i) => (
            <div
              key={i}
              className="absolute w-1 xs:w-1.5 h-1 xs:h-1.5 rounded-full"
              style={{
                left: `${light.left}%`,
                top: `${light.top}%`,
                background: light.color,
                opacity: 0.2,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-14 lg:mb-16 xl:mb-20">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
              <GiSparkles className="text-amber-500" />
              <span className="text-sm font-semibold text-amber-700">{badge}</span>
            </div>
          )}

          <h2 className="text-center font-montserrat text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
              {title?.prefix} {title?.text}
            </span>
          </h2>

          <p className="text-gray-600 font-montserrat text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto leading-relaxed font-light px-3 xs:px-4">
            <span className="font-bold">{subtitle}</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 xl:gap-10">
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon);

            return (
              <Link
                href={service.ctaLink || `/services/${service.slug}`}
                key={service._id || index}
                className="block group"
              >
                <div className="relative bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg xs:shadow-xl overflow-hidden border border-gray-100 h-full min-h-[380px] xs:min-h-[400px] sm:min-h-[420px] lg:min-h-[440px] xl:min-h-[460px] flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Top color bar */}
                  <div
                    className="h-1 xs:h-1.5 sm:h-2 w-full flex-shrink-0"
                    style={{ backgroundColor: service.color }}
                  />

                  {/* Image + Content row */}
                  <div className="flex flex-col sm:flex-row flex-1">
                    {/* Image section */}
                    {service.mainImage && (
                      <div className="sm:w-2/5 w-full">
                        <div className="relative w-full h-48 xs:h-52 sm:h-full min-h-[180px] sm:min-h-full overflow-hidden">
                          <img
                            src={service.mainImage}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                      </div>
                    )}

                    {/* Content section */}
                    <div className="flex-1 p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-8 overflow-y-auto">
                      {/* Icon and title row */}
                      <div className="flex items-start gap-2 xs:gap-3 sm:gap-4 mb-2 xs:mb-3 sm:mb-4">
                        <div
                          className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 rounded-lg xs:rounded-xl flex items-center justify-center text-sm xs:text-base sm:text-lg shadow-md xs:shadow-lg flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${service.color}15, white)`,
                            color: service.color,
                            boxShadow: `0 5px 10px -5px ${service.color}80`
                          }}
                        >
                          <IconComponent />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 leading-tight">
                            {service.title}
                          </h3>
                        </div>

                        <span
                          className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-4xl font-black opacity-10 flex-shrink-0"
                          style={{ color: service.color }}
                        >
                          {service.number}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-xs xs:text-sm sm:text-base mb-2 xs:mb-3 sm:mb-4 leading-relaxed">
                        {service.shortDescription}
                      </p>

                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2 mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-1 xs:gap-1.5 sm:gap-2"
                            >
                              <FaCheckCircle
                                className="text-xs xs:text-sm sm:text-base flex-shrink-0"
                                style={{ color: service.color }}
                              />
                              <span className="text-gray-700 text-xs xs:text-sm sm:text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA Button */}
                      <div
                        className="relative w-full overflow-hidden rounded-lg xs:rounded-xl font-semibold text-xs xs:text-sm sm:text-base py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 transition-all hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}10, ${service.color}20)`,
                          color: service.color,
                          border: `1px solid ${service.color}30`
                        }}
                      >
                        <span>{service.ctaText || "View Details"}</span>
                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 xs:mt-10 sm:mt-12 lg:mt-14 xl:mt-16 text-center">
          <Link href="/services">
            <div className="group relative px-4 xs:px-6 sm:px-8 lg:px-10 py-2 xs:py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-amber-500 to-red-500 rounded-lg xs:rounded-xl text-white font-bold text-xs xs:text-sm sm:text-base lg:text-lg shadow-md xs:shadow-lg lg:shadow-xl cursor-pointer inline-flex items-center hover:scale-105 transition-transform">
              <span className="relative z-10 flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                <FaLightbulb className="text-yellow-200 text-xs xs:text-sm sm:text-base" />
                <span>{buttons?.primary || "View All Services"}</span>
                <FaStar className="text-yellow-200 text-xs xs:text-sm sm:text-base" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AwardWinningServicesSection;