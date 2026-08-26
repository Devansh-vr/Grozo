import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import Layout from '../components/layout/Layout';
import { OrderStatusBadge } from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';

export default function Orders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <Layout>
        <EmptyState type="orders" title="No orders yet" description="You haven't placed any orders. Start shopping to see your orders here!" actionLabel="Shop Now" actionTo="/products" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Orders</h1>
        <div className="space-y-4">
          {orders.map(order => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="card p-5 dark:bg-gray-900 dark:border-gray-800 flex items-center gap-5 hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package size={22} className="text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <span className="font-bold text-gray-900 dark:text-white">{order.id}</span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <p className="text-sm text-gray-500">{order.date} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                <div className="flex gap-1 mt-1">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img key={i} src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover border-2 border-white dark:border-gray-700" />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900 dark:text-white">₹{order.total?.toLocaleString('en-IN')}</p>
                <ChevronRight size={16} className="text-gray-400 ml-auto mt-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
