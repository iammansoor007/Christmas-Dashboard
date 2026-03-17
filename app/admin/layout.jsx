'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">CMS Admin</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                <Link
                  href="/admin/hero"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/admin/hero'
                    ? 'border-amber-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  Hero
                </Link>
                <Link
                  href="/admin/services"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/admin/services'
                    ? 'border-amber-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  Services
                </Link>
                <Link
                  href="/admin/christmas-lighting"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/admin/christmas-lighting'
                    ? 'border-amber-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  Services
                </Link>
                <Link
                  href="/admin/how-we-work"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/admin/how-we-work'
                    ? 'border-amber-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  How We Work
                </Link>
                <Link
                  href="/admin/van-map"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/admin/van-map'
                      ? 'border-amber-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  Van Map
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  localStorage.removeItem('adminAuth');
                  window.location.href = '/admin/login';
                }}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}