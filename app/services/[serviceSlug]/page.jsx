'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ServiceDetailTemplate from '../../templates/ServiceDetailTemplate';

export default function ServiceDetailPage() {
    const params = useParams();
    const serviceSlug = params?.serviceSlug;

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!serviceSlug) return;

        const fetchService = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/services/${serviceSlug}`);

                if (response.status === 404) {
                    throw new Error('Service not found');
                }

                if (!response.ok) {
                    throw new Error('Failed to load service');
                }

                const data = await response.json();
                setService(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching service:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [serviceSlug]);

    // Update document title
    useEffect(() => {
        if (service?.seo?.metaTitle) {
            document.title = service.seo.metaTitle;
        } else if (service?.title) {
            document.title = `${service.title} | Christmas Lights Over Columbus`;
        }
    }, [service]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
                <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
                <a href="/services" className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                    View All Services
                </a>
            </div>
        );
    }

    return <ServiceDetailTemplate data={service} />;
}