'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function ServicesPageEditor() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            router.push('/admin/login');
        }
    }, [router]);

    useEffect(() => {
        fetch('/api/services-page')
            .then(res => res.json())
            .then(data => {
                console.log('Loaded data:', data);
                if (data.error) {
                    setMessage({ type: 'error', text: 'No data in database. Please seed data first.' });
                } else {
                    setData(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setMessage({ type: 'error', text: 'Failed to load data' });
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            const response = await fetch('/api/admin/services-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Services Page saved successfully!' });
            } else {
                setMessage({ type: 'error', text: result.error || 'Failed to save' });
            }
        } catch (error) {
            console.error('Save error:', error);
            setMessage({ type: 'error', text: 'Error saving data' });
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.url) {
                if (field === 'hero.backgroundImage') {
                    setData({ ...data, hero: { ...data.hero, backgroundImage: result.url } });
                } else if (field === 'seo.ogImage') {
                    setData({ ...data, seo: { ...data.seo, ogImage: result.url } });
                }
                setMessage({ type: 'success', text: 'Image uploaded successfully!' });
            } else {
                setMessage({ type: 'error', text: result.error || 'Upload failed' });
            }
        } catch (error) {
            console.error('Upload error:', error);
            setMessage({ type: 'error', text: 'Error uploading image' });
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">No data found. Please run seed script first.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Edit Services Page</h1>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {message && (
                    <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-6 space-y-8">
                    {/* Hero Section */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-2xl font-semibold">Hero Section</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                                <input
                                    type="text"
                                    value={data.hero?.badge?.text || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, badge: { ...data.hero?.badge, text: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="PREMIUM SERVICES"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Icon</label>
                                <input
                                    type="text"
                                    value={data.hero?.badge?.icon || 'GiSparkles'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, badge: { ...data.hero?.badge, icon: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="GiSparkles"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge BG Color</label>
                                <input
                                    type="text"
                                    value={data.hero?.badge?.backgroundColor || 'linear-gradient(to right, rgba(16,185,129,0.2), rgba(245,158,11,0.2))'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, badge: { ...data.hero?.badge, backgroundColor: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text Color</label>
                                <input
                                    type="text"
                                    value={data.hero?.badge?.textColor || '#ffffff'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, badge: { ...data.hero?.badge, textColor: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title Prefix</label>
                                <input
                                    type="text"
                                    value={data.hero?.title?.prefix || 'PREMIUM'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, title: { ...data.hero?.title, prefix: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title Text</label>
                                <input
                                    type="text"
                                    value={data.hero?.title?.text || 'CHRISTMAS LIGHTING'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, title: { ...data.hero?.title, text: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
                                <input
                                    type="text"
                                    value={data.hero?.title?.gradientFrom || '#10b981'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, title: { ...data.hero?.title, gradientFrom: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
                                <input
                                    type="text"
                                    value={data.hero?.title?.gradientTo || '#f59e0b'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, title: { ...data.hero?.title, gradientTo: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                            <textarea
                                value={data.hero?.subtitle || ''}
                                onChange={(e) => setData({
                                    ...data,
                                    hero: { ...data.hero, subtitle: e.target.value }
                                })}
                                rows="3"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Transform your property with professional holiday lighting installations"
                            />
                        </div>

                        {/* CTA */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                                <input
                                    type="text"
                                    value={data.hero?.cta?.text || 'Get My Free Quote'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, cta: { ...data.hero?.cta, text: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Phone</label>
                                <input
                                    type="text"
                                    value={data.hero?.cta?.phone || '+16143017100'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, cta: { ...data.hero?.cta, phone: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                                <input
                                    type="text"
                                    value={data.hero?.cta?.link || '#'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, cta: { ...data.hero?.cta, link: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>

                        {/* Background Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
                            {data.hero?.backgroundImage && (
                                <div className="mb-4">
                                    <img src={data.hero.backgroundImage} alt="Hero" className="w-48 h-32 object-cover rounded" />
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={data.hero?.backgroundImage || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, backgroundImage: e.target.value }
                                    })}
                                    className="flex-1 px-3 py-2 border rounded"
                                    placeholder="/images/hero-background2.jpg"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'hero.backgroundImage')}
                                    disabled={uploading}
                                    className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                                />
                            </div>
                        </div>

                        {/* Overlay Colors */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Overlay From</label>
                                <input
                                    type="text"
                                    value={data.hero?.overlay?.from || 'rgba(16,185,129,0.2)'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, overlay: { ...data.hero?.overlay, from: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Overlay To</label>
                                <input
                                    type="text"
                                    value={data.hero?.overlay?.to || 'rgba(17,24,39,0.9)'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, overlay: { ...data.hero?.overlay, to: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Services Section Header */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-2xl font-semibold">Services Section Header</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
                            <input
                                type="text"
                                value={data.servicesHeader?.badge || ''}
                                onChange={(e) => setData({
                                    ...data,
                                    servicesHeader: { ...data.servicesHeader, badge: e.target.value }
                                })}
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Our Services"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={data.servicesHeader?.title || 'Our Lighting Collection'}
                                onChange={(e) => setData({
                                    ...data,
                                    servicesHeader: { ...data.servicesHeader, title: e.target.value }
                                })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                            <textarea
                                value={data.servicesHeader?.subtitle || ''}
                                onChange={(e) => setData({
                                    ...data,
                                    servicesHeader: { ...data.servicesHeader, subtitle: e.target.value }
                                })}
                                rows="2"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Professional holiday lighting solutions for every property"
                            />
                        </div>
                    </div>

                    {/* Note about Services Items */}
                    <div className="space-y-4 border-b pb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="text-blue-800 font-semibold mb-2">📋 Services Items</h3>
                            <p className="text-blue-700 text-sm">
                                Services items (Residential Lighting, Commercial Lighting, Permanent Lighting) are managed in the
                                <strong> Services section</strong> of the admin panel. Any changes there will automatically reflect on this page.
                            </p>
                            <p className="text-blue-700 text-sm mt-2">
                                To edit services, go to: <strong>Shared Components → Services</strong>
                            </p>
                        </div>
                    </div>



                    {/* SEO Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">SEO</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                            <input
                                type="text"
                                value={data.seo?.metaTitle || ''}
                                onChange={(e) => setData({
                                    ...data,
                                    seo: { ...data.seo, metaTitle: e.target.value }
                                })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                            <textarea
                                value={data.seo?.metaDescription || ''}
                                onChange={(e) => setData({
                                    ...data,
                                    seo: { ...data.seo, metaDescription: e.target.value }
                                })}
                                rows="3"
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">OG Image</label>
                            {data.seo?.ogImage && (
                                <div className="mb-4">
                                    <img src={data.seo.ogImage} alt="OG" className="w-48 h-32 object-cover rounded" />
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={data.seo?.ogImage || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        seo: { ...data.seo, ogImage: e.target.value }
                                    })}
                                    className="flex-1 px-3 py-2 border rounded"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'seo.ogImage')}
                                    disabled={uploading}
                                    className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}