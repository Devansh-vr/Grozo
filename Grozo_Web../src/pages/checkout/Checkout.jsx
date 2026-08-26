import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrdersContext';
import { useAddress } from '../../context/AddressContext';
import { deliveryOptions, coupons } from '../../data/products';
import Layout from '../../components/layout/Layout';
import StepAddress from './StepAddress';
import StepDelivery from './StepDelivery';
import StepPayment from './StepPayment';
import OrderConfirmation from './OrderConfirmation';
import { CheckCircle2 } from 'lucide-react';

const TAX_RATE = 0.05;
const STEPS = ['Address', 'Delivery', 'Payment', 'Confirmation'];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, coupon, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { defaultAddress } = useAddress();
  const [step, setStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[1]);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [placedOrder, setPlacedOrder] = useState(null);

  if (items.length === 0 && !placedOrder) {
    navigate('/cart');
    return null;
  }

  const discount = coupon
    ? coupon.type === 'percentage' ? Math.round(subtotal * coupon.discount / 100) : coupon.discount
    : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const deliveryCharge = subtotal >= 599 && selectedDelivery?.id === 'free' ? 0 : (selectedDelivery?.price || 29);
  const total = subtotal - discount + deliveryCharge + tax;

  const handlePlaceOrder = () => {
    const order = placeOrder({
      items: items.map(i => ({
        productId: i.productId,
        name: i.name,
        variant: i.variantLabel,
        price: i.price,
        qty: i.qty,
        image: i.image,
      })),
      subtotal, discount, delivery: deliveryCharge, tax, total,
      address: selectedAddress,
      deliveryMethod: selectedDelivery?.label,
      paymentMethod,
    });
    clearCart();
    setPlacedOrder(order);
    setStep(3);
  };

  return (
    <Layout noFooter>
      <div className="page-container py-8 max-w-4xl">
        {/* Stepper */}
        {step < 3 && (
          <div className="flex items-center justify-center mb-8">
            {STEPS.slice(0, 3).map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`flex items-center gap-2 ${i <= step ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    i < step ? 'bg-green-600 border-green-600 text-white' :
                    i === step ? 'border-green-600 text-green-600' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    {i < step ? <CheckCircle2 size={16} /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-green-600' : ''}`}>{s}</span>
                </div>
                {i < 2 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${i < step ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Order summary sidebar + step */}
        <div className={`grid gap-8 ${step < 3 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          <div className="lg:col-span-2">
            {step === 0 && (
              <StepAddress
                selectedAddress={selectedAddress}
                onSelect={setSelectedAddress}
                onNext={() => setStep(1)}
              />
            )}
            {step === 1 && (
              <StepDelivery
                selectedDelivery={selectedDelivery}
                onSelect={setSelectedDelivery}
                onNext={() => setStep(2)}
                onBack={() => setStep(0)}
              />
            )}
            {step === 2 && (
              <StepPayment
                paymentMethod={paymentMethod}
                onSelect={setPaymentMethod}
                onPlace={handlePlaceOrder}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && placedOrder && (
              <OrderConfirmation order={placedOrder} />
            )}
          </div>

          {step < 3 && (
            <div>
              <div className="card p-5 dark:bg-gray-900 dark:border-gray-800 sticky top-20">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex items-center gap-3 text-sm">
                      <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-xs truncate">{item.name}</p>
                        <p className="text-gray-400 text-xs">{item.variantLabel} × {item.qty}</p>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white text-xs flex-shrink-0">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-gray-100 dark:border-gray-800 my-3" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>}
                  <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Delivery</span><span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax (5%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
