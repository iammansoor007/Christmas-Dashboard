'use client'
import GalleryGrid from '../components/GalleryGrid'

const Gallery = () => {
  const allImages = [
    { title: 'Classic White Elegance', description: 'Traditional white lighting with golden accents on a colonial home' },
    { title: 'Modern Color Symphony', description: 'RGB LED color-changing display with animated patterns' },
    { title: 'Commercial Plaza Spectacle', description: 'Large-scale business district lighting installation' },
    { title: 'Music-Synchronized Show', description: 'Animated light show synchronized with holiday music' },
    { title: 'Magical Forest Path', description: 'Pathway and garden lighting creating a winter wonderland' },
    { title: 'Architectural Highlighting', description: 'Custom lighting emphasizing unique architectural features' },
    { title: 'Holiday Tree Masterpiece', description: 'Expertly wrapped trees with layered lighting effects' },
    { title: 'Community Display', description: 'Neighborhood-wide coordinated lighting theme' },
    { title: 'Corporate Headquarters', description: 'Professional business campus holiday lighting' },
  ]

  const categories = [
    'All Projects',
    'Residential',
    'Commercial',
    'Animated Shows',
    'Custom Designs',
    'Award Winning'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-navy to-holiday-blue/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-white">Our Holiday </span>
              <span className="text-holiday-gold">Gallery</span>
            </h1>
            <p className="text-xl text-warm-white/80 mb-8">
              Explore our portfolio of stunning holiday lighting installations that have brought joy to thousands
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  index === 0
                    ? 'bg-gradient-to-r from-holiday-red to-holiday-gold text-white'
                    : 'bg-dark-navy/50 text-warm-white/80 hover:text-holiday-gold border border-holiday-gold/20 hover:border-holiday-gold/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <GalleryGrid images={allImages} />

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-holiday-gold/20">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '15,000+', label: 'Lights Installed' },
              { number: '100+', label: 'Business Clients' },
              { number: '25+', label: 'Awards Won' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-holiday-gold mb-2">{stat.number}</div>
                <div className="text-warm-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gradient-to-b from-dark-navy to-holiday-blue/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-6">
            <span className="text-white">Inspired by Our </span>
            <span className="text-holiday-gold">Work?</span>
          </h2>
          <p className="text-xl text-warm-white/80 mb-8 max-w-2xl mx-auto">
            Let's create your own holiday masterpiece. Schedule a free design consultation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/contact" 
              className="px-8 py-4 bg-gradient-to-r from-holiday-red to-holiday-gold text-white font-semibold rounded-full hover:shadow-lg hover:shadow-holiday-red/30 transition-all duration-300 text-lg"
            >
              Request Free Design Consultation
            </a>
            <a 
              href="tel:5551234567" 
              className="px-8 py-4 bg-transparent border-2 border-holiday-gold text-holiday-gold font-semibold rounded-full hover:bg-holiday-gold/10 transition-all duration-300 text-lg"
            >
              ðŸ“ž Call Now: (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
