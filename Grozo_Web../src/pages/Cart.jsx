import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { coupons } from '../data/products';
import Layout from '../components/layout/Layout';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EmptyState from '../components/ui/EmptyState';

const TAX_RATE = 0.05;
const FREE_DELIVERY_THRESHOLD = 599;
const DELIVERY_CHARGE = 29;

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, subtotal, applyCoupon, removeCoupon, coupon } = useCart();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const discount = coupon
    ? coupon.type === 'percentage'
      ? Math.round(subtotal * coupon.discount / 100)
      : coupon.discount
    : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + deliveryCharge + tax;

  const applyCouponCode = () => {
    const found = coupons.find(c => c.code === couponInput.toUpperCase());
    if (!found) { setCouponError('Invalid coupon code'); return; }
    if (subtotal < found.minOrder) { setCouponError(`Minimum order ₹${found.minOrder} required`); return; }
    applyCoupon(found);
    setCouponError('');
    setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <EmptyState
          type="cart"
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet. Start shopping and fill it up!"
          actionLabel="Browse Products"
          actionTo="/products"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Shopping Cart <span className="text-gray-400 font-normal text-lg">({items.length} items)</span>
          </h1>
          <button onClick={() => setConfirmClear(true)} className="text-sm text-red-500 hover:underline font-medium">
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={`${item.productId}-${item.variantId}`} className="card p-4 dark:bg-gray-900 dark:border-gray-800 flex gap-4">
                <Link to={`/products/${item.productId}`} className="flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/products/${item.productId}`} className="font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors text-sm leading-tight">
                        {item.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">{item.variantLabel}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.productId, item.variantId)} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1">
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQty(item.productId, item.variantId, item.qty - 1)}
                        className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-white min-w-[2.5rem] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.variantId, item.qty + 1)}
                        disabled={item.qty >= item.stock}
                        className="px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-40"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                      {item.originalPrice > item.price && (
                        <p className="text-xs text-gray-400 line-through">₹{(item.originalPrice * item.qty).toLocaleString('en-IN')}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon */}
            <div className="card p-4 dark:bg-gray-900 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Tag size={16} className="text-green-600" /> Apply Coupon
              </h3>
              {coupon ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3">
                  <div>
                    <p className="font-mono font-bold text-green-700 dark:text-green-400">{coupon.code}</p>
                    <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">{coupon.description}</p>
                  </div>
                  <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                      className="input text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white font-mono uppercase"
                    />
                    <button onClick={applyCouponCode} className="btn-primary text-sm px-4 flex-shrink-0">Apply</button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {coupons.map(c => (
                      <button key={c.code} onClick={() => { setCouponInput(c.code); setCouponError(''); }}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors font-mono">
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 sticky top-20">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount ({coupon.code})</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery Charges</span>
                  {deliveryCharge === 0
                    ? <span className="text-green-600 font-medium">FREE</span>
                    : <span>₹{deliveryCharge}</span>
                  }
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (5% GST)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                {subtotal < FREE_DELIVERY_THRESHOLD && (
                  <p className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                    Add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more for free delivery!
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 mt-4 pt-4 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full mt-5 flex items-center justify-center gap-2 text-base py-3"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <Link to="/products" className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500 hover:text-green-600 transition-colors">
                <ShoppingBag size={14} /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClear}
        title="Clear Cart?"
        message="Are you sure you want to remove all items from your cart?"
        onConfirm={() => { clearCart(); setConfirmClear(false); }}
        onCancel={() => setConfirmClear(false)}
        confirmText="Yes, Clear"
        danger
      />
    </Layout>
  );
}
