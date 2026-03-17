'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CallToAction from '../../components/CallToAction';
import {
    FaCheckCircle,
    FaArrowRight,
    FaShieldAlt,
    FaClock,
    FaStar,
    FaHome,
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
    FaQuoteLeft
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';


const ResidentialLightingPage = () => {
    const [mounted, setMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);
    const heroRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);

        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
            }
        };

        const handleScroll = () => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setScrollProgress(Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5))));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('scroll', handleScroll); };
    }, []);

    if (!mounted) return null;

    const service = {
        number: "01",
        title: "Residential Christmas Lighting",
        description: "Coming home to a beautifully lit house makes the holidays even more special. We design and install custom residential displays tailored to your home and your style. From design to professional installation, we handle everything – so you can skip the ladders and tangled lights.",
        longDescription: "Our residential lighting service transforms your home into a stunning holiday showcase. We start with a consultation to understand your vision, then create a custom design that highlights your home's architectural features. Our team handles every aspect of the installation, using only commercial-grade LED lights that are 3x brighter than store-bought options. Throughout the season, we provide ongoing maintenance to ensure your display stays perfect. When the holidays end, we return to carefully remove and store everything at our facility.",
        features: [
            "Gutter and roofline lighting",
            "Tree and shrub lighting",
            "Custom Design and Warrantied Installation",
            "Removal and Storage Included",
            "Commercial-grade C9 LED bulbs",
            "3x brighter than store-bought options"
        ],
        process: [
            { step: "Consultation", description: "We meet with you to understand your vision and assess your property." },
            { step: "Design", description: "Our designers create a custom lighting plan tailored to your home." },
            { step: "Installation", description: "Our professional team installs your display safely and efficiently." },
            { step: "Maintenance", description: "We monitor and maintain your display throughout the season." },
            { step: "Removal", description: "After the holidays, we carefully remove and store everything." }
        ],
        image: "/images/gallery3.jpg",
        color: "#10B981",

    };

    const features = [
        { icon: <FaHome className="w-6 h-6" />, title: "Roof & Gutter Lines", description: "Professional installation along rooflines and gutters for that classic holiday look" },
        { icon: <FaTree className="w-6 h-6" />, title: "Tree & Shrub Wrapping", description: "Beautifully wrapped trees and bushes to complete your landscape" },
        { icon: <FaLightbulb className="w-6 h-6" />, title: "Commercial Grade LEDs", description: "3x brighter than store-bought lights with better color consistency" },
        { icon: <FaTools className="w-6 h-6" />, title: "Professional Installation", description: "Licensed and insured team with years of holiday lighting experience" },
        { icon: <FaBoxOpen className="w-6 h-6" />, title: "Free Storage", description: "We store your lights after the season ends - no clutter in your garage" },
        { icon: <FaShieldAlt className="w-6 h-6" />, title: "Warranty Included", description: "Full warranty on all lights and installation throughout the season" }
    ];

    return (
        <main className="overflow-x-hidden w-full bg-white">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center w-full overflow-hidden">
                <div className="absolute inset-0">
                    <div className="relative w-full h-full transition-transform duration-200 ease-out" style={{ transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px) scale(1.05)` }}>
                        <Image src="/images/hero-background2.jpg" alt="Residential Christmas Lighting" fill className="object-cover" priority />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
                </div>

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`, backgroundSize: '50px 50px' }}></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300" style={{ opacity: scrollProgress }}></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
                            <HiOutlineSparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/90 text-sm font-medium tracking-wider">{service.number} • RESIDENTIAL</span>
                        </div>

                        <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
                            <span className="block animate-title-slide-up">Make your home stand </span>
                            <span className="block relative animate-title-slide-up animation-delay-200">
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400">
                                        out this holiday season
                                    </span>
                                </span>
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
                            {service.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animation-delay-600">
                            <a
                                href="tel:+16143017100"
                                className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer"
                            > Get Your Free Quote </a>
                        </div>


                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section id="details" className="py-16 sm:py-20 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="animate-fade-up">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5 mb-4">
                                    <GiSparkles className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-emerald-700 text-xs font-medium tracking-wider">OVERVIEW</span>
                                </div>

                                <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
                                    <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                                        Complete Residential Lighting
                                    </span>
                                </h2>

                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.longDescription}</p>



                            </div>

                            <div className="relative animate-fade-up animation-delay-200">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                    <Image src={service.image || "/images/placeholder.jpg"} alt={service.title} width={800} height={600} className="w-full h-full object-cover" unoptimized />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30" style={{ backgroundColor: service.color }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                                <GiSparkles className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-700 text-sm font-semibold">WHAT WE OFFER</span>
                            </div>
                            <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-4">
                                Complete Residential Lighting Services
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Professional installation with premium materials and full-service support from start to finish.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 lg:px-8 bg-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left Column - Content */}
                            <div className="order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                                    <FaAward className="w-4 h-4 text-emerald-600" />
                                    <span className="text-emerald-700 text-sm font-semibold">WHY CHOOSE US</span>
                                </div>

                                <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-gray-900 mb-6">
                                    Professional Quality, Personal Service
                                </h2>

                                <p className="text-gray-600 text-base sm:text-lg mb-8">
                                    We focus on delivering beautiful holiday lighting while making the entire process easy and hassle-free for you   </p>

                                <div className="space-y-4">
                                    {[
                                        (" 	Free Quotes"),
                                        (" 	Commercial grade LED lights custom fit to your home"),
                                        (" 	Maintenance & Take down"),
                                        (" 	Free storage in our climate-controlled facility"),
                                        (" 	Fully insured to protect your home and property")
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={() => window.location.href = 'tel:+16143017100'}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all text-sm sm:text-base"
                                    >
                                        Get Your Free Quote
                                        <FaArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Responsive Image Gallery */}
                            <div className="relative order-1 lg:order-2 mb-8 lg:mb-0 min-h-[300px] sm:min-h-[400px] md:min-h-[450px]">

                                {/* Main Image Container */}
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-[90%] sm:max-w-full">
                                    <div className="aspect-[4/3] w-full">
                                        <Image
                                            src="/images/gallery11.jpg"
                                            alt="Beautiful residential Christmas lighting installation"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>


                                </div>

                                {/* Responsive Overlapping Cards */}

                                {/* Bottom Left Card - Adjusted for mobile */}
                                <div className="absolute -bottom-4 sm:-bottom-8 -left-2 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/gallery12.jpg"
                                            alt="Professional lighting installation"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>

                                {/* Top Right Card - Adjusted for mobile */}
                                <div className="absolute -top-4 sm:-top-8 -right-2 sm:-right-8 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/images/gallery13.jpg"
                                            alt="Beautiful holiday lights display"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>



                                {/* Decorative Elements - Adjusted for responsiveness */}
                                <div className="absolute top-1/2 -right-6 sm:-right-12 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-emerald-200/30 rounded-full blur-xl sm:blur-2xl"></div>
                                <div className="absolute bottom-1/4 -left-6 sm:-left-12 w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 bg-red-200/30 rounded-full blur-xl sm:blur-2xl"></div>

                                {/* Sparkle Icons - Responsive sizing */}
                                <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-4 sm:right-6 md:right-8 lg:right-10 text-white">
                                    <GiSparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-pulse" />
                                </div>

                                <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-12 sm:left-16 md:left-20 text-white">
                                    <HiOutlineSparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse animation-delay-200" />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" p-8"> <CallToAction /></section>



            <style jsx global>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
        @keyframes titleSlideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .animate-blob { animation: blob 10s infinite }
        .animate-title-slide-up { animation: titleSlideUp 0.8s forwards; opacity:0 }
        .animate-fade-up { animation: fadeUp 0.6s forwards; opacity:0 }
        .animation-delay-200 { animation-delay:200ms }
        .animation-delay-400 { animation-delay:400ms }
        .animation-delay-600 { animation-delay:600ms }
        .animation-delay-800 { animation-delay:800ms }
        .animation-delay-2000 { animation-delay:2000ms }
      `}</style>
        </main>
    );
};

export default ResidentialLightingPage;