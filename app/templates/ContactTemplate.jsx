'use client';

import { useEffect } from 'react';
import ModernQuoteForm from '../contact/page';

export default function ContactTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
    }, [seo]);

    return <ModernQuoteForm data={data} />;
}   