'use client';

import { useEffect } from 'react';
import Gallery from '../../app/gallery/page';

export default function GalleryTemplate({ data, seo }) {
    useEffect(() => {
        if (seo?.metaTitle) {
            document.title = seo.metaTitle;
        }
    }, [seo]);

    return <Gallery data={data} />;
}