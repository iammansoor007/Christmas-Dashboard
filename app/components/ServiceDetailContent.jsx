"use client";
import React from "react";
import Image from "next/image";
import { FaArrowRight, FaCheckCircle, FaStar, FaMedal, FaShieldAlt, FaClock, FaDollarSign } from "react-icons/fa";
import * as Icons from "react-icons/fa";
import CallToAction from "./CallToAction";

const iconMap = {
  FaCheckCircle, FaStar, FaMedal, FaShieldAlt, FaClock, FaDollarSign, ...Icons
};

const getIcon = (iconName) => {
  if (!iconName) return null;
  const Icon = iconMap[iconName];
  return Icon ? <Icon /> : <FaStar />;
};

export default function ServiceDetailContent({ data }) {
  if (!data) return null;

  const {
    title,
    badgeText,
    number,
    description,
    longDescription,
    heroTitle,
    heroHighlight,
    heroGradientFrom = "#10b981",
    heroGradientTo = "#f59e0b",
    images = {},
    features = [],
    process = [],
    whyChoose = {}
  } = data;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.hero || "/images/hero-background2.jpg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="text-amber-400 font-bold">{number || "01"}</span>
              <div className="w-px h-4 bg-white/30"></div>
              <span className="text-white/90 text-sm font-medium tracking-widest uppercase">{badgeText || title}</span>
            </div>

            <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              {heroTitle?.line1 || title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                {heroTitle?.line2 || heroHighlight}
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              {description}
            </p>

            <button 
              onClick={() => document.getElementById('freequote')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Professional {title} Services
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                {longDescription?.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0">
                      {getIcon(feature.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={images.main || "/images/gallery3.jpg"}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl hidden sm:block max-w-xs">
                <div className="flex gap-1 text-amber-400 mb-2">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <p className="text-sm italic text-gray-600">
                  "The best holiday lighting service in Columbus. Efficient, professional, and stunning results!"
                </p>
                <p className="mt-4 font-bold text-gray-900">— Satisfied Homeowner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Simple 4-Step Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We take care of everything from start to finish, so you can enjoy a stress-free holiday season.</p>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={i} className="relative group">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative z-10">
                  <span className="text-5xl font-black text-gray-100 absolute top-4 right-4 group-hover:text-amber-100 transition-colors">0{i+1}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 relative">{step.step}</h3>
                  <p className="text-gray-600 text-sm relative">{step.description}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gray-200 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-3xl relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {whyChoose.title || "Why Choose Us For Your Lighting Needs?"}
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                {whyChoose.description || "We provide high-quality lighting solutions tailored to your unique needs. Our experienced team ensures a seamless installation process, high-quality products, and outstanding customer service."}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {(whyChoose.items || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-white text-xs" />
                    </div>
                    <span className="text-white font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction />
    </div>
  );
}
