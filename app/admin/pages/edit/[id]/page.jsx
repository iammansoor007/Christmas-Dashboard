'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSave, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { TEMPLATE_DEFAULTS } from '../../../../../lib/templateDefaults';

const TEMPLATE_INFO = {
    home: 'Home Page',
    about: 'About Page',
    services: 'Services Page',
    'service-detail': 'Service Detail Page',
    contact: 'Contact Page',
    'service-area': 'Service Area Page',
    gallery: 'Gallery Page',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions'
};

export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [page, setPage] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch page data
    useEffect(() => {
        const fetchPage = async () => {
            try {
                const response = await fetch(`/api/pages/${id}?preview=true`);
                const data = await response.json();
                setPage(data);
                setFormData(data);
            } catch (error) {
                console.error('Error fetching page:', error);
                setError('Failed to load page');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPage();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('seo.')) {
            setFormData(prev => ({
                ...prev,
                seo: { ...prev.seo, [seoField]: value }
            }));
        } else if (name.startsWith('content.')) {
            const parts = name.split('.'); // e.g., ["content", "aboutSection", "paragraphs", "0"]
            setFormData(prev => {
                const newFormData = { ...prev };
                let current = newFormData;
                for (let i = 0; i < parts.length - 1; i++) {
                    const part = parts[i];
                    
                    // If the current part is an array, we need special handling
                    if (Array.isArray(current[part])) {
                        current[part] = [...current[part]];
                    } else {
                        current[part] = { ...current[part] };
                    }
                    current = current[part];
                }
                current[parts[parts.length - 1]] = value;
                return newFormData;
            });
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/pages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Page updated successfully!');
                setPage(data);
                setFormData(data);
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.error || 'Failed to update page');
            }
        } catch (error) {
            setError('Error updating page');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this page? This action cannot be undone.')) return;

        try {
            const response = await fetch(`/api/pages?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                router.push('/admin/pages');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete page');
            }
        } catch (error) {
            alert('Error deleting page');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!page) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-600">Page not found</p>
                <Link href="/admin/pages" className="mt-4 inline-block text-blue-600 hover:underline">
                    Back to Pages
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/pages"
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Page</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Template: {TEMPLATE_INFO[page.template] || page.template}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <FaTrash size={16} />
                    Delete Page
                </button>
            </div>

            {/* Success Message */}
            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    {success}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Page Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Page Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        URL: /{formData.slug || '...'}
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
                                checked={formData.showInNav || false}
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
                                    value={formData.navLabel || ''}
                                    onChange={handleChange}
                                    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        )}
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
                                Draft
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
                                Published
                            </span>
                        </label>
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
                                value={formData.seo?.metaTitle || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Page title for search engines"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meta Description
                            </label>
                            <textarea
                                name="seo.metaDescription"
                                value={formData.seo?.metaDescription || ''}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Brief description of the page for search results"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                OG Image
                            </label>
                            <input
                                type="text"
                                name="seo.ogImage"
                                value={formData.seo?.ogImage || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="/uploads/image.jpg"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Recommended size: 1200x630px
                            </p>
                        </div>
                    </div>
                </div>

                {/* Page Content Editor */}
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Page Content</h2>
                    <div className="space-y-6">
                        {formData.content && Object.keys(formData.content).length > 0 ? (
                            <div className="grid gap-6">
                                {Object.entries(formData.content).map(([sectionKey, sectionValue]) => (
                                    <div key={sectionKey} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2 flex items-center justify-between">
                                            {sectionKey.replace(/([A-Z])/g, ' $1')}
                                        </h3>
                                        <div className="space-y-4">
                                            {typeof sectionValue === 'object' && !Array.isArray(sectionValue) ? (
                                                Object.entries(sectionValue).map(([fieldKey, fieldValue]) => {
                                                    const fieldName = `content.${sectionKey}.${fieldKey}`;
                                                    
                                                    if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
                                                        return Object.entries(fieldValue).map(([subKey, subValue]) => (
                                                            <div key={`${fieldName}.${subKey}`}>
                                                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
                                                                    {fieldKey} {subKey}
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name={`${fieldName}.${subKey}`}
                                                                    value={subValue || ''}
                                                                    onChange={handleChange}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                                                />
                                                            </div>
                                                        ));
                                                    }

                                                    if (Array.isArray(fieldValue)) {
                                                        return (
                                                            <div key={fieldName} className="space-y-2">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
                                                                    {fieldKey}
                                                                </label>
                                                                {fieldValue.map((item, idx) => (
                                                                    <div key={`${fieldName}.${idx}`}>
                                                                        <textarea
                                                                            name={`${fieldName}.${idx}`}
                                                                            value={item || ''}
                                                                            onChange={handleChange}
                                                                            rows="2"
                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 mb-1"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <div key={fieldName}>
                                                            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
                                                                {fieldKey}
                                                            </label>
                                                            {fieldKey.toLowerCase().includes('subtitle') || fieldKey.toLowerCase().includes('description') ? (
                                                                <textarea
                                                                    name={fieldName}
                                                                    value={fieldValue || ''}
                                                                    onChange={handleChange}
                                                                    rows="2"
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                                                />
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    name={fieldName}
                                                                    value={fieldValue || ''}
                                                                    onChange={handleChange}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div key={`content.${sectionKey}`}>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
                                                        {sectionKey}
                                                    </label>
                                                    <textarea
                                                        name={`content.${sectionKey}`}
                                                        value={sectionValue || ''}
                                                        onChange={handleChange}
                                                        rows="4"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500">No content fields available for this template yet.</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (TEMPLATE_DEFAULTS[formData.template]) {
                                            setFormData(prev => ({ ...prev, content: TEMPLATE_DEFAULTS[formData.template] }));
                                        }
                                    }}
                                    className="mt-4 text-blue-600 font-medium hover:underline"
                                >
                                    Initialize with Defaults
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <FaSave size={16} />
                        {saving ? 'Saving...' : 'Save Changes'}
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