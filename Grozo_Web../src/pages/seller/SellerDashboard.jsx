import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  LayoutDashboard, Package, ShoppingBag, IndianRupee,
  TrendingUp, Plus, Edit2, Trash2, Search, ArrowLeft,
  CheckCircle2, Clock, Truck, XCircle, AlertCircle,
  ChevronRight, BarChart2, Star
} from 'lucide-react';
import { useSeller } from '../../context/SellerContext';
import { OrderStatusBadge } from '../../components/ui/Badge';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';

const NAV = [
  { id: 'overview',  label: 'Overview',  icon: LayoutDashboard },
  { id: 'products',  label: 'Products',  icon: Package },
  { id: 'orders',    label: 'Orders',    icon: ShoppingBag },
  { id: 'earnings',  label: 'Earnings',  icon: IndianRupee },
];

const WEEKLY = [
  { day: 'Mon', sales: 1200 },
  { day: 'Tue', sales: 1800 },
  { day: 'Wed', sales: 1400 },
  { day: 'Thu', sales: 2100 },
  { day: 'Fri', sales: 2600 },
  { day: 'Sat', sales: 3200 },
  { day: 'Sun', sales: 2800 },
];

const MONTHLY = [
  { month: 'Mar', sales: 18000 },
  { month: 'Apr', sales: 22000 },
  { month: 'May', sales: 26000 },
  { month: 'Jun', sales: 31000 },
  { month: 'Jul', sales: 28000 },
  { month: 'Aug', sales: 15100 },
];

const BLANK_PROD = { name: '', price: '', stock: '', category: 'fruits-vegetables', image: '' };

export default function SellerDashboard() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const { currentSellerApp, isApprovedSeller, sellerOrders } = useSeller();
  const { dark, toggleDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editProd, setEditProd] = useState(null);
  const [form, setForm] = useState(BLANK_PROD);
  const [products, setProducts] = useState(
    () => JSON.parse(localStorage.getItem('grozo_seller_products') || 'null') ||
    [
      { id: 's1', name: 'Farm Fresh Tomatoes', category: 'fruits-vegetables', price: 40, stock: 120, sales: 340, revenue: 13600, status: 'active', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200' },
      { id: 's2', name: 'Organic Carrots', category: 'fruits-vegetables', price: 55, stock: 80, sales: 210, revenue: 11550, status: 'active', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200' },
      { id: 's3', name: 'Green Capsicum', category: 'fruits-vegetables', price: 35, stock: 0, sales: 190, revenue: 6650, status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200' },
      { id: 's4', name: 'Fresh Spinach', category: 'fruits-vegetables', price: 30, stock: 60, sales: 415, revenue: 12450, status: 'active', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200' },
    ]
  );

  const saveProducts = (ps) => {
    setProducts(ps);
    localStorage.setItem('grozo_seller_products', JSON.stringify(ps));
  };

  const set = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const handleSaveProd = () => {
    if (!form.name || !form.price) { toast.error('Name and price required'); return; }
    if (editProd) {
      saveProducts(products.map(p => p.id === editProd.id ? {
        ...p, name: form.name, price: Number(form.price),
        stock: Number(form.stock), category: form.category,
        image: form.image || p.image,
        status: Number(form.stock) > 0 ? 'active' : 'out_of_stock',
      } : p));
      toast.success('Product updated!');
    } else {
      const np = {
        id: `s_${Date.now()}`, name: form.name, category: form.category,
        price: Number(form.price), stock: Number(form.stock) || 0,
        sales: 0, revenue: 0,
        status: Number(form.stock) > 0 ? 'active' : 'out_of_stock',
        image: form.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
      };
      saveProducts([np, ...products]);
      toast.success('Product added!');
    }
    setShowForm(false); setEditProd(null); setForm(BLANK_PROD);
  };

  const openEdit = (p) => {
    setEditProd(p);
    setForm({ name: p.name, price: p.price, stock: p.stock, category: p.category, image: p.image });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    saveProducts(products.filter(p => p.id !== id));
    setDeleteId(null);
    toast.success('Product deleted');
  };

  const totalRevenue = products.reduce((s, p) => s + p.revenue, 0);
  const totalSales   = products.reduce((s, p) => s + p.sales, 0);
  const totalOrders  = sellerOrders.length;
  const avgRating    = 4.6;

  // ── Gate: not signed in ──────────────────────────────────────
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="text-center max-w-sm">
          <AlertCircle size={48} className="text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sign in required</h2>
          <p className="text-gray-500 mb-6">Please sign in to access your seller dashboard.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  // ── Gate: not a seller / not approved ───────────────────────
  if (!currentSellerApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="text-center max-w-sm">
          <Package size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Not a seller yet</h2>
          <p className="text-gray-500 mb-6">Register your shop on Grozo to access the seller dashboard.</p>
          <Link to="/become-a-seller" className="btn-primary">Register Your Shop</Link>
        </div>
      </div>
    );
  }

  if (!isApprovedSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="text-center max-w-sm">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            currentSellerApp.status === 'rejected' ? 'bg-red-100' : 'bg-amber-100'
          }`}>
            {currentSellerApp.status === 'rejected'
              ? <XCircle size={32} className="text-red-500" />
              : <Clock size={32} className="text-amber-600" />
            }
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {currentSellerApp.status === 'rejected' ? 'Application Rejected' : 'Application Under Review'}
          </h2>
          <p className="text-gray-500 mb-2 font-medium">{currentSellerApp.shopName}</p>
          <p className="text-gray-500 text-sm mb-6">
            {currentSellerApp.status === 'rejected'
              ? 'Your application was not approved. Contact support@grozo.com for help.'
              : 'Our team is reviewing your application. You\'ll be notified within 2 business days.'
            }
          </p>
          <Link to="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    );
  }

  // ── Sidebar ──────────────────────────────────────────────────
  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-sm">G</span>
          </div>
          <div>
            <span className="font-black text-base text-green-700 dark:text-green-400">grozo</span>
            <span className="text-xs text-gray-500 block -mt-0.5">Seller Panel</span>
          </div>
        </div>
        <p className="text-xs font-semibold text-gray-900 dark:text-white mt-3 truncate">{currentSellerApp.shopName}</p>
        <p className="text-xs text-gray-500 truncate">{currentSellerApp.email}</p>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV.map(item => {
          const Icon = item.icon;
          return (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}>
              <Icon size={16} /> {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeft size={16} /> Back to Store
        </Link>
      </div>
    </div>
  );

  // ── Overview tab ─────────────────────────────────────────────
  const Overview = () => (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `Rs.${(totalRevenue / 1000).toFixed(1)}k`, icon: <IndianRupee size={20} />, color: 'text-green-600 bg-green-100 dark:bg-green-900/30', change: '+18%' },
          { label: 'Total Sales', value: totalSales, icon: <TrendingUp size={20} />, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30', change: '+12%' },
          { label: 'Total Orders', value: totalOrders, icon: <ShoppingBag size={20} />, color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30', change: '+8%' },
          { label: 'Avg Rating', value: avgRating, icon: <Star size={20} />, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30', change: '+0.2' },
        ].map((c, i) => (
          <div key={i} className="card p-4 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-xl ${c.color}`}>{c.icon}</div>
              <span className="text-xs text-green-600 font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">{c.change}</span>
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WEEKLY}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `Rs.${v/1000}k`} />
              <Tooltip formatter={v => [`Rs.${v.toLocaleString('en-IN')}`, 'Sales']} />
              <Bar dataKey="sales" fill="#16a34a" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `Rs.${v/1000}k`} />
              <Tooltip formatter={v => [`Rs.${v.toLocaleString('en-IN')}`, 'Revenue']} />
              <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={2.5} dot={{ fill:'#16a34a', r:4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top products */}
      <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Top Products</h3>
        <div className="space-y-3">
          {[...products].sort((a,b) => b.sales - a.sales).slice(0,4).map((p,i) => (
            <div key={p.id} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(p.sales/500)*100}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{p.sales} sold</span>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-900 dark:text-white flex-shrink-0">Rs.{(p.revenue/1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Recent Orders</h3>
          <button onClick={() => setActiveTab('orders')} className="text-xs text-green-600 font-medium hover:underline flex items-center gap-1">
            View All <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {sellerOrders.slice(0,4).map(o => (
            <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{o.id}</p>
                <p className="text-xs text-gray-500">{o.customer} · {o.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Rs.{o.total}</p>
                <OrderStatusBadge status={o.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Products tab ─────────────────────────────────────────────
  const Products = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Products ({products.length})</h2>
        <button onClick={() => { setEditProd(null); setForm(BLANK_PROD); setShowForm(true); }}
          className="btn-primary text-sm py-2 flex items-center gap-2">
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        <input type="text" placeholder="Search your products..." value={search} onChange={e => setSearch(e.target.value)}
          className="input pl-8 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
      </div>

      {showForm && (
        <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 border-2 border-green-200 dark:border-green-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">{editProd ? 'Edit Product' : 'Add Product'}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[['name','Product Name','Name...'],['price','Price (Rs.)','0'],['stock','Stock Qty','50']].map(([f, label, ph]) => (
              <div key={f} className={f === 'name' ? 'col-span-2' : ''}>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">{label}</label>
                <input value={form[f]} onChange={set(f)} placeholder={ph}
                  className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Image URL</label>
            <input value={form.image} onChange={set('image')} placeholder="https://images.unsplash.com/..."
              className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setShowForm(false); setEditProd(null); }} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">Cancel</button>
            <button onClick={handleSaveProd} className="flex-1 btn-primary">{editProd ? 'Update' : 'Add Product'}</button>
          </div>
        </div>
      )}

      <div className="card dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {['Product', 'Price', 'Stock', 'Sales', 'Revenue', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {products.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-medium text-gray-900 dark:text-white">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Rs.{p.price}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${p.stock === 0 ? 'text-red-500' : p.stock < 20 ? 'text-orange-500' : 'text-green-600'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.sales}</td>
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Rs.{p.revenue.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {p.status === 'active' ? 'Active' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-500 rounded-lg transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => setDeleteId(p.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Package size={40} className="mx-auto mb-3 opacity-40" />
            <p>No products yet. Add your first product!</p>
          </div>
        )}
      </div>

      <ConfirmDialog open={!!deleteId} title="Delete Product?"
        message="This product will be permanently removed from your shop."
        onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)}
        confirmText="Delete" danger />
    </div>
  );

  // ── Orders tab ───────────────────────────────────────────────
  const Orders = () => (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Orders ({sellerOrders.length})</h2>
      <div className="card dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {sellerOrders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 py-3 font-mono font-medium text-gray-900 dark:text-white">{o.id}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{o.customer}</td>
                <td className="px-4 py-3 text-gray-500">{o.date}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{o.items}</td>
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Rs.{o.total}</td>
                <td className="px-4 py-3"><OrderStatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── Earnings tab ─────────────────────────────────────────────
  const Earnings = () => {
    const settled = Math.round(totalRevenue * 0.72);
    const pending = Math.round(totalRevenue * 0.18);
    const processing = totalRevenue - settled - pending;
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Earnings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Earned', value: `Rs.${totalRevenue.toLocaleString('en-IN')}`, color: 'border-l-4 border-green-500', sub: 'All time' },
            { label: 'Settled', value: `Rs.${settled.toLocaleString('en-IN')}`, color: 'border-l-4 border-blue-500', sub: 'In your bank' },
            { label: 'Pending', value: `Rs.${pending.toLocaleString('en-IN')}`, color: 'border-l-4 border-amber-500', sub: 'Being processed' },
          ].map((c,i) => (
            <div key={i} className={`card p-5 dark:bg-gray-900 dark:border-gray-800 ${c.color}`}>
              <p className="text-xs text-gray-500 mb-1">{c.label}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{c.value}</p>
              <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={MONTHLY}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `Rs.${v/1000}k`} />
              <Tooltip formatter={v => [`Rs.${v.toLocaleString('en-IN')}`, 'Revenue']} />
              <Bar dataKey="sales" fill="#16a34a" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Payout History</h3>
          <div className="space-y-3">
            {[
              { date: '2026-08-01', amount: 8420, status: 'Credited' },
              { date: '2026-07-15', amount: 11250, status: 'Credited' },
              { date: '2026-07-01', amount: 9800, status: 'Credited' },
              { date: '2026-06-15', amount: 7340, status: 'Credited' },
            ].map((p,i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Rs.{p.amount.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-gray-500">{p.date}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const tabContent = {
    overview: <Overview />,
    products: <Products />,
    orders:   <Orders />,
    earnings: <Earnings />,
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 fixed h-full z-30">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-56 bg-white dark:bg-gray-900 h-full shadow-xl animate-slide-in">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-56 flex flex-col">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-14 flex items-center px-4 gap-3 sticky top-0 z-20">
          <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <BarChart2 size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <span className="font-semibold text-gray-900 dark:text-white text-sm capitalize">
            {NAV.find(n => n.id === activeTab)?.label}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={toggleDark} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.firstName?.[0] || 'S'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {tabContent[activeTab]}
        </main>
      </div>
    </div>
  );
}
