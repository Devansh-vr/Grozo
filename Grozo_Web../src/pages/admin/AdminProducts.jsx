import { useState } from 'react';
import { products as initialProducts, categories } from '../../data/products';
import { Plus, Edit2, Trash2, Search, Package } from 'lucide-react';
import AdminLayout from './AdminLayout';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { OrderStatusBadge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [prods, setProds] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'fruits-vegetables', description: '', image: '', price: '', stock: '', discount: '0' });

  const filtered = prods.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!catFilter || p.category === catFilter)
  );

  const handleDelete = (id) => {
    setProds(ps => ps.filter(p => p.id !== id));
    setDeleteId(null);
    toast.success('Product deleted');
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, category: p.category, description: p.description, image: p.images[0], price: p.variants[0].price, stock: p.variants[0].stock, discount: p.discount });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) { toast.error('Name and price required'); return; }
    if (editProduct) {
      setProds(ps => ps.map(p => p.id === editProduct.id ? {
        ...p, name: form.name, category: form.category, description: form.description, discount: Number(form.discount),
        images: [form.image || p.images[0]],
        variants: [{ ...p.variants[0], price: Number(form.price), stock: Number(form.stock) }],
      } : p));
      toast.success('Product updated!');
    } else {
      const newProd = {
        id: Date.now(), name: form.name, category: form.category, description: form.description,
        images: [form.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600'],
        variants: [{ id: `v_${Date.now()}`, label: 'Standard', price: Number(form.price), originalPrice: Number(form.price), stock: Number(form.stock) || 50 }],
        rating: 0, reviewCount: 0, discount: Number(form.discount) || 0, isNew: true, isFeatured: false,
        tags: [], reviews: [], addedDate: new Date().toISOString().split('T')[0],
      };
      setProds(ps => [newProd, ...ps]);
      toast.success('Product added!');
    }
    setShowForm(false); setEditProduct(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Products ({prods.length})</h2>
          <button onClick={() => { setEditProduct(null); setForm({ name: '', category: 'fruits-vegetables', description: '', image: '', price: '', stock: '', discount: '0' }); setShowForm(true); }}
            className="btn-primary text-sm py-2 flex items-center gap-2">
            <Plus size={14} /> Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
              className="input pl-8 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
            className="input text-sm w-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Add/Edit form */}
        {showForm && (
          <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 border-2 border-green-200 dark:border-green-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{editProduct ? 'Edit Product' : 'Add Product'}</h3>
            <div className="grid grid-cols-2 gap-4">
              {[['name','Product Name','Name...'],['price','Price (₹)','0'],['stock','Stock','50'],['discount','Discount %','0']].map(([name, label, placeholder]) => (
                <div key={name}>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">{label}</label>
                  <input value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} placeholder={placeholder}
                    className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Product description..."
                className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none" />
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Image URL</label>
              <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-primary">{editProduct ? 'Update' : 'Add Product'}</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="card dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{p.name}</p>
                        {p.isNew && <span className="badge badge-blue text-xs">NEW</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 capitalize">{p.category.replace('-', ' ')}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-gray-900 dark:text-white">₹{p.variants[0].price}</span>
                    {p.discount > 0 && <span className="ml-1 text-xs text-red-500">-{p.discount}%</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${p.variants[0].stock < 10 ? 'text-red-500' : p.variants[0].stock < 30 ? 'text-orange-500' : 'text-green-600'}`}>
                      {p.variants[0].stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-amber-500">★</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300 ml-1">{p.rating}</span>
                    <span className="text-gray-400 text-xs ml-1">({p.reviewCount})</span>
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
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Package size={40} className="mx-auto mb-3 opacity-40" />
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog open={!!deleteId} title="Delete Product?" message="This product will be permanently deleted."
        onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} confirmText="Delete" danger />
    </AdminLayout>
  );
}
