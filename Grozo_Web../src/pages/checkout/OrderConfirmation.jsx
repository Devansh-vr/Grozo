import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

export default function OrderConfirmation({ order }) {
  return (
    <div className="text-center">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-light">
        <CheckCircle2 size={48} className="text-green-600" />
      </div>

      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Order Placed!</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-2">Your order has been successfully placed.</p>
      <p className="text-lg font-bold text-green-600 mb-8">Order ID: {order.id}</p>

      <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 text-left max-w-md mx-auto mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Details</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-medium text-gray-900 dark:text-white">{order.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment</span>
            <span className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="font-medium text-gray-900 dark:text-white">{order.deliveryMethod}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount</span>
            <span className="font-bold text-green-600 text-base">Rs.{order.total?.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {order.address && (
        <div className="card p-4 dark:bg-gray-900 dark:border-gray-800 text-left max-w-md mx-auto mb-8">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Delivering to</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{order.address.name}</p>
          <p className="text-sm text-gray-500">{order.address.line1}, {order.address.city}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <Link to={`/orders/${order.id}`} className="btn-primary flex items-center justify-center gap-2 flex-1 py-3">
          <Package size={16} /> Track Order
        </Link>
        <Link to="/products" className="btn-outline flex items-center justify-center gap-2 flex-1 py-3">
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
