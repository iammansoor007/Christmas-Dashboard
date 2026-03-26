"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiSparkles } from "react-icons/gi";

const ChristmasLightingSection = ({ data: propData }) => {
  const [data, setData] = useState(propData || null);
  const [loading, setLoading] = useState(!propData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (propData) {
      setData(propData);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const response = await fetch("/api/christmas-lighting");

        if (!response.ok) {
          throw new Error("Failed to load data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [propData]);

  const handleCTAClick = (e, link) => {
    if (link?.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(link.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (loading) {
    return (
      <section className="w-full min-h-[600px] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          <GiSparkles className="absolute inset-0 m-auto text-2xl text-amber-500 animate-pulse" />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="w-full min-h-[600px] flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Failed to load content</p>
        </div>
      </section>
    );
  }

  const { title, paragraphs, cta, image } = data;

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* TWO DIV LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* LEFT DIV - TALL IMAGE */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="relative pb-[100%] lg:pb-[110%]">
                  <Image
                    src={image || "/images/heroowner.jpg"}
                    alt="Owner - Christmas Lights Over Columbus"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-amber-400/20 rounded-full blur-2xl" />
                <div className="absolute -top-3 -left-3 w-20 h-20 bg-rose-400/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>

          {/* RIGHT DIV */}
          <div className="w-full lg:w-1/2 space-y-2 md:space-y-8">
            {/* Heading */}
            <div className="space-y-2">
              <h2 className="text-left font-montserrat text-4xl md:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                  {title || "Serving Columbus With Stress Free Holiday Lighting"}
                </span>
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4">
              {paragraphs?.map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {cta?.primary?.link ? (
                  cta.primary.link.startsWith('http') ? (
                    <a
                      href={cta.primary.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                        <span>{cta.primary.text || "Get My Free Quote"}</span>
                      </span>
                    </a>
                  ) : cta.primary.link.startsWith('/') ? (
                    <Link
                      href={cta.primary.link}
                      className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                        <span>{cta.primary.text || "Get My Free Quote"}</span>
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={(e) => handleCTAClick(e, cta.primary.link)}
                      className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                        <span>{cta.primary.text || "Get My Free Quote"}</span>
                      </span>
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      const section = document.getElementById("freequote");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                      <span>{cta?.primary?.text || "Get My Free Quote"}</span>
                    </span>
                  </button>
                )}

                {cta?.secondary?.link ? (
                  cta.secondary.link.startsWith('/') ? (
                    <Link
                      href={cta.secondary.link}
                      className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-300"
                    >
                      {cta.secondary.text || "View Gallery"}
                    </Link>
                  ) : (
                    <a
                      href={cta.secondary.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-300"
                    >
                      {cta.secondary.text || "View Gallery"}
                    </a>
                  )
                ) : (
                  <button
                    onClick={() => (window.location.href = "/gallery")}
                    className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-300"
                  >
                    {cta?.secondary?.text || "View Gallery"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChristmasLightingSection;