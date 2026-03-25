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
            <Hero />
            <ChristmasLightingSection />
            <AwardWinningServicesSection />

            <HowWeWorkSection />
            <VanMapSection />
            <RefinedWorkShowcase />
            <Testimonials />
            <FAQSection />
            <ModernQuoteForm />
        </>
    );
}