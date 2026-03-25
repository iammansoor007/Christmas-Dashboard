'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function TermsPageEditor() {
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
        fetch('/api/terms-page')
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
            const response = await fetch('/api/terms-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Terms page saved successfully!' });
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

    // Same section management functions as Privacy page
    const addSection = () => {
        setData({
            ...data,
            sections: [...(data.sections || []), {
                icon: 'FaFileContract',
                title: 'New Section',
                content: 'Section content goes here',
                subSections: [],
                note: ''
            }]
        });
    };

    const updateSection = (index, field, value) => {
        const newSections = [...data.sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setData({ ...data, sections: newSections });
    };

    const removeSection = (index) => {
        setData({
            ...data,
            sections: data.sections.filter((_, i) => i !== index)
        });
    };

    const moveSection = (index, direction) => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === data.sections.length - 1)) return;
        const newSections = [...data.sections];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
        setData({ ...data, sections: newSections });
    };

    const addSubSection = (sectionIndex) => {
        const newSections = [...data.sections];
        newSections[sectionIndex].subSections = [...(newSections[sectionIndex].subSections || []), {
            title: 'New Subsection',
            content: '',
            listItems: []
        }];
        setData({ ...data, sections: newSections });
    };

    const updateSubSection = (sectionIndex, subIndex, field, value) => {
        const newSections = [...data.sections];
        newSections[sectionIndex].subSections[subIndex][field] = value;
        setData({ ...data, sections: newSections });
    };

    const removeSubSection = (sectionIndex, subIndex) => {
        const newSections = [...data.sections];
        newSections[sectionIndex].subSections = newSections[sectionIndex].subSections.filter((_, i) => i !== subIndex);
        setData({ ...data, sections: newSections });
    };

    const addListItem = (sectionIndex, subIndex) => {
        const newSections = [...data.sections];
        newSections[sectionIndex].subSections[subIndex].listItems = [...(newSections[sectionIndex].subSections[subIndex].listItems || []), 'New list item'];
        setData({ ...data, sections: newSections });
    };

    const updateListItem = (sectionIndex, subIndex, itemIndex, value) => {
        const newSections = [...data.sections];
        newSections[sectionIndex].subSections[subIndex].listItems[itemIndex] = value;
        setData({ ...data, sections: newSections });
    };

    const removeListItem = (sectionIndex, subIndex, itemIndex) => {
        const newSections = [...data.sections];
        newSections[sectionIndex].subSections[subIndex].listItems = newSections[sectionIndex].subSections[subIndex].listItems.filter((_, i) => i !== itemIndex);
        setData({ ...data, sections: newSections });
    };

    const addFooterLink = () => {
        setData({
            ...data,
            footerLinks: {
                ...data.footerLinks,
                links: [...(data.footerLinks?.links || []), { label: 'New Link', href: '/' }]
            }
        });
    };

    const updateFooterLink = (index, field, value) => {
        const newLinks = [...data.footerLinks.links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setData({ ...data, footerLinks: { ...data.footerLinks, links: newLinks } });
    };

    const removeFooterLink = (index) => {
        const newLinks = data.footerLinks.links.filter((_, i) => i !== index);
        setData({ ...data, footerLinks: { ...data.footerLinks, links: newLinks } });
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Terms & Conditions Page</h1>
                <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50">
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
                        <div><label className="block text-sm font-medium mb-1">Badge Text</label><input type="text" value={data?.hero?.badge || 'Terms & Conditions'} onChange={(e) => setData({ ...data, hero: { ...data?.hero, badge: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Title</label><input type="text" value={data?.hero?.title || 'Terms & Conditions'} onChange={(e) => setData({ ...data, hero: { ...data?.hero, title: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Subtitle</label><input type="text" value={data?.hero?.subtitle || 'Please read these terms carefully before using our services'} onChange={(e) => setData({ ...data, hero: { ...data?.hero, subtitle: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Last Updated Text</label><input type="text" value={data?.hero?.lastUpdatedText || 'March 2026'} onChange={(e) => setData({ ...data, hero: { ...data?.hero, lastUpdatedText: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Background Image</label>{data?.hero?.backgroundImage && <img src={data.hero.backgroundImage} alt="Hero" className="w-48 h-32 object-cover rounded mb-2" />}<div className="flex gap-2"><input type="text" value={data?.hero?.backgroundImage || ''} onChange={(e) => setData({ ...data, hero: { ...data?.hero, backgroundImage: e.target.value } })} className="flex-1 border rounded px-3 py-2" /><input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'hero')} disabled={uploading} className="border rounded px-3 py-2 file:mr-2 file:py-1 file:px-3 file:text-sm" /></div></div>
                    </div>
                </div>

                {/* Introduction Section */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Introduction Section</h2>
                    <div className="space-y-4">
                        <div><label className="block text-sm font-medium mb-1">Title</label><input type="text" value={data?.introduction?.title || 'Agreement to Terms'} onChange={(e) => setData({ ...data, introduction: { ...data?.introduction, title: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={data?.introduction?.description || ''} onChange={(e) => setData({ ...data, introduction: { ...data?.introduction, description: e.target.value } })} rows="4" className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Icon</label><input type="text" value={data?.introduction?.icon || 'GiFruitTree'} onChange={(e) => setData({ ...data, introduction: { ...data?.introduction, icon: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                    </div>
                </div>

                {/* Terms Sections - Same structure as Privacy sections */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-semibold">Terms Sections</h2><button onClick={addSection} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"><FaPlus size={12} /> Add Section</button></div>
                    {data?.sections?.map((section, sIndex) => (
                        <div key={sIndex} className="border rounded-lg p-4 mb-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-medium">Section {sIndex + 1}</h3><div className="flex gap-2"><button onClick={() => moveSection(sIndex, 'up')} disabled={sIndex === 0} className="p-1 rounded text-gray-600 hover:bg-gray-200"><FaArrowUp size={14} /></button><button onClick={() => moveSection(sIndex, 'down')} disabled={sIndex === data.sections.length - 1} className="p-1 rounded text-gray-600 hover:bg-gray-200"><FaArrowDown size={14} /></button><button onClick={() => removeSection(sIndex)} className="p-1 text-red-500 hover:bg-red-50 rounded"><FaTrash size={14} /></button></div></div>
                            <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-medium mb-1">Icon</label><input type="text" value={section.icon || ''} onChange={(e) => updateSection(sIndex, 'icon', e.target.value)} className="w-full border rounded px-3 py-2" /></div><div><label className="block text-sm font-medium mb-1">Title</label><input type="text" value={section.title || ''} onChange={(e) => updateSection(sIndex, 'title', e.target.value)} className="w-full border rounded px-3 py-2" /></div></div>
                            <div className="mb-4"><label className="block text-sm font-medium mb-1">Content</label><textarea value={section.content || ''} onChange={(e) => updateSection(sIndex, 'content', e.target.value)} rows="3" className="w-full border rounded px-3 py-2" /></div>
                            {/* SubSections */}
                            <div className="ml-6 mt-4 border-l-2 border-gray-200 pl-4"><div className="flex justify-between items-center mb-2"><h4 className="font-medium">Subsections</h4><button onClick={() => addSubSection(sIndex)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+ Add Subsection</button></div>
                                {section.subSections?.map((sub, subIndex) => (
                                    <div key={subIndex} className="border rounded-lg p-3 mb-3 bg-white"><div className="flex justify-between items-center mb-2"><h5 className="font-medium">Subsection {subIndex + 1}</h5><button onClick={() => removeSubSection(sIndex, subIndex)} className="text-red-500 text-sm">Remove</button></div>
                                        <div className="mb-2"><label className="block text-xs font-medium mb-1">Title</label><input type="text" value={sub.title || ''} onChange={(e) => updateSubSection(sIndex, subIndex, 'title', e.target.value)} className="w-full border rounded px-2 py-1 text-sm" /></div>
                                        <div className="mb-2"><label className="block text-xs font-medium mb-1">Content</label><textarea value={sub.content || ''} onChange={(e) => updateSubSection(sIndex, subIndex, 'content', e.target.value)} rows="2" className="w-full border rounded px-2 py-1 text-sm" /></div>
                                        <div><label className="block text-xs font-medium mb-1">List Items</label><button onClick={() => addListItem(sIndex, subIndex)} className="mb-2 px-2 py-1 bg-blue-500 text-white rounded text-xs">+ Add Item</button>
                                            {sub.listItems?.map((item, iIndex) => (<div key={iIndex} className="flex gap-2 mb-1"><input type="text" value={item} onChange={(e) => updateListItem(sIndex, subIndex, iIndex, e.target.value)} className="flex-1 border rounded px-2 py-1 text-sm" /><button onClick={() => removeListItem(sIndex, subIndex, iIndex)} className="px-2 py-1 bg-red-500 text-white rounded text-xs">✕</button></div>))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4"><label className="block text-sm font-medium mb-1">Note (Optional)</label><textarea value={section.note || ''} onChange={(e) => updateSection(sIndex, 'note', e.target.value)} rows="2" className="w-full border rounded px-3 py-2" /></div>
                        </div>
                    ))}
                </div>

                {/* Contact Info */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium mb-1">Title</label><input type="text" value={data?.contactInfo?.title || 'Questions? Contact Us'} onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, title: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Icon</label><input type="text" value={data?.contactInfo?.icon || 'FaEnvelope'} onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, icon: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Phone</label><input type="text" value={data?.contactInfo?.phone || '(614) 301-7100'} onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, phone: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={data?.contactInfo?.email || 'info@christmaslightsovercolumbus.com'} onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, email: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                        <div><label className="block text-sm font-medium mb-1">Address</label><input type="text" value={data?.contactInfo?.address || 'Columbus, Ohio 43215'} onChange={(e) => setData({ ...data, contactInfo: { ...data?.contactInfo, address: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">Footer Links</h2>
                    <div className="mb-4"><label className="flex items-center gap-2"><input type="checkbox" checked={data?.footerLinks?.showLinks || false} onChange={(e) => setData({ ...data, footerLinks: { ...data?.footerLinks, showLinks: e.target.checked } })} /><span>Show Related Links</span></label></div>
                    <div className="space-y-2">{data?.footerLinks?.links?.map((link, index) => (<div key={index} className="flex gap-2"><input type="text" value={link.label || ''} onChange={(e) => updateFooterLink(index, 'label', e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Label" /><input type="text" value={link.href || ''} onChange={(e) => updateFooterLink(index, 'href', e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="/privacy" /><button onClick={() => removeFooterLink(index)} className="px-3 py-2 bg-red-500 text-white rounded">Remove</button></div>))}
                        <button onClick={addFooterLink} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded text-sm">+ Add Link</button></div>
                </div>

                {/* SEO */}
                <div className="border rounded-lg p-6 bg-white shadow">
                    <h2 className="text-2xl font-semibold mb-4">SEO</h2>
                    <div><label className="block text-sm font-medium mb-1">Meta Title</label><input type="text" value={data?.seo?.metaTitle || 'Terms & Conditions | Christmas Lights Over Columbus'} onChange={(e) => setData({ ...data, seo: { ...data?.seo, metaTitle: e.target.value } })} className="w-full border rounded px-3 py-2" /></div>
                    <div className="mt-4"><label className="block text-sm font-medium mb-1">Meta Description</label><textarea value={data?.seo?.metaDescription || ''} onChange={(e) => setData({ ...data, seo: { ...data?.seo, metaDescription: e.target.value } })} rows="3" className="w-full border rounded px-3 py-2" /></div>
                    <div className="mt-4"><label className="block text-sm font-medium mb-1">OG Image</label>{data?.seo?.ogImage && <img src={data.seo.ogImage} alt="OG" className="w-48 h-32 object-cover rounded mb-2" />}<div className="flex gap-2"><input type="text" value={data?.seo?.ogImage || ''} onChange={(e) => setData({ ...data, seo: { ...data?.seo, ogImage: e.target.value } })} className="flex-1 border rounded px-3 py-2" /><input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'seo')} disabled={uploading} className="border rounded px-3 py-2 file:mr-2 file:py-1 file:px-3 file:text-sm" /></div></div>
                </div>
            </div>
        </div>
    );
}