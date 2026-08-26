import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, Users, ShoppingBag,
  Tag, Store, Menu, ArrowLeft, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSeller } from '../../context/SellerContext';

const NAV = [
  { path: '/admin',          label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/products', label: 'Products',  icon: Package },
  { path: '/admin/orders',   label: 'Orders',    icon: ShoppingBag },
  { path: '/admin/users',    label: 'Users',     icon: Users },
  { path: '/admin/sellers',  label: 'Sellers',   icon: Store },
  { path: '/admin/coupons',  label: 'Coupons',   icon: Tag },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggleDark } = useTheme();
  const { applications } = useSeller();
  const pendingCount = applications.filter(a => a.status === 'pending').length;

  const isActive = (path, exact) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-sm">G</span>
          </div>
          <div>
            <span className="font-black text-lg text-green-700 dark:text-green-400">grozo</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 block -mt-1">Admin Panel</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);
          const badge = item.path === '/admin/sellers' && pendingCount > 0 ? pendingCount : null;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                {item.label}
              </div>
              {badge && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  active ? 'bg-white/30 text-white' : 'bg-amber-100 text-amber-700'
                }`}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Back to store */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Store
        </Link>
      </div>
    </div>
  );

  const activeLabel = NAV.find(n => isActive(n.path, n.exact))?.label || 'Admin';

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 fixed h-full z-30">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-56 bg-white dark:bg-gray-900 h-full shadow-xl animate-slide-in">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-14 flex items-center px-4 gap-3 sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <span className="font-semibold text-gray-900 dark:text-white text-sm">{activeLabel}</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
