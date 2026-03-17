"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CallToAction from "../components/CallToAction";
import ChristmasLightingMap from "../components/ChristmasLightingMap";
import Link from "next/link";
import {
  FaArrowRight,
  FaShieldAlt,
  FaStar,
  FaClock,
  FaPhoneAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaPause,
  FaPlay,
  FaUser,
  FaEnvelope,
  FaHome,
  FaTree,
  FaCalendarAlt,
  FaSpinner,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCity,
  FaRoad,
  FaBuilding,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { GiFruitTree } from "react-icons/gi";

// Service areas data
const serviceAreas = [
  {
    id: 1,
    city: "Columbus",
    neighborhoods: [
      "Downtown",
      "German Village",
      "Victorian Village",
      "Italian Village",
      "Short North",
      "Arena District",
    ],
    image: "/images/columbus.jpg",
    icon: FaCity,
  },
  {
    id: 2,
    city: "Dublin",
    neighborhoods: [
      "Bridge Park",
      "Muirfield",
      "Tartan Fields",
      "Glacier Ridge",
      "Indian Run",
    ],
    image: "/images/dublin.jpg",
    icon: FaCity,
  },
  {
    id: 3,
    city: "Westerville",
    neighborhoods: [
      "Uptown",
      "Hoover Reservoir",
      "Medallion Estates",
      "Heritage Lakes",
      "The Lakes",
    ],
    image: "/images/westerville.jpg",
    icon: FaCity,
  },
  {
    id: 4,
    city: "Upper Arlington",
    neighborhoods: [
      "Kingswood",
      "Northam Park",
      "Arlington Woods",
      "Canterbury",
      "Old Arlington",
    ],
    image: "/images/upper-arlington.jpg",
    icon: FaCity,
  },
  {
    id: 5,
    city: "Hilliard",
    neighborhoods: [
      "Old Hilliard",
      "Hilliard Farms",
      "The Sanctuary",
      "Lakeside Estates",
      "Britton Farms",
    ],
    image: "/images/hilliard.jpg",
    icon: FaCity,
  },
  {
    id: 6,
    city: "Grove City",
    neighborhoods: [
      "Town Center",
      "Pinnacle",
      "Greenbrier",
      "Westbury",
      "Highland Park",
    ],
    image: "/images/grove-city.jpg",
    icon: FaCity,
  },
  {
    id: 7,
    city: "Worthington",
    neighborhoods: [
      "Old Worthington",
      "Worthington Hills",
      "Colonial Hills",
      "Wilson Hill",
      "Brookside",
    ],
    image: "/images/worthington.jpg",
    icon: FaCity,
  },
  {
    id: 8,
    city: "New Albany",
    neighborhoods: [
      "New Albany Country Club",
      "Lambton Park",
      "Hampsted Village",
      "Clivdon",
      "Fenway",
    ],
    image: "/images/new-albany.jpg",
    icon: FaCity,
  },
  {
    id: 9,
    city: "Delaware",
    neighborhoods: [
      "Downtown Delaware",
      "Highland Lakes",
      "Villages at Cheshire",
      "Oak Creek",
      "The Woods",
    ],
    image: "/images/delaware.jpg",
    icon: FaCity,
  },
];

const ServiceArea = () => {
  // State
  const [mounted, setMounted] = useState(false);
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
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    hearAbout: "",
    message: "",
  });

  // Service types
  const serviceTypes = [
    { value: "residential", label: "Residential Lighting" },
    { value: "commercial", label: "Commercial Lighting" },
    { value: "event", label: "Event Lighting" },
    { value: "maintenance", label: "Maintenance & Repair" },
  ];

  // Time slots
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  // Hear about options
  const hearOptions = [
    "Google Search",
    "Facebook",
    "Instagram",
    "Friend/Family Referral",
    "Previous Customer",
    "Radio Ad",
    "Other",
  ];

  // Smooth parallax effect
  useEffect(() => {
    let rafId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        targetX =
          ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8;
        targetY =
          ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8;
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
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Smooth scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        const progress = Math.min(scrollY / (heroHeight * 0.5), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        isModalOpen
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  // Focus first input
  useEffect(() => {
    if (isModalOpen && initialFocusRef.current) {
      setTimeout(() => {
        initialFocusRef.current.focus();
      }, 100);
    }
  }, [isModalOpen]);

  // Initial mount
  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  // Handle call click
  const handleCallClick = () => {
    window.location.href = "tel:+16143017100";
  };

  // Handle modal open
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
    setError("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      serviceType: "",
      preferredDate: "",
      preferredTime: "",
      hearAbout: "",
      message: "",
    });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
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

  // Handle wheel event for modal scrolling
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.stopPropagation();
      }
    }
  };

  if (!mounted) return null;

  return (
    <main className="overflow-x-hidden w-full bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center w-full overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="relative w-full h-full transition-transform duration-[50ms] ease-out will-change-transform"

          >
            <Image
              src="/images/hero-background2.jpg"
              alt="Service Area - Christmas Lights Over Columbus"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
        </div>

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-amber-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob-slow"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob-slow animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob-slow animation-delay-4000"></div>
        </div>

        {/* Scroll overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300"
          style={{ opacity: scrollProgress }}
        ></div>

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <HiOutlineSparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 text-sm font-medium tracking-wider">
                OUR SERVICE AREA
              </span>
            </div>

            <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              <span className="block animate-title-slide-up">
                CENTRAL OHIO{" "}
              </span>
              <span className="block relative animate-title-slide-up animation-delay-200">
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-red-400 bg-[length:200%_200%] animate-gradient-x">
                    SERVICE AREA
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-red-400/30 blur-3xl -z-10 scale-150"></span>
                </span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
              Proudly serving Columbus and surrounding communities with premium
              holiday lighting services
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
              <button
                onClick={handleCallClick}
                className="relative overflow-hidden group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <HiOutlineSparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Get My Free Quote</span>
                  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="">
        <ChristmasLightingMap />
      </section>

      {/* Service Areas Grid */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Communities We Serve
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              From bustling city centers to quiet suburban neighborhoods, we
              bring holiday cheer to homes and businesses throughout Central
              Ohio.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {/* Columbus Metro */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Columbus, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Dublin, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Delaware, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Marysville, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Powell, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Westerville, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                New Albany, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Johnstown, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Sunbury, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Pataskala, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Granville, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Newark, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Pickerington, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Canal Winchester, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Carroll, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Groveport, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Lockbourne, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Asheville, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Circleville, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Gahanna, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Grove City, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Blacklick, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Hilliard, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Lancaster, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Upper Arlington, OH
              </h3>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-4 text-center group border border-gray-100">
              <FaCity className="text-amber-500 text-xl sm:text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                Lewis Center, OH
              </h3>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 sm:px-6 py-2 sm:py-3">
              <FaBuilding className="text-amber-600 text-sm sm:text-base" />
              <span className="text-sm sm:text-base text-gray-700">
                Don't see your area?{" "}
                <button
                  onClick={handleOpenModal}
                  className="text-amber-600 font-semibold hover:underline"
                >
                  Contact us
                </button>{" "}
                - we may still serve you!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="sm:-mt-12 lg:-mt-24 sm:p-6 lg:p-12 bg-white">
        <CallToAction />
      </section>

      {/* Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-hidden">
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl transform transition-all duration-300 max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              aria-label="Close modal"
            >
              <FaTimes className="text-gray-600 w-3 h-3 sm:w-4 sm:h-4" />
            </button>

            {isSubmitted ? (
              <div className="p-6 sm:p-8 text-center overflow-y-auto min-h-[250px] sm:min-h-[300px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
                  <FaCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Consultation Scheduled!
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Thank you for scheduling a consultation. We'll contact you
                  within 24 hours to confirm your appointment.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 sm:p-6 flex-shrink-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <GiFruitTree className="text-white text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        Schedule Free Consultation
                      </h3>
                      <p className="text-emerald-100 text-xs sm:text-sm">
                        Christmas Lights Over Columbus
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto p-4 sm:p-6"
                  onWheel={handleWheel}
                  style={{ maxHeight: "calc(90vh - 120px)" }}
                >
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    {error && (
                      <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-xs sm:text-sm">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4 sm:space-y-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                          <FaUser className="inline mr-1.5 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Full Name *
                        </label>
                        <input
                          ref={initialFocusRef}
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm sm:text-base text-gray-900 bg-white placeholder-gray-400"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                          <FaEnvelope className="inline mr-1.5 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm sm:text-base text-gray-900 bg-white placeholder-gray-400"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                          <FaPhoneAlt className="inline mr-1.5 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm sm:text-base text-gray-900 bg-white placeholder-gray-400"
                          placeholder="(614) 555-0123"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                          <FaHome className="inline mr-1.5 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Service Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm sm:text-base text-gray-900 bg-white placeholder-gray-400"
                          placeholder="123 Main St, Columbus, OH 43215"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                          <FaTree className="inline mr-1.5 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Service Type *
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm sm:text-base text-gray-900 bg-white"
                        >
                          <option value="">Select a service type</option>
                          {serviceTypes.map((type) => (
                            <option
                              key={type.value}
                              value={type.value}
                              className="text-gray-900"
                            >
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                            <FaCalendarAlt className="inline mr-1.5 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                            Date *
                          </label>
                          <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-2 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-xs sm:text-base text-gray-900 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                            <FaClock className="inline mr-1.5 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                            Time *
                          </label>
                          <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            required
                            className="w-full px-2 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-xs sm:text-base text-gray-900 bg-white"
                          >
                            <option value="">Select</option>
                            {timeSlots.map((time) => (
                              <option
                                key={time}
                                value={time}
                                className="text-gray-900"
                              >
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                          How did you hear about us?
                        </label>
                        <select
                          name="hearAbout"
                          value={formData.hearAbout}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm sm:text-base text-gray-900 bg-white"
                        >
                          <option value="">Select an option</option>
                          {hearOptions.map((option) => (
                            <option
                              key={option}
                              value={option}
                              className="text-gray-900"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                          Additional Details (Optional)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm sm:text-base text-gray-900 bg-white placeholder-gray-400 resize-none"
                          placeholder="Tell us about your vision for your holiday display..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaSpinner className="animate-spin w-3 h-3 sm:w-4 sm:h-4" />
                          Scheduling...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                          Schedule Free Consultation
                        </span>
                      )}
                    </button>

                    <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-3 sm:mt-4">
                      By submitting, you agree to be contacted by Christmas
                      Lights Over Columbus.
                    </p>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes blob-slow {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(20px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-15px, 15px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob-slow {
          animation: blob-slow 15s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes title-slide-up {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-title-slide-up {
          animation: title-slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </main>
  );
};

export default ServiceArea;
