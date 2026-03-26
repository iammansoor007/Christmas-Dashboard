'use client'
import { useState, useRef, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'

const FAQSection = ({ data: propData }) => {
  const [openIndex, setOpenIndex] = useState(0)
  const [data, setData] = useState(propData || null)
  const [loading, setLoading] = useState(!propData)
  const contentRefs = useRef([])
  const [heights, setHeights] = useState({})

  // Load data from API
  useEffect(() => {
    if (propData) {
      setData(propData);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const response = await fetch('/api/faq')
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [propData])

  // Measure and store heights on mount and window resize
  useEffect(() => {
    if (!data?.items) return

    const measureHeights = () => {
      const newHeights = {}
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.style.height = 'auto'
          newHeights[index] = ref.scrollHeight
          ref.style.height = '0px'
        }
      })
      setHeights(newHeights)

      // Set initial open item height
      if (contentRefs.current[0] && newHeights[0]) {
        contentRefs.current[0].style.height = newHeights[0] + 'px'
      }
    }

    measureHeights()

    window.addEventListener('resize', measureHeights)
    return () => window.removeEventListener('resize', measureHeights)
  }, [data?.items])

  const toggleAccordion = (index) => {
    const currentRef = contentRefs.current[index]
    const prevIndex = openIndex
    const prevRef = prevIndex !== null ? contentRefs.current[prevIndex] : null

    if (!currentRef || !heights[index]) return

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
    if (prevRef && heights[prevIndex]) {
      prevRef.style.height = heights[prevIndex] + 'px'
      requestAnimationFrame(() => {
        prevRef.style.height = '0px'
      })
    }

    // Open new item
    currentRef.style.height = heights[index] + 'px'
    setOpenIndex(index)
  }

  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-600">Loading FAQs...</div>
          </div>
        </div>
      </section>
    )
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <section className="w-full bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-600">No FAQs found</div>
          </div>
        </div>
      </section>
    )
  }

  const { title, items } = data

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