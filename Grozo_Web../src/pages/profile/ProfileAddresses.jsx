import { useState } from 'react';
import { useAddress } from '../../context/AddressContext';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const BLANK = { name: '', phone: '', line1: '', line2: '', city: '', state: '', pin: '', type: 'Home' };

function AddressField({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">{label}</label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
}

export default function ProfileAddresses() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddress();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [deleteId, setDeleteId] = useState(null);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSave = () => {
    if (editingId) { updateAddress(editingId, form); toast.success('Address updated!'); }
    else { addAddress(form); toast.success('Address added!'); }
    setShowForm(false);
    setEditingId(null);
    setForm(BLANK);
  };

  const startEdit = (addr) => {
    setEditingId(addr.id);
    setForm({ name: addr.name, phone: addr.phone, line1: addr.line1, line2: addr.line2 || '', city: addr.city, state: addr.state, pin: addr.pin, type: addr.type });
    setShowForm(true);
  };

  return (
    <div className="card p-6 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved Addresses</h2>
        {!showForm && (
          <button onClick={() => { setShowForm(true); setEditingId(null); setForm(BLANK); }} className="btn-primary text-sm py-2 flex items-center gap-2">
            <Plus size={14} /> Add Address
          </button>
        )}
      </div>

      <div className="space-y-4">
        {addresses.map(addr => (
          <div key={addr.id} className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{addr.name}</span>
                  <span className="badge badge-green text-xs">{addr.type}</span>
                  {addr.isDefault && <span className="badge badge-blue text-xs">Default</span>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{addr.city}, {addr.state} - {addr.pin}</p>
                <p className="text-sm text-gray-500 mt-1">📞 {addr.phone}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {!addr.isDefault && (
                  <button
                    onClick={() => { setDefault(addr.id); toast.success('Default address updated!'); }}
                    className="p-1.5 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-gray-400 hover:text-yellow-500 rounded-lg transition-colors"
                    title="Set as default"
                  >
                    <Star size={14} />
                  </button>
                )}
                <button onClick={() => startEdit(addr)} className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-500 rounded-lg transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => setDeleteId(addr.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="mt-5 border-2 border-green-200 dark:border-green-800 rounded-2xl p-5 space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">{editingId ? 'Edit Address' : 'New Address'}</h4>

          <div className="grid grid-cols-2 gap-4">
            <AddressField label="Full Name" placeholder="Your name" value={form.name} onChange={set('name')} />
            <AddressField label="Phone" placeholder="10-digit number" value={form.phone} onChange={set('phone')} />
          </div>

          <AddressField label="Address Line 1" placeholder="House/Flat No." value={form.line1} onChange={set('line1')} />
          <AddressField label="Address Line 2 (Optional)" placeholder="Area/Landmark" value={form.line2} onChange={set('line2')} />

          <div className="grid grid-cols-3 gap-4">
            <AddressField label="City" placeholder="City" value={form.city} onChange={set('city')} />
            <AddressField label="State" placeholder="State" value={form.state} onChange={set('state')} />
            <AddressField label="PIN" placeholder="6-digit" value={form.pin} onChange={set('pin')} />
          </div>

          <div className="flex gap-2">
            {['Home', 'Work', 'Other'].map(t => (
              <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium border-2 transition-all ${form.type === t ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-300'}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">Cancel</button>
            <button onClick={handleSave} className="flex-1 btn-primary">Save Address</button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Address?"
        message="Are you sure you want to delete this address?"
        onConfirm={() => { deleteAddress(deleteId); setDeleteId(null); toast.success('Address deleted'); }}
        onCancel={() => setDeleteId(null)}
        confirmText="Delete"
        danger
      />
    </div>
  );
}
