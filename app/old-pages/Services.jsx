import ServiceCard from '../components/ServiceCard'
import CTASection from '../components/CTASection'

const Services = () => {
  const allServices = [
    {
      title: 'Residential Lighting',
      description: 'Transform your home into a holiday masterpiece with custom lighting designs for rooftops, trees, and landscapes.',
      icon: '🏠',
      features: ['Custom Design Consultation', 'Professional Installation', 'Energy-Efficient LED Lighting', 'Animated Effects', 'Wireless Remote Control', 'Maintenance & Support'],
      price: 'From $499'
    },
    {
      title: 'Commercial Lighting',
      description: 'Attract customers and boost holiday sales with stunning commercial displays for businesses and storefronts.',
      icon: '🏢',
      features: ['Large-Scale Designs', 'Brand Color Integration', 'Synchronized Light Shows', '24/7 Emergency Support', 'Competitive Analysis', 'ROI Reporting'],
      price: 'From $1,999'
    },
    {
      title: 'Animated Light Shows',
      description: 'Create unforgettable experiences with synchronized music and light shows using smart lighting technology.',
      icon: '🎄',
      features: ['Music Synchronization', 'Custom Programming', 'Mobile App Control', 'Multi-Zone Animation', 'Wireless Connectivity', 'Show Design'],
      price: 'From $2,499'
    },
    {
      title: 'Custom Design Service',
      description: 'Unique lighting designs tailored to your specific property architecture and personal style preferences.',
      icon: '🎨',
      features: ['3D Visualization', 'Architectural Analysis', 'Material Selection', 'Installation Planning', 'Permit Assistance', 'Unique Themes'],
      price: 'From $799'
    },
    {
      title: 'Maintenance & Repair',
      description: 'Keep your holiday lighting display looking perfect throughout the season with our maintenance plans.',
      icon: '🔧',
      features: ['Regular Check-ups', 'Bulb Replacement', 'Weatherproofing', 'Timer Adjustments', 'Emergency Repairs', 'Pre-Season Testing'],
      price: 'From $299/mo'
    },
    {
      title: 'Take Down & Storage',
      description: 'Professional removal and safe storage of your lighting equipment after the holiday season.',
      icon: '📦',
      features: ['Safe Removal', 'Equipment Cleaning', 'Organized Storage', 'Damage Inspection', 'Repair Services', 'Inventory Management'],
      price: 'From $399'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-navy to-holiday-blue/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-white">Our Holiday </span>
              <span className="text-holiday-gold">Lighting Services</span>
            </h1>
            <p className="text-xl text-warm-white/80 mb-8">
              Comprehensive holiday lighting solutions for homes, businesses, and communities
            </p>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gradient-to-b from-holiday-blue/10 to-dark-navy">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">
            <span className="text-white">Popular </span>
            <span className="text-holiday-gold">Packages</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Essential Home',
                price: '$899',
                features: [
                  'Rooftop & Trim Lighting',
                  '2 Large Trees Wrapped',
                  'Pathway Lights',
                  'Wireless Timer',
                  'Basic Design',
                  'Installation & Removal'
                ],
                highlight: false
              },
              {
                name: 'Premium Showcase',
                price: '$2,499',
                features: [
                  'Full Property Lighting',
                  'Animated Sections',
                  'Music Synchronization',
                  'Mobile App Control',
                  'Custom Design',
                  'Season Maintenance',
                  'Priority Support'
                ],
                highlight: true
              },
              {
                name: 'Commercial Elite',
                price: '$4,999+',
                features: [
                  'Large-Scale Design',
                  'Brand Integration',
                  'Animated Show',
                  'Marketing Materials',
                  '24/7 Support',
                  'ROI Analysis',
                  'Extended Season'
                ],
                highlight: false
              }
            ].map((pkg, index) => (
              <div 
                key={index} 
                className={`rounded-2xl p-8 border transition-all duration-500 ${
                  pkg.highlight 
                    ? 'bg-gradient-to-b from-holiday-gold/10 to-transparent border-holiday-gold scale-105' 
                    : 'bg-gradient-to-b from-dark-navy/50 to-transparent border-holiday-gold/20 hover:border-holiday-gold/50'
                }`}
              >
                {pkg.highlight && (
                  <div className="inline-block bg-holiday-gold text-dark-navy px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-holiday-gold mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-warm-white/90">
                      <span className="w-2 h-2 rounded-full bg-holiday-gold mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-holiday-red to-holiday-red/80 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-holiday-red/30 transition-all duration-300">
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}

export default Services