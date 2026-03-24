'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CallToAction from '../../components/CallToAction';
import {
    FaCheckCircle,
    FaArrowRight,
    FaShieldAlt,
    FaClock,
    FaStar,
    FaHome,
    FaTree,
    FaLightbulb,
    FaTools,
    FaBoxOpen,
    FaPhoneAlt,
    FaCalendarAlt,
    FaGem,
    FaRuler,
    FaPalette,
    FaTimes,
    FaUser,
    FaEnvelope,
    FaSpinner,
    FaAward,
    FaQuoteLeft,
    FaBuilding,
    FaMobile,
    FaWifi,
    FaRegSun
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
import * as Icons from 'react-icons/fa';

const ConsultationModal = ({ isOpen, onClose }) => {
    // Keep your existing modal code (same as before)
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '',
        serviceType: 'seasonal', preferredDate: '', preferredTime: '', message: '', hearAbout: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const modalRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', phone: '', address: '', serviceType: 'seasonal', preferredDate: '', preferredTime: '', message: '', hearAbout: '' });
                onClose();
            }, 3000);
        } catch (error) {
            setError('Network error. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    const serviceTypes = [
        { value: 'seasonal', label: 'Seasonal Christmas Lighting' },
        { value: 'permanent', label: 'Permanent Lighting Installation' },
        { value: 'commercial', label: 'Commercial Property' },
        { value: 'consultation', label: 'General Consultation' }
    ];
    const hearOptions = ['Google Search', 'Facebook', 'Instagram', 'Friend/Family Referral', 'Previous Customer', 'Other'];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden" onClick={handleBackdropClick}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />
            <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
                <div ref={modalRef} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col">
                    <button onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow-md hover:rotate-90">
                        <FaTimes className="text-gray-600" />
                    </button>

                    {isSubmitted ? (
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <FaCheckCircle className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Consultation Scheduled!</h3>
                            <p className="text-gray-600">We'll contact you within 24 hours.</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-t-3xl p-6 flex-shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <GiSparkles className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Schedule Free Consultation</h3>
                                        <p className="text-emerald-100 text-sm">Christmas Lights Over Columbus</p>
                                    </div>
                                </div>
                            </div>

                            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm">{error}</div>}
                                    <div className="space-y-4">
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Full Name *" />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Email Address *" />
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Phone Number *" />
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Service Address *" />
                                        <select name="serviceType" value={formData.serviceType} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                            {serviceTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                                        </select>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                                            <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} required className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                                <option value="">Select</option>
                                                {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                                            </select>
                                        </div>
                                        <select name="hearAbout" value={formData.hearAbout} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500">
                                            <option value="">How did you hear about us?</option>
                                            {hearOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                        </select>
                                        <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Tell us about your vision..." />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full mt-6 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50">
                                        {isSubmitting ? <span className="flex items-center justify-center gap-2"><FaSpinner className="animate-spin" /> Scheduling...</span> :
                                            <span className="flex items-center justify-center gap-2"><FaCalendarAlt /> Schedule Free Consultation</span>}
                                    </button>
                                    <p className="text-xs text-gray-500 text-center mt-4">By submitting, you agree to be contacted.</p>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const getIcon = (iconName) => {
    if (!iconName) return FaStar;
    return Icons[iconName] || FaStar;
};

const ServiceDetailPage = ({ params }) => {
    const unwrappedParams = React.use(params);
    const slug = unwrappedParams.slug;

    const [mounted, setMounted] = useState(false);
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollProgress, setScrollProgress] = useState(0);
    const heroRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                let apiEndpoint = '';
                if (slug === 'residential-lighting') {
                    apiEndpoint = '/api/residential-page';
                } else if (slug === 'commercial-lighting') {
                    apiEndpoint = '/api/commercial-page';
                } else if (slug === 'permanent-lighting') {
                    apiEndpoint = '/api/permanent-page';
                } else {
                    setLoading(false);
                    return;
                }

                const response = await fetch(apiEndpoint);
                const data = await response.json();
                setServiceData(data);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
            }
        };

        const handleScroll = () => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setScrollProgress(Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5))));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('scroll', handleScroll); };
    }, [slug]);

    if (!mounted || loading) {
        return (
            <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120]">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    if (!serviceData) {
        return (
            <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120]">
                <div className="text-white text-center">
                    <p className="mb-4">Service not found</p>
                    <Link href="/services" className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
                        Back to Services
                    </Link>
                </div>
            </section>
        );
    }

    const { hero, overview, features, whyChoose, bottomCta } = serviceData;

    return (
        <main className="overflow-x-hidden w-full bg-white">
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center w-full overflow-hidden">
                <div className="absolute inset-0">
                    <div className="relative w-full h-full transition-transform duration-200 ease-out" style={{ transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px) scale(1.05)` }}>
                        <Image src={hero?.backgroundImage || "/images/hero-background2.jpg"} alt="Service" fill className="object-cover" priority />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-gray-900/90 to-red-500/30"></div>
                </div>

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`, backgroundSize: '50px 50px' }}></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent transition-opacity duration-300" style={{ opacity: scrollProgress }}></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
                            <HiOutlineSparkles className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/90 text-sm font-medium tracking-wider">{hero?.badge}</span>
                        </div>

                        <h1 className="font-montserrat font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
                            <span className="block animate-title-slide-up">{hero?.title?.line1}</span>
                            <span className="block relative animate-title-slide-up animation-delay-200">
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400">
                                        {hero?.title?.line2}
                                    </span>
                                </span>
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-up animation-delay-400">
                            {hero?.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up animation-delay-600">
                            <a href={`tel:${hero?.cta?.phone || '+16143017100'}`} className="relative overflow-hidden group inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px] cursor-pointer">
                                {hero?.cta?.text || 'Get Your Free Quote'}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            {overview && (
                <section id="details" className="py-16 sm:py-20 md:py-24 bg-white">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="animate-fade-up">
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-full px-4 py-1.5 mb-4">
                                        <GiSparkles className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-emerald-700 text-xs font-medium tracking-wider">{overview.badge || 'OVERVIEW'}</span>
                                    </div>
                                    <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
                                        <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                                            {overview.title}
                                        </span>
                                    </h2>
                                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                        {overview.description}
                                    </p>
                                </div>

                                <div className="relative animate-fade-up animation-delay-200">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                        <Image src={overview.image || "/images/placeholder.jpg"} alt={overview.title} width={800} height={600} className="w-full h-full object-cover" unoptimized />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Features Section */}
            {features && features.items?.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center max-w-2xl mx-auto mb-16">
                                <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                                    <GiSparkles className="w-4 h-4 text-emerald-600" />
                                    <span className="text-emerald-700 text-sm font-semibold">{features.badge || 'WHAT WE OFFER'}</span>
                                </div>
                                <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-4">
                                    {features.title}
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    {features.subtitle}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {features.items.map((feature, idx) => {
                                    const IconComponent = getIcon(feature.icon);
                                    return (
                                        <div key={idx} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                            <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Us Section */}
            {whyChoose && (
                <section className="py-12 lg:px-8 bg-white overflow-hidden">
                    <div className="container mx-auto px-4 sm:px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                                        <FaAward className="w-4 h-4 text-emerald-600" />
                                        <span className="text-emerald-700 text-sm font-semibold">{whyChoose.badge || 'WHY CHOOSE US'}</span>
                                    </div>
                                    <h2 className="font-montserrat font-bold text-4xl text-gray-900 mb-6">
                                        {whyChoose.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg mb-8">
                                        {whyChoose.description}
                                    </p>
                                    <div className="space-y-4">
                                        {whyChoose.benefits?.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <a href={`tel:${hero?.cta?.phone || '+16143017100'}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all">
                                            Get Your Free Quote
                                            <FaArrowRight />
                                        </a>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                        <Image src={whyChoose.image || "/images/gallery3.jpg"} alt={whyChoose.title} width={600} height={400} className="w-full h-[400px] object-cover" unoptimized />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                    </div>

                                    {whyChoose.galleryImages?.map((img, idx) => {
                                        if (idx === 0) {
                                            return (
                                                <div key={idx} className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                                                    <Image src={img} alt="Gallery" width={200} height={200} className="w-full h-full object-cover" unoptimized />
                                                </div>
                                            );
                                        }
                                        if (idx === 1) {
                                            return (
                                                <div key={idx} className="absolute -top-8 -right-8 w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                                                    <Image src={img} alt="Gallery" width={160} height={160} className="w-full h-full object-cover" unoptimized />
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}

                                    <div className="absolute top-1/2 -right-12 w-24 h-24 bg-emerald-200/30 rounded-full blur-2xl"></div>
                                    <div className="absolute bottom-1/4 -left-12 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl"></div>
                                    <div className="absolute top-10 right-10 text-white"><GiSparkles className="w-6 h-6 animate-pulse" /></div>
                                    <div className="absolute bottom-20 left-20 text-white"><HiOutlineSparkles className="w-4 h-4 animate-pulse animation-delay-200" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}



            <section className="p-8"><CallToAction /></section>

            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <style jsx global>{`
                @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
                @keyframes titleSlideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
                @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
                .animate-blob { animation: blob 10s infinite }
                .animate-title-slide-up { animation: titleSlideUp 0.8s forwards; opacity:0 }
                .animate-fade-up { animation: fadeUp 0.6s forwards; opacity:0 }
                .animation-delay-200 { animation-delay:200ms }
                .animation-delay-400 { animation-delay:400ms }
                .animation-delay-600 { animation-delay:600ms }
                .animation-delay-800 { animation-delay:800ms }
                .animation-delay-2000 { animation-delay:2000ms }
            `}</style>
        </main>
    );
};

export default ServiceDetailPage;