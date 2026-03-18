'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FAQEditor() {
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
    fetch('/api/faq')
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
      const response = await fetch('/api/admin/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'FAQ saved successfully!' });
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

  // FAQ Item Management
  const addFAQ = () => {
    setData(prev => {
      const newItems = [...(prev.items || [])];
      newItems.push({
        question: "New FAQ Question",
        answer: "New FAQ answer goes here...",
        category: "General",
        icon: "FaQuestionCircle"
      });
      return { ...prev, items: newItems };
    });
  };

  const updateFAQ = (index, field, value) => {
    setData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const removeFAQ = (index) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const moveFAQ = (index, direction) => {
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
          <h1 className="text-3xl font-bold">Edit FAQ Section</h1>
          <div className="space-x-4">
            <button
              onClick={addFAQ}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Add FAQ
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Badge (Optional)</label>
              <input
                type="text"
                value={data.badge || ''}
                onChange={(e) => setData({ ...data, badge: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="Frequently Asked Questions"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={data.title || ''}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="Questions & Answers"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (Optional)</label>
              <textarea
                value={data.subtitle || ''}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                rows="2"
                className="w-full px-3 py-2 border rounded"
                placeholder="Everything you need to know about our premium holiday lighting services."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone (Optional)</label>
              <input
                type="text"
                value={data.phone || ''}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="(614) 301-7100"
              />
            </div>
          </div>

          {/* FAQ Items Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">FAQ Items ({data.items?.length || 0})</h2>
            
            {data.items?.map((item, index) => (
              <div key={index} className="border rounded-lg p-6 space-y-4 bg-gray-50 relative">
                {/* Card Controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => moveFAQ(index, 'up')}
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
                    onClick={() => moveFAQ(index, 'down')}
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
                    onClick={() => removeFAQ(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="text-xl font-semibold mb-4">FAQ {index + 1}</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <input
                    type="text"
                    value={item.question || ''}
                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                  <textarea
                    value={item.answer || ''}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category (Optional)</label>
                    <input
                      type="text"
                      value={item.category || ''}
                      onChange={(e) => updateFAQ(index, 'category', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Pricing, Installation, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Optional)</label>
                    <input
                      type="text"
                      value={item.icon || ''}
                      onChange={(e) => updateFAQ(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="FaQuestionCircle"
                    />
                  </div>
                </div>
              </div>
            ))}

            {(!data.items || data.items.length === 0) && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No FAQs added yet. Click "Add FAQ" to start.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}