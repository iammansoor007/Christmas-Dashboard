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
    FaQuoteLeft,
    FaMobile,
    FaWifi,
    FaRegSun,
    FaRegMoon
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';


// Import images directly
import heroBackground from '../../../public/images/hero-background2.jpg';
import permenantdemo1 from '../../../public/images/permenantdemo1.jpg';
import permenantdemo2 from '../../../public/images/permenantdemo2.jpg';
import permenantdemo3 from '../../../public/images/permenantdemo3.jpg';

const PermanentLightingPage = () => {
    const [mounted, setMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        number: "03",
        title: "Permanent Holiday Lighting",
        description: "Upgrade your home with permanent lighting you can enjoy all year long. Custom systems perfect for everyday curb appeal, holidays, game days, and special occasions — all controlled right from your phone.",
        longDescription: "Imagine changing your home’s lighting for any occasion with a tap on your phone. Our permanent lighting systems are professionally installed once and designed to last for years. With customizable colors and lighting patterns, you can celebrate holidays, game days, and special events—or simply add elegant accent lighting to your home. Everything is weather-resistant, energy-efficient, and controlled from your smartphone.",
        features: [
            "Smartphone app control from anywhere",
            "Millions of colors and dynamic effects",
            "Weatherproof commercial-grade LEDs",
            "Virtually invisible when not illuminated",
            "Schedule automatic color changes",
            "Music sync and holiday presets"
        ],
        process: [
            { step: "Consultation", description: "We discuss your vision and identify the best locations for lighting." },
            { step: "Design", description: "We create a custom layout that enhances your home's architecture." },
            { step: "Installation", description: "Our team professionally installs the permanent system." },
            { step: "Setup", description: "We help you set up your app and create your first lighting scenes." },
            { step: "Enjoy", description: "Control your lights year-round for any occasion." }
        ],
        image: permenantdemo3, // Use imported image
        color: "#10B981"
    };

    const features = [
        { icon: <FaMobile className="w-6 h-6" />, title: "App Controlled", description: "Change colors and effects instantly from your smartphone" },
        { icon: <FaLightbulb className="w-6 h-6" />, title: "Color Customization", description: "Commerical grade LED permanent lighting system" },
        { icon: <FaRegSun className="w-6 h-6" />, title: "Weatherproof", description: "Built to withstand Ohio weather year-round" },
        { icon: <FaTools className="w-6 h-6" />, title: "Professional Installation", description: "Licensed and insured team with years of experience" },
        { icon: <FaWifi className="w-6 h-6" />, title: "WiFi Enabled", description: "Control from anywhere in the world" },
        { icon: <FaShieldAlt className="w-6 h-6" />, title: "Warranty Included", description: "Full warranty on all lights and installation" }
    ];

    return (
        <main className="overflow-x-hidden w-full bg-white">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center w-full overflow-hidden">
                <div className="absolute inset-0">
                    <div className="relative w-full h-full transition-transform duration-200 ease-out" style={{ transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px) scale(1.05)` }}>
                        <Image
                            src={heroBackground}
                            alt="Residential Christmas Lighting"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/15 via-gray-900/90 to-emerald-500/30"></div>
                </div>

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 -right-4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`, backgroundSize: '50px 50px' }}></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300" style={{ opacity: scrollProgress }}></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
                            <HiOutlineSparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/90 text-sm font-medium tracking-wider">{service.number} • PERMANENT</span>
                        </div>

                        <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
                            <span className="block animate-title-slide-up">Light Up Every</span>
                            <span className="block relative animate-title-slide-up animation-delay-200">
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400">
                                        Occasion, All Year Long
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
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5 mb-4">
                                    <GiSparkles className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-emerald-700 text-xs font-medium tracking-wider">OVERVIEW</span>
                                </div>

                                <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
                                    <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                                        Install Once. <br /> Enjoy Year-Round
                                    </span>
                                </h2>

                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.longDescription}</p>
                            </div>

                            <div className="relative animate-fade-up animation-delay-200">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30" style={{ backgroundColor: service.color }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                                <GiSparkles className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-700 text-sm font-semibold">WHAT WE OFFER</span>
                            </div>
                            <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-4">
                                Complete Permanent Lighting Services
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Professional installation with premium materials and full-service support.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
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

            {/* Why Choose Us Section */}
            <section className="py-12 lg:px-8 bg-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* Left Column - Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                                    <FaAward className="w-4 h-4 text-emerald-600" />
                                    <span className="text-emerald-700 text-sm font-semibold">WHY CHOOSE US</span>
                                </div>

                                <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-6">
                                    Professional Quality, Smart Technology
                                </h2>

                                <p className="text-gray-600 text-lg mb-8">
                                   InvisiLights’ customizable permanent lighting — invisible during the day, bright lights at night.
                                </p>

                                <div className="space-y-4">
                                    {[
                                       
                                        "Fully licensed, bonded, and insured for your protection",
                                        "Professional installation with discreet mounting",
                                        "Easy-to-use app with thousands of preset scenes",
                                        "Weatherproof connections rated for all seasons"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={() => window.location.href = 'tel:+16143017100'}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all"
                                    >
                                        Get Your Free Quote
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>

                            {/* Right Column - Image Gallery */}
                            <div className="relative">
                                {/* Main Image */}
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={permenantdemo2}
                                        alt="Professional smart lighting installation"
                                        width={600}
                                        height={400}
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                </div>

                                {/* Overlapping Image Cards */}
                                <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                                    <Image
                                        src={permenantdemo1}
                                        alt="Smart home lighting control"
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                                    <Image
                                        src={permenantdemo3}
                                        alt="Weatherproof LED lighting"
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute top-1/2 -right-12 w-24 h-24 bg-emerald-200/30 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-1/4 -left-12 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl"></div>

                                {/* Sparkle Icons */}
                                <div className="absolute top-10 right-10 text-white">
                                    <GiSparkles className="w-6 h-6 animate-pulse" />
                                </div>
                                <div className="absolute bottom-20 left-20 text-white">
                                    <HiOutlineSparkles className="w-4 h-4 animate-pulse animation-delay-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-8">
                <CallToAction />
            </section>

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

export default PermanentLightingPage;