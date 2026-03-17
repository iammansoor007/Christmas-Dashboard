'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [treesReady, setTreesReady] = useState(false);
  const heroRef = useRef(null);
  const leftTreeRef = useRef(null);
  const rightTreeRef = useRef(null);

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        console.log('Fetching hero data...');
        const response = await fetch('/api/hero');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const heroData = await response.json();
        console.log('Hero data received:', heroData);

        if (!heroData || Object.keys(heroData).length === 0) {
          throw new Error('No hero data found');
        }

        setData({ hero: heroData });
        setError(null);
      } catch (error) {
        console.error('Error loading hero:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadHeroData();

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

  useEffect(() => {
    const checkTrees = () => {
      if (leftTreeRef.current && rightTreeRef.current) {
        setTreesReady(true);
      } else {
        setTimeout(checkTrees, 100);
      }
    };
    checkTrees();
  }, []);

  useEffect(() => {
    if (!treesReady) return;

    const handleScroll = () => {
      if (!heroRef.current || !leftTreeRef.current || !rightTreeRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (windowHeight * 0.8)));

      const scale = 1 - (progress * 0.35);
      const leftX = -25 * progress;
      const rightX = 25 * progress;
      const opacity = 1 - (progress * 0.15);

      leftTreeRef.current.style.transform = `scale(${scale}) translateX(${leftX}px)`;
      leftTreeRef.current.style.opacity = opacity;
      rightTreeRef.current.style.transform = `scale(${scale}) translateX(${rightX}px)`;
      rightTreeRef.current.style.opacity = opacity;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [treesReady]);

  const handleCTAClick = (e, link) => {
    if (!link) return;

    if (link.startsWith('#')) {
      e.preventDefault();
      const elementId = link.substring(1);
      console.log('Scrolling to element:', elementId);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Element not found:', elementId);
      }
    }
  };

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <GiSparkles className="absolute inset-0 m-auto text-3xl text-yellow-300 animate-pulse" />
        </div>
      </section>
    );
  }

  if (error || !data?.hero) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center text-white">
          <GiSparkles className="text-6xl text-yellow-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Failed to load content</h2>
          <p className="text-white/60">{error || 'Please check database connection'}</p>
        </div>
      </section>
    );
  }

  const { hero } = data;
  const backgroundImage = hero.backgroundImage || '/images/hero-background2.jpg';

  console.log('Rendering with background:', backgroundImage);
  console.log('CTA link:', hero.cta?.link);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#1a1f30] to-[#0a0f1e]"></div>

        {/* Background Image */}
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url("${backgroundImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
        </div>

        {/* Animated orbs */}
        <div className="absolute top-0 -left-4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Christmas Trees */}
      <div className="absolute bottom-0 left-0 z-40 pointer-events-none">
        <div
          ref={leftTreeRef}
          className="will-change-transform"
          style={{
            transformOrigin: 'bottom left',
            transform: 'scale(1) translateX(0px)',
            opacity: 1,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
          }}
        >
          <Image
            src="/images/leftbottom.png"
            alt="Christmas tree left"
            width={200}
            height={300}
            className="w-auto h-auto max-h-[180px] sm:max-h-[300px] md:max-h-[450px] lg:max-h-[600px] object-contain"
            priority
          />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-40 pointer-events-none">
        <div
          ref={rightTreeRef}
          className="will-change-transform"
          style={{
            transformOrigin: 'bottom right',
            transform: 'scale(1) translateX(0px)',
            opacity: 1,
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
          }}
        >
          <Image
            src="/images/rightbottom.png"
            alt="Christmas tree right"
            width={200}
            height={300}
            className="w-auto h-auto max-h-[180px] sm:max-h-[300px] md:max-h-[450px] lg:max-h-[600px] object-contain"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container relative z-30 max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Badge */}
          {hero.badge && hero.badge.text && (
            <div className="mb-4 animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-yellow-300 text-sm font-semibold border border-white/20">
                <GiSparkles className="w-4 h-4" />
                {hero.badge.text}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-montserrat font-extrabold text-5xl xs:text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 tracking-tight">
            <span className="block text-white/90 mb-1 sm:mb-2 animate-title-slide-up">
              {hero.title?.part1}
            </span>
            <span className="block relative animate-title-slide-up animation-delay-200">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-red-300 to-yellow-300 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
                  {hero.title?.part2}
                </span>
                <br />
                <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-red-300 to-yellow-300 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
                  {hero.title?.part3}
                </span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 animate-fade-up animation-delay-400">
            {hero.subtitle}
          </p>

          {/* CTA Button */}
          {hero.cta && hero.cta.subtext && (
            <div className="animate-fade-up animation-delay-800 w-full px-3 sm:px-0">
              {hero.cta.link ? (
                hero.cta.link.startsWith('http') ? (
                  <a
                    href={hero.cta.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                      <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      <span>{hero.cta.subtext}</span>
                      <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                ) : hero.cta.link.startsWith('/') ? (
                  <Link
                    href={hero.cta.link}
                    className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                      <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      <span>{hero.cta.subtext}</span>
                      <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={(e) => handleCTAClick(e, hero.cta.link)}
                    className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                      <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      <span>{hero.cta.subtext}</span>
                      <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                )
              ) : (
                <button
                  onClick={() => {
                    const element = document.getElementById('freequote');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                    <HiOutlineSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span>{hero.cta.subtext}</span>
                    <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes titleSlideUp {
          from { opacity: 0; transform: translateY(50px) scale(0.9); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-title-slide-up { animation: titleSlideUp 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) forwards; opacity: 0; }
        .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards; opacity: 0; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradientX 3s ease infinite; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .animation-delay-4000 { animation-delay: 4000ms; }
        .will-change-transform { will-change: transform, opacity; }
      `}</style>
    </section>
  );
};

export default Hero;