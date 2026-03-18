'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  FiHome,
  FiInfo,
  FiGrid,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiStar,
  FiMap,
  FiHelpCircle,
  FiFileText,
  FiImage,
  FiUsers,
  FiMessageSquare,
  FiBriefcase,
  FiClock,
  FiNavigation,
  FiFooter
} from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({
    home: true,
    about: false,
    shared: false,
    settings: false
  });

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  if (pathname === '/admin/login') {
    return children;
  }

  const toggleDropdown = (menu) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminAuth');
      router.push('/admin/login');
    }
  };

  const NavItem = ({ href, icon: Icon, children, active }) => (
    <Link
      href={href}
      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${active
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      {Icon && (
        <Icon
          className={`w-5 h-5 mr-3 transition-colors ${active ? 'text-indigo-700' : 'text-gray-500 group-hover:text-gray-700'
            }`}
        />
      )}
      <span>{children}</span>
      {active && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
      )}
    </Link>
  );

  const DropdownSection = ({ title, icon: Icon, isOpen, onToggle, children }) => (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
          }`}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-3 text-gray-500" />
          <span>{title}</span>
        </div>
        {isOpen ? (
          <FiChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200" />
        ) : (
          <FiChevronRight className="w-4 h-4 text-gray-500 transition-transform duration-200" />
        )}
      </button>
      <div
        className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
        <span className="ml-3 font-semibold text-gray-800">Admin Dashboard</span>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-xl transform transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="flex items-center h-20 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CMS Admin</h1>
                <p className="text-xs text-gray-500">Content Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Home Dropdown */}
            <DropdownSection
              title="Home"
              icon={FiHome}
              isOpen={openDropdowns.home}
              onToggle={() => toggleDropdown('home')}
            >
              <NavItem href="/admin/hero" icon={FiImage} active={isActive('/admin/hero')}>
                Hero Section
              </NavItem>
              <NavItem href="/admin/christmas-lighting" icon={FiStar} active={isActive('/admin/christmas-lighting')}>
                Founder Intro
              </NavItem>
              <NavItem href="/admin/how-we-work" icon={FiClock} active={isActive('/admin/how-we-work')}>
                How We Work
              </NavItem>
              <NavItem href="/admin/work-showcase" icon={FiBriefcase} active={isActive('/admin/work-showcase')}>
                Work Showcase
              </NavItem>
              <NavItem href="/admin/testimonials" icon={FiUsers} active={isActive('/admin/testimonials')}>
                Testimonials
              </NavItem>
              <NavItem href="/admin/quote-form" icon={FiFileText} active={isActive('/admin/quote-form')}>
                Quote Form
              </NavItem>
            </DropdownSection>

            {/* About Section */}
            <DropdownSection
              title="About"
              icon={FiInfo}
              isOpen={openDropdowns.about}
              onToggle={() => toggleDropdown('about')}
            >
              <NavItem href="/admin/about" icon={FiFileText} active={isActive('/admin/about')}>
                About Page
              </NavItem>
            </DropdownSection>

            {/* Shared Components */}
            <DropdownSection
              title="Shared Components"
              icon={FiGrid}
              isOpen={openDropdowns.shared}
              onToggle={() => toggleDropdown('shared')}
            >
              <NavItem href="/admin/services" icon={FiBriefcase} active={isActive('/admin/services')}>
                Services
              </NavItem>
              <NavItem href="/admin/van-map" icon={FiMap} active={isActive('/admin/van-map')}>
                Map
              </NavItem>
              <NavItem href="/admin/faq" icon={FiHelpCircle} active={isActive('/admin/faq')}>
                FAQ
              </NavItem>
            </DropdownSection>

            {/* Site Settings */}
            <DropdownSection
              title="Site Settings"
              icon={FiSettings}
              isOpen={openDropdowns.settings}
              onToggle={() => toggleDropdown('settings')}
            >
              <NavItem href="/admin/navbar" icon={FiNavigation} active={isActive('/admin/navbar')}>
                Navbar
              </NavItem>
              <NavItem href="/admin/footer" icon={FiFooter} active={isActive('/admin/footer')}>
                Footer
              </NavItem>
            </DropdownSection>
          </nav>

          {/* User info and logout */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-4 px-3 py-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
            >
              <FiLogOut className="w-5 h-5 mr-3 text-red-500 group-hover:text-red-600" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`
        transition-all duration-300
        lg:ml-72
        ${sidebarOpen ? 'ml-72' : 'ml-0'}
      `}>
        <div className="min-h-screen pt-16 lg:pt-0">
          <div className="p-6 lg:p-8">
            {/* Breadcrumb can go here if needed */}
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}