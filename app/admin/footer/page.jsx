'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function FooterEditor() {
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
    fetch('/api/footer')
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
      const response = await fetch('/api/admin/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Footer saved successfully!' });
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

  const handleImageUpload = async (e) => {
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
        setData({ ...data, logo: result.url });
        setMessage({ type: 'success', text: 'Logo uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Upload failed' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Error uploading logo' });
    } finally {
      setUploading(false);
    }
  };

  // Social Media Management
  const addSocial = () => {
    setData(prev => ({
      ...prev,
      socialMedia: [...(prev.socialMedia || []), {
        icon: 'FaFacebookF',
        label: 'Facebook',
        href: 'https://facebook.com',
        key: `social_${Date.now()}`
      }]
    }));
  };

  const updateSocial = (index, field, value) => {
    setData(prev => {
      const newSocial = [...prev.socialMedia];
      newSocial[index] = { ...newSocial[index], [field]: value };
      return { ...prev, socialMedia: newSocial };
    });
  };

  const removeSocial = (index) => {
    setData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index)
    }));
  };

  const moveSocial = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === data.socialMedia.length - 1)) return;
    
    setData(prev => {
      const newSocial = [...prev.socialMedia];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newSocial[index], newSocial[newIndex]] = [newSocial[newIndex], newSocial[index]];
      return { ...prev, socialMedia: newSocial };
    });
  };

  // Links Management
  const addLink = (category) => {
    setData(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [category]: [...(prev.links?.[category] || []), { label: 'New Link', href: '/' }]
      }
    }));
  };

  const updateLink = (category, index, field, value) => {
    setData(prev => {
      const newLinks = [...prev.links[category]];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return {
        ...prev,
        links: { ...prev.links, [category]: newLinks }
      };
    });
  };

  const removeLink = (category, index) => {
    setData(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [category]: prev.links[category].filter((_, i) => i !== index)
      }
    }));
  };

  const moveLink = (category, index, direction) => {
    const items = data.links[category];
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === items.length - 1)) return;
    
    setData(prev => {
      const newItems = [...items];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      return {
        ...prev,
        links: { ...prev.links, [category]: newItems }
      };
    });
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
          <h1 className="text-3xl font-bold">Edit Footer</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message && (
          <div className={`mb-4 p-4 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Company Info */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-2xl font-semibold">Company Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={data.companyName || ''}
                onChange={(e) => setData({ ...data, companyName: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Year</label>
              <input
                type="number"
                value={data.year || new Date().getFullYear()}
                onChange={(e) => setData({ ...data, year: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
              <input
                type="text"
                value={data.copyrightText || 'All rights reserved.'}
                onChange={(e) => setData({ ...data, copyrightText: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certifications Text</label>
              <textarea
                value={data.certifications || ''}
                onChange={(e) => setData({ ...data, certifications: e.target.value })}
                rows="2"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Logo */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-2xl font-semibold">Logo</h2>
            
            {data.logo && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Logo:</p>
                <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border">
                  <img 
                    src={data.logo} 
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                <input
                  type="text"
                  value={data.logo || ''}
                  onChange={(e) => setData({ ...data, logo: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="/images/mainlogo.png"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={data.contact?.phone || ''}
                onChange={(e) => setData({
                  ...data,
                  contact: { ...data.contact, phone: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={data.contact?.email || ''}
                onChange={(e) => setData({
                  ...data,
                  contact: { ...data.contact, email: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
              <input
                type="text"
                value={data.contact?.hours || ''}
                onChange={(e) => setData({
                  ...data,
                  contact: { ...data.contact, hours: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Text</label>
              <input
                type="text"
                value={data.contact?.support || ''}
                onChange={(e) => setData({
                  ...data,
                  contact: { ...data.contact, support: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Designed By */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-2xl font-semibold">Designed By</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={data.designedBy?.name || 'Mohsin Designs'}
                onChange={(e) => setData({
                  ...data,
                  designedBy: { ...data.designedBy, name: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
              <input
                type="text"
                value={data.designedBy?.url || 'https://mohsindesigns.com/'}
                onChange={(e) => setData({
                  ...data,
                  designedBy: { ...data.designedBy, url: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 border-b pb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Social Media Links</h2>
              <button
                onClick={addSocial}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <FaPlus size={12} /> Add Social
              </button>
            </div>

            {data.socialMedia?.map((social, index) => (
              <div key={social.key || index} className="border p-4 rounded-lg bg-gray-50 relative">
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => moveSocial(index, 'up')}
                    disabled={index === 0}
                    className={`p-1 rounded ${
                      index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <FaArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => moveSocial(index, 'down')}
                    disabled={index === data.socialMedia.length - 1}
                    className={`p-1 rounded ${
                      index === data.socialMedia.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <FaArrowDown size={14} />
                  </button>
                  <button
                    onClick={() => removeSocial(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Icon</label>
                    <input
                      type="text"
                      value={social.icon || 'FaFacebookF'}
                      onChange={(e) => updateSocial(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm"
                      placeholder="FaFacebookF"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={social.label || ''}
                      onChange={(e) => updateSocial(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm"
                      placeholder="Facebook"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">URL</label>
                    <input
                      type="text"
                      value={social.href || ''}
                      onChange={(e) => updateSocial(index, 'href', e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm"
                      placeholder="https://facebook.com"
                    />
                  </div>
                </div>
              </div>
            ))}

            {(!data.socialMedia || data.socialMedia.length === 0) && (
              <p className="text-gray-500 text-center py-4">No social media links added yet.</p>
            )}
          </div>

          {/* Services Links */}
          <div className="space-y-4 border-b pb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Services Links</h2>
              <button
                onClick={() => addLink('Services')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <FaPlus size={12} /> Add Service Link
              </button>
            </div>

            {data.links?.Services?.map((link, index) => (
              <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                <div className="flex gap-1">
                  <button
                    onClick={() => moveLink('Services', index, 'up')}
                    disabled={index === 0}
                    className={`p-1 ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    <FaArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => moveLink('Services', index, 'down')}
                    disabled={index === data.links.Services.length - 1}
                    className={`p-1 ${index === data.links.Services.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    <FaArrowDown size={14} />
                  </button>
                </div>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateLink('Services', index, 'label', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="Link Label"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateLink('Services', index, 'href', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="/services/..."
                />
                <button
                  onClick={() => removeLink('Services', index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ))}

            {(!data.links?.Services || data.links.Services.length === 0) && (
              <p className="text-gray-500 text-center py-4">No service links added yet.</p>
            )}
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Company Links</h2>
              <button
                onClick={() => addLink('Company')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <FaPlus size={12} /> Add Company Link
              </button>
            </div>

            {data.links?.Company?.map((link, index) => (
              <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                <div className="flex gap-1">
                  <button
                    onClick={() => moveLink('Company', index, 'up')}
                    disabled={index === 0}
                    className={`p-1 ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    <FaArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => moveLink('Company', index, 'down')}
                    disabled={index === data.links.Company.length - 1}
                    className={`p-1 ${index === data.links.Company.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    <FaArrowDown size={14} />
                  </button>
                </div>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateLink('Company', index, 'label', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="Link Label"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateLink('Company', index, 'href', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="/about"
                />
                <button
                  onClick={() => removeLink('Company', index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ))}

            {(!data.links?.Company || data.links.Company.length === 0) && (
              <p className="text-gray-500 text-center py-4">No company links added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}