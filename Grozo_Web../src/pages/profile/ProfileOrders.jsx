import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrdersContext';
import { OrderStatusBadge } from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import { ChevronRight } from 'lucide-react';

export default function ProfileOrders() {
  const { orders } = useOrders();
  if (orders.length === 0) return <EmptyState type="orders" title="No orders yet" description="Your order history will appear here." actionLabel="Shop Now" actionTo="/products" />;

  return (
    <div className="card p-6 dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Order History</h2>
      <div className="space-y-3">
        {orders.map(order => (
          <Link key={order.id} to={`/orders/${order.id}`}
            className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
            <div className="flex gap-1 flex-shrink-0">
              {order.items.slice(0, 2).map((item, i) => (
                <img key={i} src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">{order.id}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-xs text-gray-500">{order.date} · {order.items.length} items · ₹{order.total?.toLocaleString('en-IN')}</p>
            </div>
            <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}
