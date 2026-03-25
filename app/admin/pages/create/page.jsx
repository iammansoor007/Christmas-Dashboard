'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';

const TEMPLATES = [
    { value: 'home', label: '🏠 Home Page', description: 'Complete homepage with hero, services, testimonials, etc.' },
    { value: 'about', label: '📄 About Page', description: 'About page with founder story, mission, and team' },
    { value: 'services', label: '✨ Services Page', description: 'Services listing page' },
    { value: 'service-detail', label: '🔧 Service Detail Page', description: 'Template for individual service pages' },
    { value: 'contact', label: '📞 Contact Page', description: 'Contact form with map and business info' },
    { value: 'service-area', label: '🗺️ Service Area Page', description: 'Cities and areas we serve' },
    { value: 'gallery', label: '🖼️ Gallery Page', description: 'Image gallery with lightbox' },
    { value: 'privacy', label: '🔒 Privacy Policy', description: 'Privacy policy page' },
    { value: 'terms', label: '📜 Terms & Conditions', description: 'Terms and conditions page' }
];

export default function CreatePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        template: 'home',
        status: 'draft',
        showInNav: false,
        navLabel: '',
        seo: {
            metaTitle: '',
            metaDescription: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('seo.')) {
            const seoField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                seo: { ...prev.seo, [seoField]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/admin/pages');
            } else {
                setError(data.error || 'Failed to create page');
            }
        } catch (error) {
            setError('Error creating page');
        } finally {
            setLoading(false);
        }
    };

    // Auto-generate nav label from title
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            navLabel: title
        }));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/pages"
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <FaArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Create New Page</h1>
                    <p className="text-sm text-gray-500 mt-1">Choose a template and fill in the basic information</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {/* Page Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Page Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., About Us, Our Services, Contact"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        URL will be automatically generated: /{formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    </p>
                </div>

                {/* Template Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Page Template <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {TEMPLATES.map((template) => (
                            <label
                                key={template.value}
                                className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-all ${formData.template === template.value
                                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="template"
                                    value={template.value}
                                    checked={formData.template === template.value}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{template.label}</div>
                                    <div className="text-sm text-gray-500 mt-1">{template.description}</div>
                                </div>
                                {formData.template === template.value && (
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                                )}
                            </label>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        ⚠️ Template cannot be changed after creation
                    </p>
                </div>

                {/* Navigation Settings */}
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation Settings</h2>

                    <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="showInNav"
                                checked={formData.showInNav}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">Show in header navigation</span>
                        </label>

                        {formData.showInNav && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Navigation Label
                                </label>
                                <input
                                    type="text"
                                    name="navLabel"
                                    value={formData.navLabel}
                                    onChange={handleChange}
                                    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., About, Services"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                name="seo.metaTitle"
                                value={formData.seo.metaTitle}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Page title for search engines"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Recommended length: 50-60 characters. Leave empty to use page title.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meta Description
                            </label>
                            <textarea
                                name="seo.metaDescription"
                                value={formData.seo.metaDescription}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Brief description of the page for search results"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Recommended length: 150-160 characters
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Publication Status</h2>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                value="draft"
                                checked={formData.status === 'draft'}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="flex items-center gap-1 text-gray-700">
                                <FaEyeSlash size={14} />
                                Draft (not visible to public)
                            </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                value="published"
                                checked={formData.status === 'published'}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="flex items-center gap-1 text-gray-700">
                                <FaEye size={14} />
                                Published (visible to public)
                            </span>
                        </label>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <FaSave size={16} />
                        {loading ? 'Creating...' : 'Create Page'}
                    </button>
                    <Link
                        href="/admin/pages"
                        className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}