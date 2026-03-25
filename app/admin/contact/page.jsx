'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function ContactPageEditor() {
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
        fetch('/api/contact-page')
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
            const response = await fetch('/api/contact-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Contact page saved successfully!' });
            } else {
                setMessage({ type: 'error', text: result.error });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error saving' });
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e, field) => {
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
                if (field === 'hero') {
                    setData({ ...data, hero: { ...data.hero, backgroundImage: result.url } });
                } else if (field === 'seo') {
                    setData({ ...data, seo: { ...data.seo, ogImage: result.url } });
                }
                setMessage({ type: 'success', text: 'Image uploaded!' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Upload failed' });
        } finally {
            setUploading(false);
        }
    };

    // Budget Options Management
    const addBudgetOption = () => {
        setData({
            ...data,
            form: {
                ...data.form,
                budgetOptions: [...(data.form?.budgetOptions || []), 'New Budget Option']
            }
        });
    };

    const updateBudgetOption = (index, value) => {
        const newOptions = [...data.form.budgetOptions];
        newOptions[index] = value;
        setData({
            ...data,
            form: { ...data.form, budgetOptions: newOptions }
        });
    };

    const removeBudgetOption = (index) => {
        const newOptions = data.form.budgetOptions.filter((_, i) => i !== index);
        setData({
            ...data,
            form: { ...data.form, budgetOptions: newOptions }
        });
    };

    // Lighting Areas Management
    const addLightingArea = () => {
        setData({
            ...data,
            form: {
                ...data.form,
                lightingAreas: [...(data.form?.lightingAreas || []), {
                    id: `area_${Date.now()}`,
                    label: 'New Area',
                    emoji: '🏠'
                }]
            }
        });
    };

    const updateLightingArea = (index, field, value) => {
        const newAreas = [...data.form.lightingAreas];
        newAreas[index] = { ...newAreas[index], [field]: value };
        setData({
            ...data,
            form: { ...data.form, lightingAreas: newAreas }
        });
    };

    const removeLightingArea = (index) => {
        const newAreas = data.form.lightingAreas.filter((_, i) => i !== index);
        setData({
            ...data,
            form: { ...data.form, lightingAreas: newAreas }
        });
    };

    // Benefits Management
    const addBenefit = () => {
        setData({
            ...data,
            benefits: [...(data.benefits || []), { text: 'New benefit', icon: 'FaCheckCircle' }]
        });
    };

    const updateBenefit = (index, field, value) => {
        const newBenefits = [...data.benefits];
        newBenefits[index] = { ...newBenefits[index], [field]: value };
        setData({ ...data, benefits: newBenefits });
    };

    const removeBenefit = (index) => {
        setData({
            ...data,
            benefits: data.benefits.filter((_, i) => i !== index)
        });
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Contact Page</h1>
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
                                value={data?.hero?.badge || 'CONTACT US'}
                                onChange={(e) => setData({ ...data, hero: { ...data?.hero, badge: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title Line 1</label>
                                <input
                                    type="text"
                                    value={data?.hero?.title?.line1 || 'GET IN TOUCH'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, title: { ...data?.hero?.title, line1: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title Line 2</label>
                                <input
                                    type="text"
                                    value={data?.hero?.title?.line2 || 'WITH US'}
                                    onChange={(e) => setData({ ...data, hero: { ...data?.hero, title: { ...data?.hero?.title, line2: e.target.value } } })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subtitle</label>
                            <textarea
                                value={data?.hero?.subtitle || 'We\'d love to hear from you. Fill out the form below and we\'ll get back to you within 24 hours.'}
                                onChange={(e) => setData({ ...data, hero: { ...data?.hero, subtitle: e.target.value } })}
                                rows="2"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Background Image</label>
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

                {/* Form Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Form Section</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Badge</label>
                            <input
                                type="text"
                                value={data?.form?.badge || 'Get A Fast Quote'}
                                onChange={(e) => setData({ ...data, form: { ...data?.form, badge: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={data?.form?.title || 'Contact Us For Your Fast Free Quote'}
                                onChange={(e) => setData({ ...data, form: { ...data?.form, title: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subtitle</label>
                            <textarea
                                value={data?.form?.subtitle || 'We look forward to helping light up your property 🙂'}
                                onChange={(e) => setData({ ...data, form: { ...data?.form, subtitle: e.target.value } })}
                                rows="2"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Submit Button Text</label>
                            <input
                                type="text"
                                value={data?.form?.submitButtonText || 'Get My Lighting Quote'}
                                onChange={(e) => setData({ ...data, form: { ...data?.form, submitButtonText: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Success Message</label>
                            <textarea
                                value={data?.form?.successMessage || 'Quote Request Sent! We\'ll contact you within 24 hours.'}
                                onChange={(e) => setData({ ...data, form: { ...data?.form, successMessage: e.target.value } })}
                                rows="2"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* Budget Options */}
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">Budget Options</h3>
                                <button
                                    onClick={addBudgetOption}
                                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                                >
                                    + Add Option
                                </button>
                            </div>
                            {data?.form?.budgetOptions?.map((option, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => updateBudgetOption(index, e.target.value)}
                                        className="flex-1 border rounded px-3 py-2 text-sm"
                                    />
                                    <button
                                        onClick={() => removeBudgetOption(index)}
                                        className="px-3 py-2 bg-red-500 text-white rounded text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Lighting Areas */}
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">Lighting Areas</h3>
                                <button
                                    onClick={addLightingArea}
                                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                                >
                                    + Add Area
                                </button>
                            </div>
                            {data?.form?.lightingAreas?.map((area, index) => (
                                <div key={index} className="border p-3 rounded mb-3">
                                    <div className="grid grid-cols-3 gap-2">
                                        <input
                                            type="text"
                                            value={area.id || ''}
                                            onChange={(e) => updateLightingArea(index, 'id', e.target.value)}
                                            className="border rounded px-2 py-1 text-sm"
                                            placeholder="ID (house)"
                                        />
                                        <input
                                            type="text"
                                            value={area.label || ''}
                                            onChange={(e) => updateLightingArea(index, 'label', e.target.value)}
                                            className="border rounded px-2 py-1 text-sm"
                                            placeholder="Label"
                                        />
                                        <input
                                            type="text"
                                            value={area.emoji || '🏠'}
                                            onChange={(e) => updateLightingArea(index, 'emoji', e.target.value)}
                                            className="border rounded px-2 py-1 text-sm"
                                            placeholder="Emoji"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeLightingArea(index)}
                                        className="mt-2 text-red-500 text-sm hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Benefits</h2>
                        <button
                            onClick={addBenefit}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                        >
                            <FaPlus size={12} /> Add Benefit
                        </button>
                    </div>
                    <div className="space-y-3">
                        {data?.benefits?.map((benefit, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={benefit.text || ''}
                                    onChange={(e) => updateBenefit(index, 'text', e.target.value)}
                                    className="flex-1 border rounded px-3 py-2"
                                    placeholder="Benefit text"
                                />
                                <input
                                    type="text"
                                    value={benefit.icon || 'FaCheckCircle'}
                                    onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                                    className="w-24 border rounded px-3 py-2"
                                    placeholder="Icon"
                                />
                                <button
                                    onClick={() => removeBenefit(index)}
                                    className="p-2 text-red-500 hover:text-red-700"
                                >
                                    <FaTrash size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Info Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                type="text"
                                value={data?.contactInfo?.phone || '(614) 301-7100'}
                                onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, phone: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={data?.contactInfo?.email || 'Info@lightsovercolumbus.com'}
                                onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, email: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Hours</label>
                            <input
                                type="text"
                                value={data?.contactInfo?.hours || 'Mon-Fri: 8AM-6PM'}
                                onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, hours: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Support</label>
                            <input
                                type="text"
                                value={data?.contactInfo?.support || '24/7 Support'}
                                onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, support: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <textarea
                                value={data?.contactInfo?.address || '123 Holiday Lane, Columbus, OH 43215'}
                                onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, address: e.target.value } })}
                                rows="2"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
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
                                value={data?.seo?.metaTitle || 'Contact Us | Christmas Lights Over Columbus'}
                                onChange={(e) => setData({ ...data, seo: { ...data?.seo, metaTitle: e.target.value } })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Meta Description</label>
                            <textarea
                                value={data?.seo?.metaDescription || 'Contact Christmas Lights Over Columbus for professional holiday lighting. Get a free quote, ask questions, or schedule a consultation.'}
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