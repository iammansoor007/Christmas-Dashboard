'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';

export default function QuoteFormEditor() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            router.push('/admin/login');
        }
    }, [router]);

    useEffect(() => {
        fetch('/api/quote-form')
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
            const response = await fetch('/api/admin/quote-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Form saved successfully!' });
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

    // Budget options management
    const addBudgetOption = () => {
        setData(prev => ({
            ...prev,
            fields: {
                ...prev.fields,
                budget: {
                    ...prev.fields.budget,
                    options: [...(prev.fields.budget.options || []), 'New Option']
                }
            }
        }));
    };

    const updateBudgetOption = (index, value) => {
        setData(prev => {
            const newOptions = [...prev.fields.budget.options];
            newOptions[index] = value;
            return {
                ...prev,
                fields: {
                    ...prev.fields,
                    budget: {
                        ...prev.fields.budget,
                        options: newOptions
                    }
                }
            };
        });
    };

    const removeBudgetOption = (index) => {
        setData(prev => ({
            ...prev,
            fields: {
                ...prev.fields,
                budget: {
                    ...prev.fields.budget,
                    options: prev.fields.budget.options.filter((_, i) => i !== index)
                }
            }
        }));
    };

    // Benefits management
    const addBenefit = () => {
        setData(prev => ({
            ...prev,
            benefits: [...(prev.benefits || []), { text: 'New benefit', icon: 'FaCheckCircle' }]
        }));
    };

    const updateBenefit = (index, field, value) => {
        setData(prev => {
            const newBenefits = [...prev.benefits];
            newBenefits[index] = { ...newBenefits[index], [field]: value };
            return { ...prev, benefits: newBenefits };
        });
    };

    const removeBenefit = (index) => {
        setData(prev => ({
            ...prev,
            benefits: prev.benefits.filter((_, i) => i !== index)
        }));
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
                    <h1 className="text-3xl font-bold">Edit Quote Form</h1>
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

                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    {/* Header Section */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-2xl font-semibold">Form Header</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                            <input
                                type="text"
                                value={data.badge || ''}
                                onChange={(e) => setData({ ...data, badge: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={data.title || ''}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                            <textarea
                                value={data.subtitle || ''}
                                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                                rows="2"
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Submit Button Text</label>
                            <input
                                type="text"
                                value={data.submitButtonText || 'Submit: Get My Lighting Quote'}
                                onChange={(e) => setData({ ...data, submitButtonText: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Success Message</label>
                            <textarea
                                value={data.successMessage || ''}
                                onChange={(e) => setData({ ...data, successMessage: e.target.value })}
                                rows="2"
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Form Fields</h2>

                        {/* First Name */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">First Name Field</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.firstName?.label || 'First Name'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                firstName: { ...data.fields?.firstName, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.firstName?.placeholder || 'John'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                firstName: { ...data.fields?.firstName, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.fields?.firstName?.required || false}
                                            onChange={(e) => setData({
                                                ...data,
                                                fields: {
                                                    ...data.fields,
                                                    firstName: { ...data.fields?.firstName, required: e.target.checked }
                                                }
                                            })}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">Required field</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">Last Name Field</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.lastName?.label || 'Last Name'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                lastName: { ...data.fields?.lastName, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.lastName?.placeholder || 'Smith'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                lastName: { ...data.fields?.lastName, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.fields?.lastName?.required || false}
                                            onChange={(e) => setData({
                                                ...data,
                                                fields: {
                                                    ...data.fields,
                                                    lastName: { ...data.fields?.lastName, required: e.target.checked }
                                                }
                                            })}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">Required field</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">Email Field</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.email?.label || 'Email'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                email: { ...data.fields?.email, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.email?.placeholder || 'john@example.com'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                email: { ...data.fields?.email, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.fields?.email?.required || false}
                                            onChange={(e) => setData({
                                                ...data,
                                                fields: {
                                                    ...data.fields,
                                                    email: { ...data.fields?.email, required: e.target.checked }
                                                }
                                            })}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">Required field</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">Phone Field</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.phone?.label || 'Phone'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                phone: { ...data.fields?.phone, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.phone?.placeholder || '(614) 301-7100'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                phone: { ...data.fields?.phone, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.fields?.phone?.required || false}
                                            onChange={(e) => setData({
                                                ...data,
                                                fields: {
                                                    ...data.fields,
                                                    phone: { ...data.fields?.phone, required: e.target.checked }
                                                }
                                            })}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">Required field</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">Address Field</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.address?.label || 'Address'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                address: { ...data.fields?.address, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.address?.placeholder || '123 Main St'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                address: { ...data.fields?.address, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.fields?.address?.required || false}
                                            onChange={(e) => setData({
                                                ...data,
                                                fields: {
                                                    ...data.fields,
                                                    address: { ...data.fields?.address, required: e.target.checked }
                                                }
                                            })}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">Required field</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* City */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">City Field</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.city?.label || 'City'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                city: { ...data.fields?.city, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.city?.placeholder || 'Columbus'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                city: { ...data.fields?.city, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.fields?.city?.required || false}
                                            onChange={(e) => setData({
                                                ...data,
                                                fields: {
                                                    ...data.fields,
                                                    city: { ...data.fields?.city, required: e.target.checked }
                                                }
                                            })}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">Required field</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Budget Dropdown */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">Budget Dropdown</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.budget?.label || 'Budget Range'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                budget: { ...data.fields?.budget, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.budget?.placeholder || 'Select your budget...'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                budget: { ...data.fields?.budget, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.fields?.budget?.required || false}
                                            onChange={(e) => setData({
                                                ...data,
                                                fields: {
                                                    ...data.fields,
                                                    budget: { ...data.fields?.budget, required: e.target.checked }
                                                }
                                            })}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">Required field</span>
                                    </label>
                                </div>
                            </div>

                            {/* Budget Options */}
                            <div className="ml-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Options</label>
                                {data.fields?.budget?.options?.map((option, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => updateBudgetOption(index, e.target.value)}
                                            className="flex-1 px-3 py-2 border rounded"
                                        />
                                        <button
                                            onClick={() => removeBudgetOption(index)}
                                            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addBudgetOption}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                                >
                                    <FaPlus size={12} /> Add Option
                                </button>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">Notes Field</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.notes?.label || 'Additional Notes'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                notes: { ...data.fields?.notes, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.notes?.placeholder || 'Please let us know any details...'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                notes: { ...data.fields?.notes, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.fields?.notes?.required || false}
                                            onChange={(e) => setData({
                                                ...data,
                                                fields: {
                                                    ...data.fields,
                                                    notes: { ...data.fields?.notes, required: e.target.checked }
                                                }
                                            })}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">Required field</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="font-medium mb-3">File Upload</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={data.fields?.fileUpload?.label || 'Upload Photos'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                fileUpload: { ...data.fields?.fileUpload, label: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Placeholder</label>
                                    <input
                                        type="text"
                                        value={data.fields?.fileUpload?.placeholder || 'Click to upload photos'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                fileUpload: { ...data.fields?.fileUpload, placeholder: e.target.value }
                                            }
                                        })}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Helper Text</label>
                                    <textarea
                                        value={data.fields?.fileUpload?.helperText || 'For the quickest turn-around time, upload a front facing photo of your home below 🙂'}
                                        onChange={(e) => setData({
                                            ...data,
                                            fields: {
                                                ...data.fields,
                                                fileUpload: { ...data.fields?.fileUpload, helperText: e.target.value }
                                            }
                                        })}
                                        rows="2"
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="border-t pt-6">
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
                            {data.benefits?.map((benefit, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={benefit.text}
                                        onChange={(e) => updateBenefit(index, 'text', e.target.value)}
                                        className="flex-1 px-3 py-2 border rounded"
                                        placeholder="Benefit text"
                                    />
                                    <input
                                        type="text"
                                        value={benefit.icon || 'FaCheckCircle'}
                                        onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                                        className="w-24 px-3 py-2 border rounded"
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

                    {/* Contact Info */}
                    <div className="border-t pt-6">
                        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="text"
                                    value={data.contactInfo?.phone || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        contactInfo: { ...data.contactInfo, phone: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={data.contactInfo?.email || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        contactInfo: { ...data.contactInfo, email: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                                <input
                                    type="text"
                                    value={data.contactInfo?.hours || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        contactInfo: { ...data.contactInfo, hours: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Support Text</label>
                                <input
                                    type="text"
                                    value={data.contactInfo?.support || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        contactInfo: { ...data.contactInfo, support: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}