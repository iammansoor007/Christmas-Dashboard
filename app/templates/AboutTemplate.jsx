'use client';

import { useEffect } from 'react';
import AboutUs from '../about/page';

export default function AboutTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
        if (seo?.metaDescription) {
            const meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', seo.metaDescription);
        }
    }, [seo]);

    return <AboutUs data={data} />;
}