'use client';

import { useState, useEffect } from 'react';
import { HomeTemplate } from './templates';

export default function HomePage() {
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomepage = async () => {
            try {
                setLoading(true);

                // Try to get the page marked as homepage
                const response = await fetch('/api/pages?status=published');
                const pages = await response.json();

                const homepage = Array.isArray(pages) ? pages.find(p => p.isHomepage === true) : null;

                if (homepage) {
                    setPage(homepage);
                } else {
                    // Fallback to home slug
                    const homeResponse = await fetch('/api/pages/home');
                    if (homeResponse.ok) {
                        const homeData = await homeResponse.json();
                        setPage(homeData);
                    } else {
                        setError('No homepage found');
                    }
                }
            } catch (err) {
                console.error('Error fetching homepage:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHomepage();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !page) {
        // Fallback to default homepage if no page found
        return <HomeTemplate data={{}} />;
    }

    return <HomeTemplate data={page.content} seo={page.seo} />;
}