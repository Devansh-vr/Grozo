import { useState } from 'react';
import { adminUsers } from '../../data/products';
import { Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
    toast.success('User status updated');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Users ({users.length})</h2>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
            className="input pl-8 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        </div>

        <div className="card dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['User', 'Email', 'Phone', 'Orders', 'Total Spent', 'Joined', 'Role', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.name[0]}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.phone}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{u.orders}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">₹{u.spent.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.joined}</td>
                  <td className="px-4 py-3">
                    <Badge variant={u.role === 'admin' ? 'purple' : 'blue'}>{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(u.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${u.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200'}`}>
                      {u.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
