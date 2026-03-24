'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function ServiceDetailEditor() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
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
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/service-detail');
      const data = await response.json();
      setServices(data);
      if (data.length > 0) {
        setSelectedService(data[0]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/service-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedService),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Service saved successfully!' });
        fetchServices();
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
        if (field === 'hero') {
          setSelectedService({ ...selectedService, images: { ...selectedService.images, hero: result.url } });
        } else if (field === 'main') {
          setSelectedService({ ...selectedService, images: { ...selectedService.images, main: result.url } });
        } else if (field === 'gallery') {
          const newGallery = [...(selectedService.images?.gallery || []), { url: result.url, alt: 'Gallery image', position: 'main' }];
          setSelectedService({ ...selectedService, images: { ...selectedService.images, gallery: newGallery } });
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
    }
  };

  const addFeature = () => {
    setSelectedService(prev => ({
      ...prev,
      features: [...(prev.features || []), { icon: 'FaStar', title: 'New Feature', description: 'Feature description' }]
    }));
  };

  const updateFeature = (index, field, value) => {
    setSelectedService(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return { ...prev, features: newFeatures };
    });
  };

  const removeFeature = (index) => {
    setSelectedService(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addProcessStep = () => {
    setSelectedService(prev => ({
      ...prev,
      process: [...(prev.process || []), { step: 'New Step', description: 'Step description' }]
    }));
  };

  const updateProcessStep = (index, field, value) => {
    setSelectedService(prev => {
      const newProcess = [...prev.process];
      newProcess[index] = { ...newProcess[index], [field]: value };
      return { ...prev, process: newProcess };
    });
  };

  const removeProcessStep = (index) => {
    setSelectedService(prev => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== index)
    }));
  };

  const addWhyChooseItem = () => {
    setSelectedService(prev => ({
      ...prev,
      whyChoose: {
        ...prev.whyChoose,
        items: [...(prev.whyChoose?.items || []), { text: 'New benefit' }]
      }
    }));
  };

  const updateWhyChooseItem = (index, value) => {
    setSelectedService(prev => {
      const newItems = [...prev.whyChoose.items];
      newItems[index] = { text: value };
      return {
        ...prev,
        whyChoose: { ...prev.whyChoose, items: newItems }
      };
    });
  };

  const removeWhyChooseItem = (index) => {
    setSelectedService(prev => ({
      ...prev,
      whyChoose: {
        ...prev.whyChoose,
        items: prev.whyChoose.items.filter((_, i) => i !== index)
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const serviceTypes = [
    { slug: 'residential-lighting', label: 'Residential Lighting' },
    { slug: 'commercial-lighting', label: 'Commercial Lighting' },
    { slug: 'permanent-lighting', label: 'Permanent Lighting' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Service Detail Pages</h1>
            <select
              value={selectedService?.slug || ''}
              onChange={(e) => {
                const selected = services.find(s => s.slug === e.target.value);
                setSelectedService(selected || { slug: e.target.value });
              }}
              className="px-4 py-2 border rounded bg-white"
            >
              {serviceTypes.map(type => (
                <option key={type.slug} value={type.slug}>{type.label}</option>
              ))}
            </select>
          </div>
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

        {selectedService && (
          <div className="bg-white rounded-lg shadow p-6 space-y-8">
            {/* Basic Info */}
            <div className="space-y-4 border-b pb-6">
              <h2 className="text-2xl font-semibold">Basic Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                  <input
                    type="text"
                    value={selectedService.title || ''}
                    onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text (e.g., 01 • RESIDENTIAL)</label>
                  <input
                    type="text"
                    value={selectedService.badgeText || ''}
                    onChange={(e) => setSelectedService({ ...selectedService, badgeText: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number (01, 02, 03)</label>
                  <input
                    type="text"
                    value={selectedService.number || ''}
                    onChange={(e) => setSelectedService({ ...selectedService, number: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color (Hex)</label>
                  <input
                    type="text"
                    value={selectedService.color || '#10B981'}
                    onChange={(e) => setSelectedService({ ...selectedService, color: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (Hero)</label>
                <textarea
                  value={selectedService.description || ''}
                  onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Long Description</label>
                <textarea
                  value={selectedService.longDescription || ''}
                  onChange={(e) => setSelectedService({ ...selectedService, longDescription: e.target.value })}
                  rows="6"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            {/* Hero Title */}
            <div className="space-y-4 border-b pb-6">
              <h2 className="text-2xl font-semibold">Hero Title</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 1</label>
                  <input
                    type="text"
                    value={selectedService.heroTitle?.line1 || ''}
                    onChange={(e) => setSelectedService({
                      ...selectedService,
                      heroTitle: { ...selectedService.heroTitle, line1: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Make your home stand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 2 (Highlighted)</label>
                  <input
                    type="text"
                    value={selectedService.heroTitle?.line2 || ''}
                    onChange={(e) => setSelectedService({
                      ...selectedService,
                      heroTitle: { ...selectedService.heroTitle, line2: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="out this holiday season"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Text</label>
                  <input
                    type="text"
                    value={selectedService.heroHighlight || ''}
                    onChange={(e) => setSelectedService({ ...selectedService, heroHighlight: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="out this holiday season"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gradient From</label>
                  <input
                    type="text"
                    value={selectedService.heroGradientFrom || '#10b981'}
                    onChange={(e) => setSelectedService({ ...selectedService, heroGradientFrom: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gradient To</label>
                  <input
                    type="text"
                    value={selectedService.heroGradientTo || '#f59e0b'}
                    onChange={(e) => setSelectedService({ ...selectedService, heroGradientTo: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4 border-b pb-6">
              <h2 className="text-2xl font-semibold">Images</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
                {selectedService.images?.hero && (
                  <div className="mb-4">
                    <img src={selectedService.images.hero} alt="Hero" className="w-48 h-32 object-cover rounded" />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedService.images?.hero || ''}
                    onChange={(e) => setSelectedService({
                      ...selectedService,
                      images: { ...selectedService.images, hero: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder="/images/hero-background2.jpg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'hero')}
                    disabled={uploading}
                    className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Service Image</label>
                {selectedService.images?.main && (
                  <div className="mb-4">
                    <img src={selectedService.images.main} alt="Main" className="w-48 h-32 object-cover rounded" />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedService.images?.main || ''}
                    onChange={(e) => setSelectedService({
                      ...selectedService,
                      images: { ...selectedService.images, main: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder="/images/gallery3.jpg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'main')}
                    disabled={uploading}
                    className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 border-b pb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Features</h2>
                <button
                  onClick={addFeature}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                >
                  <FaPlus size={12} /> Add Feature
                </button>
              </div>

              {selectedService.features?.map((feature, index) => (
                <div key={index} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Feature {index + 1}</h3>
                    <button
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={feature.icon || ''}
                      onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                      className="px-3 py-2 border rounded"
                      placeholder="Icon (e.g., FaHome)"
                    />
                    <input
                      type="text"
                      value={feature.title || ''}
                      onChange={(e) => updateFeature(index, 'title', e.target.value)}
                      className="px-3 py-2 border rounded"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={feature.description || ''}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      className="px-3 py-2 border rounded"
                      placeholder="Description"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="space-y-4 border-b pb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Process Steps</h2>
                <button
                  onClick={addProcessStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                >
                  <FaPlus size={12} /> Add Step
                </button>
              </div>

              {selectedService.process?.map((step, index) => (
                <div key={index} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Step {index + 1}</h3>
                    <button
                      onClick={() => removeProcessStep(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={step.step || ''}
                      onChange={(e) => updateProcessStep(index, 'step', e.target.value)}
                      className="px-3 py-2 border rounded"
                      placeholder="Step Name"
                    />
                    <input
                      type="text"
                      value={step.description || ''}
                      onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                      className="px-3 py-2 border rounded"
                      placeholder="Description"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Why Choose Us</h2>
                <button
                  onClick={addWhyChooseItem}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                >
                  <FaPlus size={12} /> Add Benefit
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={selectedService.whyChoose?.title || ''}
                  onChange={(e) => setSelectedService({
                    ...selectedService,
                    whyChoose: { ...selectedService.whyChoose, title: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Professional Quality, Personal Service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={selectedService.whyChoose?.description || ''}
                  onChange={(e) => setSelectedService({
                    ...selectedService,
                    whyChoose: { ...selectedService.whyChoose, description: e.target.value }
                  })}
                  rows="3"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Benefits List</label>
                {selectedService.whyChoose?.items?.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item.text || ''}
                      onChange={(e) => updateWhyChooseItem(index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded"
                      placeholder="Benefit text"
                    />
                    <button
                      onClick={() => removeWhyChooseItem(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}