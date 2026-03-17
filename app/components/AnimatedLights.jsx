'use client'
import { useEffect, useState } from 'react';

const AnimatedLights = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything on server
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
            opacity: 0.7;
          }
          66% {
            transform: translateY(10px) rotate(240deg);
            opacity: 0.5;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.8;
          }
          50% {
            transform: translateX(100%);
            opacity: 0.8;
          }
        }
        
        .floating-sparkle {
          position: absolute;
          font-size: 1rem;
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }
        
        .floating-sparkle:before {
          content: '✦';
          display: block;
        }
      `}</style>
      
      {/* Static sparkles with fixed positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gold sparkles */}
        <div className="floating-sparkle" style={{ left: '10%', top: '20%', color: '#FFD700', opacity: 0.6, animationDelay: '0s' }} />
        <div className="floating-sparkle" style={{ left: '25%', top: '60%', color: '#FFD700', opacity: 0.4, animationDelay: '1s' }} />
        <div className="floating-sparkle" style={{ left: '40%', top: '10%', color: '#FFD700', opacity: 0.7, animationDelay: '2s' }} />
        <div className="floating-sparkle" style={{ left: '55%', top: '80%', color: '#FFD700', opacity: 0.5, animationDelay: '3s' }} />
        <div className="floating-sparkle" style={{ left: '70%', top: '30%', color: '#FFD700', opacity: 0.8, animationDelay: '0.5s' }} />
        <div className="floating-sparkle" style={{ left: '85%', top: '50%', color: '#FFD700', opacity: 0.3, animationDelay: '1.5s' }} />
        
        {/* Red sparkles */}
        <div className="floating-sparkle" style={{ left: '15%', top: '40%', color: '#FF6B6B', opacity: 0.7, animationDelay: '0.7s' }} />
        <div className="floating-sparkle" style={{ left: '30%', top: '80%', color: '#FF6B6B', opacity: 0.5, animationDelay: '1.7s' }} />
        <div className="floating-sparkle" style={{ left: '45%', top: '25%', color: '#FF6B6B', opacity: 0.6, animationDelay: '2.7s' }} />
        <div className="floating-sparkle" style={{ left: '60%', top: '65%', color: '#FF6B6B', opacity: 0.4, animationDelay: '3.7s' }} />
        <div className="floating-sparkle" style={{ left: '75%', top: '15%', color: '#FF6B6B', opacity: 0.8, animationDelay: '0.9s' }} />
        <div className="floating-sparkle" style={{ left: '90%', top: '75%', color: '#FF6B6B', opacity: 0.3, animationDelay: '1.9s' }} />
        
        {/* Teal sparkles */}
        <div className="floating-sparkle" style={{ left: '5%', top: '70%', color: '#4ECDC4', opacity: 0.5, animationDelay: '0.3s' }} />
        <div className="floating-sparkle" style={{ left: '20%', top: '10%', color: '#4ECDC4', opacity: 0.7, animationDelay: '1.3s' }} />
        <div className="floating-sparkle" style={{ left: '35%', top: '45%', color: '#4ECDC4', opacity: 0.4, animationDelay: '2.3s' }} />
        <div className="floating-sparkle" style={{ left: '50%', top: '85%', color: '#4ECDC4', opacity: 0.6, animationDelay: '3.3s' }} />
        <div className="floating-sparkle" style={{ left: '65%', top: '35%', color: '#4ECDC4', opacity: 0.3, animationDelay: '0.8s' }} />
        <div className="floating-sparkle" style={{ left: '80%', top: '55%', color: '#4ECDC4', opacity: 0.8, animationDelay: '1.8s' }} />
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-emerald-900/5" />
      
      {/* Light beams */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" 
          style={{ animation: 'shimmer 3s ease-in-out infinite' }} 
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{ animation: 'shimmer 3s ease-in-out 1.5s infinite' }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-rose-500/5 to-amber-500/5 blur-3xl animate-pulse" />
      <div 
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/5 to-emerald-500/5 blur-3xl animate-pulse" 
        style={{ animationDelay: '2s' }} 
      />
    </>
  );
};

export default AnimatedLights;