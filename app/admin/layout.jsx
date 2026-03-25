'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    homepage: true,
    pages: false,
    shared: false,
    siteSettings: false
  });

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return children;
  }

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const MenuItem = ({ href, children }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        className={`block px-4 py-2 text-sm rounded-md transition ${active
          ? 'bg-blue-50 text-blue-700 font-medium'
          : 'text-gray-700 hover:bg-gray-50'
          }`}
      >
        {children}
      </Link>
    );
  };

  const MenuGroup = ({ title, icon, children, isOpen, onToggle }) => (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition"
      >
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <span className="text-gray-400">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-20 px-4 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white border-r z-30 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b">
            <h1 className="text-lg font-semibold text-gray-800">CMS Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">

            {/* ==================== HOMEPAGE SECTIONS ==================== */}
            <MenuGroup
              title="🏠 Homepage Sections"
              icon="🏠"
              isOpen={openMenus.homepage}
              onToggle={() => toggleMenu('homepage')}
            >
              <MenuItem href="/admin/hero">Hero</MenuItem>
              <MenuItem href="/admin/christmas-lighting">Founder Intro</MenuItem>
              <MenuItem href="/admin/how-we-work">How We Work</MenuItem>
              <MenuItem href="/admin/van-map">Van Map</MenuItem>
              <MenuItem href="/admin/work-showcase">Work Showcase</MenuItem>
              <MenuItem href="/admin/testimonials">Testimonials</MenuItem>
              <MenuItem href="/admin/faq">FAQ</MenuItem>
              <MenuItem href="/admin/quote-form">Quote Form</MenuItem>
            </MenuGroup>

            {/* ==================== PAGES (COMPLETE PAGE EDITORS) ==================== */}
            <MenuGroup
              title="📄 Pages"
              icon="📄"
              isOpen={openMenus.pages}
              onToggle={() => toggleMenu('pages')}
            >
              <MenuItem href="/admin/about">About Page</MenuItem>
              <MenuItem href="/admin/services-page">Services Page</MenuItem>
              <MenuItem href="/admin/residential">Residential Lighting Page</MenuItem>
              <MenuItem href="/admin/commercial">Commercial Lighting Page</MenuItem>
              <MenuItem href="/admin/permanent">Permanent Lighting Page</MenuItem>
            </MenuGroup>

            {/* ==================== SHARED COMPONENTS ==================== */}
            <MenuGroup
              title="✨ Shared Components"
              icon="✨"
              isOpen={openMenus.shared}
              onToggle={() => toggleMenu('shared')}
            >
              <div className="ml-6 mt-1 mb-2 text-xs text-gray-500 italic">
                These appear across multiple pages
              </div>
              <MenuItem href="/admin/services">Services Cards</MenuItem>
            </MenuGroup>
            <MenuItem href="/admin/gallery">Gallery Page</MenuItem>
            <MenuItem href="/admin/service-area">Service Area Page</MenuItem>
            <MenuItem href="/admin/contact">Contact Page</MenuItem>
            <MenuItem href="/admin/privacy">Privacy Policy Page</MenuItem>
            <MenuItem href="/admin/terms">Terms & Conditions Page</MenuItem>
            <MenuItem href="/api-docs">API Documentation</MenuItem>
            {/* ==================== SITE SETTINGS ==================== */}
            <MenuGroup
              title="⚙️ Site Settings"
              icon="⚙️"
              isOpen={openMenus.siteSettings}
              onToggle={() => toggleMenu('siteSettings')}
            >
              <MenuItem href="/admin/navbar">Navigation Bar</MenuItem>
              <MenuItem href="/admin/footer">Footer</MenuItem>
            </MenuGroup>

            {/* ==================== NOTES ==================== */}
            <div className="mt-6 px-4 py-3 bg-blue-50 rounded-lg text-xs text-blue-800">
              <p className="font-semibold mb-1">📌 Quick Guide:</p>
              <p>• Each page has its own complete editor</p>
              <p>• Services Cards → Edit what appears on homepage</p>
              <p>• Each service page has unique content</p>
              <p>• Upload images → Click the upload button next to each field</p>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="pt-14 lg:pt-0">
          <div className="p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}