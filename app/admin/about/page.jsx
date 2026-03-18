'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function AboutPageEditor() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingFor, setUploadingFor] = useState(null);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            router.push('/admin/login');
        }
    }, [router]);

    useEffect(() => {
        fetch('/api/about')
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
            const response = await fetch('/api/admin/about', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'About page saved successfully!' });
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
        setUploadingFor(field);
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
                // Handle nested fields
                if (field === 'hero.backgroundImage') {
                    setData({ ...data, hero: { ...data.hero, backgroundImage: result.url } });
                } else if (field === 'founder.image') {
                    setData({ ...data, founder: { ...data.founder, image: result.url } });
                } else if (field === 'mission.image') {
                    setData({ ...data, mission: { ...data.mission, image: result.url } });
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
            setUploadingFor(null);
        }
    };

    // Stats Management
    const addStat = () => {
        setData(prev => ({
            ...prev,
            stats: [...(prev.stats || []), { number: '500+', label: 'Happy Clients', icon: 'FaStar', color: '#f59e0b' }]
        }));
    };

    const updateStat = (index, field, value) => {
        setData(prev => {
            const newStats = [...prev.stats];
            newStats[index] = { ...newStats[index], [field]: value };
            return { ...prev, stats: newStats };
        });
    };

    const removeStat = (index) => {
        setData(prev => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index)
        }));
    };

    const moveStat = (index, direction) => {
        if ((direction === 'up' && index === 0) ||
            (direction === 'down' && index === data.stats.length - 1)) return;

        setData(prev => {
            const newStats = [...prev.stats];
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            [newStats[index], newStats[newIndex]] = [newStats[newIndex], newStats[index]];
            return { ...prev, stats: newStats };
        });
    };

    // Team Management
    const addTeamMember = () => {
        setData(prev => ({
            ...prev,
            team: [...(prev.team || []), {
                name: 'New Member',
                role: 'Position',
                bio: 'Bio goes here',
                image: '',
                socialLinks: []
            }]
        }));
    };

    const updateTeamMember = (index, field, value) => {
        setData(prev => {
            const newTeam = [...prev.team];
            newTeam[index] = { ...newTeam[index], [field]: value };
            return { ...prev, team: newTeam };
        });
    };

    const removeTeamMember = (index) => {
        setData(prev => ({
            ...prev,
            team: prev.team.filter((_, i) => i !== index)
        }));
    };

    // Values Management
    const addValue = () => {
        setData(prev => ({
            ...prev,
            values: [...(prev.values || []), { icon: 'FaStar', text: 'New Value' }]
        }));
    };

    const updateValue = (index, field, value) => {
        setData(prev => {
            const newValues = [...prev.values];
            newValues[index] = { ...newValues[index], [field]: value };
            return { ...prev, values: newValues };
        });
    };

    const removeValue = (index) => {
        setData(prev => ({
            ...prev,
            values: prev.values.filter((_, i) => i !== index)
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
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Edit About Page</h1>
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
                    {/* Page Metadata */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-2xl font-semibold">Page Metadata</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                            <input
                                type="text"
                                value={data.pageTitle || ''}
                                onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                            <input
                                type="text"
                                value={data.pageSubtitle || ''}
                                onChange={(e) => setData({ ...data, pageSubtitle: e.target.value })}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                    </div>

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
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Icon</label>
                                <input
                                    type="text"
                                    value={data.hero?.badge?.icon || 'HiOutlineSparkles'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, badge: { ...data.hero?.badge, icon: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge BG Color</label>
                                <input
                                    type="text"
                                    value={data.hero?.badge?.backgroundColor || 'linear-gradient(to right, rgba(245,158,11,0.2), rgba(239,68,68,0.2))'}
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

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title Line 1</label>
                                <input
                                    type="text"
                                    value={data.hero?.title?.line1 || 'GET TO KNOW'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, title: { ...data.hero?.title, line1: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title Line 2</label>
                                <input
                                    type="text"
                                    value={data.hero?.title?.line2 || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, title: { ...data.hero?.title, line2: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Text</label>
                                <input
                                    type="text"
                                    value={data.hero?.title?.highlighted || 'YOUR LIGHTING TEAM'}
                                    onChange={(e) => setData({
                                        ...data,
                                        hero: { ...data.hero, title: { ...data.hero?.title, highlighted: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
                                <input
                                    type="text"
                                    value={data.hero?.title?.gradientFrom || '#fbbf24'}
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
                                    value={data.hero?.title?.gradientTo || '#ef4444'}
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

                        {/* Trust Badges */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Trust Badges</label>
                                <button
                                    onClick={() => {
                                        const newBadges = [...(data.hero?.trustBadges || []), { icon: 'FaStar', text: 'New Badge' }];
                                        setData({ ...data, hero: { ...data.hero, trustBadges: newBadges } });
                                    }}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                >
                                    + Add Badge
                                </button>
                            </div>
                            {data.hero?.trustBadges?.map((badge, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={badge.icon || ''}
                                        onChange={(e) => {
                                            const newBadges = [...data.hero.trustBadges];
                                            newBadges[index] = { ...newBadges[index], icon: e.target.value };
                                            setData({ ...data, hero: { ...data.hero, trustBadges: newBadges } });
                                        }}
                                        className="w-24 px-3 py-2 border rounded text-sm"
                                        placeholder="Icon"
                                    />
                                    <input
                                        type="text"
                                        value={badge.text || ''}
                                        onChange={(e) => {
                                            const newBadges = [...data.hero.trustBadges];
                                            newBadges[index] = { ...newBadges[index], text: e.target.value };
                                            setData({ ...data, hero: { ...data.hero, trustBadges: newBadges } });
                                        }}
                                        className="flex-1 px-3 py-2 border rounded text-sm"
                                        placeholder="Badge text"
                                    />
                                    <button
                                        onClick={() => {
                                            const newBadges = data.hero.trustBadges.filter((_, i) => i !== index);
                                            setData({ ...data, hero: { ...data.hero, trustBadges: newBadges } });
                                        }}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            ))}
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
                                    disabled={uploading && uploadingFor === 'hero.backgroundImage'}
                                    className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                                />
                            </div>
                        </div>

                        {/* Overlay Colors */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Overlay From</label>
                                <input
                                    type="text"
                                    value={data.hero?.overlay?.from || 'rgba(245,158,11,0.15)'}
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

                    {/* Founder Section */}
                    <div className="space-y-4 border-b pb-6">
                        <h2 className="text-2xl font-semibold">Founder Section</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                                <input
                                    type="text"
                                    value={data.founder?.badge?.text || 'INSTALLING CHRISTMAS LIGHTS'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, badge: { ...data.founder?.badge, text: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Icon</label>
                                <input
                                    type="text"
                                    value={data.founder?.badge?.icon || 'FaAward'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, badge: { ...data.founder?.badge, icon: e.target.value } }
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
                                    value={data.founder?.title?.prefix || 'Serving your'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, title: { ...data.founder?.title, prefix: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title Highlighted</label>
                                <input
                                    type="text"
                                    value={data.founder?.title?.highlighted || 'family'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, title: { ...data.founder?.title, highlighted: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                            <textarea
                                value={data.founder?.quote || ''}
                                onChange={(e) => setData({
                                    ...data,
                                    founder: { ...data.founder, quote: e.target.value }
                                })}
                                rows="3"
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={data.founder?.description || ''}
                                onChange={(e) => setData({
                                    ...data,
                                    founder: { ...data.founder, description: e.target.value }
                                })}
                                rows="3"
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        {/* Mission/Expertise/Philosophy */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <h3 className="font-medium">Mission</h3>
                                <input
                                    type="text"
                                    value={data.founder?.mission?.label || 'Mission'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, mission: { ...data.founder?.mission, label: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Label"
                                />
                                <input
                                    type="text"
                                    value={data.founder?.mission?.value || 'Making holiday memories stress-free'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, mission: { ...data.founder?.mission, value: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Value"
                                />
                                <input
                                    type="text"
                                    value={data.founder?.mission?.icon || 'FaGem'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, mission: { ...data.founder?.mission, icon: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Icon"
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium">Expertise</h3>
                                <input
                                    type="text"
                                    value={data.founder?.expertise?.label || 'Serving'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, expertise: { ...data.founder?.expertise, label: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Label"
                                />
                                <input
                                    type="text"
                                    value={data.founder?.expertise?.value || 'Central Ohio families'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, expertise: { ...data.founder?.expertise, value: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Value"
                                />
                                <input
                                    type="text"
                                    value={data.founder?.expertise?.icon || 'FaCalendarAlt'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, expertise: { ...data.founder?.expertise, icon: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Icon"
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium">Philosophy</h3>
                                <input
                                    type="text"
                                    value={data.founder?.philosophy?.label || 'Philosophy'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, philosophy: { ...data.founder?.philosophy, label: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Label"
                                />
                                <input
                                    type="text"
                                    value={data.founder?.philosophy?.value || 'Customer-first approach'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, philosophy: { ...data.founder?.philosophy, value: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Value"
                                />
                                <input
                                    type="text"
                                    value={data.founder?.philosophy?.icon || 'FaHeart'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, philosophy: { ...data.founder?.philosophy, icon: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Icon"
                                />
                            </div>
                        </div>

                        {/* Founder Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Founder Image</label>
                            {data.founder?.image && (
                                <div className="mb-4">
                                    <img src={data.founder.image} alt="Founder" className="w-48 h-48 object-cover rounded" />
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={data.founder?.image || ''}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, image: e.target.value }
                                    })}
                                    className="flex-1 px-3 py-2 border rounded"
                                    placeholder="/images/aboutownerfamily.JPEG"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'founder.image')}
                                    disabled={uploading && uploadingFor === 'founder.image'}
                                    className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                                />
                            </div>
                            <input
                                type="text"
                                value={data.founder?.imageAlt || ''}
                                onChange={(e) => setData({
                                    ...data,
                                    founder: { ...data.founder, imageAlt: e.target.value }
                                })}
                                className="w-full mt-2 px-3 py-2 border rounded"
                                placeholder="Image Alt Text"
                            />
                        </div>

                        {/* Experience Badge */}
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Icon</label>
                                <input
                                    type="text"
                                    value={data.founder?.experienceBadge?.icon || 'FaCalendarAlt'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, experienceBadge: { ...data.founder?.experienceBadge, icon: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Label</label>
                                <input
                                    type="text"
                                    value={data.founder?.experienceBadge?.label || 'Serving'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, experienceBadge: { ...data.founder?.experienceBadge, label: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge Value</label>
                                <input
                                    type="text"
                                    value={data.founder?.experienceBadge?.value || 'Central Ohio families'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, experienceBadge: { ...data.founder?.experienceBadge, value: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                                <input
                                    type="text"
                                    value={data.founder?.experienceBadge?.backgroundColor || 'rgba(255,255,255,0.9)'}
                                    onChange={(e) => setData({
                                        ...data,
                                        founder: { ...data.founder, experienceBadge: { ...data.founder?.experienceBadge, backgroundColor: e.target.value } }
                                    })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="space-y-4 border-b pb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">Stats</h2>
                            <button
                                onClick={addStat}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                            >
                                <FaPlus size={12} /> Add Stat
                            </button>
                        </div>

                        {data.stats?.map((stat, index) => (
                            <div key={index} className="border p-4 rounded-lg bg-gray-50 relative">
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => moveStat(index, 'up')}
                                        disabled={index === 0}
                                        className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        <FaArrowUp size={14} />
                                    </button>
                                    <button
                                        onClick={() => moveStat(index, 'down')}
                                        disabled={index === data.stats.length - 1}
                                        className={`p-1 rounded ${index === data.stats.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        <FaArrowDown size={14} />
                                    </button>
                                    <button
                                        onClick={() => removeStat(index)}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-4 gap-4 mt-6">
                                    <input
                                        type="text"
                                        value={stat.number || ''}
                                        onChange={(e) => updateStat(index, 'number', e.target.value)}
                                        className="px-3 py-2 border rounded"
                                        placeholder="500+"
                                    />
                                    <input
                                        type="text"
                                        value={stat.label || ''}
                                        onChange={(e) => updateStat(index, 'label', e.target.value)}
                                        className="px-3 py-2 border rounded"
                                        placeholder="Happy Clients"
                                    />
                                    <input
                                        type="text"
                                        value={stat.icon || ''}
                                        onChange={(e) => updateStat(index, 'icon', e.target.value)}
                                        className="px-3 py-2 border rounded"
                                        placeholder="FaStar"
                                    />
                                    <input
                                        type="text"
                                        value={stat.color || ''}
                                        onChange={(e) => updateStat(index, 'color', e.target.value)}
                                        className="px-3 py-2 border rounded"
                                        placeholder="#f59e0b"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Values Section */}
                    <div className="space-y-4 border-b pb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">Values</h2>
                            <button
                                onClick={addValue}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                            >
                                <FaPlus size={12} /> Add Value
                            </button>
                        </div>

                        {data.values?.map((value, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={value.icon || ''}
                                    onChange={(e) => updateValue(index, 'icon', e.target.value)}
                                    className="w-24 px-3 py-2 border rounded"
                                    placeholder="Icon"
                                />
                                <input
                                    type="text"
                                    value={value.text || ''}
                                    onChange={(e) => updateValue(index, 'text', e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded"
                                    placeholder="Value text"
                                />
                                <button
                                    onClick={() => removeValue(index)}
                                    className="p-2 text-red-500 hover:text-red-700"
                                >
                                    <FaTrash size={16} />
                                </button>
                            </div>
                        ))}
                    </div>



                
                </div>
            </div>
        </div>
    );
}