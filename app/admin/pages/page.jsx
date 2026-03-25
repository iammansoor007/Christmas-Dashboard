'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaEyeSlash,
    FaHome,
    FaArrowUp,
    FaArrowDown,
    FaCopy,
    FaSearch,
    FaFilter
} from 'react-icons/fa';

export default function PagesManager() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTemplate, setFilterTemplate] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [message, setMessage] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const router = useRouter();

    // Fetch pages
    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const response = await fetch('/api/pages');
            const data = await response.json();
            setPages(data);
        } catch (error) {
            console.error('Error fetching pages:', error);
            setMessage({ type: 'error', text: 'Failed to load pages' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (page) => {
        if (page.isHomepage) {
            setMessage({ type: 'error', text: 'Cannot delete the homepage!' });
            return;
        }

        try {
            const response = await fetch(`/api/pages?id=${page._id}`, { method: 'DELETE' });
            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Page deleted successfully!' });
                fetchPages();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to delete page' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error deleting page' });
        }
        setShowDeleteConfirm(null);
    };

    const handleSetHomepage = async (page) => {
        try {
            const updatedPage = { ...page, isHomepage: true, status: 'published' };
            const response = await fetch('/api/pages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPage),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Homepage updated!' });
                fetchPages();
            } else {
                const data = await response.json();
                setMessage({ type: 'error', text: data.error || 'Failed to set homepage' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating homepage' });
        }
    };

    const handleStatusToggle = async (page) => {
        try {
            const updatedPage = {
                ...page,
                status: page.status === 'published' ? 'draft' : 'published'
            };
            const response = await fetch('/api/pages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPage),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Page status updated!' });
                fetchPages();
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating status' });
        }
    };

    const handleNavToggle = async (page) => {
        try {
            const updatedPage = {
                ...page,
                showInNav: !page.showInNav
            };
            const response = await fetch('/api/pages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPage),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Navigation visibility updated!' });
                fetchPages();
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating navigation' });
        }
    };

    const handleReorder = async (page, direction) => {
        const currentIndex = pages.findIndex(p => p._id === page._id);
        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= pages.length) return;

        const newPages = [...pages];
        [newPages[currentIndex], newPages[newIndex]] = [newPages[newIndex], newPages[currentIndex]];

        // Update order values
        const updates = newPages.map((p, idx) => ({
            ...p,
            navOrder: idx + 1
        }));

        try {
            for (const updatedPage of updates) {
                await fetch('/api/pages', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedPage),
                });
            }
            setPages(updates);
            setMessage({ type: 'success', text: 'Order updated!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating order' });
        }
    };

    const getTemplateName = (template) => {
        const names = {
            home: '🏠 Home',
            about: '📄 About',
            services: '✨ Services',
            'service-detail': '🔧 Service Detail',
            contact: '📞 Contact',
            'service-area': '🗺️ Service Area',
            gallery: '🖼️ Gallery',
            privacy: '🔒 Privacy',
            terms: '📜 Terms'
        };
        return names[template] || template;
    };

    const filteredPages = pages.filter(page => {
        const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTemplate = filterTemplate === 'all' || page.template === filterTemplate;
        const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
        return matchesSearch && matchesTemplate && matchesStatus;
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
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Page Manager</h1>
                    <p className="text-sm text-gray-500 mt-1">Create and manage all pages on your website</p>
                </div>
                <Link
                    href="/admin/pages/create"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FaPlus size={16} />
                    <span>Create New Page</span>
                </Link>
            </div>

            {/* Message Alert */}
            {message && (
                <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search pages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <select
                        value={filterTemplate}
                        onChange={(e) => setFilterTemplate(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Templates</option>
                        <option value="home">Home</option>
                        <option value="about">About</option>
                        <option value="services">Services</option>
                        <option value="contact">Contact</option>
                        <option value="service-area">Service Area</option>
                        <option value="gallery">Gallery</option>
                        <option value="privacy">Privacy</option>
                        <option value="terms">Terms</option>
                    </select>

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

            {/* Pages Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title / URL</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Navigation</th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPages.map((page, index) => (
                                <tr key={page._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleReorder(page, 'up')}
                                                disabled={index === 0}
                                                className={`p-1 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                                            >
                                                <FaArrowUp size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleReorder(page, 'down')}
                                                disabled={index === filteredPages.length - 1}
                                                className={`p-1 rounded ${index === filteredPages.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                                            >
                                                <FaArrowDown size={14} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-900">{page.title}</span>
                                                {page.isHomepage && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                                                        <FaHome size={10} />
                                                        Home
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                /{page.slug}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">
                                            {getTemplateName(page.template)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleStatusToggle(page)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${page.status === 'published'
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {page.status === 'published' ? <FaEye size={10} /> : <FaEyeSlash size={10} />}
                                            {page.status === 'published' ? 'Published' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleNavToggle(page)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${page.showInNav
                                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {page.showInNav ? 'In Menu' : 'Hidden'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {!page.isHomepage && (
                                                <button
                                                    onClick={() => handleSetHomepage(page)}
                                                    className="p-1.5 text-amber-600 hover:bg-amber-50 rounded transition-colors"
                                                    title="Set as Homepage"
                                                >
                                                    <FaHome size={16} />
                                                </button>
                                            )}
                                            <Link
                                                href={`/admin/pages/edit/${page._id}`}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <FaEdit size={16} />
                                            </Link>
                                            <Link
                                                href={`/${page.slug}`}
                                                target="_blank"
                                                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                                title="View"
                                            >
                                                <FaEye size={16} />
                                            </Link>
                                            {!page.isHomepage && (
                                                <button
                                                    onClick={() => setShowDeleteConfirm(page)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPages.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No pages found</p>
                        <Link
                            href="/admin/pages/create"
                            className="inline-block mt-4 text-blue-600 hover:text-blue-700"
                        >
                            Create your first page
                        </Link>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Page</h3>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete <strong className="text-gray-900">{showDeleteConfirm.title}</strong>?
                            {showDeleteConfirm.showInNav && (
                                <span className="block mt-2 text-amber-600 text-sm">
                                    ⚠️ This page is currently in the navigation menu.
                                </span>
                            )}
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteConfirm)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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