'use client'
import { useState } from 'react'

const GalleryGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            {/* Image Container */}
            <div className="aspect-video bg-gradient-to-br from-holiday-blue/30 to-dark-navy overflow-hidden">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-white/60">{image.title}</span>
              </div>
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-white font-semibold text-lg mb-2">{image.title}</h4>
                <p className="text-warm-white/80 text-sm">{image.description}</p>
              </div>
            </div>
            
            {/* Light Effect */}
            <div className="absolute inset-0 border border-holiday-gold/20 group-hover:border-holiday-gold/50 transition-colors duration-500 rounded-2xl pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl">
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-navy/80 text-white hover:bg-holiday-red transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="bg-gradient-to-br from-dark-navy to-holiday-blue/30 p-8">
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                {selectedImage.title}
              </h3>
              <div className="aspect-video bg-gray-800 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white/60">Image Preview</span>
              </div>
              <p className="text-warm-white/80">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryGrid