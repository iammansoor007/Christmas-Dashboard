'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaSave, FaEye, FaEyeSlash, FaPlus, FaTrash } from 'react-icons/fa';

const ICON_OPTIONS = [
    'FaHome', 'FaBuilding', 'FaStar', 'FaTree', 'FaLightbulb', 'FaTools',
    'FaBoxOpen', 'FaShieldAlt', 'FaMobile', 'FaWifi', 'FaRegSun', 'FaStore'
];

export default function CreateService() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        longDescription: '',
        icon: 'FaHome',
        color: '#10B981',
        status: 'draft',
        showOnHomepage: true,
        features: [''],
        whyChoose: {
            title: '',
            description: '',
            items: ['']
        },
        mainImage: '',
        ctaText: 'View Details',
        seo: {
            metaTitle: '',
            metaDescription: ''
        }
    });

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

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const handleWhyChooseItemChange = (index, value) => {
        const newItems = [...formData.whyChoose.items];
        newItems[index] = value;
        setFormData(prev => ({ ...prev, whyChoose: { ...prev.whyChoose, items: newItems } }));
    };

    const addWhyChooseItem = () => {
        setFormData(prev => ({
            ...prev,
            whyChoose: { ...prev.whyChoose, items: [...prev.whyChoose.items, ''] }
        }));
    };

    const removeWhyChooseItem = (index) => {
        const newItems = formData.whyChoose.items.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, whyChoose: { ...prev.whyChoose, items: newItems } }));
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError('Service title is required');
            return false;
        }
        if (!formData.shortDescription.trim()) {
            setError('Short description is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/admin/services-manager');
            } else {
                setError(data.error || 'Failed to create service');
            }
        } catch (error) {
            setError('Error creating service');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/services-manager" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <FaArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
                    <p className="text-sm text-gray-500 mt-1">Create a new service that will appear on homepage and services page</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {/* Basic Info */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Service Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Residential Lighting"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <select
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    {ICON_OPTIONS.map(icon => (
                                        <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="w-12 h-10 border rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={formData.color}
                                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Brief description that appears on service cards"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
                            <textarea
                                name="longDescription"
                                value={formData.longDescription}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Full description for the service detail page"
                            />
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                        <button
                            type="button"
                            onClick={addFeature}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            <FaPlus size={12} /> Add Feature
                        </button>
                    </div>

                    <div className="space-y-2">
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Feature description"
                                />
                                {formData.features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                            <input
                                type="text"
                                value={formData.whyChoose.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, whyChoose: { ...prev.whyChoose, title: e.target.value } }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Professional Quality, Personal Service"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={formData.whyChoose.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, whyChoose: { ...prev.whyChoose, description: e.target.value } }))}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Benefits List</label>
                                <button
                                    type="button"
                                    onClick={addWhyChooseItem}
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                    + Add Benefit
                                </button>
                            </div>
                            {formData.whyChoose.items.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleWhyChooseItemChange(index, e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Benefit description"
                                    />
                                    {formData.whyChoose.items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeWhyChooseItem(index)}
                                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Image</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
                        <input
                            type="text"
                            name="mainImage"
                            value={formData.mainImage}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="/images/service-image.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Recommended size: 800x600px</p>
                    </div>
                </div>

                {/* Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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

                    <div className="mt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="showOnHomepage"
                                checked={formData.showOnHomepage}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-gray-700">Show on homepage</span>
                        </label>
                    </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                            <input
                                type="text"
                                name="seo.metaTitle"
                                value={formData.seo.metaTitle}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                            <textarea
                                name="seo.metaDescription"
                                value={formData.seo.metaDescription}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        <FaSave size={16} />
                        {loading ? 'Creating...' : 'Create Service'}
                    </button>
                    <Link href="/admin/services-manager" className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}