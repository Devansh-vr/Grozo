import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { ShoppingCart, Heart, Search, Menu, X, Sun, Moon, User, Package, LogOut, LayoutDashboard, ChevronDown, Home, ShoppingBag, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { categories } from '../../data/products';

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const { dark, toggleDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const profileRef = useRef(null);
  const catsRef = useRef(null);

  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.emailAddresses?.[0]?.emailAddress === 'admin@grozo.com';

  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (catsRef.current && !catsRef.current.contains(e.target)) setCatsOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setProfileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="page-container">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">G</span>
            </div>
            <span className="font-black text-xl text-green-700 dark:text-green-400 tracking-tight">grozo</span>
          </Link>

          {/* Categories dropdown */}
          <div className="hidden md:block relative" ref={catsRef}>
            <button
              onClick={() => setCatsOpen(o => !o)}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              Categories <ChevronDown size={14} className={`transition-transform ${catsOpen ? 'rotate-180' : ''}`} />
            </button>
            {catsOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 animate-fade-in z-50">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.id}`}
                    onClick={() => setCatsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300 mx-1 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    </div>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search groceries, brands..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input pl-9 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
              />
            </div>
          </form>

          <div className="flex items-center gap-1 ml-auto">
            <button onClick={() => setSearchOpen(o => !o)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlist.length > 9 ? '9+' : wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {isSignedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(o => !o)}
                  className="flex items-center gap-2 ml-1 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.firstName || 'User'}
                  </span>
                  <ChevronDown size={14} className={`hidden lg:block text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 animate-fade-in z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{user?.fullName || user?.firstName}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.emailAddresses?.[0]?.emailAddress}</p>
                    </div>
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                      <User size={15} /> My Profile
                    </Link>
                    <Link to="/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                      <Package size={15} /> My Orders
                    </Link>
                    <Link to="/become-a-seller" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 transition-colors">
                      <Store size={15} /> Sell on Grozo
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-green-600 font-medium transition-colors">
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100 dark:border-gray-800" />
                    <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-gray-800 text-sm text-red-600 w-full transition-colors">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Login</Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
              </div>
            )}

            <button onClick={() => setMobileOpen(o => !o)} className="md:hidden ml-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="md:hidden pb-3 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search groceries..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="input pl-9 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-slide-in">
          <div className="page-container py-4 space-y-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Home size={16} /> Home
            </Link>
            <Link to="/products" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
              <ShoppingBag size={16} /> All Products
            </Link>
            <p className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">Categories</p>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.id}`} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-6 h-6 rounded-md overflow-hidden flex-shrink-0">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                {cat.name}
              </Link>
            ))}
            <hr className="border-gray-100 dark:border-gray-800 my-1" />
            {!isSignedIn && (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 dark:text-gray-300">Login</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold text-center">Sign Up</Link>
              </>
            )}
            {isSignedIn && (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <User size={15} /> My Profile
                </Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Package size={15} /> My Orders
                </Link>
                <Link to="/become-a-seller" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Store size={15} /> Sell on Grozo
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-sm font-medium text-green-600">
                    <LayoutDashboard size={15} /> Admin Dashboard
                  </Link>
                )}
                <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl hover:bg-red-50 text-sm font-medium text-red-600">
                  <LogOut size={15} /> Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
