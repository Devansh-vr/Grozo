import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Package, Search, Inbox } from 'lucide-react';

const ICON_MAP = {
  cart: ShoppingCart,
  wishlist: Heart,
  orders: Package,
  search: Search,
};

const IMAGES = {
  cart: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300',
  wishlist: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300',
  orders: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?w=300',
  search: 'https://images.unsplash.com/photo-1553079071-9c6c9001aadf?w=300',
};

export default function EmptyState({ type = 'search', title, description, actionLabel, actionTo, onAction }) {
  const Icon = ICON_MAP[type] || Inbox;
  const img = IMAGES[type];

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      {img ? (
        <div className="w-40 h-40 rounded-3xl overflow-hidden mb-6 shadow-md">
          <img src={img} alt={title} className="w-full h-full object-cover opacity-60" />
        </div>
      ) : (
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Icon size={36} className="text-gray-400" />
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary">{actionLabel}</Link>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-primary">{actionLabel}</button>
      )}
    </div>
  );
}
