import { Check, Truck, Zap, Calendar, Gift } from 'lucide-react';
import { deliveryOptions } from '../../data/products';
import { useCart } from '../../context/CartContext';

const DELIVERY_ICONS = {
  express: Zap,
  standard: Truck,
  scheduled: Calendar,
  free: Gift,
};

export default function StepDelivery({ selectedDelivery, onSelect, onNext, onBack }) {
  const { subtotal } = useCart();

  return (
    <div className="card p-5 dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <Truck size={20} className="text-green-600" /> Delivery Method
      </h2>

      <div className="space-y-3 mb-6">
        {deliveryOptions.map(option => {
          const eligible = !option.minOrder || subtotal >= option.minOrder;
          const selected = selectedDelivery?.id === option.id;
          const Icon = DELIVERY_ICONS[option.id] || Truck;
          return (
            <div
              key={option.id}
              onClick={() => eligible && onSelect(option)}
              className={`border-2 rounded-2xl p-4 transition-all ${
                !eligible ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700' :
                selected ? 'border-green-500 bg-green-50 dark:bg-green-900/20 cursor-pointer' :
                'border-gray-200 dark:border-gray-700 hover:border-green-300 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                  }`}>
                    {selected && <Check size={11} className="text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={selected ? 'text-green-600' : 'text-gray-500'} />
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">{option.label}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{option.time}</p>
                    {option.minOrder && !eligible && (
                      <p className="text-xs text-orange-600 mt-0.5">Requires order above Rs.{option.minOrder}</p>
                    )}
                  </div>
                </div>
                <span className={`font-bold text-sm ${option.price === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                  {option.price === 0 ? 'FREE' : `Rs.${option.price}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700">Back</button>
        <button onClick={onNext} disabled={!selectedDelivery} className="flex-1 btn-primary py-3 disabled:opacity-50">
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
