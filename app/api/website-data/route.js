// app/api/website-data/route.js
export async function GET() {
  try {
    // Fetch data from your CMS
    const cmsBaseUrl = process.env.CMS_API_URL || 'http://localhost:5000/api';
    
    // Fetch all sections in parallel
    const [heroRes, servicesRes, faqsRes, galleryRes, workStepsRes, siteSettingsRes] = await Promise.all([
      fetch(`${cmsBaseUrl}/hero`, { next: { revalidate: 60 } }),
      fetch(`${cmsBaseUrl}/services`, { next: { revalidate: 60 } }),
      fetch(`${cmsBaseUrl}/faqs`, { next: { revalidate: 60 } }),
      fetch(`${cmsBaseUrl}/gallery`, { next: { revalidate: 60 } }),
      fetch(`${cmsBaseUrl}/work-steps`, { next: { revalidate: 60 } }),
      fetch(`${cmsBaseUrl}/site-settings`, { next: { revalidate: 60 } })
    ]);

    // Parse all responses
    const [hero, services, faqs, gallery, workSteps, siteSettings] = await Promise.all([
      heroRes.ok ? heroRes.json() : createDefaultHero(),
      servicesRes.ok ? servicesRes.json() : [],
      faqsRes.ok ? faqsRes.json() : [],
      galleryRes.ok ? galleryRes.json() : [],
      workStepsRes.ok ? workStepsRes.json() : [],
      siteSettingsRes.ok ? siteSettingsRes.json() : createDefaultSiteSettings()
    ]);

    // Format the data to match your data.json structure
    const websiteData = {
      hero: formatHeroData(hero),
      services: {
        badge: "Premium Services",
        title: { text: "Holiday Lighting", prefix: "Professional" },
        subtitle: "Transform your property with premium, energy-efficient lighting",
        items: formatServicesData(services)
      },
      faq: {
        badge: "Frequently Asked Questions",
        title: "Questions & Answers",
        subtitle: "Everything you need to know about our premium holiday lighting services. Can't find your answer?",
        phone: siteSettings.contact?.phone || "(123) 456-7890",
        items: formatFaqsData(faqs)
      },
      // Add other sections as you implement them
      contact: siteSettings.contact || {
        phone: "(123) 456-7890",
        email: "info@christmaslights.com",
        address: "123 Christmas Lane, North Pole",
        hours: "Mon-Sun: 8am-8pm"
      },
      cta: {
        socialProof: siteSettings.socialProof || {
          clients: "500+ Happy Clients",
          rating: "4.9/5 Rating"
        }
      }
    };

    return Response.json(websiteData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });

  } catch (error) {
    console.error('Error fetching website data:', error);
    
    // Return fallback data if CMS is down
    return Response.json(getFallbackData(), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Helper functions
function formatHeroData(hero) {
  return {
    badge: hero.badge || { icon: "GiSparkles", text: "LIMITED TIME: 25% Off Early Bird" },
    title: hero.title || { part1: "Illuminate", part2: "Your Holidays" },
    subtitle: hero.subtitle || "Premium Christmas Lighting installations that transform your property with professional winter magic",
    features: hero.features || [
      "Professional Installation",
      "Energy-Efficient LED Lights",
      "Custom Design & Planning",
      "Free Estimates & Consultation"
    ],
    cta: hero.cta || {
      subtext: "Call Now for Free Quote",
      phone: "(123) 456-7890",
      availability: "Available 7 Days a Week • Free Estimates"
    },
    stats: hero.stats || [
      { number: "500+", label: "Elite Clients", icon: "FaHome" },
      { number: "15+", label: "Years Excellence", icon: "FaStar" },
      { number: "24/7", label: "Premium Support", icon: "FaShieldAlt" },
      { number: "100%", label: "Satisfaction", icon: "FaHeart" }
    ],
    imageBadge: hero.imageBadge || "Our Premium Work"
  };
}

function formatServicesData(services) {
  // If no services from CMS, return defaults
  if (!services || services.length === 0) {
    return []; // Will use your existing data.json as fallback
  }
  
  return services.map(service => ({
    number: service.number,
    title: service.title,
    description: service.description,
    icon: service.icon,
    color: service.color,
    features: service.features,
    image: service.image,
    stat: service.stat
  }));
}

function formatFaqsData(faqs) {
  if (!faqs || faqs.length === 0) {
    return []; // Will use your existing data.json as fallback
  }
  
  return faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer,
    icon: faq.icon,
    category: faq.category,
    features: faq.features
  }));
}

function createDefaultHero() {
  return {
    badge: { icon: "GiSparkles", text: "LIMITED TIME: 25% Off Early Bird" },
    title: { part1: "Illuminate", part2: "Your Holidays" },
    subtitle: "Premium Christmas Lighting installations that transform your property with professional winter magic",
    features: [
      "Professional Installation",
      "Energy-Efficient LED Lights",
      "Custom Design & Planning",
      "Free Estimates & Consultation"
    ],
    cta: {
      subtext: "Call Now for Free Quote",
      phone: "(123) 456-7890",
      availability: "Available 7 Days a Week • Free Estimates"
    },
    stats: [
      { number: "500+", label: "Elite Clients", icon: "FaHome" },
      { number: "15+", label: "Years Excellence", icon: "FaStar" },
      { number: "24/7", label: "Premium Support", icon: "FaShieldAlt" },
      { number: "100%", label: "Satisfaction", icon: "FaHeart" }
    ],
    imageBadge: "Our Premium Work"
  };
}

function createDefaultSiteSettings() {
  return {
    contact: {
      phone: "(123) 456-7890",
      email: "info@christmaslights.com",
      address: "123 Christmas Lane, North Pole",
      hours: "Mon-Sun: 8am-8pm"
    },
    socialProof: {
      clients: "500+ Happy Clients",
      rating: "4.9/5 Rating"
    }
  };
}

function getFallbackData() {
  // Return your existing static data as fallback
  return {
    hero: createDefaultHero(),
    services: { items: [] }, // Empty array will trigger fallback to data.json
    faq: { items: [] },
    contact: createDefaultSiteSettings().contact,
    cta: { socialProof: createDefaultSiteSettings().socialProof }
  };
}