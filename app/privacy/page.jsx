"use client";
import React, { useEffect } from "react";
import Link from "next/link";
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

const PrivacyPolicy = () => {
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
                            <FaShieldAlt className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                            Privacy Policy
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
                            How we collect, use, and protect your personal information
                        </p>

                        {/* Last Updated */}
                        <div className="inline-flex items-center gap-2 mt-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <FaEye className="w-4 h-4 text-emerald-200" />
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
                                        Our Commitment to Privacy
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        At Christmas Lights Over Columbus, we take your privacy seriously. This Privacy Policy
                                        describes how we collect, use, and protect your personal information when you use our
                                        services or visit our website. By using our services, you consent to the practices
                                        described in this policy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Privacy Sections */}
                        <div className="p-6 sm:p-8 space-y-8">
                            {/* Section 1 - Information We Collect */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaDatabase className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">1. Information We Collect</h3>
                                </div>
                                <div className="pl-11 space-y-4 text-gray-600">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">1.1 Personal Information</h4>
                                        <p>We may collect the following personal information:</p>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>Full name and contact information (address, phone number, email)</li>
                                            <li>Property details relevant to lighting installation</li>
                                            <li>Payment information (credit card details, billing address)</li>
                                            <li>Service preferences and special requests</li>
                                            <li>Communication history with our team</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">1.2 Automatically Collected Information</h4>
                                        <p>When you visit our website, we automatically collect:</p>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>IP address and browser type</li>
                                            <li>Pages visited and time spent on our site</li>
                                            <li>Referring website or source</li>
                                            <li>Device information (operating system, screen size)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2 - How We Use Your Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaChartLine className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">2. How We Use Your Information</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>We use your information for the following purposes:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Provide and deliver our lighting services</li>
                                        <li>Process payments and manage your account</li>
                                        <li>Communicate about appointments, updates, and promotions</li>
                                        <li>Improve our services and website experience</li>
                                        <li>Respond to your questions and support needs</li>
                                        <li>Comply with legal obligations</li>
                                        <li>Prevent fraud and ensure security</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 3 - Information Sharing */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaUserSecret className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">3. Information Sharing & Disclosure</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>We do not sell your personal information. We may share information only in these circumstances:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><span className="font-medium text-gray-900">Service Providers:</span> With trusted partners who assist in delivering our services (payment processors, scheduling platforms)</li>
                                        <li><span className="font-medium text-gray-900">Legal Requirements:</span> When required by law or to protect our rights</li>
                                        <li><span className="font-medium text-gray-900">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets</li>
                                        <li><span className="font-medium text-gray-900">With Your Consent:</span> When you explicitly authorize us to share information</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 4 - Data Security */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaLock className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">4. Data Security</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>We implement industry-standard security measures to protect your information:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>SSL encryption for all data transmission</li>
                                        <li>Secure payment processing through PCI-compliant providers</li>
                                        <li>Regular security audits and monitoring</li>
                                        <li>Restricted access to personal information</li>
                                        <li>Secure data storage with reputable hosting providers</li>
                                    </ul>
                                    <p className="mt-3 text-sm bg-emerald-50 p-3 rounded-lg">
                                        <span className="font-medium text-emerald-800">Note:</span> While we strive to protect your data, no method of transmission over the internet is 100% secure.
                                    </p>
                                </div>
                            </div>

                            {/* Section 5 - Cookies & Tracking */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaCookieBite className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">5. Cookies & Tracking Technologies</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>We use cookies and similar technologies to:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Remember your preferences and settings</li>
                                        <li>Analyze website traffic and user behavior</li>
                                        <li>Improve site performance and user experience</li>
                                        <li>Deliver relevant marketing communications</li>
                                    </ul>
                                    <p className="mt-3">You can control cookies through your browser settings. Disabling cookies may affect website functionality.</p>
                                </div>
                            </div>

                            {/* Section 6 - Your Rights */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaCheckCircle className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">6. Your Privacy Rights</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>You have the right to:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><span className="font-medium text-gray-900">Access:</span> Request a copy of your personal information</li>
                                        <li><span className="font-medium text-gray-900">Correction:</span> Update or correct inaccurate information</li>
                                        <li><span className="font-medium text-gray-900">Deletion:</span> Request deletion of your information (subject to legal obligations)</li>
                                        <li><span className="font-medium text-gray-900">Opt-out:</span> Unsubscribe from marketing communications</li>
                                        <li><span className="font-medium text-gray-900">Data Portability:</span> Receive your information in a portable format</li>
                                    </ul>
                                    <p className="mt-3">To exercise these rights, contact us using the information below.</p>
                                </div>
                            </div>

                            {/* Section 7 - Children's Privacy */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaUserSecret className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">7. Children's Privacy</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        Our services are not directed to individuals under 13. We do not knowingly collect
                                        personal information from children. If you believe a child has provided us with personal
                                        information, please contact us immediately.
                                    </p>
                                </div>
                            </div>

                            {/* Section 8 - Third-Party Links */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaFileAlt className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">8. Third-Party Links</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        Our website may contain links to third-party sites. We are not responsible for the privacy
                                        practices or content of these sites. We encourage you to review their privacy policies.
                                    </p>
                                </div>
                            </div>

                            {/* Section 9 - Marketing Communications */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaBell className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">9. Marketing Communications</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        With your consent, we may send you promotional emails about our services, special offers,
                                        or holiday tips. You can opt out at any time by:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Clicking the "unsubscribe" link in our emails</li>
                                        <li>Replying "STOP" to text messages</li>
                                        <li>Contacting us directly</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Section 10 - Data Retention */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaTrash className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">10. Data Retention</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        We retain your personal information for as long as necessary to provide services and
                                        fulfill the purposes outlined in this policy, unless a longer retention period is required
                                        by law. When no longer needed, we securely delete or anonymize your information.
                                    </p>
                                </div>
                            </div>

                            {/* Section 11 - International Data Transfers */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaDatabase className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">11. International Data Transfers</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        Your information may be transferred to and processed in the United States. By using our
                                        services, you consent to this transfer. We take appropriate safeguards to protect your
                                        information regardless of location.
                                    </p>
                                </div>
                            </div>

                            {/* Section 12 - Changes to Privacy Policy */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaFileAlt className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">12. Changes to This Policy</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        We may update this Privacy Policy periodically. Changes will be posted on this page with
                                        an updated "Last Updated" date. We encourage you to review this policy regularly. Material
                                        changes will be notified through email or website notice.
                                    </p>
                                </div>
                            </div>

                            {/* Section 13 - California Privacy Rights */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaCheckCircle className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">13. California Privacy Rights</h3>
                                </div>
                                <div className="pl-11 space-y-3 text-gray-600">
                                    <p>
                                        California residents have additional rights under the California Consumer Privacy Act (CCPA),
                                        including the right to know what personal information we collect, request deletion, and opt-out
                                        of the sale of personal information (we do not sell personal information). To exercise these
                                        rights, please contact us.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Questions? Contact Us</h3>
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
                                        <a href="mailto:privacy@christmaslightsovercolumbus.com" className="text-sm text-gray-900 hover:text-emerald-600 transition-colors">
                                            privacy@christmaslightsovercolumbus.com
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
                                            Christmas Lights Over Columbus<br />
                                            Attn: Privacy Officer<br />
                                            Columbus, Ohio 43215
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                                <p className="text-sm text-emerald-800 flex items-center gap-2">
                                    <FaClock className="w-4 h-4" />
                                    We typically respond to privacy inquiries within 2-3 business days.
                                </p>
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

                    {/* Related Links */}
                    <div className="flex justify-center gap-4 mt-4 text-sm">
                        <Link href="/terms" className="text-gray-500 hover:text-emerald-600 transition-colors">
                            Terms & Conditions
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/cookie-policy" className="text-gray-500 hover:text-emerald-600 transition-colors">
                            Cookie Policy
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

export default PrivacyPolicy;