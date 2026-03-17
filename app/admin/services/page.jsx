'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesEditor() {
    const [servicesData, setServicesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState(null);
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
                console.log('Loaded services data:', data);
                if (data.error) {
                    setMessage({ type: 'error', text: 'No data in database. Please seed data first.' });
                } else {
                    setServicesData(data);
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
                setMessage({ type: 'success', text: 'Services section saved successfully!' });
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

    const handleImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadingIndex(index);
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
                newItems[index] = { ...newItems[index], image: result.url };
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
            setUploadingIndex(null);
        }
    };

    const handleChange = (section, field, value) => {
        setServicesData(prev => {
            const newData = { ...prev };
            if (section) {
                if (!newData[section]) newData[section] = {};
                newData[section][field] = value;
            } else {
                newData[field] = value;
            }
            return newData;
        });
    };

    const handleItemChange = (index, field, value) => {
        setServicesData(prev => {
            const newData = { ...prev };
            const newItems = [...newData.items];
            newItems[index] = { ...newItems[index], [field]: value };
            newData.items = newItems;
            return newData;
        });
    };

    const handleFeatureChange = (itemIndex, featureIndex, value) => {
        setServicesData(prev => {
            const newData = { ...prev };
            const newItems = [...newData.items];
            const newFeatures = [...newItems[itemIndex].features];
            newFeatures[featureIndex] = value;
            newItems[itemIndex] = { ...newItems[itemIndex], features: newFeatures };
            newData.items = newItems;
            return newData;
        });
    };

    const addFeature = (itemIndex) => {
        setServicesData(prev => {
            const newData = { ...prev };
            const newItems = [...newData.items];
            const newFeatures = [...(newItems[itemIndex].features || []), ''];
            newItems[itemIndex] = { ...newItems[itemIndex], features: newFeatures };
            newData.items = newItems;
            return newData;
        });
    };

    const removeFeature = (itemIndex, featureIndex) => {
        setServicesData(prev => {
            const newData = { ...prev };
            const newItems = [...newData.items];
            const newFeatures = newItems[itemIndex].features.filter((_, i) => i !== featureIndex);
            newItems[itemIndex] = { ...newItems[itemIndex], features: newFeatures };
            newData.items = newItems;
            return newData;
        });
    };

    // NEW: Add a new service card
    const addServiceCard = () => {
        setServicesData(prev => {
            const newData = { ...prev };
            const newItems = [...(newData.items || [])];

            // Create a new service card with default values
            const newService = {
                number: String(newItems.length + 1).padStart(2, '0'),
                title: "New Service",
                description: "Service description here",
                icon: "FaStar",
                color: "#10B981",
                features: ["Feature 1", "Feature 2", "Feature 3"],
                image: "",
                stat: "New",
                ctaText: "View Details",
                ctaLink: "#"
            };

            newItems.push(newService);
            newData.items = newItems;
            return newData;
        });
    };

    // NEW: Remove a service card
    const removeServiceCard = (index) => {
        if (confirm('Are you sure you want to delete this service card?')) {
            setServicesData(prev => {
                const newData = { ...prev };
                const newItems = prev.items.filter((_, i) => i !== index);

                // Update numbers for remaining items
                newItems.forEach((item, i) => {
                    item.number = String(i + 1).padStart(2, '0');
                });

                newData.items = newItems;
                return newData;
            });
        }
    };

    // NEW: Move service card up
    const moveCardUp = (index) => {
        if (index === 0) return;
        setServicesData(prev => {
            const newData = { ...prev };
            const newItems = [...prev.items];
            [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];

            // Update numbers
            newItems.forEach((item, i) => {
                item.number = String(i + 1).padStart(2, '0');
            });

            newData.items = newItems;
            return newData;
        });
    };

    // NEW: Move service card down
    const moveCardDown = (index) => {
        if (index === servicesData.items.length - 1) return;
        setServicesData(prev => {
            const newData = { ...prev };
            const newItems = [...prev.items];
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];

            // Update numbers
            newItems.forEach((item, i) => {
                item.number = String(i + 1).padStart(2, '0');
            });

            newData.items = newItems;
            return newData;
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
                    <h1 className="text-3xl font-bold">Edit Services Section</h1>
                    <div className="space-x-4">
                        <button
                            onClick={addServiceCard}
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            + Add New Service
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {message && (
                    <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-6 space-y-8">
                    {/* Header Section */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-2xl font-semibold">Section Header</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                            <input
                                type="text"
                                value={servicesData.badge || ''}
                                onChange={(e) => setServicesData({ ...servicesData, badge: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title Prefix</label>
                            <input
                                type="text"
                                value={servicesData.title?.prefix || ''}
                                onChange={(e) => handleChange('title', 'prefix', e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title Text</label>
                            <input
                                type="text"
                                value={servicesData.title?.text || ''}
                                onChange={(e) => handleChange('title', 'text', e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                            <input
                                type="text"
                                value={servicesData.subtitle || ''}
                                onChange={(e) => setServicesData({ ...servicesData, subtitle: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                    </div>

                    {/* Service Items */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">Service Cards ({servicesData.items?.length || 0})</h2>
                        </div>

                        {servicesData.items?.map((item, index) => (
                            <div key={index} className="border rounded-lg p-6 space-y-4 bg-gray-50 relative">
                                {/* Card Controls */}
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button
                                        onClick={() => moveCardUp(index)}
                                        disabled={index === 0}
                                        className={`px-3 py-1 rounded ${index === 0
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                            }`}
                                    >
                                        ↑
                                    </button>
                                    <button
                                        onClick={() => moveCardDown(index)}
                                        disabled={index === servicesData.items.length - 1}
                                        className={`px-3 py-1 rounded ${index === servicesData.items.length - 1
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                            }`}
                                    >
                                        ↓
                                    </button>
                                    <button
                                        onClick={() => removeServiceCard(index)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <h3 className="text-xl font-semibold mb-4">Service {index + 1}: {item.title}</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
                                        <input
                                            type="text"
                                            value={item.number || ''}
                                            onChange={(e) => handleItemChange(index, 'number', e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={item.title || ''}
                                            onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon Component</label>
                                        <input
                                            type="text"
                                            value={item.icon || ''}
                                            onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                            placeholder="FaHome"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                        <input
                                            type="text"
                                            value={item.color || ''}
                                            onChange={(e) => handleItemChange(index, 'color', e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                            placeholder="#10B981"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Stat</label>
                                        <input
                                            type="text"
                                            value={item.stat || ''}
                                            onChange={(e) => handleItemChange(index, 'stat', e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                            placeholder="500+ Homes"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                                        <input
                                            type="text"
                                            value={item.ctaLink || ''}
                                            onChange={(e) => handleItemChange(index, 'ctaLink', e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                            placeholder="/services/residential-lighting"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                                        <input
                                            type="text"
                                            value={item.ctaText || 'View Details'}
                                            onChange={(e) => handleItemChange(index, 'ctaText', e.target.value)}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={item.description || ''}
                                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                        rows="3"
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>

                                {/* Features */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                                    {item.features?.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, fIndex, e.target.value)}
                                                className="flex-1 px-3 py-2 border rounded"
                                            />
                                            <button
                                                onClick={() => removeFeature(index, fIndex)}
                                                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addFeature(index)}
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        + Add Feature
                                    </button>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Image</label>

                                    {item.image && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                                            <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden border">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item.image || ''}
                                            onChange={(e) => handleItemChange(index, 'image', e.target.value)}
                                            className="flex-1 px-3 py-2 border rounded"
                                            placeholder="/uploads/image.jpg"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, index)}
                                            disabled={uploading && uploadingIndex === index}
                                            className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    {uploading && uploadingIndex === index && (
                                        <p className="text-sm text-gray-500">Uploading...</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}