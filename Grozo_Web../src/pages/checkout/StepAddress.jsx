import { useState } from 'react';
import { Plus, Edit2, Trash2, Check, MapPin } from 'lucide-react';
import { useAddress } from '../../context/AddressContext';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

const BLANK = { name: '', phone: '', line1: '', line2: '', city: '', state: '', pin: '', type: 'Home' };

function AddressField({ label, name, placeholder, type = 'text', value, onChange, error }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function StepAddress({ selectedAddress, onSelect, onNext }) {
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddress();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [errors, setErrors] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Valid 10-digit phone required';
    if (!form.line1.trim()) e.line1 = 'Address line 1 required';
    if (!form.city.trim()) e.city = 'City required';
    if (!form.state.trim()) e.state = 'State required';
    if (!/^\d{6}$/.test(form.pin)) e.pin = 'Valid 6-digit PIN required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editingId) updateAddress(editingId, form);
    else addAddress(form);
    setShowForm(false);
    setEditingId(null);
    setForm(BLANK);
    setErrors({});
  };

  const startEdit = (addr) => {
    setEditingId(addr.id);
    setForm({ name: addr.name, phone: addr.phone, line1: addr.line1, line2: addr.line2 || '', city: addr.city, state: addr.state, pin: addr.pin, type: addr.type });
    setShowForm(true);
  };

  return (
    <div>
      <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
          <MapPin size={20} className="text-green-600" /> Delivery Address
        </h2>

        <div className="space-y-3 mb-5">
          {addresses.map(addr => (
            <div
              key={addr.id}
              onClick={() => onSelect(addr)}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                selectedAddress?.id === addr.id
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAddress?.id === addr.id ? 'border-green-500 bg-green-500' : 'border-gray-300'
                  }`}>
                    {selectedAddress?.id === addr.id && <Check size={11} className="text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">{addr.name}</span>
                      <span className="badge badge-green text-xs">{addr.type}</span>
                      {addr.isDefault && <span className="badge badge-blue text-xs">Default</span>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{addr.city}, {addr.state} - {addr.pin}</p>
                    <p className="text-sm text-gray-500">📞 {addr.phone}</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); startEdit(addr); }}
                    className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-500 rounded-lg transition-colors">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteId(addr.id); }}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add / Edit address form */}
        {!showForm ? (
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm(BLANK); setErrors({}); }}
            className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm border-2 border-dashed border-green-300 dark:border-green-700 rounded-2xl p-4 w-full justify-center hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
          >
            <Plus size={16} /> Add New Address
          </button>
        ) : (
          <div className="border-2 border-green-200 dark:border-green-800 rounded-2xl p-5 space-y-4 mt-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">{editingId ? 'Edit Address' : 'Add New Address'}</h4>

            <div className="grid grid-cols-2 gap-4">
              <AddressField label="Full Name" name="name" placeholder="Your name" value={form.name} onChange={set('name')} error={errors.name} />
              <AddressField label="Phone" name="phone" placeholder="10-digit number" value={form.phone} onChange={set('phone')} error={errors.phone} />
            </div>

            <AddressField label="Address Line 1" name="line1" placeholder="House/Flat/Block No." value={form.line1} onChange={set('line1')} error={errors.line1} />
            <AddressField label="Address Line 2 (Optional)" name="line2" placeholder="Area, Colony, Landmark" value={form.line2} onChange={set('line2')} />

            <div className="grid grid-cols-3 gap-4">
              <AddressField label="City" name="city" placeholder="City" value={form.city} onChange={set('city')} error={errors.city} />
              <AddressField label="State" name="state" placeholder="State" value={form.state} onChange={set('state')} error={errors.state} />
              <AddressField label="PIN Code" name="pin" placeholder="6 digits" value={form.pin} onChange={set('pin')} error={errors.pin} />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Address Type</label>
              <div className="flex gap-2">
                {['Home', 'Work', 'Other'].map(t => (
                  <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`px-4 py-1.5 rounded-xl text-sm font-medium border-2 transition-all ${form.type === t ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-green-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setShowForm(false); setErrors({}); }} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-primary">Save Address</button>
            </div>
          </div>
        )}

        <button
          onClick={onNext}
          disabled={!selectedAddress}
          className="btn-primary w-full mt-6 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Continue to Delivery
        </button>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Address?"
        message="Are you sure you want to delete this address?"
        onConfirm={() => { deleteAddress(deleteId); setDeleteId(null); }}
        onCancel={() => setDeleteId(null)}
        confirmText="Delete"
        danger
      />
    </div>
  );
}
