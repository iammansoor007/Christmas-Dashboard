'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WorkShowcaseEditor() {
  const [data, setData] = useState(null);
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
    fetch('/api/work-showcase')
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
      const response = await fetch('/api/admin/work-showcase', {
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
        const newImages = [...data.images];
        newImages[index] = result.url;
        setData({ ...data, images: newImages });
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

  const addImage = () => {
    setData(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const removeImage = (index) => {
    if (confirm('Are you sure you want to remove this image?')) {
      setData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const moveImage = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === data.images.length - 1)) return;
    
    setData(prev => {
      const newImages = [...prev.images];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      return { ...prev, images: newImages };
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
          <h1 className="text-3xl font-bold">Edit Work Showcase Section</h1>
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
          {/* Badge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
            <input
              type="text"
              value={data.badge || ''}
              onChange={(e) => setData({ ...data, badge: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Featured Installations"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title Prefix</label>
            <input
              type="text"
              value={data.title?.prefix || ''}
              onChange={(e) => setData({
                ...data,
                title: { ...data.title, prefix: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Our Holiday"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title Main</label>
            <input
              type="text"
              value={data.title?.main || ''}
              onChange={(e) => setData({
                ...data,
                title: { ...data.title, main: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Masterpieces"
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
              placeholder="Professional Christmas lighting installations that transform ordinary homes into magical holiday destinations"
            />
          </div>

          {/* CTA Section */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Call to Action Button</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={data.cta?.text || ''}
                  onChange={(e) => setData({
                    ...data,
                    cta: { ...data.cta, text: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="View Our Portfolio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={data.cta?.link || '/gallery'}
                  onChange={(e) => setData({
                    ...data,
                    cta: { ...data.cta, link: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="/gallery"
                />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Marquee Images ({data.images?.length || 0})</h2>
              <button
                onClick={addImage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                + Add Image
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              These images will scroll infinitely in the marquee. Upload at least 5-10 images for best effect.
            </p>

            {data.images?.map((image, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Image {index + 1}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveImage(index, 'up')}
                      disabled={index === 0}
                      className={`px-3 py-1 rounded ${
                        index === 0 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveImage(index, 'down')}
                      disabled={index === data.images.length - 1}
                      className={`px-3 py-1 rounded ${
                        index === data.images.length - 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeImage(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {image && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden border">
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    disabled={uploading && uploadingIndex === index}
                    className="w-full px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {uploading && uploadingIndex === index && (
                    <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                  )}
                </div>
              </div>
            ))}

            {(!data.images || data.images.length === 0) && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No images added yet. Click "Add Image" to start uploading.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}