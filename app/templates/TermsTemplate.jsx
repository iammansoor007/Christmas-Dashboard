'use client';

import { useEffect } from 'react';
import TermsAndConditions from '../../app/terms/page';

export default function TermsTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
    }, [seo]);

    return <TermsAndConditions data={data} />;
}