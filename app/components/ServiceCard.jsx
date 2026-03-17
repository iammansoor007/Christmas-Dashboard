'use client'
const ServiceCard = ({ title, description, icon, features, price }) => {
  return (
    <div className="group relative bg-gradient-to-b from-dark-navy to-holiday-blue/30 rounded-2xl p-8 border border-holiday-gold/20 hover:border-holiday-gold/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-holiday-gold/20">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-holiday-red/0 via-holiday-gold/0 to-holiday-green/0 group-hover:from-holiday-red/5 group-hover:via-holiday-gold/5 group-hover:to-holiday-green/5 transition-all duration-500 blur-xl"></div>
      
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-holiday-red to-holiday-gold flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
          <span className="text-2xl text-white">{icon}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative">
        <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-holiday-gold transition-colors">
          {title}
        </h3>
        
        <p className="text-warm-white/80 mb-6">
          {description}
        </p>
        
        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-warm-white/90">
              <span className="w-2 h-2 rounded-full bg-holiday-gold mr-3 animate-pulse"></span>
              {feature}
            </li>
          ))}
        </ul>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          {price && (
            <div className="text-2xl font-bold text-holiday-gold">
              {price}
            </div>
          )}
          
          <button className="px-6 py-3 bg-gradient-to-r from-holiday-red to-holiday-red/80 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-holiday-red/30 transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard