
'use client'
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-navy to-holiday-blue/20">
      <div className="container mx-auto px-4 text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-display font-bold text-white opacity-20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-display font-bold text-holiday-gold animate-pulse">
              404
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
          Page Not Found
        </h1>
        
        <p className="text-xl text-warm-white/80 mb-10 max-w-2xl mx-auto">
          Oops! The page you're looking for seems to have wandered off into the holiday lights. 
          Let's get you back to the magic!
        </p>
        
        {/* Animated Lights */}
        <div className="flex justify-center space-x-2 mb-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-holiday-gold animate-twinkle"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-holiday-red to-holiday-gold text-white font-semibold rounded-full hover:shadow-lg hover:shadow-holiday-red/30 transition-all duration-300 text-lg"
          >
            ðŸ  Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 bg-transparent border-2 border-holiday-gold text-holiday-gold font-semibold rounded-full hover:bg-holiday-gold/10 transition-all duration-300 text-lg"
          >
            ðŸ“ž Contact Support
          </Link>
        </div>
        
        {/* Decorative Elements */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'ðŸ”', text: 'Search our site' },
            { icon: 'ðŸ—ºï¸', text: 'Browse our sitemap' },
            { icon: 'ðŸ“ž', text: 'Call for assistance' },
          ].map((item, index) => (
            <div key={index} className="p-6 bg-gradient-to-b from-dark-navy/50 to-transparent rounded-xl border border-holiday-gold/20">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-warm-white/80">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotFound
