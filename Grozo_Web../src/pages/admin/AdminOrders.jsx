import { useState } from 'react';
import { adminOrders } from '../../data/products';
import { Search, ChevronDown } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { OrderStatusBadge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['placed', 'confirmed', 'preparing', 'out', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState(adminOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = orders.filter(o =>
    (!search || o.id.toLowerCase().includes(search.toLowerCase()) || o.user.toLowerCase().includes(search.toLowerCase())) &&
    (!statusFilter || o.status === statusFilter)
  );

  const updateStatus = (id, status) => {
    setOrders(os => os.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${id} updated to ${status}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Orders ({orders.length})</h2>

        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search by order ID or customer..." value={search} onChange={e => setSearch(e.target.value)}
              className="input pl-8 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input text-sm w-auto dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <option value="">All Status</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
        </div>

        <div className="card dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Payment', 'Status', 'Update Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{order.user}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{order.date}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{order.items}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{order.payment}</td>
                  <td className="px-4 py-3"><OrderStatusBadge status={order.status} /></td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-green-500 appearance-none cursor-pointer pr-6"
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No orders found</div>}
        </div>
      </div>
    </AdminLayout>
  );
}
