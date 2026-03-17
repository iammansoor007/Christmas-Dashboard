'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroEditor() {
  const [heroData, setHeroData] = useState(null);
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
    fetch('/api/hero')
      .then(res => res.json())
      .then(data => {
        console.log('Loaded hero data:', data);
        if (data.error) {
          setMessage({ type: 'error', text: 'No data in database. Please seed data first.' });
        } else {
          setHeroData(data);
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
      console.log('Saving hero data:', heroData);

      const response = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroData),
      });

      const result = await response.json();
      console.log('Save response:', result);

      if (response.ok) {
        setMessage({ type: 'success', text: 'Hero section saved successfully!' });
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
      console.log('Upload response:', result);

      if (response.ok && result.url) {
        setHeroData({ ...heroData, backgroundImage: result.url });
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Upload failed' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Error uploading image' });
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (section, field, value) => {
    setHeroData(prev => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!heroData) {
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
          <h1 className="text-3xl font-bold">Edit Hero Section</h1>
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
          {/* Badge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
            <input
              type="text"
              value={heroData.badge?.text || ''}
              onChange={(e) => handleChange('badge', 'text', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Icon</label>
            <input
              type="text"
              value={heroData.badge?.icon || ''}
              onChange={(e) => handleChange('badge', 'icon', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title Part 1</label>
            <input
              type="text"
              value={heroData.title?.part1 || ''}
              onChange={(e) => handleChange('title', 'part1', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title Part 2</label>
            <input
              type="text"
              value={heroData.title?.part2 || ''}
              onChange={(e) => handleChange('title', 'part2', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title Part 3</label>
            <input
              type="text"
              value={heroData.title?.part3 || ''}
              onChange={(e) => handleChange('title', 'part3', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={heroData.subtitle || ''}
              onChange={(e) => handleChange(null, 'subtitle', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* CTA Section */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Call to Action</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={heroData.cta?.subtext || ''}
                onChange={(e) => handleChange('cta', 'subtext', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
              <input
                type="text"
                value={heroData.cta?.link || ''}
                onChange={(e) => handleChange('cta', 'link', e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="#freequote or /contact or https://example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Examples: #freequote (smooth scroll), /contact (internal page), https://example.com (external)
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={heroData.cta?.phone || ''}
                onChange={(e) => handleChange('cta', 'phone', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <input
                type="text"
                value={heroData.cta?.availability || ''}
                onChange={(e) => handleChange('cta', 'availability', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Image Badge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Badge Text</label>
            <input
              type="text"
              value={heroData.imageBadge || ''}
              onChange={(e) => handleChange(null, 'imageBadge', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Background Image */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Background Image</h2>

            {heroData.backgroundImage && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border">
                  <img
                    src={heroData.backgroundImage}
                    alt="Hero background preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log('Image failed to load:', heroData.backgroundImage);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => console.log('Image loaded successfully:', heroData.backgroundImage)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">URL: {heroData.backgroundImage}</p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={heroData.backgroundImage || ''}
                onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="/uploads/filename.jpg or https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Image</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}