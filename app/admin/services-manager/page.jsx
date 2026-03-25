'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash,
    FaArrowUp, FaArrowDown, FaImage, FaStar
} from 'react-icons/fa';

export default function ServicesManager() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [message, setMessage] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const router = useRouter();

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/services');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setServices(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching services:', error);
            setMessage({ type: 'error', text: 'Failed to load services' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const handleDelete = async (service) => {
        try {
            const response = await fetch(`/api/services?id=${service._id}`, { method: 'DELETE' });
            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Service deleted successfully!' });
                fetchServices();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to delete service' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error deleting service' });
        }
        setShowDeleteConfirm(null);
    };

    const handleStatusToggle = async (service) => {
        try {
            const updatedService = {
                ...service,
                status: service.status === 'published' ? 'draft' : 'published'
            };
            const response = await fetch('/api/services', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedService),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Service status updated!' });
                fetchServices();
            } else {
                const data = await response.json();
                setMessage({ type: 'error', text: data.error || 'Failed to update status' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating status' });
        }
    };

    const handleHomepageToggle = async (service) => {
        try {
            const updatedService = {
                ...service,
                showOnHomepage: !service.showOnHomepage
            };
            const response = await fetch('/api/services', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedService),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Homepage visibility updated!' });
                fetchServices();
            } else {
                const data = await response.json();
                setMessage({ type: 'error', text: data.error || 'Failed to update visibility' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating visibility' });
        }
    };

    const handleReorder = async (service, direction) => {
        const currentIndex = services.findIndex(s => s._id === service._id);
        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= services.length) return;

        const newServices = [...services];
        [newServices[currentIndex], newServices[newIndex]] = [newServices[newIndex], newServices[currentIndex]];

        const updates = newServices.map((s, idx) => ({ ...s, order: idx + 1 }));

        try {
            for (const updatedService of updates) {
                await fetch('/api/services', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedService),
                });
            }
            setServices(updates);
            setMessage({ type: 'success', text: 'Order updated!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating order' });
        }
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services Manager</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all services that appear on homepage and services page</p>
                </div>
                <Link
                    href="/admin/services-manager/create"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FaPlus size={16} />
                    <span>Add New Service</span>
                </Link>
            </div>

            {message && (
                <div className={`mb-4 p-4 rounded-lg ${message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500">No services found</p>
                    <Link href="/admin/services-manager/create" className="inline-block mt-4 text-blue-600 hover:text-blue-700">
                        Create your first service
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => (
                        <div key={service._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            {/* Image */}
                            <div className="relative h-48 bg-gray-100">
                                {service.mainImage ? (
                                    <img src={service.mainImage} alt={service.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <FaImage size={48} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <button
                                        onClick={() => handleStatusToggle(service)}
                                        className={`p-1.5 rounded-full ${service.status === 'published'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-500 text-white'
                                            }`}
                                        title={service.status === 'published' ? 'Published' : 'Draft'}
                                    >
                                        {service.status === 'published' ? <FaEye size={12} /> : <FaEyeSlash size={12} />}
                                    </button>
                                </div>
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                                        {service.number || '00'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900 line-clamp-1">{service.title}</h3>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleReorder(service, 'up')}
                                            disabled={index === 0}
                                            className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
                                        >
                                            <FaArrowUp size={12} />
                                        </button>
                                        <button
                                            onClick={() => handleReorder(service, 'down')}
                                            disabled={index === filteredServices.length - 1}
                                            className={`p-1 rounded ${index === filteredServices.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
                                        >
                                            <FaArrowDown size={12} />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{service.shortDescription || 'No description'}</p>

                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color || '#10B981' }}></div>
                                        <span className="text-xs text-gray-500">{service.color || '#10B981'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaStar size={12} className="text-gray-400" />
                                        <span className="text-xs text-gray-500">{service.icon || 'FaStar'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => handleHomepageToggle(service)}
                                        className={`text-xs px-2 py-1 rounded ${service.showOnHomepage
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-500'
                                            }`}
                                    >
                                        {service.showOnHomepage ? 'On Homepage' : 'Hidden'}
                                    </button>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/services-manager/edit/${service._id}`}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                            title="Edit"
                                        >
                                            <FaEdit size={14} />
                                        </Link>
                                        <Link
                                            href={`/services/${service.slug}`}
                                            target="_blank"
                                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                                            title="View"
                                        >
                                            <FaEye size={14} />
                                        </Link>
                                        <button
                                            onClick={() => setShowDeleteConfirm(service)}
                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                            title="Delete"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Service</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete <strong>{showDeleteConfirm.title}</strong>?
                            This will remove it from the homepage and services page.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteConfirm)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}