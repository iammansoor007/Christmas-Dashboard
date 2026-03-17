'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HowWeWorkEditor() {
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
    fetch('/api/how-we-work')
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
      const response = await fetch('/api/admin/how-we-work', {
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

  // Step Management
  const addStep = () => {
    setData(prev => {
      const newSteps = [...(prev.steps || [])];
      const newNumber = String(newSteps.length + 1).padStart(2, '0');
      
      newSteps.push({
        number: newNumber,
        title: "New Step",
        description: "Step description here",
        icon: "FaStar",
        color: "#10B981",
        features: ["Feature 1", "Feature 2", "Feature 3"]
      });
      
      return { ...prev, steps: newSteps };
    });
  };

  const updateStep = (index, field, value) => {
    setData(prev => {
      const newSteps = [...prev.steps];
      newSteps[index] = { ...newSteps[index], [field]: value };
      return { ...prev, steps: newSteps };
    });
  };

  const removeStep = (index) => {
    if (confirm('Are you sure you want to delete this step?')) {
      setData(prev => {
        const newSteps = prev.steps.filter((_, i) => i !== index);
        // Update numbers
        newSteps.forEach((step, i) => {
          step.number = String(i + 1).padStart(2, '0');
        });
        return { ...prev, steps: newSteps };
      });
    }
  };

  const moveStep = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === data.steps.length - 1)) return;
    
    setData(prev => {
      const newSteps = [...prev.steps];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
      
      // Update numbers
      newSteps.forEach((step, i) => {
        step.number = String(i + 1).padStart(2, '0');
      });
      
      return { ...prev, steps: newSteps };
    });
  };

  // Feature Management
  const addFeature = (stepIndex) => {
    setData(prev => {
      const newSteps = [...prev.steps];
      const newFeatures = [...(newSteps[stepIndex].features || []), ''];
      newSteps[stepIndex] = { ...newSteps[stepIndex], features: newFeatures };
      return { ...prev, steps: newSteps };
    });
  };

  const updateFeature = (stepIndex, featureIndex, value) => {
    setData(prev => {
      const newSteps = [...prev.steps];
      const newFeatures = [...newSteps[stepIndex].features];
      newFeatures[featureIndex] = value;
      newSteps[stepIndex] = { ...newSteps[stepIndex], features: newFeatures };
      return { ...prev, steps: newSteps };
    });
  };

  const removeFeature = (stepIndex, featureIndex) => {
    setData(prev => {
      const newSteps = [...prev.steps];
      const newFeatures = newSteps[stepIndex].features.filter((_, i) => i !== featureIndex);
      newSteps[stepIndex] = { ...newSteps[stepIndex], features: newFeatures };
      return { ...prev, steps: newSteps };
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit How We Work Section</h1>
          <div className="space-x-4">
            <button
              onClick={addStep}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Add Step
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

        <div className="bg-white rounded-lg shadow p-6 space-y-8">
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
                placeholder="Simple Process"
              />
            </div>

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
                placeholder="Working With Us"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title Text</label>
              <input
                type="text"
                value={data.title?.text || ''}
                onChange={(e) => setData({
                  ...data,
                  title: { ...data.title, text: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
                placeholder="Couldn't Be Easier"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={data.subtitle || ''}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                rows="2"
                className="w-full px-3 py-2 border rounded"
                placeholder="Get Professional Christmas Lighting In Just 3 Easy Steps"
              />
            </div>
          </div>

          {/* Steps Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Steps ({data.steps?.length || 0})</h2>
            
            {data.steps?.map((step, stepIndex) => (
              <div key={stepIndex} className="border rounded-lg p-6 space-y-4 bg-gray-50 relative">
                {/* Step Controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => moveStep(stepIndex, 'up')}
                    disabled={stepIndex === 0}
                    className={`px-3 py-1 rounded ${
                      stepIndex === 0 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveStep(stepIndex, 'down')}
                    disabled={stepIndex === data.steps.length - 1}
                    className={`px-3 py-1 rounded ${
                      stepIndex === data.steps.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeStep(stepIndex)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="text-xl font-semibold mb-4">Step {stepIndex + 1}: {step.title}</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number</label>
                    <input
                      type="text"
                      value={step.number || ''}
                      onChange={(e) => updateStep(stepIndex, 'number', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={step.title || ''}
                      onChange={(e) => updateStep(stepIndex, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <input
                      type="text"
                      value={step.icon || ''}
                      onChange={(e) => updateStep(stepIndex, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="FaQuoteRight"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="text"
                      value={step.color || ''}
                      onChange={(e) => updateStep(stepIndex, 'color', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="#10B981"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={step.description || ''}
                    onChange={(e) => updateStep(stepIndex, 'description', e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  {step.features?.map((feature, fIndex) => (
                    <div key={fIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(stepIndex, fIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border rounded"
                      />
                      <button
                        onClick={() => removeFeature(stepIndex, fIndex)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addFeature(stepIndex)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-2xl font-semibold">Call to Action</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
              <input
                type="text"
                value={data.cta?.title || ''}
                onChange={(e) => setData({
                  ...data,
                  cta: { ...data.cta, title: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded"
                placeholder="Ready to Light Up Your Holidays?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Description</label>
              <textarea
                value={data.cta?.description || ''}
                onChange={(e) => setData({
                  ...data,
                  cta: { ...data.cta, description: e.target.value }
                })}
                rows="2"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
                <input
                  type="text"
                  value={data.cta?.buttons?.primary || ''}
                  onChange={(e) => setData({
                    ...data,
                    cta: { 
                      ...data.cta, 
                      buttons: { ...data.cta?.buttons, primary: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
                <input
                  type="text"
                  value={data.cta?.buttons?.secondary || ''}
                  onChange={(e) => setData({
                    ...data,
                    cta: { 
                      ...data.cta, 
                      buttons: { ...data.cta?.buttons, secondary: e.target.value }
                    }
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