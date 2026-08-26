import { useState } from 'react';
import { coupons as initialCoupons } from '../../data/products';
import { Plus, Trash2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [deleteCode, setDeleteCode] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', discount: '', type: 'percentage', minOrder: '0', description: '' });

  const handleAdd = () => {
    if (!form.code || !form.discount) { toast.error('Code and discount required'); return; }
    if (coupons.find(c => c.code === form.code.toUpperCase())) { toast.error('Coupon code already exists'); return; }
    setCoupons(cs => [...cs, { ...form, code: form.code.toUpperCase(), discount: Number(form.discount), minOrder: Number(form.minOrder) }]);
    setShowForm(false);
    setForm({ code: '', discount: '', type: 'percentage', minOrder: '0', description: '' });
    toast.success('Coupon added!');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Coupons</h2>
          <button onClick={() => setShowForm(s => !s)} className="btn-primary text-sm py-2 flex items-center gap-2">
            <Plus size={14} /> Add Coupon
          </button>
        </div>

        {showForm && (
          <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 border-2 border-green-200 dark:border-green-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">New Coupon</h3>
            <div className="grid grid-cols-2 gap-4">
              {[['code','Coupon Code','e.g. SAVE20'],['discount','Discount Value','10'],['minOrder','Min Order (₹)','0']].map(([name, label, placeholder]) => (
                <div key={name}>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">{label}</label>
                  <input value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} placeholder={placeholder}
                    className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white uppercase" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Discount Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat (₹)</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Description</label>
              <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Coupon description..." className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowForm(false)} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">Cancel</button>
              <button onClick={handleAdd} className="flex-1 btn-primary">Add Coupon</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map(c => (
            <div key={c.code} className="card p-5 dark:bg-gray-900 dark:border-gray-800 relative group">
              <button onClick={() => setDeleteCode(c.code)} className="absolute top-3 right-3 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-300 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 font-bold text-lg">
                  🏷️
                </div>
                <div>
                  <p className="font-mono font-bold text-lg text-gray-900 dark:text-white">{c.code}</p>
                  <p className="text-xs text-gray-500">{c.type === 'percentage' ? `${c.discount}% off` : `₹${c.discount} off`}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{c.description}</p>
              {c.minOrder > 0 && <p className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-900/20 rounded-lg px-2 py-1">Min order: ₹{c.minOrder}</p>}
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog open={!!deleteCode} title="Delete Coupon?" message={`Delete coupon "${deleteCode}"? This cannot be undone.`}
        onConfirm={() => { setCoupons(cs => cs.filter(c => c.code !== deleteCode)); setDeleteCode(null); toast.success('Coupon deleted'); }}
        onCancel={() => setDeleteCode(null)} confirmText="Delete" danger />
    </AdminLayout>
  );
}
