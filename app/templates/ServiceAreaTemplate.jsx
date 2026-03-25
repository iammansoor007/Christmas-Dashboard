'use client';

import { useEffect } from 'react';
import ServiceArea from '../../app/service-area/page';

export default function ServiceAreaTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
    }, [seo]);

    return <ServiceArea data={data} />;
}