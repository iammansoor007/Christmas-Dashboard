import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import GalleryGrid from '../components/GalleryGrid'
import CTASection from '../components/CTASection'
import ChristmasLightingSection from '../components/servicesection'
import ChristmasLightingServices from '../components/ChristmasLightingServices'
import HowWeWorkSection from '../components/HowWeWorkSection'
import RecentWorkMarquee from '../components/RecentWorkMarquee'
import ChristmasLightingMap from '../components/ChristmasLightingMap'
import Testimonials from '../components/TestimonialCard' // ✅ USE CAROUSEL
import FAQSection from '../components/FAQSection'

const Home = () => {




  return (
    <>
      <Hero />
      <ChristmasLightingSection />
      <ChristmasLightingServices />
      <HowWeWorkSection />
      <RecentWorkMarquee />
      <ChristmasLightingMap />



      {/* Process */}
      <HowWeWorkSection />

      {/* ✅ FIXED TESTIMONIALS (CAROUSEL ONLY) */}
      <Testimonials />
      <FAQSection />

      <CTASection />
    </>
  )
}

export default Home
