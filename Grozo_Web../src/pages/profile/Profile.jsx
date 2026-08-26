import { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, Heart, Star, MapPin, Lock, LogOut, ChevronRight } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import ProfileInfo from './ProfileInfo';
import ProfileAddresses from './ProfileAddresses';
import ProfileOrders from './ProfileOrders';
import ProfileWishlist from './ProfileWishlist';
import ProfileReviews from './ProfileReviews';

const TABS = [
  { id: 'info', label: 'My Profile', icon: User },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'reviews', label: 'My Reviews', icon: Star },
];

export default function Profile() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  if (!isSignedIn) {
    navigate('/login');
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'info': return <ProfileInfo />;
      case 'addresses': return <ProfileAddresses />;
      case 'orders': return <ProfileOrders />;
      case 'wishlist': return <ProfileWishlist />;
      case 'reviews': return <ProfileReviews />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="page-container py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Account</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {user?.firstName?.[0] || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{user?.fullName || user?.firstName}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.emailAddresses?.[0]?.emailAddress}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-green-600 text-white shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} />
                        {tab.label}
                      </div>
                      <ChevronRight size={14} className="opacity-60" />
                    </button>
                  );
                })}
                <hr className="border-gray-100 dark:border-gray-800 my-2" />
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {renderTab()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
