import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

// Public pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Protected pages
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Profile from './pages/profile/Profile';
import Checkout from './pages/checkout/Checkout';

// Seller pages
import BecomeSeller from './pages/seller/BecomeSeller';
import SellerDashboard from './pages/seller/SellerDashboard';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminSellers from './pages/admin/AdminSellers';

// ── Spinner shared ───────────────────────────────────────────
function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ── Route guards ─────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return <Spinner />;
  if (!isSignedIn) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const { isSignedIn, isLoaded, user } = useUser();
  if (!isLoaded) return <Spinner />;
  if (!isSignedIn) return <Navigate to="/login" replace />;
  if (user?.publicMetadata?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* ── Public ── */}
      <Route path="/"              element={<Home />} />
      <Route path="/products"      element={<Products />} />
      <Route path="/products/:id"  element={<ProductDetail />} />
      <Route path="/cart"          element={<Cart />} />
      <Route path="/wishlist"      element={<Wishlist />} />
      <Route path="/login/*"       element={<LoginPage />} />
      <Route path="/signup/*"      element={<SignupPage />} />

      {/* ── Seller (public registration, protected dashboard) ── */}
      <Route path="/become-a-seller" element={<BecomeSeller />} />
      <Route path="/seller/dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />

      {/* ── Protected ── */}
      <Route path="/checkout"    element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/orders"      element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/orders/:id"  element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
      <Route path="/profile"     element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* ── Admin ── */}
      <Route path="/admin"              element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/products"     element={<AdminRoute><AdminProducts /></AdminRoute>} />
      <Route path="/admin/orders"       element={<AdminRoute><AdminOrders /></AdminRoute>} />
      <Route path="/admin/users"        element={<AdminRoute><AdminUsers /></AdminRoute>} />
      <Route path="/admin/coupons"      element={<AdminRoute><AdminCoupons /></AdminRoute>} />
      <Route path="/admin/sellers"      element={<AdminRoute><AdminSellers /></AdminRoute>} />

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
