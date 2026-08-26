import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, ChevronLeft, RefreshCw, XCircle, ClipboardList, PackageCheck, ChefHat, Truck, PartyPopper, Search } from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import Layout from '../components/layout/Layout';
import { OrderStatusBadge } from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';
import { useState } from 'react';

const TIMELINE = [
  { status: 'placed',    label: 'Order Placed',      Icon: ClipboardList },
  { status: 'confirmed', label: 'Confirmed',          Icon: PackageCheck },
  { status: 'preparing', label: 'Preparing',          Icon: ChefHat },
  { status: 'out',       label: 'Out for Delivery',   Icon: Truck },
  { status: 'delivered', label: 'Delivered',          Icon: PartyPopper },
];

export default function OrderDetail() {
  const { id } = useParams();
  const { getOrder, cancelOrder } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const order = getOrder(id);
  const [confirmCancel, setConfirmCancel] = useState(false);

  if (!order) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={36} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Order not found</h2>
          <Link to="/orders" className="btn-primary">Back to Orders</Link>
        </div>
      </Layout>
    );
  }

  const isCancellable = !['delivered', 'out', 'cancelled'].includes(order.status);

  const handleReorder = () => {
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        const variant = prod.variants.find(v => v.label === item.variant) || prod.variants[0];
        addToCart(prod, variant);
      }
    });
    toast.success('Items added to cart!');
    navigate('/cart');
  };

  const currentStep = TIMELINE.findIndex(t => t.status === order.status);
  const displayTimeline = order.status === 'cancelled' ? [] : TIMELINE;

  return (
    <Layout>
      <div className="page-container py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/orders" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{order.id}</h1>
            <p className="text-sm text-gray-500">Placed on {order.date}</p>
          </div>
          <div className="ml-auto">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {/* Status timeline */}
        {order.status !== 'cancelled' && (
          <div className="card p-6 dark:bg-gray-900 dark:border-gray-800 mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Order Tracking</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-0">
                {displayTimeline.map((step, i) => {
                  const { Icon } = step;
                  const tStep = order.timeline?.find(t => t.status === step.status);
                  const done = tStep?.done || i <= currentStep;
                  const isCurrentStatus = step.status === order.status;
                  return (
                    <div key={step.status} className="relative flex items-start gap-4 pb-6 last:pb-0">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                        done ? 'bg-green-600 border-green-600' :
                        isCurrentStatus ? 'border-green-400 bg-white dark:bg-gray-900 animate-pulse' :
                        'border-gray-300 bg-white dark:bg-gray-900'
                      }`}>
                        {done
                          ? <CheckCircle2 size={14} className="text-white" />
                          : <Icon size={13} className="text-gray-400" />
                        }
                      </div>
                      <div className={`pt-0.5 ${done ? '' : 'opacity-50'}`}>
                        <div className="flex items-center gap-2">
                          <p className={`font-semibold text-sm ${done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                            {step.label}
                          </p>
                          {isCurrentStatus && order.status !== 'delivered' && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">Current</span>
                          )}
                        </div>
                        {tStep?.time && (
                          <p className="text-xs text-gray-500 mt-0.5">{tStep.time}</p>
                        )}
                        {step.status === 'out' && done && order.status !== 'delivered' && (
                          <p className="text-xs text-green-600 font-medium mt-0.5">Estimated by today 6:00 PM</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {order.status === 'cancelled' && (
          <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3">
              <XCircle size={22} className="text-red-500" />
              <div>
                <p className="font-bold text-red-700 dark:text-red-400">Order Cancelled</p>
                <p className="text-sm text-red-500">This order has been cancelled. Refund will be processed in 3-5 business days.</p>
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Items Ordered</h3>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.variant} x {item.qty}</p>
                </div>
                <span className="font-bold text-sm text-gray-900 dark:text-white">Rs.{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <hr className="my-4 border-gray-100 dark:border-gray-800" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>Rs.{order.subtotal?.toLocaleString('en-IN')}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-Rs.{order.discount?.toLocaleString('en-IN')}</span></div>}
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Delivery</span><span>Rs.{order.delivery}</span></div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax</span><span>Rs.{order.tax?.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-2 border-t border-gray-100 dark:border-gray-800">
              <span>Total</span><span>Rs.{order.total?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Address + Payment */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {order.address && (
            <div className="card p-4 dark:bg-gray-900 dark:border-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Delivery Address</h4>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{order.address.name}</p>
              <p className="text-sm text-gray-500">{order.address.line1}</p>
              {order.address.line2 && <p className="text-sm text-gray-500">{order.address.line2}</p>}
              <p className="text-sm text-gray-500">{order.address.city}, {order.address.state} - {order.address.pin}</p>
              <p className="text-sm text-gray-500 mt-1">Ph: {order.address.phone}</p>
            </div>
          )}
          <div className="card p-4 dark:bg-gray-900 dark:border-gray-800">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Payment Info</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Method: <span className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</span></p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Delivery: <span className="font-medium text-gray-900 dark:text-white">{order.deliveryMethod}</span></p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleReorder} className="flex-1 btn-primary flex items-center justify-center gap-2 py-3">
            <RefreshCw size={16} /> Reorder
          </button>
          {isCancellable && (
            <button onClick={() => setConfirmCancel(true)} className="flex-1 border-2 border-red-400 text-red-600 font-semibold py-3 px-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
              <XCircle size={16} /> Cancel Order
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title="Cancel Order?"
        message={`Are you sure you want to cancel order ${order.id}? This action cannot be undone.`}
        onConfirm={() => { cancelOrder(order.id); setConfirmCancel(false); toast.success('Order cancelled'); }}
        onCancel={() => setConfirmCancel(false)}
        confirmText="Yes, Cancel"
        danger
      />
    </Layout>
  );
}
