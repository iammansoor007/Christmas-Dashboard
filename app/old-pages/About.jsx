const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-navy to-holiday-blue/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-white">Our Story of </span>
              <span className="text-holiday-gold">Holiday Magic</span>
            </h1>
            <p className="text-xl text-warm-white/80 mb-8">
              Bringing joy and wonder to communities through spectacular holiday lighting since 2008
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">
                <span className="text-white">Our </span>
                <span className="text-holiday-gold">Mission</span>
              </h2>
              <p className="text-warm-white/80 text-lg mb-6">
                At Luminous Holiday, we believe that holiday lighting is more than just decoration — it's about creating magical experiences that bring communities together and spark joy in people's hearts.
              </p>
              <p className="text-warm-white/80 mb-6">
                What started as a family passion project has grown into a premier holiday lighting service, serving thousands of happy customers across the region. Our team of lighting artists, electricians, and designers work together to create stunning displays that exceed expectations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-holiday-red/10 to-holiday-gold/10 rounded-2xl p-8 border border-holiday-gold/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Our Values</h3>
              <ul className="space-y-4">
                {[
                  '🎯 Excellence in every installation',
                  '🤝 Honest, transparent pricing',
                  '🔧 Quality craftsmanship',
                  '✨ Creating magical experiences',
                  '🌱 Sustainable practices',
                  '👪 Family-focused service',
                ].map((value, index) => (
                  <li key={index} className="flex items-center text-warm-white/90">
                    <span className="mr-3">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-dark-navy to-holiday-blue/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">
            <span className="text-white">Meet Our </span>
            <span className="text-holiday-gold">Lighting Artists</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'David Chen', role: 'Lead Designer', desc: '15+ years of lighting design experience' },
              { name: 'Maria Rodriguez', role: 'Installation Manager', desc: 'Master electrician & team leader' },
              { name: 'James Wilson', role: 'Animation Specialist', desc: 'Music synchronization expert' },
            ].map((member, index) => (
              <div key={index} className="text-center bg-gradient-to-b from-dark-navy/50 to-transparent rounded-2xl p-8 border border-holiday-gold/20 hover:border-holiday-gold/50 transition-all duration-500">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-holiday-red to-holiday-gold mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
                <div className="text-holiday-gold font-semibold mb-3">{member.role}</div>
                <p className="text-warm-white/70">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-6">
            <span className="text-white">Ready to Create </span>
            <span className="text-holiday-gold">Your Holiday Magic?</span>
          </h2>
          <p className="text-xl text-warm-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who trust us with their holiday lighting
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-holiday-red to-holiday-gold text-white font-semibold rounded-full hover:shadow-lg hover:shadow-holiday-red/30 transition-all duration-300 text-lg"
          >
            Get Your Free Consultation
          </a>
        </div>
      </section>
    </div>
  )
}

export default About