'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu,
  X,
  LayoutDashboard,
  Home,
  Share2,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  FileCheck,
  Scale,
  Briefcase,
  Building,
  Star,
  MessageSquare,
  HelpCircle,
  FileCode,
  Globe,
  Menu as MenuIcon,
  Shield,
  User,
  Truck,
  Camera,
  FolderOpen,
  Edit,
  Info,
  Phone,
  Map,
  Images,
  Layers,
  TrendingUp,
  Zap,
  Lightbulb,
  Sparkles,
  Rocket,
  Award,
  Clock
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    homepage: true,
    pages: true,
    shared: false,
    siteSettings: false,
    legal: false
  });

  const navRef = useRef(null);
  const isTogglingRef = useRef(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Check if user is authenticated
  const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminAuth') === 'true';
    }
    return false;
  };

  if (pathname === '/admin/login') {
    return children;
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated() && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const toggleMenu = useCallback((menu) => {
    if (isTogglingRef.current) return;

    isTogglingRef.current = true;

    // Store current scroll position before any DOM changes
    const currentScrollTop = navRef.current?.scrollTop || 0;

    // Toggle the menu
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));

    // Use requestAnimationFrame to ensure scroll restoration happens after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (navRef.current && currentScrollTop !== undefined) {
          navRef.current.scrollTop = currentScrollTop;
        }
        setTimeout(() => {
          isTogglingRef.current = false;
        }, 150);
      });
    });
  }, []);

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const MenuItem = ({ href, icon: Icon, children, badge }) => {
    const active = isActive(href);

    // Safety check for missing icon
    if (!Icon) {
      console.warn(`MenuItem missing icon for ${href}`);
      return (
        <Link
          href={href}
          className={`group flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${active
            ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
          <div className="w-[18px] h-[18px] rounded bg-gray-200"></div>
          <span className="flex-1">{children}</span>
          {badge && (
            <span className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
              {badge}
            </span>
          )}
          {active && (
            <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
          )}
        </Link>
      );
    }

    return (
      <Link
        href={href}
        className={`group flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${active
          ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
      >
        <Icon size={18} className={`transition-colors duration-200 ${active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
        <span className="flex-1">{children}</span>
        {badge && (
          <span className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            {badge}
          </span>
        )}
        {active && (
          <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
        )}
      </Link>
    );
  };

  const MenuGroup = ({ title, icon: Icon, children, isOpen, onToggle, badge }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, [children, isOpen]);

    return (
      <div className="mb-1">
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
          className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon size={18} className="text-gray-500 group-hover:text-gray-700 transition-colors duration-200" />}
            <span>{title}</span>
            {badge && (
              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <div className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-0' : ''}`}>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </button>
        <div
          className="ml-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? height : 0,
            opacity: isOpen ? 1 : 0,
            transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease-in-out'
          }}
        >
          <div ref={contentRef}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  const SectionDivider = ({ title }) => (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-start">
        <span className="pr-3 text-xs font-semibold text-gray-400 bg-white uppercase tracking-wider">
          {title}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-20 px-4 py-3 shadow-sm">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">CMS Admin</h1>
              <p className="text-xs text-gray-500">Content Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation with smooth scroll behavior */}
        <nav
          ref={navRef}
          className="flex-1 overflow-y-auto py-6 px-3"
          style={{
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain'
          }}
        >

          <SectionDivider title="Content Management" />

          {/* Homepage Sections */}
          <MenuGroup
            title="Homepage Sections"
            icon={Home}
            isOpen={openMenus.homepage}
            onToggle={() => toggleMenu('homepage')}
            badge="8"
          >
            <MenuItem href="/admin/hero" icon={Star}>Hero Section</MenuItem>
            <MenuItem href="/admin/christmas-lighting" icon={Sparkles}>Founder Intro</MenuItem>
            <MenuItem href="/admin/how-we-work" icon={Rocket}>How We Work</MenuItem>
            <MenuItem href="/admin/van-map" icon={Truck}>Van Map</MenuItem>
            <MenuItem href="/admin/work-showcase" icon={Camera}>Work Showcase</MenuItem>
            <MenuItem href="/admin/testimonials" icon={MessageSquare}>Testimonials</MenuItem>
            <MenuItem href="/admin/faq" icon={HelpCircle}>FAQ Section</MenuItem>
            <MenuItem href="/admin/quote-form" icon={Edit}>Quote Form</MenuItem>
          </MenuGroup>

          {/* All Pages */}
          <MenuGroup
            title="All Pages"
            icon={Layers}
            isOpen={openMenus.pages}
            onToggle={() => toggleMenu('pages')}
            badge="9"
          >
            <div className="px-3 py-1 mt-1 mb-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Main Content</p>
            </div>
            <MenuItem href="/admin/about" icon={Info}>About Page</MenuItem>
            <MenuItem href="/admin/services-page" icon={Briefcase}>Services Overview</MenuItem>
            <MenuItem href="/admin/gallery" icon={Images}>Gallery Management</MenuItem>
            <MenuItem href="/admin/contact" icon={Phone}>Contact Page</MenuItem>

            <div className="px-3 py-1 mt-2 mb-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Service Pages</p>
            </div>
            <MenuItem href="/admin/residential" icon={Home}>Residential Lighting</MenuItem>
            <MenuItem href="/admin/commercial" icon={Building}>Commercial Lighting</MenuItem>
            <MenuItem href="/admin/permanent" icon={Zap}>Permanent Lighting</MenuItem>

            <div className="px-3 py-1 mt-2 mb-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Locations</p>
            </div>
            <MenuItem href="/admin/service-area" icon={Map}>Service Areas</MenuItem>
          </MenuGroup>

          <MenuItem href="/admin/pages" icon={FileCode}>📄 Pages</MenuItem>
          <MenuItem href="/admin/services-manager" icon={Sparkles}>✨ Services</MenuItem>

          {/* Shared Components */}
          <MenuGroup
            title="Shared Components"
            icon={Share2}
            isOpen={openMenus.shared}
            onToggle={() => toggleMenu('shared')}
            badge="1"
          >
            <div className="px-3 py-2 mb-1">
              <p className="text-xs text-gray-500 italic">Global components across multiple pages</p>
            </div>
            <MenuItem href="/admin/services" icon={FolderOpen}>Services Cards</MenuItem>
          </MenuGroup>

          <SectionDivider title="Legal & Documentation" />

          {/* Legal Pages */}
          <MenuGroup
            title="Legal Pages"
            icon={Shield}
            isOpen={openMenus.legal}
            onToggle={() => toggleMenu('legal')}
            badge="2"
          >
            <MenuItem href="/admin/privacy" icon={FileCheck}>Privacy Policy</MenuItem>
            <MenuItem href="/admin/terms" icon={Scale}>Terms & Conditions</MenuItem>
          </MenuGroup>

          <MenuItem href="/api-docs" icon={FileCode}>API Documentation</MenuItem>

          <SectionDivider title="Site Configuration" />

          {/* Site Settings */}
          <MenuGroup
            title="Site Settings"
            icon={Settings}
            isOpen={openMenus.siteSettings}
            onToggle={() => toggleMenu('siteSettings')}
            badge="2"
          >
            <MenuItem href="/admin/navbar" icon={Menu}>Navigation Bar</MenuItem>
            <MenuItem href="/admin/footer" icon={Globe}>Footer Configuration</MenuItem>
          </MenuGroup>

          {/* Quick Tips Card */}
          <div className="mt-6 mx-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-blue-100 rounded-lg shrink-0">
                <HelpCircle size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-semibold text-blue-900 mb-2">Quick Tips</h4>
                <ul className="text-xs text-blue-800 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Each page has its own complete editor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Services Cards appear across homepage & service pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Click upload button to manage images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Changes save automatically</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
          >
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-80 min-h-screen">
        <div className="pt-14 lg:pt-0">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}