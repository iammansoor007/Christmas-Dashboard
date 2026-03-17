// components/Testimonials.jsx
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

// Color palette from heading gradient
const BRAND_COLORS = {
  red: "#DC2626",
  amber: "#F59E0B",
  emerald: "#059669",
  dark: "#1F2937",
  light: "#FFFFFF",
  lightGray: "#F9FAFB",
  gray: "#6B7280",
  border: "#E5E7EB",
  gradientAmber: "linear-gradient(135deg, #DC2626, #F59E0B)",
  gradientLight: "linear-gradient(135deg, #FFFFFF, #F9FAFB)",
};

const CARD_WIDTH = 380;
const CARD_GAP = 24;
const DRAG_THRESHOLD = 50;
const AUTO_ROTATE_INTERVAL = 5000;

// Get sequential color based on index
const getColorForIndex = (index) => {
  const colorArray = [
    BRAND_COLORS.red,
    BRAND_COLORS.amber,
    BRAND_COLORS.emerald,
  ];
  return colorArray[index % colorArray.length];
};

const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeStarCount, setActiveStarCount] = useState(0);
  const [data, setData] = useState(null);
  const containerRef = useRef(null);
  const autoRotateTimerRef = useRef(null);
  const dragStartX = useRef(0);

  const dragX = useMotionValue(0);
  const dragXSpring = useSpring(dragX, { stiffness: 250, damping: 25 });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Define testimonialsList here to avoid conditional useCallback
  const testimonialsList =
    data?.testimonials?.items?.map((item, index) => ({
      ...item,
      color: getColorForIndex(index),
    })) || [];

  const animateStars = useCallback(() => {
    setActiveStarCount(0);

    const starCount = 5;
    const starDelay = 150;

    for (let i = 1; i <= starCount; i++) {
      setTimeout(() => {
        setActiveStarCount(i);
      }, i * starDelay);
    }
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonialsList.length);
  }, [testimonialsList.length]);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length,
    );
  }, [testimonialsList.length]);

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  // Auto-rotate functionality
  useEffect(() => {
    if (!isAutoRotating || testimonialsList.length === 0) return;

    const startAutoRotate = () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }

      autoRotateTimerRef.current = setInterval(() => {
        next();
      }, AUTO_ROTATE_INTERVAL);
    };

    startAutoRotate();

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [isAutoRotating, next, testimonialsList.length]);

  // Animate stars when current card changes
  useEffect(() => {
    if (testimonialsList.length > 0) {
      animateStars();
    }
  }, [current, animateStars, testimonialsList.length]);

  const handleDragStart = (event) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartX.current = event.clientX;
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    setIsAutoRotating(true);

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > DRAG_THRESHOLD || Math.abs(velocity) > 500) {
      if (offset > 0 || velocity > 500) {
        prev();
      } else {
        next();
      }
    }

    dragX.set(0);
  };

  const getCardStyle = (index) => {
    const diff = index - current;
    const total = testimonialsList.length;

    if (total === 0) return {};

    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;

    const distance = Math.abs(normalizedDiff);
    const isActive = index === current;

    // Calculate position based on index difference
    const baseX = normalizedDiff * (CARD_WIDTH + CARD_GAP);

    // Add drag offset only to the active card when dragging
    const dragOffset = isActive && isDragging ? dragX.get() : 0;

    return {
      x: baseX + dragOffset,
      scale: distance === 0 ? 1 : distance === 1 ? 0.85 : 0.7,
      opacity: distance >= 2 ? 0 : distance === 1 ? 0.5 : 1,
      zIndex: 100 - distance,
      filter: isActive ? "none" : `blur(${distance * 0.5}px)`,
    };
  };

  const renderStars = (
    rating = 5,
    isActive = false,
    color = BRAND_COLORS.amber,
  ) => {
    if (!isActive) {
      return (
        <div className="flex items-center gap-1 h-[30px]">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 md:w-6 md:h-6"
              style={{
                fill: color + "30",
                stroke: color + "30",
                strokeWidth: 1.5,
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 h-[30px]">
        {[...Array(rating)].map((_, i) => {
          const starNumber = i + 1;
          const isFilled = starNumber <= activeStarCount;

          return (
            <motion.div
              key={i}
              className="relative"
              animate={{
                scale: isFilled ? [0.8, 1.2, 1] : 1,
              }}
              transition={{
                delay: i * 0.15,
                duration: 0.3,
              }}
            >
              <Star
                className="w-5 h-5 md:w-6 md:h-6"
                style={{
                  fill: isFilled ? color : "transparent",
                  stroke: isFilled ? color : color + "30",
                  strokeWidth: 2,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    );
  };

  if (!data) {
    return (
      <section className="py-8 lg:py-12 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 relative max-w-7xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-600">Loading testimonials...</div>
          </div>
        </div>
      </section>
    );
  }

  const { testimonials } = data;
  const currentTestimonial = testimonialsList[current] || {
    color: BRAND_COLORS.amber,
  };

  return (
    <section
      id="testimonials"
      className="py-8 lg:py-12 relative overflow-hidden bg-white min-h-[700px]"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 relative max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-6 lg:mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-emerald-600/10 rounded-full shadow-sm mb-6 border border-amber-500/30">
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
              {testimonials.badge}
            </span>
          </div>

          <h2 className="text-4xl font-montserrat md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            <span className="block">{testimonials.title.line1}</span>
            <span className="block mt-2 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
              {testimonials.title.line2}
            </span>
          </h2>

          <p className="text-lg md:text-xl font-montserrat text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {testimonials.subtitle}
          </p>

          {/* Decorative divider */}
          <div className="mt-8 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Coverflow Carousel */}
        <div className="relative h-[500px] w-full overflow-visible">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* Drag overlay - only for active card */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ x: dragXSpring }}
            />

            {/* Cards container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence>
                {testimonialsList.map((testimonial, index) => {
                  const style = getCardStyle(index);
                  const isActive = index === current;

                  return (
                    <motion.div
                      key={testimonial.id}
                      className="absolute"
                      initial={false}
                      animate={style}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                      }}
                      style={{
                        width: CARD_WIDTH,
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                        cursor: isActive ? "grab" : "pointer",
                      }}
                      whileTap={{ cursor: "grabbing" }}
                      {...(isActive && {
                        drag: "x",
                        dragConstraints: {
                          left: -CARD_WIDTH * 0.5,
                          right: CARD_WIDTH * 0.5,
                        },
                        dragElastic: 0.1,
                        dragMomentum: false,
                        onDragStart: handleDragStart,
                        onDragEnd: handleDragEnd,
                        whileDrag: { scale: 1.02 },
                      })}
                      onClick={() => !isDragging && !isActive && goTo(index)}
                    >
                      {/* Card Container */}
                      <div className="relative">
                        <div
                          className="p-6 md:p-8 rounded-2xl relative overflow-hidden"
                          style={{
                            background: BRAND_COLORS.gradientLight,
                            border: `1px solid ${isActive ? testimonial.color + "30" : BRAND_COLORS.border}`,
                            boxShadow: isActive
                              ? `0 25px 50px -12px ${testimonial.color}25, 
                                 0 8px 24px -8px rgba(0, 0, 0, 0.15)`
                              : "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
                            height: "420px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {/* Card top accent */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                            style={{
                              background: isActive
                                ? `linear-gradient(to right, ${testimonial.color}, ${testimonial.color}80)`
                                : "transparent",
                            }}
                          />

                          {/* Service Badge */}
                          <div
                            className="absolute top-6 left-6 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-sm"
                            style={{
                              background: testimonial.color,
                            }}
                          >
                            {testimonial.service}
                          </div>

                          {/* Quote Icon */}
                          <div
                            className="absolute top-6 right-6 opacity-5"
                            style={{ color: testimonial.color }}
                          >
                            <Quote className="w-10 h-10" />
                          </div>

                          {/* Content */}
                          <div className="flex flex-col h-full pt-12">
                            {/* Stars */}
                            <div className="flex flex-col items-center mb-6">
                              <div className="mb-2" style={{ height: "30px" }}>
                                {renderStars(
                                  testimonial.rating,
                                  isActive,
                                  testimonial.color,
                                )}
                              </div>
                            </div>

                            {/* Quote */}
                            <div className="flex-grow min-h-0 mb-6">
                              <blockquote
                                className="text-lg md:text-xl text-gray-700 leading-relaxed font-light relative h-full"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 4,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                <span
                                  className="absolute -left-2 -top-2 text-3xl opacity-20"
                                  style={{ color: testimonial.color }}
                                >
                                  "
                                </span>
                                {testimonial.quote}
                                <span
                                  className="absolute -right-2 -bottom-2 text-3xl opacity-20"
                                  style={{ color: testimonial.color }}
                                >
                                  "
                                </span>
                              </blockquote>
                            </div>

                            {/* Author Info */}
                            <div className="pt-6 border-t border-gray-100">
                              <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 shrink-0">
                                  <img
                                    src={testimonial.image}
                                    alt={testimonial.author}
                                    className="rounded-full object-cover w-full h-full border-2"
                                    style={{
                                      borderColor: testimonial.color + "30",
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div
                                    className="font-bold text-base truncate text-gray-900"
                                    style={{
                                      color: isActive
                                        ? testimonial.color
                                        : BRAND_COLORS.dark,
                                    }}
                                  >
                                    {testimonial.author}
                                  </div>
                                  <div className="text-sm truncate text-gray-600">
                                    {testimonial.role}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="text-xs truncate flex-1 text-gray-500">
                                      {testimonial.company}
                                    </div>
                                    <div
                                      className="text-xs px-2 py-1 rounded-full"
                                      style={{
                                        backgroundColor:
                                          testimonial.color + "10",
                                        color: testimonial.color,
                                        border:
                                          "1px solid " +
                                          testimonial.color +
                                          "20",
                                      }}
                                    >
                                      {testimonial.location}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-8 mt-8">
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => {
                prev();
                setIsAutoRotating(false);
                setTimeout(() => setIsAutoRotating(true), 1000);
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              style={{
                background: "white",
                border: `1px solid ${BRAND_COLORS.amber}30`,
                color: currentTestimonial.color,
                boxShadow: `0 4px 12px -2px ${currentTestimonial.color}15`,
              }}
              aria-label="Previous testimonial"
              disabled={testimonialsList.length === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-3 mx-4">
              {testimonialsList.map((testimonial, index) => {
                const isActive = index === current;
                const isAdjacent =
                  Math.abs(index - current) === 1 ||
                  Math.abs(index - current) === testimonialsList.length - 1;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      goTo(index);
                      setIsAutoRotating(false);
                      setTimeout(() => setIsAutoRotating(true), 1000);
                    }}
                    className={`rounded-full transition-all duration-300 ${isActive ? "w-12 h-2" : "w-2 h-2"
                      }`}
                    style={{
                      backgroundColor: isActive
                        ? testimonial.color
                        : isAdjacent
                          ? testimonial.color + "40"
                          : BRAND_COLORS.gray + "20",
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                    disabled={testimonialsList.length === 0}
                  />
                );
              })}
            </div>

            <button
              onClick={() => {
                next();
                setIsAutoRotating(false);
                setTimeout(() => setIsAutoRotating(true), 1000);
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              style={{
                background: "white",
                border: `1px solid ${BRAND_COLORS.amber}30`,
                color: currentTestimonial.color,
                boxShadow: `0 4px 12px -2px ${currentTestimonial.color}15`,
              }}
              aria-label="Next testimonial"
              disabled={testimonialsList.length === 0}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Counter with auto-rotate indicator */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              <span
                className="font-semibold"
                style={{ color: currentTestimonial.color }}
              >
                {current + 1}
              </span>
              <span className="mx-1">/</span>
              <span>{testimonialsList.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isAutoRotating ? "animate-pulse" : ""
                  }`}
                style={{
                  backgroundColor: isAutoRotating
                    ? currentTestimonial.color
                    : BRAND_COLORS.gray,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;