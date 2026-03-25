'use client';

import { useEffect } from 'react';
import ServicesPage from '../../app/services/page';

export default function ServicesTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
    }, [seo]);

    return <ServicesPage data={data} />;
}