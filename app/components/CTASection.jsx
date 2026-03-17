// components/ChristmasCTA.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { getCTAData, getContactData } from "../services/dataService";

const ChristmasCTA = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bulbCount, setBulbCount] = useState(20);
  const [bulbSize, setBulbSize] = useState("18px");
  const [bulbHeight, setBulbHeight] = useState("24px");
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  // Get data
  const ctaData = getCTAData();
  const contactData = getContactData();

  const { title, description, button, socialProof } = ctaData;

  // Set responsive values
  useEffect(() => {
    const updateResponsiveValues = () => {
      if (typeof window !== "undefined") {
        setBulbCount(window.innerWidth < 768 ? 12 : 20);
        setBulbSize(window.innerWidth < 768 ? "14px" : "18px");
        setBulbHeight(window.innerWidth < 768 ? "18px" : "24px");
      }
    };

    updateResponsiveValues();
    window.addEventListener("resize", updateResponsiveValues);
    return () => window.removeEventListener("resize", updateResponsiveValues);
  }, []);

  // Generate bulbs with simple spark effect
  const generateBulbs = (inverted = false) => {
    const bulbs = [...Array(bulbCount)].map((_, i) => {
      const isRed = i % 2 === 0;
      const position = `${(i / Math.max(1, bulbCount - 1)) * 92 + 4}%`;

      return {
        id: i,
        position,
        isRed,
        color: isRed ? "#ff0000" : "#00ff00",
        baseColor: isRed ? "#dc2626" : "#059669",
      };
    });

    return (
      <div className="relative w-full h-full">
        {/* Wires connecting the bulbs */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 shadow-[0_0_8px_rgba(255,215,0,0.4)]" />

        {/* Wires between bulbs */}
        {bulbs.slice(0, -1).map((bulb, i) => (
          <div
            key={`wire-${i}-${inverted ? "bottom" : "top"}`}
            className="absolute h-[1px] bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-[0_0_4px_rgba(255,215,0,0.3)]"
            style={{
              top: "50%",
              left: bulb.position,
              right: `${100 - parseFloat(bulbs[i + 1].position)}%`,
              transform: "translateY(-50%)",
            }}
          />
        ))}

        {/* Bulbs */}
        {bulbs.map((bulb) => (
          <div
            key={`bulb-${bulb.id}-${inverted ? "bottom" : "top"}`}
            className={`absolute transform -translate-x-1/2 ${inverted ? "bottom-0" : "top-0"}`}
            style={{ left: bulb.position }}
          >
            {/* Bulb wire stem */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 ${inverted ? "top-full" : "bottom-full"} w-[2px]`}
              style={{ height: bulbHeight }}
            >
              <div className="w-full h-full bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-600" />
            </div>

            {/* Simple sparks around bulb */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Orbiting sparks */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={`orbit-${bulb.id}-${i}`}
                  className="absolute rounded-full spark-orbit"
                  style={{
                    width: "2px",
                    height: "2px",
                    background: bulb.isRed ? "#ff6b6b" : "#51cf66",
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}

              {/* Random floating sparks */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`float-${bulb.id}-${i}`}
                  className="absolute rounded-full spark-float"
                  style={{
                    width: "1px",
                    height: "1px",
                    background: bulb.isRed ? "#ff9999" : "#99ff99",
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>

            {/* Bulb container */}
            <div
              className={`modern-bulb ${bulb.isRed ? "red-bulb" : "green-bulb"} ${inverted ? "bulb-inverted" : ""}`}
              style={{
                width: bulbSize,
                height: bulbHeight,
              }}
            >
              {/* Bulb body with gradient */}
              <div className="absolute inset-0 rounded-full bulb-body" />

              {/* Bulb base */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-t-lg bulb-base" />

              {/* Bulb highlight */}
              <div className="bulb-highlight" />

              {/* Filament effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-gradient-to-t from-transparent via-yellow-300 to-transparent opacity-60" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Initialize background particles
  useEffect(() => {
    const initParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas || typeof window === "undefined") return;

      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const particleCount = window.innerWidth < 768 ? 80 : 150;
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        const isRed = Math.random() > 0.5;
        particlesRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * 1 + 0.5,
          speed: Math.random() * 0.8 + 0.2,
          color: isRed ? "#ff4444" : "#44ff44",
          alpha: Math.random() * 0.3 + 0.1,
        });
      }

      const animate = () => {
        if (!canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((particle) => {
          particle.y -= particle.speed;

          if (particle.y < -10) {
            particle.y = rect.height + 10;
            particle.x = Math.random() * rect.width;
          }

          ctx.save();
          ctx.translate(particle.x * dpr, particle.y * dpr);

          const gradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            particle.size * 1.5 * dpr,
          );
          gradient.addColorStop(
            0,
            `${particle.color}${Math.floor(particle.alpha * 255)
              .toString(16)
              .padStart(2, "0")}`,
          );
          gradient.addColorStop(1, `${particle.color}00`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * dpr, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
      setIsLoaded(true);

      const handleResize = () => {
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const dpr = window.devicePixelRatio || 1;
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          ctx.scale(dpr, dpr);
          initParticles();
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        window.removeEventListener("resize", handleResize);
      };
    };

    const timer = setTimeout(initParticles, 100);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Simple subtle glow */
        .modern-bulb {
          position: relative;
          border-radius: 50% 50% 40% 40%;
          transition: transform 0.3s ease;
          cursor: pointer;
          overflow: visible;
        }

        .bulb-inverted {
          border-radius: 40% 40% 50% 50%;
        }

        .bulb-body {
          background: radial-gradient(
            circle at 35% 35%,
            var(--bulb-color) 0%,
            var(--bulb-base-color) 60%,
            rgba(0, 0, 0, 0.8) 100%
          );
          box-shadow:
            inset 0 2px 4px rgba(255, 255, 255, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.3);
        }

        .bulb-base {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          background: linear-gradient(
            90deg,
            #4a5568,
            #2d3748,
            #4a5568
          ) !important;
        }

        .bulb-highlight {
          position: absolute;
          top: 20%;
          left: 20%;
          width: 20%;
          height: 20%;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.6) 0%,
            transparent 70%
          );
          border-radius: 50%;
        }

        /* Spark animations */
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(12px) rotate(0deg);
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) translateX(12px) rotate(-360deg);
            opacity: 0.6;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translate(5px, -5px) scale(1);
            opacity: 0.8;
          }
        }

        .spark-orbit {
          animation: orbit 3s linear infinite;
        }

        .spark-float {
          animation: float 2s ease-in-out infinite;
        }

        /* Position orbiting sparks */
        .spark-orbit:nth-child(1) {
          transform: rotate(0deg) translateX(12px);
        }
        .spark-orbit:nth-child(2) {
          transform: rotate(90deg) translateX(12px);
        }
        .spark-orbit:nth-child(3) {
          transform: rotate(180deg) translateX(12px);
        }
        .spark-orbit:nth-child(4) {
          transform: rotate(270deg) translateX(12px);
        }

        /* Position floating sparks randomly */
        .spark-float:nth-child(5) {
          left: -8px;
          top: 5px;
        }
        .spark-float:nth-child(6) {
          left: 6px;
          top: -10px;
        }
        .spark-float:nth-child(7) {
          left: -5px;
          top: -8px;
        }

        /* Hover effects */
        .modern-bulb:hover {
          transform: scale(1.1);
        }

        .modern-bulb:hover .spark-orbit {
          animation-duration: 1.5s;
        }

        .modern-bulb:hover .spark-float {
          animation-duration: 1s;
        }

        /* Red and green bulb colors */
        .red-bulb .bulb-body {
          --bulb-color: #ff0000;
          --bulb-base-color: #dc2626;
        }

        .green-bulb .bulb-body {
          --bulb-color: #00ff00;
          --bulb-base-color: #059669;
        }

        /* FIXED: IMPROVED TEXT GLOW EFFECTS */
        @keyframes textGlowEffect {
          0%,
          100% {
            text-shadow:
              0 0 5px rgba(255, 255, 255, 0.9),
              0 0 10px rgba(255, 255, 255, 0.7),
              0 0 15px rgba(255, 0, 0, 0.5),
              0 0 20px rgba(255, 0, 0, 0.3);
          }
          50% {
            text-shadow:
              0 0 8px rgba(255, 255, 255, 0.9),
              0 0 16px rgba(255, 255, 255, 0.7),
              0 0 24px rgba(255, 0, 0, 0.7),
              0 0 32px rgba(255, 0, 0, 0.5);
          }
        }

        @keyframes gradientGlowEffect {
          0%,
          100% {
            text-shadow:
              0 0 8px rgba(255, 0, 0, 0.8),
              0 0 16px rgba(255, 100, 100, 0.6),
              0 0 24px rgba(0, 255, 0, 0.4);
          }
          50% {
            text-shadow:
              0 0 12px rgba(255, 0, 0, 0.9),
              0 0 24px rgba(255, 100, 100, 0.8),
              0 0 36px rgba(0, 255, 0, 0.6);
          }
        }

        .text-glow-white {
          animation: textGlowEffect 3s ease-in-out infinite;
          color: #ffffff;
          font-weight: 900;
        }

        .text-glow-gradient {
          background: linear-gradient(
            90deg,
            #ff9797 0%,

            #ffffff 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation:
            gradientGlowEffect 4s ease-in-out infinite,
            gradientMove 6s linear infinite;
          font-weight: 900;
          letter-spacing: 0.5px;
        }

        @keyframes gradientMove {
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

        .text-glow-subtle {
          text-shadow:
            0 0 8px rgba(255, 255, 255, 0.4),
            0 0 16px rgba(255, 255, 255, 0.2);
          font-weight: 300;
        }

        /* Button glow */
        .button-glow {
          box-shadow:
            0 0 15px rgba(255, 0, 0, 0.6),
            0 0 30px rgba(255, 0, 0, 0.4),
            0 0 45px rgba(255, 0, 0, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .button-glow:hover {
          box-shadow:
            0 0 25px rgba(255, 0, 0, 0.8),
            0 0 50px rgba(255, 0, 0, 0.6),
            0 0 75px rgba(255, 0, 0, 0.4);
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .modern-bulb {
            border-radius: 50% 50% 35% 35%;
          }

          .bulb-inverted {
            border-radius: 35% 35% 50% 50%;
          }

          .text-glow-gradient {
            letter-spacing: 0.2px;
          }
        }
      `}</style>

      <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image - Using your original path */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/hero-background.jpg)",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/15 via-transparent to-green-900/15" />
        </div>

        {/* Particles Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full z-1 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Top Bulbs */}
        <div className="absolute top-0 left-0 right-0 z-10 h-16 sm:h-20 md:h-24">
          <div className="relative w-full h-full">{generateBulbs(false)}</div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 z-20 relative max-w-6xl py-8 sm:py-12 md:py-0">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Hero Headline - WITH FIXED GLOW EFFECTS */}
            <div
              className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 leading-tight">
                <span className="block text-glow-white mb-1 sm:mb-2">
                  {title.line1}
                </span>
                <span className="block text-glow-gradient">{title.line2}</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-light mb-4 sm:mb-6 max-w-lg sm:max-w-2xl mx-auto px-2 text-glow-subtle">
                {description}
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-1000 delay-800 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="/contact"
                  className="button-glow group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full shadow-lg sm:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px] sm:min-w-[220px] overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <span className="absolute inset-0 bg-red-500/20 blur-xl group-hover:bg-red-500/30 transition-all duration-500 rounded-full" />

                  <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-white">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {button}
                  </span>
                </a>

                {/* Social Proof */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/70 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 sm:-space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-red-400 to-green-400 border border-black"
                        />
                      ))}
                    </div>
                    <span>{socialProof.clients}</span>
                  </div>
                  <div className="hidden sm:block text-white/30">•</div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="text-yellow-400 text-sm sm:text-base"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span>{socialProof.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bulbs */}
        <div className="absolute bottom-0 left-0 right-0 z-10 h-16 sm:h-20 md:h-24">
          <div className="relative w-full h-full">{generateBulbs(true)}</div>
        </div>
      </section>
    </>
  );
};

export default ChristmasCTA;
