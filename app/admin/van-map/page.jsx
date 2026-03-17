'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VanMapEditor() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingMap, setUploadingMap] = useState(false);
  const [uploadingVan, setUploadingVan] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    fetch('/api/van-map')
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
      const response = await fetch('/api/admin/van-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Section saved successfully!' });
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

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'map') setUploadingMap(true);
    else setUploadingVan(true);
    
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
        setData({ ...data, [type === 'map' ? 'mapImage' : 'vanImage']: result.url });
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Upload failed' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Error uploading image' });
    } finally {
      if (type === 'map') setUploadingMap(false);
      else setUploadingVan(false);
    }
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
          <h1 className="text-3xl font-bold">Edit Van Map Section</h1>
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Areas We Are Serving"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={data.description || ''}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              rows="3"
              className="w-full px-3 py-2 border rounded"
              placeholder="Custom lighting installed by professionals."
            />
          </div>

          {/* Map Image */}
          <div className="space-y-4 border-t pt-4">
            <h2 className="text-xl font-semibold">Map Image</h2>
            
            {data.mapImage && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden border">
                  <img 
                    src={data.mapImage} 
                    alt="Map"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={data.mapImage || ''}
                  onChange={(e) => setData({ ...data, mapImage: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="/uploads/map.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'map')}
                  disabled={uploadingMap}
                  className="w-full px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploadingMap && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
              </div>
            </div>
          </div>

          {/* Van Image */}
          <div className="space-y-4 border-t pt-4">
            <h2 className="text-xl font-semibold">Van Image</h2>
            
            {data.vanImage && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden border">
                  <img 
                    src={data.vanImage} 
                    alt="Van"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={data.vanImage || ''}
                  onChange={(e) => setData({ ...data, vanImage: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="/uploads/van.png"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'van')}
                  disabled={uploadingVan}
                  className="w-full px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploadingVan && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}