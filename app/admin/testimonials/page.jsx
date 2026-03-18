'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestimonialsEditor() {
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
    fetch('/api/testimonials')
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
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Testimonials saved successfully!' });
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
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], image: result.url };
        setData({ ...data, items: newItems });
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

  // Testimonial management
  const addTestimonial = () => {
    setData(prev => {
      const newItems = [...(prev.items || [])];
      const newId = newItems.length > 0 ? Math.max(...newItems.map(i => i.id)) + 1 : 1;
      
      newItems.push({
        id: newId,
        quote: "New testimonial quote",
        author: "Author Name",
        role: "Customer",
        company: "Company Name",
        rating: 5,
        image: "",
        location: "City, State",
        service: "Service Type"
      });
      
      return { ...prev, items: newItems };
    });
  };

  const updateTestimonial = (index, field, value) => {
    setData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const removeTestimonial = (index) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const moveTestimonial = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === data.items.length - 1)) return;
    
    setData(prev => {
      const newItems = [...prev.items];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      return { ...prev, items: newItems };
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
          <h1 className="text-3xl font-bold">Edit Testimonials Section</h1>
          <div className="space-x-4">
            <button
              onClick={addTestimonial}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Add Testimonial
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
          <div className={`mb-4 p-4 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Header Section */}
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-2xl font-semibold">Section Header</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
              <input
                type="text"
                value={data.badge || ''}
                onChange={(e) => setData({ ...data, badge: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="★ Customer Stories"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title Line 1</label>
              <input
                type="text"
                value={data.title?.line1 || ''}
                onChange={(e) => setData({
                  ...data,
                  title: { ...data.title, line1: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
                placeholder="What Our"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title Line 2</label>
              <input
                type="text"
                value={data.title?.line2 || ''}
                onChange={(e) => setData({
                  ...data,
                  title: { ...data.title, line2: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
                placeholder="Clients Say"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={data.subtitle || ''}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                rows="2"
                className="w-full px-3 py-2 border rounded"
                placeholder="Discover why homeowners and businesses trust us to transform their spaces into magical holiday experiences."
              />
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Testimonials ({data.items?.length || 0})</h2>
            
            {data.items?.map((testimonial, index) => (
              <div key={testimonial.id || index} className="border rounded-lg p-6 space-y-4 bg-gray-50 relative">
                {/* Card Controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => moveTestimonial(index, 'up')}
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
                    onClick={() => moveTestimonial(index, 'down')}
                    disabled={index === data.items.length - 1}
                    className={`px-3 py-1 rounded ${
                      index === data.items.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeTestimonial(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="text-xl font-semibold mb-4">Testimonial {index + 1}</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                    <input
                      type="text"
                      value={testimonial.author || ''}
                      onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={testimonial.role || ''}
                      onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={testimonial.company || ''}
                      onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={testimonial.location || ''}
                      onChange={(e) => updateTestimonial(index, 'location', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                    <input
                      type="text"
                      value={testimonial.service || ''}
                      onChange={(e) => updateTestimonial(index, 'service', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={testimonial.rating || 5}
                      onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                  <textarea
                    value={testimonial.quote || ''}
                    onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author Image</label>
                  
                  {testimonial.image && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                      <div className="relative w-32 h-32 bg-gray-200 rounded-full overflow-hidden border mx-auto">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={testimonial.image || ''}
                      onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
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

            {(!data.items || data.items.length === 0) && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No testimonials added yet. Click "Add Testimonial" to start.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}