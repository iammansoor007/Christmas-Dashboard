"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
    FaShieldAlt,
    FaFileContract,
    FaGavel,
    FaMoneyBillWave,
    FaClock,
    FaUserSecret,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaFileSignature,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { GiFruitTree } from "react-icons/gi";

const TermsAndConditions = () => {
    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Last updated date
    const lastUpdated = "March 2026";

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-emerald-900 to-emerald-800 py-16 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                </div>

                {/* Decorative Orbs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
                            <FaFileContract className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                            Terms & Conditions
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
                            Please read these terms carefully before using our services
                        </p>

                        {/* Last Updated */}
                        <div className="inline-flex items-center gap-2 mt-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <FaClock className="w-4 h-4 text-emerald-200" />
                            <span className="text-sm text-emerald-100">Last Updated: {lastUpdated}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Main Content Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Intro */}
                        <div className="p-6 sm:p-8 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <GiFruitTree className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        Agreement to Terms
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        These Terms and Conditions ("Terms") govern your use of the services provided by
                                        Christmas Lights Over Columbus ("Company," "we," "us," or "our"). By accessing or
                                        using our services, you agree to be bound by these Terms. If you disagree with any
                                        part of these Terms, please do not use our services.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Terms Sections */}
                        <div className="p-6 sm:p-8 space-y-8">
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaFileSignature className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">1. Service Agreement</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">1.1 Service Scope:</span> Christmas Lights Over Columbus
                                        agrees to provide professional holiday lighting installation, maintenance, and removal services
                                        as described in your service agreement.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">1.2 Service Period:</span> The service period begins on
                                        the installation date and continues through the agreed-upon removal date. Any changes to this
                                        schedule require written notice at least 48 hours in advance.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">1.3 Weather Delays:</span> We reserve the right to reschedule
                                        services due to inclement weather or unsafe conditions. We will make every effort to notify you
                                        promptly and reschedule at the earliest available time.
                                    </p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaMoneyBillWave className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">2. Pricing & Payments</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">2.1 Pricing:</span> All prices are quoted in USD and are
                                        valid for 30 days from the date of the quote. Prices include labor, materials, and standard
                                        installation unless otherwise specified.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">2.2 Payment Terms:</span> A 50% deposit is required to
                                        secure your installation date. The remaining balance is due upon completion of installation.
                                        We accept major credit cards, checks, and electronic payments.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">2.3 Cancellation Policy:</span> Cancellations made more
                                        than 7 days before installation receive a full refund of deposit. Cancellations within 7 days
                                        of installation may forfeit the deposit.
                                    </p>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaShieldAlt className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">3. Liability & Insurance</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">3.1 Insurance Coverage:</span> Christmas Lights Over Columbus
                                        carries full liability insurance and workers' compensation coverage. Proof of insurance is
                                        available upon request.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">3.2 Property Damage:</span> We take utmost care with your
                                        property. In the unlikely event of damage, we will work with you and our insurance provider
                                        to address the issue promptly.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">3.3 Equipment:</span> All lights and equipment remain the
                                        property of Christmas Lights Over Columbus unless explicitly purchased. Any damage to our
                                        equipment due to customer negligence may result in replacement costs.
                                    </p>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaGavel className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">4. Customer Responsibilities</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">4.1 Access:</span> Customers must provide clear access to
                                        all installation areas. This includes unlocked gates, clear pathways, and notification of any
                                        potential hazards.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">4.2 Electrical Requirements:</span> Working outdoor electrical
                                        outlets must be available within 100 feet of installation areas. Additional fees may apply for
                                        generator rental if needed.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">4.3 Storage:</span> If storing lights between seasons, customers
                                        must provide a clean, dry, secure location. We are not responsible for stored equipment damaged
                                        by environmental factors.
                                    </p>
                                </div>
                            </div>

                            {/* Section 5 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaExclamationTriangle className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">5. Safety & Compliance</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">5.1 Safety Standards:</span> All installations comply with
                                        local electrical codes and industry safety standards. Our team is trained in proper ladder safety
                                        and electrical protocols.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">5.2 Modifications:</span> Customers should not modify, adjust,
                                        or attempt to repair installed lighting. Contact us immediately if you notice any issues.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">5.3 Emergency Situations:</span> In case of emergency or
                                        hazardous conditions (downed wires, etc.), call 911 immediately, then contact our emergency line
                                        at (614) 301-7100.
                                    </p>
                                </div>
                            </div>

                            {/* Section 6 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaUserSecret className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">6. Privacy & Data</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">6.1 Information Collection:</span> We collect necessary
                                        personal information to provide our services. This includes name, address, phone number, email,
                                        and property details relevant to installation.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">6.2 Data Usage:</span> Your information is used solely for
                                        service delivery, communication, and marketing communications you've opted into. We never sell
                                        your information to third parties.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">6.3 Photography:</span> We may photograph completed work for
                                        our portfolio and marketing. Please notify us in writing if you prefer your property not be
                                        photographed.
                                    </p>
                                </div>
                            </div>

                            {/* Section 7 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaCheckCircle className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">7. Warranties & Guarantees</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">7.1 Workmanship Guarantee:</span> We guarantee our
                                        installation workmanship for the entire holiday season. If any issues arise due to our
                                        installation, we'll address them promptly at no charge.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">7.2 Equipment Warranty:</span> Manufacturer warranties
                                        apply to all lighting products. We'll assist with warranty claims for defective equipment.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">7.3 Satisfaction:</span> Your satisfaction is our priority.
                                        If you're unhappy with any aspect of our service, please contact us within 48 hours so we can
                                        make it right.
                                    </p>
                                </div>
                            </div>

                            {/* Section 8 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaCalendarAlt className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">8. Season-Long Services</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">8.1 Maintenance Visits:</span> For customers with
                                        season-long service packages, we provide scheduled maintenance visits. Additional visits
                                        may incur extra charges.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">8.2 Bulb Replacement:</span> We replace burnt-out bulbs
                                        during scheduled maintenance. Emergency replacements may be available for an additional fee.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">8.3 End-of-Season Removal:</span> Removal is scheduled
                                        within 2 weeks after the holiday season. Please ensure access to your property during this time.
                                    </p>
                                </div>
                            </div>

                            {/* Section 9 - Dispute Resolution */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaGavel className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">9. Dispute Resolution</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">9.1 Governing Law:</span> These Terms shall be governed by
                                        the laws of the State of Ohio without regard to its conflict of law provisions.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">9.2 Dispute Process:</span> Any disputes arising from these
                                        Terms or our services shall first be attempted to be resolved through good-faith negotiations.
                                        If unresolved, disputes may be submitted to mediation in Franklin County, Ohio.
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">9.3 Small Claims:</span> Either party may bring qualifying
                                        claims in small claims court in Franklin County, Ohio.
                                    </p>
                                </div>
                            </div>

                            {/* Section 10 - Changes to Terms */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaFileContract className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">10. Changes to Terms</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        We reserve the right to modify these Terms at any time. Changes will be effective immediately
                                        upon posting to our website. Your continued use of our services after changes constitutes
                                        acceptance of the modified Terms.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions? Contact Us</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaPhoneAlt className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <a href="tel:+16143017100" className="text-sm text-gray-900 hover:text-emerald-600 transition-colors">
                                            (614) 301-7100
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaEnvelope className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <a href="mailto:info@christmaslightsovercolumbus.com" className="text-sm text-gray-900 hover:text-emerald-600 transition-colors">
                                            info@christmaslightsovercolumbus.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:col-span-2">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Address</p>
                                        <p className="text-sm text-gray-900">
                                            Columbus, Ohio 43215
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home Link */}
                    <div className="text-center mt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors group"
                        >
                            <span>←</span>
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
        </main>
    );
};

export default TermsAndConditions;