'use client';

import { useEffect } from 'react';
import ServiceDetailPage from '../../app/services/[serviceSlug]/page';

export default function ServiceDetailTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
    }, [seo]);

    return <ServiceDetailPage service={data} />;
}