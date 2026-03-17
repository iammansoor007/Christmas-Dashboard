'use client'
import { useState, useRef, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { getFAQData } from '../services/dataService'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const contentRefs = useRef([])
  const [heights, setHeights] = useState({})
  const faqData = getFAQData()
  const { title, items } = faqData

  // Measure and store heights on mount and window resize
  useEffect(() => {
    const measureHeights = () => {
      const newHeights = {}
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          // Temporarily set height to auto to measure
          ref.style.height = 'auto'
          newHeights[index] = ref.scrollHeight
          ref.style.height = '0px'
        }
      })
      setHeights(newHeights)

      // Set initial open item height
      if (contentRefs.current[0]) {
        contentRefs.current[0].style.height = newHeights[0] + 'px'
      }
    }

    measureHeights()

    // Re-measure on window resize
    window.addEventListener('resize', measureHeights)
    return () => window.removeEventListener('resize', measureHeights)
  }, [])

  const toggleAccordion = (index) => {
    const currentRef = contentRefs.current[index]
    const prevIndex = openIndex
    const prevRef = prevIndex !== null ? contentRefs.current[prevIndex] : null

    if (!currentRef) return

    // If clicking the same item
    if (openIndex === index) {
      // Close it
      currentRef.style.height = heights[index] + 'px'
      requestAnimationFrame(() => {
        currentRef.style.height = '0px'
      })
      setOpenIndex(null)
      return
    }

    // Close previous item if exists
    if (prevRef) {
      prevRef.style.height = heights[prevIndex] + 'px'
      requestAnimationFrame(() => {
        prevRef.style.height = '0px'
      })
    }

    // Open new item
    currentRef.style.height = heights[index] + 'px'
    setOpenIndex(index)
  }

  return (
    <section className="w-full bg-gray-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-center font-montserrat text-4xl md:text-5xl font-extrabold mb-20">
          <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>

        <div className="space-y-6">
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-300 ${isOpen ? 'shadow-xl' : 'shadow-sm'
                  }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center text-left"
                >
                  {/* Icon Block */}
                  <div
                    className={`flex items-center justify-center w-16 h-16 shrink-0 transition-colors duration-300 ${isOpen ? 'bg-red-600' : 'bg-gray-900'
                      }`}
                  >
                    <FaPlus
                      className={`text-white text-lg transition-transform duration-300 ${isOpen ? 'rotate-45' : ''
                        }`}
                    />
                  </div>

                  {/* Question */}
                  <div className="px-8 py-6">
                    <h3
                      className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-red-600' : 'text-gray-900'
                        }`}
                    >
                      {item.question}
                    </h3>
                  </div>
                </button>

                {/* Smooth animation container */}
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el
                  }}
                  className="overflow-hidden transition-[height] duration-500 ease-in-out"
                  style={{
                    height: isOpen && heights[index] ? heights[index] + 'px' : '0px'
                  }}
                >
                  <div className="pl-24 pr-8 pb-8 text-gray-600 leading-relaxed text-base">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default FAQSection