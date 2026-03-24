'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickQuote from './components/QuickQuote';
import SmoothScroll from './components/SmoothScroll';

export default function ClientLayout({ children }) {
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();

    // Check if current route is admin
    const isAdminRoute = pathname?.startsWith('/admin');

    const [snowflakes] = useState(() => {
        const flakes = [];
        for (let i = 0; i < 120; i++) {
            flakes.push({
                id: i,
                left: Math.random() * 100,
                size: Math.random() * 4 + 1,
                speed: Math.random() * 8 + 4,
                delay: Math.random() * 10,
            });
        }
        return flakes;
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {/* SNOWFALL - Only on non-admin routes */}
            {!isAdminRoute && isClient && (
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
                    style={{ zIndex: 40 }}>
                    {snowflakes.map((flake) => (
                        <div
                            key={flake.id}
                            className="absolute rounded-full bg-white"
                            style={{
                                left: `${flake.left}%`,
                                top: '-10%',
                                width: `${flake.size}px`,
                                height: `${flake.size}px`,
                                opacity: 0.4,
                                animation: `snowfall ${flake.speed}s linear infinite`,
                                animationDelay: `${flake.delay}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* NAVBAR & QUICK QUOTE - Only on non-admin routes */}
            {!isAdminRoute && <Navbar />}
            {!isAdminRoute && <QuickQuote />}

            {/* SMOOTH SCROLL WRAPPER */}
            <SmoothScroll>
                {/* PAGE CONTENT */}
                <main className={`min-h-screen ${isAdminRoute ? 'bg-gray-50' : ''}`}>
                    {children}
                </main>
            </SmoothScroll>

            {/* FOOTER - Only on non-admin routes */}
            {!isAdminRoute && <Footer />}

            <style jsx global>{`
                @keyframes snowfall {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 0.8;
                        transform: translateY(50vh) translateX(10px);
                    }
                    100% {
                        transform: translateY(120vh) translateX(-10px);
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
}