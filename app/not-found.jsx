"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaHome, FaSearch } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const NotFound = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = React.useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2) * 8;
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2) * 8;
                setMousePosition({ x, y });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <main className="overflow-x-hidden w-full bg-white">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-[90vh] flex items-center w-full overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="relative w-full h-full transition-transform duration-[50ms] ease-out will-change-transform"
                        style={{
                            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px) scale(1.05)`,
                        }}
                    >
                        <Image
                            src="/images/hero-background2.jpg"
                            alt="404 - Page Not Found"
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

                {/* Content */}
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
                            <HiOutlineSparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-white/90 text-sm font-medium tracking-wider">404 ERROR</span>
                        </div>

                        <h1 className="font-montserrat font-extrabold text-7xl sm:text-8xl md:text-9xl text-white mb-6 animate-title-slide-up">
                            404
                        </h1>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-up animation-delay-200">
                            Page Not Found
                        </h2>

                        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-up animation-delay-400">
                            Oops! The page you're looking for doesn't exist or has been moved.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <FaHome className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Back to Home</span>
                                <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                            >
                                <FaSearch className="w-4 h-4" />
                                <span>Browse Services</span>
                            </Link>
                        </div>

                        {/* Suggested Links */}
                        <div className="mt-12 pt-8 border-t border-white/20 animate-fade-up animation-delay-800">
                            <p className="text-white/70 text-sm mb-4">You might be looking for:</p>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <Link href="/services/residential-lighting" className="text-white/80 hover:text-white text-sm transition-colors">Residential Lighting</Link>
                                <span className="text-white/30">•</span>
                                <Link href="/services/commercial-lighting" className="text-white/80 hover:text-white text-sm transition-colors">Commercial Lighting</Link>
                                <span className="text-white/30">•</span>
                                <Link href="/services/permanent-lighting" className="text-white/80 hover:text-white text-sm transition-colors">Permanent Lighting</Link>
                                <span className="text-white/30">•</span>
                                <Link href="/gallery" className="text-white/80 hover:text-white text-sm transition-colors">Gallery</Link>
                                <span className="text-white/30">•</span>
                                <Link href="/contact" className="text-white/80 hover:text-white text-sm transition-colors">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @keyframes blob-slow {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob-slow { animation: blob-slow 15s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.8s ease-out forwards; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        @keyframes title-slide-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-title-slide-up { animation: title-slide-up 0.8s ease-out forwards; opacity: 0; }
      `}</style>
        </main>
    );
};

export default NotFound;