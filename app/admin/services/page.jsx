'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaImage } from 'react-icons/fa';

export default function ServicesEditor() {
    const [servicesData, setServicesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingFor, setUploadingFor] = useState({});
    const [activeTab, setActiveTab] = useState({});
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            router.push('/admin/login');
        }
    }, [router]);

    useEffect(() => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                console.log('Loaded data:', data);
                if (data.error) {
                    setMessage({ type: 'error', text: 'No data in database. Please seed data first.' });
                } else {
                    setServicesData(data);
                    // Initialize active tabs
                    const initialTabs = {};
                    data.items?.forEach((_, index) => {
                        initialTabs[index] = 'basic';
                    });
                    setActiveTab(initialTabs);
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
            const response = await fetch('/api/admin/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(servicesData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Services saved successfully!' });
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

    const handleImageUpload = async (e, serviceIndex, field, galleryIndex = null) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadingFor({ serviceIndex, field, galleryIndex });
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
                const newItems = [...servicesData.items];
                if (field === 'gallery') {
                    const newGallery = [...(newItems[serviceIndex].galleryImages || [])];
                    newGallery[galleryIndex] = result.url;
                    newItems[serviceIndex] = { ...newItems[serviceIndex], galleryImages: newGallery };
                } else {
                    newItems[serviceIndex] = { ...newItems[serviceIndex], [field]: result.url };
                }
                setServicesData({ ...servicesData, items: newItems });
                setMessage({ type: 'success', text: 'Image uploaded successfully!' });
            } else {
                setMessage({ type: 'error', text: result.error || 'Upload failed' });
            }
        } catch (error) {
            console.error('Upload error:', error);
            setMessage({ type: 'error', text: 'Error uploading image' });
        } finally {
            setUploading(false);
            setUploadingFor({});
        }
    };

    // Basic features management (existing)
    const addFeature = (serviceIndex) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].features = [...(newItems[serviceIndex].features || []), ''];
            return { ...prev, items: newItems };
        });
    };

    const updateFeature = (serviceIndex, featureIndex, value) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            const newFeatures = [...newItems[serviceIndex].features];
            newFeatures[featureIndex] = value;
            newItems[serviceIndex] = { ...newItems[serviceIndex], features: newFeatures };
            return { ...prev, items: newItems };
        });
    };

    const removeFeature = (serviceIndex, featureIndex) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].features = newItems[serviceIndex].features.filter((_, i) => i !== featureIndex);
            return { ...prev, items: newItems };
        });
    };

    // Detail Features Management (new)
    const addDetailFeature = (serviceIndex) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].detailFeatures = [...(newItems[serviceIndex].detailFeatures || []),
            { title: 'New Feature', description: 'Feature description', icon: 'FaStar' }
            ];
            return { ...prev, items: newItems };
        });
    };

    const updateDetailFeature = (serviceIndex, featureIndex, field, value) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].detailFeatures[featureIndex][field] = value;
            return { ...prev, items: newItems };
        });
    };

    const removeDetailFeature = (serviceIndex, featureIndex) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].detailFeatures = newItems[serviceIndex].detailFeatures.filter((_, i) => i !== featureIndex);
            return { ...prev, items: newItems };
        });
    };

    // Why Choose Items Management (new)
    const addWhyChooseItem = (serviceIndex) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].whyChoose = {
                ...newItems[serviceIndex].whyChoose,
                items: [...(newItems[serviceIndex].whyChoose?.items || []), 'New benefit']
            };
            return { ...prev, items: newItems };
        });
    };

    const updateWhyChooseItem = (serviceIndex, itemIndex, value) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            const newItemsList = [...newItems[serviceIndex].whyChoose.items];
            newItemsList[itemIndex] = value;
            newItems[serviceIndex].whyChoose.items = newItemsList;
            return { ...prev, items: newItems };
        });
    };

    const removeWhyChooseItem = (serviceIndex, itemIndex) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].whyChoose.items = newItems[serviceIndex].whyChoose.items.filter((_, i) => i !== itemIndex);
            return { ...prev, items: newItems };
        });
    };

    // Gallery Images Management (new)
    const addGalleryImage = (serviceIndex) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].galleryImages = [...(newItems[serviceIndex].galleryImages || []), ''];
            return { ...prev, items: newItems };
        });
    };

    const removeGalleryImage = (serviceIndex, imageIndex) => {
        setServicesData(prev => {
            const newItems = [...prev.items];
            newItems[serviceIndex].galleryImages = newItems[serviceIndex].galleryImages.filter((_, i) => i !== imageIndex);
            return { ...prev, items: newItems };
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!servicesData) {
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
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Edit Services</h1>
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

                <div className="space-y-6">
                    {servicesData.items?.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="bg-white rounded-lg shadow overflow-hidden">
                            {/* Service Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b">
                                <h2 className="text-xl font-semibold">{service.title}</h2>
                            </div>

                            {/* Tabs */}
                            <div className="border-b">
                                <div className="flex px-6">
                                    <button
                                        onClick={() => setActiveTab(prev => ({ ...prev, [serviceIndex]: 'basic' }))}
                                        className={`px-4 py-3 text-sm font-medium ${activeTab[serviceIndex] === 'basic'
                                                ? 'border-b-2 border-blue-500 text-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Basic Info
                                    </button>
                                    <button
                                        onClick={() => setActiveTab(prev => ({ ...prev, [serviceIndex]: 'detail' }))}
                                        className={`px-4 py-3 text-sm font-medium ${activeTab[serviceIndex] === 'detail'
                                                ? 'border-b-2 border-blue-500 text-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Detail Page Content
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Basic Info Tab - Keep ALL existing fields */}
                                {activeTab[serviceIndex] === 'basic' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
                                                <input
                                                    type="text"
                                                    value={service.number || ''}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex] = { ...newItems[serviceIndex], number: e.target.value };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    className="w-full px-3 py-2 border rounded"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    value={service.title || ''}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex] = { ...newItems[serviceIndex], title: e.target.value };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    className="w-full px-3 py-2 border rounded"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Color (Hex)</label>
                                                <input
                                                    type="text"
                                                    value={service.color || '#10B981'}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex] = { ...newItems[serviceIndex], color: e.target.value };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    className="w-full px-3 py-2 border rounded"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                                <input
                                                    type="text"
                                                    value={service.icon || ''}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex] = { ...newItems[serviceIndex], icon: e.target.value };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    className="w-full px-3 py-2 border rounded"
                                                    placeholder="FaHome"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                                                <input
                                                    type="text"
                                                    value={service.ctaText || 'View Details'}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex] = { ...newItems[serviceIndex], ctaText: e.target.value };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    className="w-full px-3 py-2 border rounded"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                                                <input
                                                    type="text"
                                                    value={service.ctaLink || ''}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex] = { ...newItems[serviceIndex], ctaLink: e.target.value };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    className="w-full px-3 py-2 border rounded"
                                                    placeholder="/services/residential-lighting"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                                            <textarea
                                                value={service.description || ''}
                                                onChange={(e) => {
                                                    const newItems = [...servicesData.items];
                                                    newItems[serviceIndex] = { ...newItems[serviceIndex], description: e.target.value };
                                                    setServicesData({ ...servicesData, items: newItems });
                                                }}
                                                rows="3"
                                                className="w-full px-3 py-2 border rounded"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Features (List)</label>
                                            {service.features?.map((feature, fIndex) => (
                                                <div key={fIndex} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        value={feature}
                                                        onChange={(e) => updateFeature(serviceIndex, fIndex, e.target.value)}
                                                        className="flex-1 px-3 py-2 border rounded"
                                                    />
                                                    <button
                                                        onClick={() => removeFeature(serviceIndex, fIndex)}
                                                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => addFeature(serviceIndex)}
                                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                + Add Feature
                                            </button>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                                            {service.image && (
                                                <div className="mb-4">
                                                    <img src={service.image} alt={service.title} className="w-48 h-32 object-cover rounded" />
                                                </div>
                                            )}
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={service.image || ''}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex] = { ...newItems[serviceIndex], image: e.target.value };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    className="flex-1 px-3 py-2 border rounded"
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, serviceIndex, 'image')}
                                                    disabled={uploading && uploadingFor.serviceIndex === serviceIndex && uploadingFor.field === 'image'}
                                                    className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Detail Page Content Tab - NEW FIELDS */}
                                {activeTab[serviceIndex] === 'detail' && (
                                    <div className="space-y-6">
                                        {/* Long Description */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Long Description (Detail Page)</label>
                                            <textarea
                                                value={service.longDescription || ''}
                                                onChange={(e) => {
                                                    const newItems = [...servicesData.items];
                                                    newItems[serviceIndex] = { ...newItems[serviceIndex], longDescription: e.target.value };
                                                    setServicesData({ ...servicesData, items: newItems });
                                                }}
                                                rows="6"
                                                className="w-full px-3 py-2 border rounded"
                                                placeholder="Detailed description for the service detail page..."
                                            />
                                        </div>

                                        {/* Detail Features */}
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold">Detail Page Features (What We Offer)</h3>
                                                <button
                                                    onClick={() => addDetailFeature(serviceIndex)}
                                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                >
                                                    + Add Feature
                                                </button>
                                            </div>
                                            {service.detailFeatures?.map((feature, fIndex) => (
                                                <div key={fIndex} className="border p-4 rounded-lg bg-gray-50 mb-4">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h4 className="font-medium">Feature {fIndex + 1}</h4>
                                                        <button
                                                            onClick={() => removeDetailFeature(serviceIndex, fIndex)}
                                                            className="p-1 text-red-500 hover:text-red-700"
                                                        >
                                                            <FaTrash size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <input
                                                            type="text"
                                                            value={feature.icon || ''}
                                                            onChange={(e) => updateDetailFeature(serviceIndex, fIndex, 'icon', e.target.value)}
                                                            className="px-3 py-2 border rounded text-sm"
                                                            placeholder="Icon (e.g., FaHome)"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={feature.title || ''}
                                                            onChange={(e) => updateDetailFeature(serviceIndex, fIndex, 'title', e.target.value)}
                                                            className="px-3 py-2 border rounded text-sm"
                                                            placeholder="Title"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={feature.description || ''}
                                                            onChange={(e) => updateDetailFeature(serviceIndex, fIndex, 'description', e.target.value)}
                                                            className="px-3 py-2 border rounded text-sm"
                                                            placeholder="Description"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Why Choose Us */}
                                        <div className="border-t pt-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Why Choose Us - Title</label>
                                                <input
                                                    type="text"
                                                    value={service.whyChoose?.title || 'Professional Quality, Personal Service'}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex].whyChoose = {
                                                            ...newItems[serviceIndex].whyChoose,
                                                            title: e.target.value
                                                        };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    className="w-full px-3 py-2 border rounded"
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Why Choose Us - Description</label>
                                                <textarea
                                                    value={service.whyChoose?.description || ''}
                                                    onChange={(e) => {
                                                        const newItems = [...servicesData.items];
                                                        newItems[serviceIndex].whyChoose = {
                                                            ...newItems[serviceIndex].whyChoose,
                                                            description: e.target.value
                                                        };
                                                        setServicesData({ ...servicesData, items: newItems });
                                                    }}
                                                    rows="3"
                                                    className="w-full px-3 py-2 border rounded"
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="block text-sm font-medium text-gray-700">Benefits List</label>
                                                    <button
                                                        onClick={() => addWhyChooseItem(serviceIndex)}
                                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                    >
                                                        + Add Benefit
                                                    </button>
                                                </div>
                                                {service.whyChoose?.items?.map((item, iIndex) => (
                                                    <div key={iIndex} className="flex gap-2 mb-2">
                                                        <input
                                                            type="text"
                                                            value={item}
                                                            onChange={(e) => updateWhyChooseItem(serviceIndex, iIndex, e.target.value)}
                                                            className="flex-1 px-3 py-2 border rounded"
                                                        />
                                                        <button
                                                            onClick={() => removeWhyChooseItem(serviceIndex, iIndex)}
                                                            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Gallery Images */}
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-lg font-semibold">Gallery Images</h3>
                                                <button
                                                    onClick={() => addGalleryImage(serviceIndex)}
                                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                                >
                                                    + Add Image
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {service.galleryImages?.map((img, gIndex) => (
                                                    <div key={gIndex} className="relative border rounded-lg p-2">
                                                        {img && (
                                                            <img src={img} alt={`Gallery ${gIndex + 1}`} className="w-full h-32 object-cover rounded mb-2" />
                                                        )}
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={img || ''}
                                                                onChange={(e) => {
                                                                    const newItems = [...servicesData.items];
                                                                    const newGallery = [...newItems[serviceIndex].galleryImages];
                                                                    newGallery[gIndex] = e.target.value;
                                                                    newItems[serviceIndex] = { ...newItems[serviceIndex], galleryImages: newGallery };
                                                                    setServicesData({ ...servicesData, items: newItems });
                                                                }}
                                                                className="flex-1 px-2 py-1 border rounded text-sm"
                                                                placeholder="Image URL"
                                                            />
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageUpload(e, serviceIndex, 'gallery', gIndex)}
                                                                disabled={uploading && uploadingFor.serviceIndex === serviceIndex && uploadingFor.field === 'gallery' && uploadingFor.galleryIndex === gIndex}
                                                                className="hidden"
                                                                id={`gallery-upload-${serviceIndex}-${gIndex}`}
                                                            />
                                                            <label
                                                                htmlFor={`gallery-upload-${serviceIndex}-${gIndex}`}
                                                                className="px-2 py-1 bg-gray-500 text-white rounded text-sm cursor-pointer hover:bg-gray-600"
                                                            >
                                                                <FaImage />
                                                            </label>
                                                            <button
                                                                onClick={() => removeGalleryImage(serviceIndex, gIndex)}
                                                                className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}