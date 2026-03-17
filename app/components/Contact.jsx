'use client'
import { useState } from 'react'
import CTASection from '../components/CTASection'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, this would connect to a backend
    alert('Thank you for your inquiry! We will contact you within 24 hours.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-navy to-holiday-blue/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-white">Contact Us for a </span>
              <span className="text-holiday-gold">Free Quote</span>
            </h1>
            <p className="text-xl text-warm-white/80 mb-8">
              Get your free, no-obligation consultation and quote for holiday lighting
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-b from-dark-navy/50 to-transparent rounded-2xl p-8 border border-holiday-gold/20">
              <h2 className="text-3xl font-display font-bold mb-8 text-white">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-warm-white/80 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-navy/50 border border-holiday-gold/30 rounded-lg text-white focus:outline-none focus:border-holiday-gold focus:ring-1 focus:ring-holiday-gold transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-warm-white/80 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-navy/50 border border-holiday-gold/30 rounded-lg text-white focus:outline-none focus:border-holiday-gold focus:ring-1 focus:ring-holiday-gold transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-warm-white/80 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-navy/50 border border-holiday-gold/30 rounded-lg text-white focus:outline-none focus:border-holiday-gold focus:ring-1 focus:ring-holiday-gold transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-warm-white/80 mb-2">Service Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-navy/50 border border-holiday-gold/30 rounded-lg text-white focus:outline-none focus:border-holiday-gold focus:ring-1 focus:ring-holiday-gold transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="residential">Residential Lighting</option>
                    <option value="commercial">Commercial Lighting</option>
                    <option value="animated">Animated Light Shows</option>
                    <option value="custom">Custom Design</option>
                    <option value="maintenance">Maintenance & Repair</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-warm-white/80 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-dark-navy/50 border border-holiday-gold/30 rounded-lg text-white focus:outline-none focus:border-holiday-gold focus:ring-1 focus:ring-holiday-gold transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-holiday-red to-holiday-gold text-white font-semibold rounded-full hover:shadow-lg hover:shadow-holiday-red/30 transition-all duration-300 text-lg"
                >
                  Get Free Quote â†’
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-display font-bold mb-8 text-white">
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                {/* Contact Cards */}
                {[
                  {
                    icon: 'ðŸ“ž',
                    title: 'Call Us',
                    content: '(555) 123-4567',
                    subtitle: 'Mon-Fri 8am-6pm, Sat 9am-4pm',
                    action: 'tel:5551234567',
                  },
                  {
                    icon: 'âœ‰ï¸',
                    title: 'Email Us',
                    content: 'info@luminousholiday.com',
                    subtitle: 'Response within 24 hours',
                    action: 'mailto:info@luminousholiday.com',
                  },
                  {
                    icon: 'ðŸ“',
                    title: 'Visit Us',
                    content: '123 Holiday Lane, North Pole',
                    subtitle: 'By appointment only',
                    action: '#',
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.action}
                    className="block bg-gradient-to-b from-dark-navy/50 to-transparent rounded-xl p-6 border border-holiday-gold/20 hover:border-holiday-gold/50 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                        <div className="text-holiday-gold font-semibold mb-1">{item.content}</div>
                        <p className="text-warm-white/70">{item.subtitle}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Service Area */}
              <div className="mt-12 bg-gradient-to-b from-dark-navy/50 to-transparent rounded-xl p-6 border border-holiday-gold/20">
                <h3 className="text-2xl font-semibold text-white mb-4">Service Area</h3>
                <p className="text-warm-white/80 mb-4">
                  We proudly serve the entire metropolitan area including:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'North Pole',
                    'Snowflake Valley',
                    'Candy Cane County',
                    'Reindeer Ridge',
                    'Gingerbread City',
                    'Winter Wonderland',
                  ].map((area, index) => (
                    <div key={index} className="flex items-center text-warm-white/90">
                      <span className="w-2 h-2 rounded-full bg-holiday-gold mr-2"></span>
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 p-6 bg-gradient-to-r from-holiday-red/10 to-holiday-red/5 border border-holiday-red/30 rounded-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">ðŸš¨</span>
                  <div>
                    <h4 className="font-semibold text-white">Emergency Service</h4>
                    <p className="text-warm-white/80 text-sm">
                      Lighting issues after hours? Call our emergency line: 
                      <span className="text-holiday-gold font-semibold ml-1">(555) 911-LIGHTS</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}

export default Contact
