'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function PermanentPageEditor() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) router.push('/admin/login');
    }, [router]);

    useEffect(() => {
        fetch('/api/permanent-page')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/permanent-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Permanent page saved successfully!' });
            } else {
                setMessage({ type: 'error', text: result.error });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error saving' });
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e, field, section = null, index = null) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                // FIX: Add this case for hero section
                if (section === 'hero') {
                    setData({
                        ...data,
                        hero: { ...data.hero, [field]: result.url }
                    });
                } else if (section === 'gallery') {
                    const newGallery = [...data.whyChoose.galleryImages];
                    newGallery[index] = result.url;
                    setData({
                        ...data,
                        whyChoose: { ...data.whyChoose, galleryImages: newGallery }
                    });
                } else if (section === 'overview') {
                    setData({
                        ...data,
                        overview: { ...data.overview, [field]: result.url }
                    });
                } else if (section === 'whyChoose') {
                    setData({
                        ...data,
                        whyChoose: { ...data.whyChoose, [field]: result.url }
                    });
                } else if (section === 'seo') {
                    setData({
                        ...data,
                        seo: { ...data.seo, [field]: result.url }
                    });
                } else {
                    setData({ ...data, [field]: result.url });
                }
                setMessage({ type: 'success', text: 'Image uploaded!' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Upload failed' });
        } finally {
            setUploading(false);
        }
    };

    // Features Management
    const addFeature = () => {
        setData({
            ...data,
            features: {
                ...data.features,
                items: [...(data.features?.items || []), { icon: 'FaMobile', title: 'New Feature', description: 'Feature description' }]
            }
        });
    };

    const updateFeature = (index, field, value) => {
        const newItems = [...data.features.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData({
            ...data,
            features: { ...data.features, items: newItems }
        });
    };

    const removeFeature = (index) => {
        const newItems = data.features.items.filter((_, i) => i !== index);
        setData({
            ...data,
            features: { ...data.features, items: newItems }
        });
    };

    // Benefits Management
    const addBenefit = () => {
        setData({
            ...data,
            whyChoose: {
                ...data.whyChoose,
                benefits: [...(data.whyChoose?.benefits || []), 'New benefit']
            }
        });
    };

    const updateBenefit = (index, value) => {
        const newBenefits = [...data.whyChoose.benefits];
        newBenefits[index] = value;
        setData({
            ...data,
            whyChoose: { ...data.whyChoose, benefits: newBenefits }
        });
    };

    const removeBenefit = (index) => {
        const newBenefits = data.whyChoose.benefits.filter((_, i) => i !== index);
        setData({
            ...data,
            whyChoose: { ...data.whyChoose, benefits: newBenefits }
        });
    };

    // Gallery Management
    const addGalleryImage = () => {
        setData({
            ...data,
            whyChoose: {
                ...data.whyChoose,
                galleryImages: [...(data.whyChoose?.galleryImages || []), '']
            }
        });
    };

    const removeGalleryImage = (index) => {
        const newGallery = data.whyChoose.galleryImages.filter((_, i) => i !== index);
        setData({
            ...data,
            whyChoose: { ...data.whyChoose, galleryImages: newGallery }
        });
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Permanent Lighting Page</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message && (
                <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-8">
                {/* Hero Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Badge Text</label>
                            <input
                                type="text"
                                value={data?.hero?.badge || '03 • PERMANENT'}
                                onChange={(e) => setData({ ...data, hero: { ...data?.hero, badge: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title Line 1</label>
                                <input
                                    type="text"
                                    value={data?.hero?.title?.line1 || 'Light Up Every'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, title: { ...data?.hero?.title, line1: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title Line 2</label>
                                <input
                                    type="text"
                                    value={data?.hero?.title?.line2 || 'Occasion, All Year Long'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, title: { ...data?.hero?.title, line2: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subtitle</label>
                            <textarea
                                value={data?.hero?.subtitle || ''}
                                onChange={(e) => setData({ ...data, hero: { ...data?.hero, subtitle: e.target.value } })}
                                rows="3"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">CTA Text</label>
                                <input
                                    type="text"
                                    value={data?.hero?.cta?.text || 'Get Your Free Quote'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, cta: { ...data?.hero?.cta, text: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">CTA Phone</label>
                                <input
                                    type="text"
                                    value={data?.hero?.cta?.phone || '+16143017100'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, cta: { ...data?.hero?.cta, phone: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">CTA Link</label>
                                <input
                                    type="text"
                                    value={data?.hero?.cta?.link || '#'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, cta: { ...data?.hero?.cta, link: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Background Image</label>
                            {data?.hero?.backgroundImage && (
                                <div className="mb-2">
                                    <img
                                        src={data.hero.backgroundImage}
                                        alt="Hero Background"
                                        className="w-48 h-32 object-cover rounded border shadow-sm"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/400x300/e2e8f0/1e293b?text=Image+Not+Found';
                                        }}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{data.hero.backgroundImage}</p>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={data?.hero?.backgroundImage || ''}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, backgroundImage: e.target.value } })}
                                    className="flex-1 border rounded px-3 py-2"
                                    placeholder="/images/hero-background2.jpg"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'backgroundImage', 'hero')}
                                    disabled={uploading}
                                    className="border rounded px-3 py-2 file:mr-2 file:py-1 file:px-3 file:text-sm cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Overview Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Badge</label>
                            <input type="text" value={data?.overview?.badge || 'OVERVIEW'} onChange={(e) => setData({ ...data, overview: { ...data?.overview, badge: e.target.value } })} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input type="text" value={data?.overview?.title || 'Complete Permanent Lighting'} onChange={(e) => setData({ ...data, overview: { ...data?.overview, title: e.target.value } })} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea value={data?.overview?.description || ''} onChange={(e) => setData({ ...data, overview: { ...data?.overview, description: e.target.value } })} rows="4" className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Image</label>
                            {data?.overview?.image && <img src={data.overview.image} alt="Overview" className="w-48 h-32 object-cover rounded mb-2" />}
                            <div className="flex gap-2">
                                <input type="text" value={data?.overview?.image || ''} onChange={(e) => setData({ ...data, overview: { ...data?.overview, image: e.target.value } })} className="flex-1 border rounded px-3 py-2" />
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image', 'overview')} disabled={uploading} className="border rounded px-3 py-2" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Features Section</h2>
                        <button onClick={addFeature} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">+ Add Feature</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Badge</label>
                            <input type="text" value={data?.features?.badge || 'WHAT WE OFFER'} onChange={(e) => setData({ ...data, features: { ...data?.features, badge: e.target.value } })} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input type="text" value={data?.features?.title || 'Complete Permanent Lighting Services'} onChange={(e) => setData({ ...data, features: { ...data?.features, title: e.target.value } })} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subtitle</label>
                            <input type="text" value={data?.features?.subtitle || 'Professional installation with premium materials and full-service support.'} onChange={(e) => setData({ ...data, features: { ...data?.features, subtitle: e.target.value } })} className="w-full border rounded px-3 py-2" />
                        </div>
                    </div>
                    <div className="mt-6 space-y-4">
                        {data?.features?.items?.map((feature, index) => (
                            <div key={index} className="border p-4 rounded-lg bg-gray-50">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium">Feature {index + 1}</h4>
                                    <button onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <input type="text" value={feature.icon || ''} onChange={(e) => updateFeature(index, 'icon', e.target.value)} className="border rounded px-3 py-2" placeholder="Icon" />
                                    <input type="text" value={feature.title || ''} onChange={(e) => updateFeature(index, 'title', e.target.value)} className="border rounded px-3 py-2" placeholder="Title" />
                                    <input type="text" value={feature.description || ''} onChange={(e) => updateFeature(index, 'description', e.target.value)} className="border rounded px-3 py-2" placeholder="Description" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Us Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Badge</label>
                            <input type="text" value={data?.whyChoose?.badge || 'WHY CHOOSE US'} onChange={(e) => setData({ ...data, whyChoose: { ...data?.whyChoose, badge: e.target.value } })} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input type="text" value={data?.whyChoose?.title || 'Professional Quality, Smart Technology'} onChange={(e) => setData({ ...data, whyChoose: { ...data?.whyChoose, title: e.target.value } })} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea value={data?.whyChoose?.description || ''} onChange={(e) => setData({ ...data, whyChoose: { ...data?.whyChoose, description: e.target.value } })} rows="3" className="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium">Benefits List</label>
                                <button onClick={addBenefit} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">+ Add Benefit</button>
                            </div>
                            {data?.whyChoose?.benefits?.map((benefit, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input type="text" value={benefit} onChange={(e) => updateBenefit(index, e.target.value)} className="flex-1 border rounded px-3 py-2" />
                                    <button onClick={() => removeBenefit(index)} className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Main Image</label>
                            {data?.whyChoose?.image && <img src={data.whyChoose.image} alt="Why Choose" className="w-48 h-32 object-cover rounded mb-2" />}
                            <div className="flex gap-2">
                                <input type="text" value={data?.whyChoose?.image || ''} onChange={(e) => setData({ ...data, whyChoose: { ...data?.whyChoose, image: e.target.value } })} className="flex-1 border rounded px-3 py-2" />
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image', 'whyChoose')} disabled={uploading} className="border rounded px-3 py-2" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium">Gallery Images</label>
                                <button onClick={addGalleryImage} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">+ Add Image</button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {data?.whyChoose?.galleryImages?.map((img, index) => (
                                    <div key={index} className="border rounded-lg p-2">
                                        {img && <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover rounded mb-2" />}
                                        <div className="flex gap-2">
                                            <input type="text" value={img || ''} onChange={(e) => {
                                                const newGallery = [...data.whyChoose.galleryImages];
                                                newGallery[index] = e.target.value;
                                                setData({ ...data, whyChoose: { ...data.whyChoose, galleryImages: newGallery } });
                                            }} className="flex-1 border rounded px-2 py-1 text-sm" />
                                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery', 'gallery', index)} disabled={uploading} className="hidden" id={`gallery-upload-${index}`} />
                                            <label htmlFor={`gallery-upload-${index}`} className="px-2 py-1 bg-gray-500 text-white rounded text-sm cursor-pointer">Upload</label>
                                            <button onClick={() => removeGalleryImage(index)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">✕</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>



                {/* SEO */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">SEO</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Meta Title</label>
                            <input type="text" value={data?.seo?.metaTitle || 'Permanent Christmas Lighting | Christmas Lights Over Columbus'} onChange={(e) => setData({ ...data, seo: { ...data?.seo, metaTitle: e.target.value } })} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Meta Description</label>
                            <textarea value={data?.seo?.metaDescription || ''} onChange={(e) => setData({ ...data, seo: { ...data?.seo, metaDescription: e.target.value } })} rows="3" className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">OG Image</label>
                            {data?.seo?.ogImage && <img src={data.seo.ogImage} alt="OG" className="w-48 h-32 object-cover rounded mb-2" />}
                            <div className="flex gap-2">
                                <input type="text" value={data?.seo?.ogImage || ''} onChange={(e) => setData({ ...data, seo: { ...data?.seo, ogImage: e.target.value } })} className="flex-1 border rounded px-3 py-2" />
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'ogImage', 'seo')} disabled={uploading} className="border rounded px-3 py-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}