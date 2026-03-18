'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function NavbarEditor() {
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
    fetch('/api/navbar')
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
      const response = await fetch('/api/admin/navbar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Navbar saved successfully!' });
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

  // Nav Items Management
  const addNavItem = () => {
    setData(prev => ({
      ...prev,
      navItems: [...(prev.navItems || []), {
        path: '/new-page',
        label: 'New Page',
        dropdown: []
      }]
    }));
  };

  const updateNavItem = (index, field, value) => {
    setData(prev => {
      const newItems = [...prev.navItems];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, navItems: newItems };
    });
  };

  const removeNavItem = (index) => {
    setData(prev => ({
      ...prev,
      navItems: prev.navItems.filter((_, i) => i !== index)
    }));
  };

  const moveNavItem = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === data.navItems.length - 1)) return;
    
    setData(prev => {
      const newItems = [...prev.navItems];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      return { ...prev, navItems: newItems };
    });
  };

  // Dropdown Items Management
  const addDropdownItem = (navIndex) => {
    setData(prev => {
      const newItems = [...prev.navItems];
      newItems[navIndex].dropdown = [
        ...(newItems[navIndex].dropdown || []),
        {
          path: '/new-dropdown',
          label: 'New Dropdown',
          description: 'Description',
          icon: '🏠'
        }
      ];
      return { ...prev, navItems: newItems };
    });
  };

  const updateDropdownItem = (navIndex, dropIndex, field, value) => {
    setData(prev => {
      const newItems = [...prev.navItems];
      newItems[navIndex].dropdown[dropIndex] = {
        ...newItems[navIndex].dropdown[dropIndex],
        [field]: value
      };
      return { ...prev, navItems: newItems };
    });
  };

  const removeDropdownItem = (navIndex, dropIndex) => {
    setData(prev => {
      const newItems = [...prev.navItems];
      newItems[navIndex].dropdown = newItems[navIndex].dropdown.filter((_, i) => i !== dropIndex);
      return { ...prev, navItems: newItems };
    });
  };

  const moveDropdownItem = (navIndex, dropIndex, direction) => {
    const items = data.navItems[navIndex].dropdown;
    if ((direction === 'up' && dropIndex === 0) || 
        (direction === 'down' && dropIndex === items.length - 1)) return;
    
    setData(prev => {
      const newItems = [...prev.navItems];
      const newDropItems = [...items];
      const newIndex = direction === 'up' ? dropIndex - 1 : dropIndex + 1;
      [newDropItems[dropIndex], newDropItems[newIndex]] = [newDropItems[newIndex], newDropItems[dropIndex]];
      newItems[navIndex].dropdown = newDropItems;
      return { ...prev, navItems: newItems };
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
          <h1 className="text-3xl font-bold">Edit Navbar</h1>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo Alt Text</label>
                <input
                  type="text"
                  value={data.logoAlt || 'Luminous Holiday Logo'}
                  onChange={(e) => setData({ ...data, logoAlt: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
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

          {/* Nav Items */}
          <div className="space-y-4 border-b pb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Navigation Items</h2>
              <button
                onClick={addNavItem}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <FaPlus size={12} /> Add Item
              </button>
            </div>

            {data.navItems?.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Item {index + 1}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveNavItem(index, 'up')}
                      disabled={index === 0}
                      className={`p-1 rounded ${
                        index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaArrowUp size={14} />
                    </button>
                    <button
                      onClick={() => moveNavItem(index, 'down')}
                      disabled={index === data.navItems.length - 1}
                      className={`p-1 rounded ${
                        index === data.navItems.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FaArrowDown size={14} />
                    </button>
                    <button
                      onClick={() => removeNavItem(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={item.label || ''}
                      onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Path</label>
                    <input
                      type="text"
                      value={item.path || ''}
                      onChange={(e) => updateNavItem(index, 'path', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="/about"
                    />
                  </div>
                </div>

                {/* Dropdown Items */}
                {item.dropdown && item.dropdown.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">Dropdown Items</h4>
                      <button
                        onClick={() => addDropdownItem(index)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center gap-1"
                      >
                        <FaPlus size={10} /> Add
                      </button>
                    </div>

                    {item.dropdown.map((dropItem, dropIndex) => (
                      <div key={dropIndex} className="mb-3 p-3 bg-white rounded border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Dropdown {dropIndex + 1}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => moveDropdownItem(index, dropIndex, 'up')}
                              disabled={dropIndex === 0}
                              className={`p-1 text-xs ${
                                dropIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-blue-600'
                              }`}
                            >
                              <FaArrowUp size={12} />
                            </button>
                            <button
                              onClick={() => moveDropdownItem(index, dropIndex, 'down')}
                              disabled={dropIndex === item.dropdown.length - 1}
                              className={`p-1 text-xs ${
                                dropIndex === item.dropdown.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-blue-600'
                              }`}
                            >
                              <FaArrowDown size={12} />
                            </button>
                            <button
                              onClick={() => removeDropdownItem(index, dropIndex)}
                              className="p-1 text-xs text-red-500 hover:text-red-700"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={dropItem.label || ''}
                            onChange={(e) => updateDropdownItem(index, dropIndex, 'label', e.target.value)}
                            className="px-2 py-1 border rounded text-sm"
                            placeholder="Label"
                          />
                          <input
                            type="text"
                            value={dropItem.path || ''}
                            onChange={(e) => updateDropdownItem(index, dropIndex, 'path', e.target.value)}
                            className="px-2 py-1 border rounded text-sm"
                            placeholder="/path"
                          />
                          <input
                            type="text"
                            value={dropItem.description || ''}
                            onChange={(e) => updateDropdownItem(index, dropIndex, 'description', e.target.value)}
                            className="px-2 py-1 border rounded text-sm col-span-2"
                            placeholder="Description"
                          />
                          <input
                            type="text"
                            value={dropItem.icon || '🏠'}
                            onChange={(e) => updateDropdownItem(index, dropIndex, 'icon', e.target.value)}
                            className="px-2 py-1 border rounded text-sm"
                            placeholder="Icon emoji"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(!item.dropdown || item.dropdown.length === 0) && (
                  <button
                    onClick={() => addDropdownItem(index)}
                    className="mt-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                  >
                    + Add Dropdown
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-2xl font-semibold">CTA Button</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Button Text</label>
                <input
                  type="text"
                  value={data.cta?.text || 'Call Now'}
                  onChange={(e) => setData({
                    ...data,
                    cta: { ...data.cta, text: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={data.cta?.phone || '(614) 301-7100'}
                  onChange={(e) => setData({
                    ...data,
                    cta: { ...data.cta, phone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Icon (optional)</label>
                <input
                  type="text"
                  value={data.cta?.icon || 'phone'}
                  onChange={(e) => setData({
                    ...data,
                    cta: { ...data.cta, icon: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-2xl font-semibold">Mobile Contact Info</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={data.contactInfo?.email || 'Info@lightsovercolumbus.com'}
                  onChange={(e) => setData({
                    ...data,
                    contactInfo: { ...data.contactInfo, email: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email Text</label>
                <input
                  type="text"
                  value={data.contactInfo?.text || 'Email us'}
                  onChange={(e) => setData({
                    ...data,
                    contactInfo: { ...data.contactInfo, text: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Colors (Tailwind Classes)</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Background</label>
                <input
                  type="text"
                  value={data.colors?.background || 'bg-dark-navy/95'}
                  onChange={(e) => setData({
                    ...data,
                    colors: { ...data.colors, background: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Text Color</label>
                <input
                  type="text"
                  value={data.colors?.text || 'text-warm-white'}
                  onChange={(e) => setData({
                    ...data,
                    colors: { ...data.colors, text: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Hover Color</label>
                <input
                  type="text"
                  value={data.colors?.hover || 'text-holiday-gold'}
                  onChange={(e) => setData({
                    ...data,
                    colors: { ...data.colors, hover: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Active Color</label>
                <input
                  type="text"
                  value={data.colors?.active || 'text-holiday-gold'}
                  onChange={(e) => setData({
                    ...data,
                    colors: { ...data.colors, active: e.target.value }
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