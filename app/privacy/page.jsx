"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FaShieldAlt,
    FaLock,
    FaClock,
    FaUserSecret,
    FaDatabase,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaCookieBite,
    FaEye,
    FaTrash,
    FaCheckCircle,
    FaFileAlt,
    FaCreditCard,
    FaChartLine,
    FaBell,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { GiFruitTree } from "react-icons/gi";
import * as Icons from "react-icons/fa";

const getIcon = (iconName) => {
    if (!iconName) return FaShieldAlt;
    return Icons[iconName] || FaShieldAlt;
};

const PrivacyPolicy = ({ data: propData }) => {
    const [data, setData] = useState(propData || null);
    const [loading, setLoading] = useState(!propData);

    useEffect(() => {
        if (propData) {
            setData(propData);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch("/api/privacy-page");
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [propData]);

    if (loading) {
        return (
            <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0B1120]">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                </div>
            </section>
        );
    }

    const { hero, introduction, sections, contactInfo, footerLinks } = data;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-emerald-900 to-emerald-800 py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                </div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
                            {getIcon(hero?.icon || 'FaShieldAlt') && React.createElement(getIcon(hero?.icon || 'FaShieldAlt'), { className: "w-8 h-8 text-white" })}
                        </div>
                        <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">{hero?.title || 'Privacy Policy'}</h1>
                        <p className="text-lg text-emerald-100 max-w-2xl mx-auto">{hero?.subtitle || 'How we collect, use, and protect your personal information'}</p>
                        <div className="inline-flex items-center gap-2 mt-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <FaEye className="w-4 h-4 text-emerald-200" />
                            <span className="text-sm text-emerald-100">Last Updated: {hero?.lastUpdatedText || 'March 2026'}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Introduction */}
                        {introduction && (
                            <div className="p-6 sm:p-8 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        {getIcon(introduction.icon) && React.createElement(getIcon(introduction.icon), { className: "w-5 h-5 text-emerald-600" })}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{introduction.title}</h2>
                                        <p className="text-gray-600 leading-relaxed">{introduction.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sections */}
                        <div className="p-6 sm:p-8 space-y-8">
                            {sections?.map((section, idx) => {
                                const Icon = getIcon(section.icon);
                                return (
                                    <div key={idx} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                                        </div>
                                        <div className="pl-11 space-y-4 text-gray-600">
                                            {section.content && <p>{section.content}</p>}
                                            {section.subSections?.map((sub, subIdx) => (
                                                <div key={subIdx}>
                                                    {sub.title && <h4 className="font-medium text-gray-900 mb-2">{sub.title}</h4>}
                                                    {sub.content && <p className="mb-2">{sub.content}</p>}
                                                    {sub.listItems?.length > 0 && (
                                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                                            {sub.listItems.map((item, i) => <li key={i}>{item}</li>)}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                            {section.note && (
                                                <p className="mt-3 text-sm bg-emerald-50 p-3 rounded-lg"><span className="font-medium text-emerald-800">Note:</span> {section.note}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Contact Information */}
                        {contactInfo && (
                            <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">{contactInfo.title || 'Privacy Questions? Contact Us'}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {contactInfo.phone && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0"><FaPhoneAlt className="w-4 h-4 text-emerald-600" /></div>
                                            <div><p className="text-xs text-gray-500">Phone</p><a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="text-sm text-gray-900 hover:text-emerald-600">{contactInfo.phone}</a></div>
                                        </div>
                                    )}
                                    {contactInfo.email && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0"><FaEnvelope className="w-4 h-4 text-emerald-600" /></div>
                                            <div><p className="text-xs text-gray-500">Email</p><a href={`mailto:${contactInfo.email}`} className="text-sm text-gray-900 hover:text-emerald-600">{contactInfo.email}</a></div>
                                        </div>
                                    )}
                                    {contactInfo.address && (
                                        <div className="flex items-center gap-3 sm:col-span-2">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0"><FaMapMarkerAlt className="w-4 h-4 text-emerald-600" /></div>
                                            <div><p className="text-xs text-gray-500">Address</p><p className="text-sm text-gray-900">{contactInfo.address}</p></div>
                                        </div>
                                    )}
                                </div>
                                {contactInfo.responseTime && (
                                    <div className="mt-4 p-3 bg-emerald-50 rounded-lg"><p className="text-sm text-emerald-800 flex items-center gap-2"><FaClock className="w-4 h-4" />We typically respond within {contactInfo.responseTime}</p></div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Back to Home Link */}
                    <div className="text-center mt-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"><span>←</span><span>Back to Home</span></Link>
                    </div>

                    {/* Footer Links */}
                    {footerLinks?.showLinks && footerLinks?.links?.length > 0 && (
                        <div className="flex justify-center gap-4 mt-4 text-sm">
                            {footerLinks.links.map((link, idx) => (
                                <React.Fragment key={idx}>
                                    <Link href={link.href} className="text-gray-500 hover:text-emerald-600 transition-colors">{link.label}</Link>
                                    {idx < footerLinks.links.length - 1 && <span className="text-gray-300">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default PrivacyPolicy;