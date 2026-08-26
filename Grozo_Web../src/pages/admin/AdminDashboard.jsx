import { adminStats } from '../../data/products';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, Package, ShoppingBag, IndianRupee, TrendingUp, ArrowUpRight } from 'lucide-react';
import AdminLayout from './AdminLayout';

const STAT_CARDS = [
  { label: 'Total Users', value: adminStats.totalUsers.toLocaleString('en-IN'), icon: <Users size={22} />, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30', change: '+12%' },
  { label: 'Total Products', value: adminStats.totalProducts.toLocaleString('en-IN'), icon: <Package size={22} />, color: 'text-green-600 bg-green-100 dark:bg-green-900/30', change: '+5%' },
  { label: 'Total Orders', value: adminStats.totalOrders.toLocaleString('en-IN'), icon: <ShoppingBag size={22} />, color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30', change: '+18%' },
  { label: 'Total Revenue', value: `₹${(adminStats.totalRevenue / 100000).toFixed(2)}L`, icon: <IndianRupee size={22} />, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30', change: '+24%' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((card, i) => (
            <div key={i} className="card p-5 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${card.color}`}>{card.icon}</div>
                <span className="flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <ArrowUpRight size={11} /> {card.change}
                </span>
              </div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily sales */}
          <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Daily Sales (This Week)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={adminStats.dailySales}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Sales']} />
                <Bar dataKey="sales" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly sales */}
          <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Monthly Sales Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={adminStats.monthlySales}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Sales']} />
                <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={2.5} dot={{ fill: '#16a34a', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders by status */}
          <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Orders by Status</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={adminStats.ordersByStatus} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${(percent*100).toFixed(0)}%`}>
                  {adminStats.ordersByStatus.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top products */}
          <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Top Selling Products</h3>
            <div className="space-y-3">
              {adminStats.topProducts.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(p.sales / 1300) * 100}%` }} />
                      </div>
                      <span className="text-xs text-gray-400">{p.sales} sold</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-900 dark:text-white flex-shrink-0">₹{(p.revenue/1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
