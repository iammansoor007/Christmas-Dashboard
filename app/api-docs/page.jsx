"use client";
import React from 'react';

const APIDocs = () => {
    const endpoints = [
        {
            path: '/api/hero',
            method: 'GET',
            description: 'Get hero section data',
            response: 'Hero section object with badge, title, subtitle, CTA, stats'
        },
        {
            path: '/api/services',
            method: 'GET',
            description: 'Get all services data',
            response: 'Services object with items array containing all service details'
        },
        {
            path: '/api/about',
            method: 'GET',
            description: 'Get about page data',
            response: 'About page object with hero, founder, mission sections'
        },
        {
            path: '/api/gallery',
            method: 'GET',
            description: 'Get gallery page data',
            response: 'Gallery page object with images array'
        },
        {
            path: '/api/testimonials',
            method: 'GET',
            description: 'Get testimonials data',
            response: 'Testimonials object with items array'
        },
        {
            path: '/api/faq',
            method: 'GET',
            description: 'Get FAQ data',
            response: 'FAQ object with items array'
        },
        {
            path: '/api/quote-form',
            method: 'GET',
            description: 'Get quote form configuration',
            response: 'Form configuration with fields, labels, options'
        },
        {
            path: '/api/navbar',
            method: 'GET',
            description: 'Get navbar configuration',
            response: 'Navbar object with logo, menu items, dropdowns'
        },
        {
            path: '/api/footer',
            method: 'GET',
            description: 'Get footer configuration',
            response: 'Footer object with links, contact info, social media'
        },
    ];

    const adminEndpoints = [
        {
            path: '/api/admin/[section]',
            method: 'POST',
            description: 'Update any section data (hero, services, about, etc.)',
            auth: 'Requires admin authentication',
            body: 'JSON object with the section data to update'
        },
        {
            path: '/api/admin/upload',
            method: 'POST',
            description: 'Upload an image file',
            auth: 'Requires admin authentication',
            body: 'Multipart form data with file field'
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
                    <p className="text-lg text-gray-600">Christmas Lights Over Columbus CMS API</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-semibold text-gray-900">Public Endpoints</h2>
                        <p className="text-gray-600 mt-2">These endpoints are publicly accessible and used by the frontend.</p>
                    </div>

                    <div className="divide-y">
                        {endpoints.map((endpoint, idx) => (
                            <div key={idx} className="p-6 hover:bg-gray-50">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-mono rounded">GET</span>
                                    <code className="text-sm font-mono bg-gray-100 px-3 py-1 rounded">{endpoint.path}</code>
                                </div>
                                <p className="text-gray-700 mb-2">{endpoint.description}</p>
                                <p className="text-sm text-gray-500"><strong>Response:</strong> {endpoint.response}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-semibold text-gray-900">Admin Endpoints</h2>
                        <p className="text-gray-600 mt-2">These endpoints require admin authentication.</p>
                    </div>

                    <div className="divide-y">
                        {adminEndpoints.map((endpoint, idx) => (
                            <div key={idx} className="p-6 hover:bg-gray-50">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-mono rounded">POST</span>
                                    <code className="text-sm font-mono bg-gray-100 px-3 py-1 rounded">{endpoint.path}</code>
                                </div>
                                <p className="text-gray-700 mb-2">{endpoint.description}</p>
                                <p className="text-sm text-gray-500"><strong>Auth:</strong> {endpoint.auth}</p>
                                <p className="text-sm text-gray-500"><strong>Body:</strong> {endpoint.body}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 p-6 bg-amber-50 rounded-2xl">
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Authentication</h3>
                    <p className="text-amber-700 mb-3">Admin endpoints require a valid session. To authenticate:</p>
                    <ol className="list-decimal list-inside space-y-1 text-amber-700">
                        <li>Login at <code className="bg-amber-100 px-2 py-0.5 rounded">/admin/login</code></li>
                        <li>A session cookie will be set automatically</li>
                        <li>Include the cookie in subsequent requests</li>
                    </ol>
                </div>

                <div className="mt-8 p-6 bg-emerald-50 rounded-2xl">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Data Models</h3>
                    <p className="text-emerald-700">All responses follow the same pattern:</p>
                    <pre className="mt-2 p-3 bg-emerald-100 rounded-lg text-sm overflow-x-auto">
                        {`{
  success: boolean,
  data: object, // The requested data
  error?: string // Error message if any
}`}
                    </pre>
                </div>
            </div>
        </main>
    );
};

export default APIDocs;