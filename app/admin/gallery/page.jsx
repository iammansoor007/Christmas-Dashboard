'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function GalleryPageEditor() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState(null);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) router.push('/admin/login');
    }, [router]);

    useEffect(() => {
        fetch('/api/gallery-page')
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
            const response = await fetch('/api/gallery-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Gallery page saved successfully!' });
            } else {
                setMessage({ type: 'error', text: result.error });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error saving' });
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e, field, index = null) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadingIndex(index);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                if (field === 'hero') {
                    setData({ ...data, hero: { ...data.hero, backgroundImage: result.url } });
                } else if (field === 'gallery' && index !== null) {
                    const newImages = [...data.images];
                    newImages[index] = { ...newImages[index], src: result.url };
                    setData({ ...data, images: newImages });
                } else if (field === 'seo') {
                    setData({ ...data, seo: { ...data.seo, ogImage: result.url } });
                }
                setMessage({ type: 'success', text: 'Image uploaded!' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Upload failed' });
        } finally {
            setUploading(false);
            setUploadingIndex(null);
        }
    };

    // Gallery Images Management
    const addGalleryImage = () => {
        const newId = data.images?.length ? Math.max(...data.images.map(i => i.id)) + 1 : 1;
        setData({
            ...data,
            images: [...(data.images || []), {
                id: newId,
                src: '',
                title: 'New Image',
                location: 'Location',
                category: 'residential'
            }]
        });
    };

    const updateImage = (index, field, value) => {
        const newImages = [...data.images];
        newImages[index] = { ...newImages[index], [field]: value };
        setData({ ...data, images: newImages });
    };

    const removeImage = (index) => {
        setData({
            ...data,
            images: data.images.filter((_, i) => i !== index)
        });
    };

    const moveImage = (index, direction) => {
        if ((direction === 'up' && index === 0) ||
            (direction === 'down' && index === data.images.length - 1)) return;

        const newImages = [...data.images];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
        setData({ ...data, images: newImages });
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gallery Page</h1>
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

            <div className="space-y-8">
                {/* Hero Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Badge Text</label>
                            <input
                                type="text"
                                value={data?.hero?.badge || 'OUR PORTFOLIO'}
                                onChange={(e) => setData({ ...data, hero: { ...data?.hero, badge: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title Line 1</label>
                                <input
                                    type="text"
                                    value={data?.hero?.title?.line1 || 'HOLIDAY LIGHTING'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, title: { ...data?.hero?.title, line1: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title Line 2</label>
                                <input
                                    type="text"
                                    value={data?.hero?.title?.line2 || 'GALLERY'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, title: { ...data?.hero?.title, line2: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subtitle</label>
                            <textarea
                                value={data?.hero?.subtitle || 'Explore our collection of stunning residential and commercial transformations'}
                                onChange={(e) => setData({ ...data, hero: { ...data?.hero, subtitle: e.target.value } })}
                                rows="2"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">CTA Text</label>
                                <input
                                    type="text"
                                    value={data?.hero?.cta?.text || 'Get My Free Quote'}
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

                        {/* Hero Background Image */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Hero Background Image</label>
                            {data?.hero?.backgroundImage && (
                                <div className="mb-2">
                                    <img src={data.hero.backgroundImage} alt="Hero" className="w-48 h-32 object-cover rounded border" />
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
                                    onChange={(e) => handleImageUpload(e, 'hero')}
                                    disabled={uploading}
                                    className="border rounded px-3 py-2 file:mr-2 file:py-1 file:px-3 file:text-sm"
                                />
                            </div>
                        </div>

                        {/* Overlay */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Overlay From</label>
                                <input
                                    type="text"
                                    value={data?.hero?.overlay?.from || 'rgba(245,158,11,0.15)'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, overlay: { ...data?.hero?.overlay, from: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Overlay To</label>
                                <input
                                    type="text"
                                    value={data?.hero?.overlay?.to || 'rgba(17,24,39,0.9)'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, overlay: { ...data?.hero?.overlay, to: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery Images Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Gallery Images</h2>
                        <button
                            onClick={addGalleryImage}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                        >
                            <FaPlus size={12} /> Add Image
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">These images will appear in the marquee and carousel.</p>

                    <div className="space-y-4">
                        {data?.images?.map((image, index) => (
                            <div key={image.id || index} className="border rounded-lg p-4 bg-gray-50 relative">
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => moveImage(index, 'up')}
                                        disabled={index === 0}
                                        className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        <FaArrowUp size={14} />
                                    </button>
                                    <button
                                        onClick={() => moveImage(index, 'down')}
                                        disabled={index === data.images.length - 1}
                                        className={`p-1 rounded ${index === data.images.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        <FaArrowDown size={14} />
                                    </button>
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Image</label>
                                        {image.src && (
                                            <div className="mb-2">
                                                <img src={image.src} alt={image.title} className="w-32 h-32 object-cover rounded border" />
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={image.src || ''}
                                                onChange={(e) => updateImage(index, 'src', e.target.value)}
                                                className="flex-1 border rounded px-3 py-2 text-sm"
                                                placeholder="/images/gallery1.jpg"
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'gallery', index)}
                                                disabled={uploading && uploadingIndex === index}
                                                className="border rounded px-3 py-2 text-sm file:mr-2 file:py-1 file:px-3"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={image.title || ''}
                                            onChange={(e) => updateImage(index, 'title', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                            placeholder="Beautiful Christmas Display"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Location</label>
                                        <input
                                            type="text"
                                            value={image.location || ''}
                                            onChange={(e) => updateImage(index, 'location', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                            placeholder="Columbus, OH"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Category</label>
                                        <select
                                            value={image.category || 'residential'}
                                            onChange={(e) => updateImage(index, 'category', e.target.value)}
                                            className="w-full border rounded px-3 py-2"
                                        >
                                            <option value="residential">Residential</option>
                                            <option value="commercial">Commercial</option>
                                            <option value="permanent">Permanent</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!data?.images || data.images.length === 0) && (
                            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                                <p className="text-gray-500">No images added yet. Click "Add Image" to start.</p>
                            </div>
                        )}
                    </div>
                </div>



                {/* SEO Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">SEO</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Meta Title</label>
                            <input
                                type="text"
                                value={data?.seo?.metaTitle || 'Christmas Lighting Gallery | Christmas Lights Over Columbus'}
                                onChange={(e) => setData({ ...data, seo: { ...data?.seo, metaTitle: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Meta Description</label>
                            <textarea
                                value={data?.seo?.metaDescription || 'Explore our stunning gallery of residential and commercial Christmas lighting installations. See how we transform homes and businesses into magical holiday displays.'}
                                onChange={(e) => setData({ ...data, seo: { ...data?.seo, metaDescription: e.target.value } })}
                                rows="3"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">OG Image</label>
                            {data?.seo?.ogImage && (
                                <div className="mb-2">
                                    <img src={data.seo.ogImage} alt="OG" className="w-48 h-32 object-cover rounded border" />
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={data?.seo?.ogImage || ''}
                                    onChange={(e) => setData({ ...data, seo: { ...data?.seo, ogImage: e.target.value } })}
                                    className="flex-1 border rounded px-3 py-2"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'seo')}
                                    disabled={uploading}
                                    className="border rounded px-3 py-2 file:mr-2 file:py-1 file:px-3 file:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}