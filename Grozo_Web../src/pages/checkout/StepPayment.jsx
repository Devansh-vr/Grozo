import { CreditCard, Smartphone, Banknote, Building2, Lock, ShoppingCart } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'UPI', label: 'UPI', icon: <Smartphone size={20} />, desc: 'Pay using Google Pay, PhonePe, Paytm' },
  { id: 'Card', label: 'Credit / Debit Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard, RuPay' },
  { id: 'NetBanking', label: 'Net Banking', icon: <Building2 size={20} />, desc: 'All major banks supported' },
  { id: 'COD', label: 'Cash on Delivery', icon: <Banknote size={20} />, desc: 'Pay when your order arrives' },
];

export default function StepPayment({ paymentMethod, onSelect, onPlace, onBack }) {
  return (
    <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <CreditCard size={20} className="text-green-600" /> Payment Method
      </h2>

      <div className="space-y-3 mb-6">
        {PAYMENT_METHODS.map(m => (
          <div
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4 ${
              paymentMethod === m.id
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
            }`}
          >
            <div className={`flex-shrink-0 ${paymentMethod === m.id ? 'text-green-600' : 'text-gray-500'}`}>
              {m.icon}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">{m.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.desc}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
              paymentMethod === m.id ? 'border-green-500 bg-green-500' : 'border-gray-300'
            }`}>
              {paymentMethod === m.id && (
                <svg viewBox="0 0 20 20" fill="none" className="w-full h-full p-0.5">
                  <path d="M5 10l4 4 6-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      {paymentMethod === 'UPI' && (
        <div className="mb-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-2">UPI ID</label>
          <input type="text" placeholder="yourname@upi" className="input text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" defaultValue="user@okicici" />
        </div>
      )}
      {paymentMethod === 'Card' && (
        <div className="mb-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" className="input text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" defaultValue="4111 1111 1111 1111" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">Expiry</label>
              <input type="text" placeholder="MM/YY" className="input text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" defaultValue="12/28" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 block mb-1">CVV</label>
              <input type="password" placeholder="..." className="input text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" defaultValue="123" />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">Back</button>
        <button onClick={onPlace} className="flex-1 btn-primary py-3 text-base font-bold flex items-center justify-center gap-2">
          <ShoppingCart size={16} /> Place Order
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
        <Lock size={11} /> Your payment is 100% secure and encrypted
      </div>
    </div>
  );
}
