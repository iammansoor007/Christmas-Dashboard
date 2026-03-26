"use client";
import { useState, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { BsPinterest, BsFillTelephoneFill } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";
import * as Icons from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [lightPositions, setLightPositions] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/footer");
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

  useEffect(() => {
    // Generate fewer lights for better performance on small screens
    const positions = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? "#FFD700" : "#FF0000",
      animationDelay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setLightPositions(positions);
  }, []);

  // Icon mapping
  const getIcon = (iconName) => {
    if (!iconName) return FaFacebookF;
    return Icons[iconName] || FaFacebookF;
  };

  if (loading) {
    return (
      <footer className="bg-dark-navy border-t border-holiday-red/30 relative overflow-hidden">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-white text-base px-4">Loading footer...</div>
        </div>
      </footer>
    );
  }

  if (!data) {
    return (
      <footer className="bg-dark-navy border-t border-holiday-red/30 relative overflow-hidden">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-white text-base px-4">No footer data found</div>
        </div>
      </footer>
    );
  }

  const {
    companyName,
    year = currentYear,
    logo,
    contact,
    socialMedia,
    links,
    navItems,
    certifications,
    copyrightText,
    designedBy
  } = data;

  return (
    <footer className="bg-dark-navy border-t border-holiday-red/30 relative overflow-hidden">
      {/* Background Pattern - Optimized for mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-navy via-dark-navy to-dark-navy/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-holiday-red/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-holiday-gold/5 via-transparent to-transparent"></div>

        {/* Christmas Lights - Hidden on very small screens for performance */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
          {lightPositions.length > 0 &&
            lightPositions.map((light) => (
              <div
                key={`light-${light.id}`}
                className="absolute rounded-full"
                style={{
                  left: light.left,
                  top: light.top,
                  width: "4px",
                  height: "4px",
                  background: `radial-gradient(circle, ${light.color} 40%, transparent 70%)`,
                  filter: "blur(1px)",
                  animationName: "twinkle",
                  animationDuration: light.duration,
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: light.animationDelay,
                }}
              />
            ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full mx-auto px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:px-16 2xl:px-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-16">
          {/* Column 1: Brand Column - Logo only */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
              {logo ? (
                <Image
                  src={logo}
                  alt={`${companyName} Logo`}
                  width={144}
                  height={144}
                  className="object-contain w-full h-full"
                  priority={false}
                  onError={(e) => {
                    const target = e.target;
                    target.onerror = null;
                    target.style.display = "none";
                    target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-dark-navy rounded-xl border border-holiday-gold/20">
                        <div class="text-center">
                          <div class="text-2xl sm:text-3xl font-bold text-white">${companyName?.charAt(0) || 'LH'}</div>
                          <div class="text-xs sm:text-sm text-white/70">Logo</div>
                        </div>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-dark-navy rounded-xl border border-holiday-gold/20">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white">{companyName?.charAt(0) || 'LH'}</div>
                    <div className="text-xs sm:text-sm text-white/70">Logo</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Links/Services Column */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {/* Navigation links from Navbar Editor */}

              {links && Object.entries(links).map(([category, linkItems]) => (
                <div key={`category-${category}`} className="col-span-1">
                  <h4 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-3 pb-2 border-b border-holiday-gold/20 relative">
                    <span>{category}</span>
                    <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold"></div>
                  </h4>
                  <ul className="space-y-2">
                    {linkItems?.map((link, idx) => (
                      <li key={`link-${category}-${idx}`}>
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-holiday-gold transition-all duration-200 flex items-center group text-sm sm:text-base hover:pl-2"
                        >
                          <span className="w-1.5 h-0.5 bg-gradient-to-r from-holiday-red to-holiday-gold opacity-0 group-hover:opacity-100 mr-2 transition-all duration-200"></span>
                          <span className="break-words">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Get in Touch Column */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-4 text-center lg:text-left">
              Get in Touch
            </h3>
            <div className="space-y-4">
              {contact?.phone && (
                <div className="flex items-center space-x-3 text-white/80 group hover:text-white transition-colors duration-200">
                  <BsFillTelephoneFill className="text-holiday-gold flex-shrink-0 text-base sm:text-lg" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm sm:text-base break-words">
                      {contact.phone}
                    </div>
                    {contact?.hours && (
                      <div className="text-xs sm:text-sm text-white/60">
                        {contact.hours}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {contact?.email && (
                <div className="flex items-center space-x-3 text-white/80 group hover:text-white transition-colors duration-200">
                  <FaEnvelope className="text-holiday-red flex-shrink-0 text-base sm:text-lg" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm sm:text-base break-words">
                      {contact.email}
                    </div>
                    {contact?.support && (
                      <div className="text-xs sm:text-sm text-white/60">
                        {contact.support}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 lg:pt-12 border-t border-holiday-red/20">
          {/* Social Media */}
          {socialMedia && socialMedia.length > 0 && (
            <div className="mb-6">
              <h4 className="text-white font-semibold text-base sm:text-lg mb-3 text-center lg:text-left">
                Follow Our Journey
              </h4>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {socialMedia.map((social) => {
                  const IconComponent = getIcon(social.icon);
                  return (
                    <a
                      key={social.key || social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg border border-holiday-gold/30 bg-dark-navy/50 backdrop-blur-sm text-holiday-gold hover:bg-gradient-to-r hover:from-holiday-red hover:via-holiday-gold hover:to-holiday-red hover:text-dark-navy transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-holiday-gold/20 text-sm sm:text-base"
                      aria-label={social.label}
                    >
                      <IconComponent />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-white/60 text-sm sm:text-base">
                © {year || currentYear} {companyName}. {copyrightText || 'All rights reserved.'}
                {designedBy?.name && (
                  <> Designed by{" "}
                    <a
                      href={designedBy.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-white transition-colors duration-300 font-medium hover:underline underline-offset-2"
                    >
                      {designedBy.name}
                    </a>
                    .</>
                )}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-holiday-gold transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-holiday-red transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Certifications */}
          {certifications && (
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-white/40 text-xs sm:text-sm px-4">
                {certifications}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        /* Responsive adjustments */
        @media (min-width: 300px) and (max-width: 399px) {
          .w-full {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
          .text-sm {
            font-size: 0.8125rem !important;
          }
          .text-base {
            font-size: 0.875rem !important;
          }
          .text-lg {
            font-size: 1rem !important;
          }
          .w-10, .h-10 {
            width: 2.25rem !important;
            height: 2.25rem !important;
          }
        }

        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Optimize hover effects for mobile */
        @media (max-width: 768px) {
          a:hover,
          button:hover {
            filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.15));
          }
        }
      `}</style>
    </footer>
  );
};

export default memo(Footer);