'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SchemaMarkup() {
    const pathname = usePathname();
    const [businessData, setBusinessData] = useState(null);

    useEffect(() => {
        // Fetch business info for schema
        const fetchData = async () => {
            try {
                const response = await fetch('/api/footer');
                const data = await response.json();
                setBusinessData(data);
            } catch (error) {
                console.error('Error fetching business data:', error);
            }
        };
        fetchData();
    }, []);

    const getPageType = () => {
        if (pathname === '/') return 'WebPage';
        if (pathname.includes('/services/')) return 'Service';
        if (pathname === '/about') return 'AboutPage';
        if (pathname === '/contact') return 'ContactPage';
        if (pathname === '/gallery') return 'ImageGallery';
        return 'WebPage';
    };

    const localBusinessSchema = businessData ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": businessData.companyName || "Christmas Lights Over Columbus",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL}/images/mainlogo.png`,
        "telephone": businessData.contact?.phone || "(614) 301-7100",
        "email": businessData.contact?.email || "info@lightsovercolumbus.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Columbus",
            "addressRegion": "OH",
            "addressCountry": "US"
        },
        "url": process.env.NEXT_PUBLIC_SITE_URL,
        "priceRange": "$$",
        "openingHours": ["Mo-Fr 08:00-18:00", "Sa-Su 10:00-16:00"],
        "sameAs": businessData.socialMedia?.map(s => s.href) || []
    } : null;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/`
            },
            ...pathname !== '/' ? [{
                "@type": "ListItem",
                "position": 2,
                "name": pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Page',
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`
            }] : []
        ]
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Christmas Lights Over Columbus",
        "url": process.env.NEXT_PUBLIC_SITE_URL,
        "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/images/mainlogo.png`,
        "sameAs": [
            "https://facebook.com",
            "https://instagram.com",
            "https://twitter.com"
        ]
    };

    return (
        <>
            {localBusinessSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
        </>
    );
}