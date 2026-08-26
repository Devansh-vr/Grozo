import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Edit2, Save, Verified, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfileInfo() {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '9876543210',
    dob: '1995-05-10',
    gender: 'Male',
  });

  const handleSave = async () => {
    try {
      await user.update({ firstName: form.firstName, lastName: form.lastName });
      toast.success('Profile updated!');
      setEditing(false);
    } catch {
      toast.error('Update failed. Please try again.');
    }
  };

  const F = ({ name, label, type = 'text', options }) => (
    <div>
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">{label}</label>
      {options ? (
        <select
          disabled={!editing}
          value={form[name]}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
        >
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[name]}
          disabled={!editing}
          onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
          className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:cursor-not-allowed"
        />
      )}
    </div>
  );

  return (
    <div className="card p-6 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="flex items-center gap-2 btn-outline text-sm py-2">
            <Edit2 size={14} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="flex items-center gap-2 btn-ghost border border-gray-200 dark:border-gray-700 text-sm py-2">
              <X size={14} /> Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 btn-primary text-sm py-2">
              <Save size={14} /> Save
            </button>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          {(form.firstName?.[0] || 'U').toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-lg text-gray-900 dark:text-white">{form.firstName} {form.lastName}</p>
          <p className="text-sm text-gray-500">{user?.emailAddresses?.[0]?.emailAddress}</p>
          <span className="badge-green mt-1 inline-block"> Verified Account</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <F name="firstName" label="First Name" />
        <F name="lastName" label="Last Name" />
        <div>
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Email Address</label>
          <input
            type="email"
            value={user?.emailAddresses?.[0]?.emailAddress || ''}
            disabled
            className="input text-sm bg-gray-50 dark:bg-gray-900 disabled:cursor-not-allowed text-gray-400"
          />
          <p className="text-xs text-gray-400 mt-1">Email cannot be changed here</p>
        </div>
        <F name="phone" label="Phone Number" type="tel" />
        <F name="dob" label="Date of Birth" type="date" />
        <F name="gender" label="Gender" options={['Male', 'Female', 'Other', 'Prefer not to say']} />
      </div>
    </div>
  );
}
