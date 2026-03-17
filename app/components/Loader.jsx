'use client'

import { useEffect, useState } from 'react'
import { GiSparkles, GiCandyCanes, GiFruitTree, GiStarShuriken, GiChristmasTree } from 'react-icons/gi'
import { FaSnowflake, FaStar, FaRegSnowflake } from 'react-icons/fa'

// Pre-defined positions to avoid hydration errors
const SPARKLE_POSITIONS = [
  { top: 10, left: 15, delay: 0, duration: 2 },
  { top: 25, left: 80, delay: 0.5, duration: 2.5 },
  { top: 40, left: 45, delay: 1, duration: 1.8 },
  { top: 55, left: 70, delay: 1.5, duration: 2.2 },
  { top: 70, left: 25, delay: 2, duration: 2.7 },
  { top: 85, left: 90, delay: 2.5, duration: 2.4 },
  { top: 15, left: 35, delay: 3, duration: 2.1 },
  { top: 45, left: 60, delay: 3.5, duration: 2.3 },
  { top: 65, left: 10, delay: 4, duration: 2.6 },
  { top: 80, left: 50, delay: 4.5, duration: 2.9 },
]

const LIGHT_POSITIONS = [
  { top: 5, left: 20, color: 'red' },
  { top: 15, left: 85, color: 'amber' },
  { top: 30, left: 40, color: 'emerald' },
  { top: 45, left: 75, color: 'red' },
  { top: 60, left: 15, color: 'amber' },
  { top: 75, left: 65, color: 'emerald' },
  { top: 90, left: 30, color: 'red' },
  { top: 20, left: 95, color: 'amber' },
  { top: 50, left: 55, color: 'emerald' },
  { top: 70, left: 85, color: 'red' },
]

export default function ProfessionalLoader() {
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = prev > 90 ? 0.2 : prev > 70 ? 0.5 : 1
        return Math.min(prev + increment, 100)
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  // Don't render during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0B1120] to-[#1A1F2E]">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-red-600/20 animate-spin-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <GiSparkles className="w-12 h-12 text-amber-500" />
            </div>
          </div>
          <h1 className="text-3xl font-light text-white/90 tracking-wider mt-6 mb-2">
            CHRISTMAS
            <span className="font-bold bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 bg-clip-text text-transparent ml-2">
              LIGHTING
            </span>
          </h1>
          <p className="text-gray-400 text-sm tracking-wider font-light">
            Professional Holiday Illumination
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0B1120] via-[#1A1F2E] to-[#0B1120]">
      {/* Dark premium background with subtle texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-600/5 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.02) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Christmas lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {LIGHT_POSITIONS.map((light, i) => (
          <div
            key={`light-${i}`}
            className="absolute"
            style={{
              top: `${light.top}%`,
              left: `${light.left}%`,
              animation: `floatLight ${4 + i * 0.3}s infinite ease-in-out`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <div className="relative">
              <div className={`w-2 h-2 rounded-full ${light.color === 'red' ? 'bg-red-500' :
                light.color === 'amber' ? 'bg-amber-400' : 'bg-emerald-500'
                }`}>
                <div className={`absolute inset-0 rounded-full animate-ping ${light.color === 'red' ? 'bg-red-500/50' :
                  light.color === 'amber' ? 'bg-amber-400/50' : 'bg-emerald-500/50'
                  }`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {SPARKLE_POSITIONS.map((sparkle, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              top: `${sparkle.top}%`,
              left: `${sparkle.left}%`,
              animation: `twinkle ${sparkle.duration}s infinite alternate`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            <FaStar
              className={i % 3 === 0 ? 'text-red-400/30' : i % 3 === 1 ? 'text-amber-400/30' : 'text-emerald-400/30'}
              style={{ fontSize: '12px' }}
            />
          </div>
        ))}
      </div>

      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Premium circular loader */}
        <div className="relative mb-10">
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/20 via-amber-500/20 to-emerald-600/20 blur-xl animate-pulse"></div>

          {/* Main ring */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36">
            {/* Rotating ring with gradient */}
            <div className="absolute inset-0 rounded-full border-2 border-red-600/30 animate-spin-slow"></div>

            {/* Animated Christmas lights around the ring */}
            {Array.from({ length: 8 }).map((_, i) => {
              const colors = [
                'from-red-500 to-red-600',
                'from-amber-400 to-amber-500',
                'from-emerald-500 to-emerald-600',
              ]
              const colorIndex = i % 3
              return (
                <div
                  key={i}
                  className="absolute w-4 h-4"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translate(64px) rotate(-${i * 45}deg)`,
                  }}
                >
                  <div className={`relative w-4 h-4 rounded-full bg-gradient-to-br ${colorIndex === 0 ? 'from-red-500 to-red-600' :
                    colorIndex === 1 ? 'from-amber-400 to-amber-500' :
                      'from-emerald-500 to-emerald-600'
                    } shadow-lg animate-lightPulse`}
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      boxShadow: `0 0 20px ${colorIndex === 0 ? '#ef4444' :
                        colorIndex === 1 ? '#f59e0b' :
                          '#10b981'
                        }`
                    }}>
                    <div className={`absolute inset-0 rounded-full animate-ping ${colorIndex === 0 ? 'bg-red-500/50' :
                      colorIndex === 1 ? 'bg-amber-400/50' :
                        'bg-emerald-500/50'
                      }`}></div>
                  </div>
                </div>
              )
            })}

            {/* Center icon with premium effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-amber-500/30 to-emerald-600/30 blur-xl rounded-full animate-pulse"></div>
                <GiFruitTree className="w-16 h-16 sm:w-20 sm:h-20 text-white/90 relative z-10 animate-float" />
              </div>
            </div>
          </div>

          {/* Progress ring with gradient */}
          <svg className="absolute inset-0 w-32 h-32 sm:w-36 sm:h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="66"
              stroke="url(#premiumGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="414"
              strokeDashoffset={414 - (progress / 100) * 414}
              className="transition-all duration-300 ease-out drop-shadow-lg"
            />
            <defs>
              <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#ef4444" /> {/* Red-500 */}
                <stop offset="33%" stopColor="#f59e0b" /> {/* Amber-500 */}
                <stop offset="66%" stopColor="#10b981" /> {/* Emerald-500 */}
                <stop offset="100%" stopColor="#ef4444" /> {/* Red-500 */}
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Premium branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-light text-white/90 tracking-wider mb-3">
            CHRISTMAS
            <span className="font-bold bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent ml-2">
              LIGHTING
            </span>
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
            <p className="text-gray-400 text-sm tracking-wider font-light">
              Professional Illumination Services
            </p>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          </div>
        </div>

        {/* Premium progress bar */}
        <div className="w-64 sm:w-72">
          <div className="relative h-1 bg-gray-800/50 rounded-full overflow-hidden mb-3 backdrop-blur-sm">
            <div
              className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs font-medium flex items-center gap-2">
              <GiSparkles className="text-amber-400" />
              <span>Loading experience</span>
            </span>
            <span className="font-mono text-sm font-bold bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Premium status messages */}
        <div className="mt-8 h-8">
          <p className="text-gray-300 text-sm tracking-wide animate-fade-in-out font-light flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-red-500"></span>
            {progress < 30 && "Preparing holiday magic..."}
            {progress >= 30 && progress < 60 && "Stringing premium lights..."}
            {progress >= 60 && progress < 85 && "Adding festive sparkle..."}
            {progress >= 85 && progress < 99 && "Almost ready to shine..."}
            {progress >= 99 && "Your experience awaits ✨"}
            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
          </p>
        </div>

        {/* Premium footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-gray-600 text-xs tracking-wider font-medium flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></span>
            Premium Holiday Lighting Since 2024
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes floatLight {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-15px) translateX(-5px); }
          75% { transform: translateY(-5px) translateX(10px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes lightPulse {
          0%, 100% { 
            opacity: 0.8;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.3);
            filter: brightness(1.3);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-lightPulse {
          animation: lightPulse 2s infinite;
        }

        .animate-fade-in-out {
          animation: fadeInOut 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .text-4xl {
            font-size: 2rem;
          }
        }

        @media (max-width: 380px) {
          .text-4xl {
            font-size: 1.75rem;
          }
          .w-64 {
            width: 220px;
          }
        }
      `}</style>
    </div>
  )
}