'use client';

import { useState, useEffect } from 'react';
import { HomeTemplate, AboutTemplate, ContactTemplate, ServicesTemplate, ServiceAreaTemplate, GalleryTemplate } from './templates';

const TEMPLATE_MAP = {
    home: HomeTemplate,
    about: AboutTemplate,
    contact: ContactTemplate,
    services: ServicesTemplate,
    'service-area': ServiceAreaTemplate,
    gallery: GalleryTemplate,
};

export default function HomePage() {
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomepage = async () => {
            try {
                setLoading(true);

                // Fetch the specific page marked as published homepage
                const response = await fetch(`/api/pages?status=published&isHomepage=true&t=${Date.now()}`);
                const pages = await response.json();
                
                // Since we query by isHomepage=true, we take the first result
                const homepage = Array.isArray(pages) && pages.length > 0 ? pages[0] : null;

                if (homepage) {
                    setPage(homepage);
                } else {
                    // Fallback to home slug as a second attempt
                    const homeResponse = await fetch(`/api/pages/home?t=${Date.now()}`);
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

    // Dynamically render the correct template based on the page's template field
    const TemplateComponent = TEMPLATE_MAP[page.template] || HomeTemplate;
    return <TemplateComponent data={page.content} seo={page.seo} />;
}