'use client';

import { useEffect } from 'react';
import PrivacyPolicy from '../../app/privacy/page';

export default function PrivacyTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
    }, [seo]);

    return <PrivacyPolicy data={data} />;
}