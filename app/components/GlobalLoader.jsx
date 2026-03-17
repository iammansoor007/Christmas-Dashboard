'use client';

import { useState, useEffect } from 'react';
import ProfessionalLoader from './Loader';

export default function GlobalLoader({ children }) {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // ONLY run on initial page load
        const minimumLoadTime = 1500;
        const startTime = Date.now();

        const handleInitialLoad = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minimumLoadTime - elapsed);

            // Fade out loader
            setTimeout(() => {
                setFadeOut(true);

                // Remove loader from DOM after fade
                setTimeout(() => {
                    setShowLoader(false);
                    setIsFirstLoad(false);
                }, 300);
            }, remaining);
        };

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            handleInitialLoad();
        } else {
            window.addEventListener('load', handleInitialLoad);
            return () => window.removeEventListener('load', handleInitialLoad);
        }
    }, []); // Empty array = ONLY runs once on mount

    // After first load, ALWAYS render children directly
    if (!isFirstLoad || !showLoader) {
        return <>{children}</>;
    }

    // Only show loader on first visit
    return (
        <div
            className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <ProfessionalLoader />
        </div>
    );
}