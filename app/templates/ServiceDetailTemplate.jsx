'use client';

import { useEffect } from 'react';
import ServiceDetailContent from '../components/ServiceDetailContent';

export default function ServiceDetailTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
    }, [seo]);

    return <ServiceDetailContent data={data} />;
}