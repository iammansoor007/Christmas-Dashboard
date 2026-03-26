'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, memo } from 'react';
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
  Truck,
  Camera,
  FolderOpen,
  Edit,
  Info,
  Phone,
  Map,
  Images,
  Layers,
  Zap,
  Lightbulb,
  Sparkles,
  Rocket,
  Award,
  Clock
} from 'lucide-react';

// ==================== CONSTANTS ====================
const NAVIGATION_CONFIG = {
  homepage: {
    title: 'Homepage Sections',
    icon: Home,
    badge: '8',
    items: [
      { href: '/admin/hero', icon: Star, label: 'Hero Section' },
      { href: '/admin/christmas-lighting', icon: Sparkles, label: 'Founder Intro' },
      { href: '/admin/how-we-work', icon: Rocket, label: 'How We Work' },
      { href: '/admin/van-map', icon: Truck, label: 'Van Map' },
      { href: '/admin/work-showcase', icon: Camera, label: 'Work Showcase' },
      { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
      { href: '/admin/faq', icon: HelpCircle, label: 'FAQ Section' },
      { href: '/admin/quote-form', icon: Edit, label: 'Quote Form' }
    ]
  },
  shared: {
    title: 'Shared Components',
    icon: Share2,
    badge: '1',
    description: 'Global components across multiple pages',
    items: [
      { href: '/admin/services', icon: FolderOpen, label: 'Services Cards' }
    ]
  },
  legal: {
    title: 'Legal Pages',
    icon: Shield,
    badge: '2',
    items: [
      { href: '/admin/privacy', icon: FileCheck, label: 'Privacy Policy' },
      { href: '/admin/terms', icon: Scale, label: 'Terms & Conditions' }
    ]
  },
  siteSettings: {
    title: 'Site Settings',
    icon: Settings,
    badge: '2',
    items: [
      { href: '/admin/navbar', icon: Menu, label: 'Navigation Bar' },
      { href: '/admin/footer', icon: Globe, label: 'Footer Configuration' }
    ]
  }
};

const QUICK_TIPS = [
  'Each page has its own complete editor',
  'Services Cards appear across homepage & service pages',
  'Click upload button to manage images',
  'Changes save automatically'
];

// ==================== CUSTOM HOOKS ====================
const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminAuth') === 'true';
    }
    return false;
  }, []);

  useEffect(() => {
    if (!isAuthenticated() && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router, isAuthenticated]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  }, [router]);

  return { isAuthenticated, handleLogout };
};

const useSidebarState = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return { sidebarOpen, setSidebarOpen };
};

const useMenuState = () => {
  const [openMenus, setOpenMenus] = useState({
    homepage: true,
    shared: false,
    siteSettings: false,
    legal: false
  });
  const isTogglingRef = useRef(false);

  const toggleMenu = useCallback((menu) => {
    if (isTogglingRef.current) return;
    isTogglingRef.current = true;

    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));

    setTimeout(() => {
      isTogglingRef.current = false;
    }, 150);
  }, []);

  return { openMenus, toggleMenu };
};

// ==================== COMPONENTS ====================
const SectionDivider = memo(({ title }) => (
  <div className="relative my-4">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200" />
    </div>
    <div className="relative flex justify-start">
      <span className="pr-3 text-xs font-semibold text-gray-400 bg-white uppercase tracking-wider">
        {title}
      </span>
    </div>
  </div>
));

SectionDivider.displayName = 'SectionDivider';

const MenuItem = memo(({ href, icon: Icon, children, badge, isActive }) => {
  const active = isActive(href);

  return (
    <Link
      href={href}
      className={`
        group flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg 
        transition-all duration-200
        ${active
          ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }
      `}
    >
      {Icon ? (
        <Icon
          size={18}
          className={`transition-colors duration-200 ${active ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
            }`}
        />
      ) : (
        <div className="w-[18px] h-[18px] rounded bg-gray-200" />
      )}

      <span className="flex-1">{children}</span>

      {badge && (
        <span className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          {badge}
        </span>
      )}

      {active && <div className="w-1 h-6 bg-primary-600 rounded-full" />}
    </Link>
  );
});

MenuItem.displayName = 'MenuItem';

const MenuGroup = memo(({
  title,
  icon: Icon,
  children,
  isOpen,
  onToggle,
  badge,
  description
}) => {
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
        aria-expanded={isOpen}
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
          {description && (
            <div className="px-3 py-2 mb-1">
              <p className="text-xs text-gray-500 italic">{description}</p>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
});

MenuGroup.displayName = 'MenuGroup';

const QuickTipsCard = memo(() => (
  <div className="mt-6 mx-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
    <div className="flex items-start gap-3">
      <div className="p-1.5 bg-blue-100 rounded-lg shrink-0">
        <HelpCircle size={16} className="text-blue-600" />
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-semibold text-blue-900 mb-2">Quick Tips</h4>
        <ul className="text-xs text-blue-800 space-y-1.5">
          {QUICK_TIPS.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
));

QuickTipsCard.displayName = 'QuickTipsCard';

const Logo = memo(() => (
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
));

Logo.displayName = 'Logo';

const Sidebar = memo(({ sidebarOpen, setSidebarOpen, openMenus, toggleMenu, handleLogout, isActive }) => {
  const navRef = useRef(null);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-20 px-4 py-3 shadow-sm">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 w-80 bg-white border-r border-gray-200 
          z-30 transform transition-transform duration-300 ease-in-out 
          lg:translate-x-0 flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Admin Navigation"
      >
        <Logo />

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
            title={NAVIGATION_CONFIG.homepage.title}
            icon={NAVIGATION_CONFIG.homepage.icon}
            isOpen={openMenus.homepage}
            onToggle={() => toggleMenu('homepage')}
            badge={NAVIGATION_CONFIG.homepage.badge}
          >
            {NAVIGATION_CONFIG.homepage.items.map((item) => (
              <MenuItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={isActive}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuGroup>

          <MenuItem href="/admin/pages" icon={Layers} isActive={isActive}>
            📄 Pages Manager
          </MenuItem>

          <MenuItem href="/admin/services-manager" icon={Sparkles} isActive={isActive}>
            ✨ Services
          </MenuItem>

          {/* Shared Components */}
          <MenuGroup
            title={NAVIGATION_CONFIG.shared.title}
            icon={NAVIGATION_CONFIG.shared.icon}
            isOpen={openMenus.shared}
            onToggle={() => toggleMenu('shared')}
            badge={NAVIGATION_CONFIG.shared.badge}
            description={NAVIGATION_CONFIG.shared.description}
          >
            {NAVIGATION_CONFIG.shared.items.map((item) => (
              <MenuItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={isActive}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuGroup>

          <SectionDivider title="Legal & Documentation" />

          {/* Legal Pages */}
          <MenuGroup
            title={NAVIGATION_CONFIG.legal.title}
            icon={NAVIGATION_CONFIG.legal.icon}
            isOpen={openMenus.legal}
            onToggle={() => toggleMenu('legal')}
            badge={NAVIGATION_CONFIG.legal.badge}
          >
            {NAVIGATION_CONFIG.legal.items.map((item) => (
              <MenuItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={isActive}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuGroup>

          <MenuItem href="/api-docs" icon={FileCode} isActive={isActive}>
            API Documentation
          </MenuItem>

          <SectionDivider title="Site Configuration" />

          {/* Site Settings */}
          <MenuGroup
            title={NAVIGATION_CONFIG.siteSettings.title}
            icon={NAVIGATION_CONFIG.siteSettings.icon}
            isOpen={openMenus.siteSettings}
            onToggle={() => toggleMenu('siteSettings')}
            badge={NAVIGATION_CONFIG.siteSettings.badge}
          >
            {NAVIGATION_CONFIG.siteSettings.items.map((item) => (
              <MenuItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={isActive}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuGroup>

          <QuickTipsCard />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
            aria-label="Sign out"
          >
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

// ==================== MAIN LAYOUT ====================
export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { handleLogout } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useSidebarState();
  const { openMenus, toggleMenu } = useMenuState();

  const isActive = useCallback((path) => {
    return pathname === path || pathname.startsWith(path + '/');
  }, [pathname]);

  // Don't render sidebar on login page
  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        openMenus={openMenus}
        toggleMenu={toggleMenu}
        handleLogout={handleLogout}
        isActive={isActive}
      />

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