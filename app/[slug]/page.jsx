'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    HomeTemplate,
    AboutTemplate,
    ContactTemplate,
    ServicesTemplate,
    ServiceDetailTemplate,
    ServiceAreaTemplate,
    GalleryTemplate,
    PrivacyTemplate,
    TermsTemplate
} from '../templates';

const templateMap = {
    home: HomeTemplate,
    about: AboutTemplate,
    contact: ContactTemplate,
    services: ServicesTemplate,
    'service-detail': ServiceDetailTemplate,
    'service-area': ServiceAreaTemplate,
    gallery: GalleryTemplate,
    privacy: PrivacyTemplate,
    terms: TermsTemplate
};

export default function DynamicPage() {
    const params = useParams();
    const slug = params?.slug;

    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchPage = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/pages/${slug}`);

                if (response.status === 404) {
                    throw new Error('Page not found');
                }

                if (!response.ok) {
                    throw new Error('Failed to load page');
                }

                const data = await response.json();
                setPage(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching page:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [slug]);

    // Update document title when page loads
    useEffect(() => {
        if (page?.seo?.metaTitle) {
            document.title = page.seo.metaTitle;
        } else if (page?.title) {
            document.title = `${page.title} | Christmas Lights Over Columbus`;
        }

        if (page?.seo?.metaDescription) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', page.seo.metaDescription);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = page.seo.metaDescription;
                document.head.appendChild(meta);
            }
        }
    }, [page]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !page) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-6">Page not found</p>
                <a href="/" className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                    Go Home
                </a>
            </div>
        );
    }

    const Template = templateMap[page.template];

    if (!Template) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-600">Template not found: {page.template}</p>
            </div>
        );
    }

    return <Template data={page.content} seo={page.seo} />;
}