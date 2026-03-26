'use client';

import Hero from '../components/Hero';
import AwardWinningServicesSection from '../components/ChristmasLightingServices';
import HowWeWorkSection from '../components/HowWeWorkSection';
import VanMapSection from '../components/ChristmasLightingMap';
import RefinedWorkShowcase from '../components/RecentWorkMarquee';
import ChristmasLightingSection from '../components/servicesection';
import Testimonials from '../components/TestimonialCard';
import FAQSection from '../components/FAQSection';
import ModernQuoteForm from '../components/GetQuoteForm';
import CallToAction from '../components/CallToAction';

export default function HomeTemplate({ data, seo }) {
    // Update page title if SEO is provided
    if (seo?.metaTitle && typeof document !== 'undefined') {
        document.title = seo.metaTitle;
    }

    return (
        <>
            <Hero data={data?.hero} />
            <ChristmasLightingSection data={data?.servicesSection || data?.services} />
            <AwardWinningServicesSection data={data?.awardWinningServices || data?.servicesList} />
            <HowWeWorkSection data={data?.howWeWork} />
            <VanMapSection data={data?.vanMap} />
            <RefinedWorkShowcase data={data?.workShowcase} />
            <Testimonials data={data?.testimonials} />
            <FAQSection data={data?.faq} />
            <ModernQuoteForm data={data?.quoteForm} />
        </>
    );
}