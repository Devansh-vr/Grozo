import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const defaultVariant = product.variants[0];
  const wishlisted = isWishlisted(product.id);
  const inStock = defaultVariant.stock > 0;

  return (
    <div className="card group hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">NEW</span>
          )}
          {!inStock && (
            <span className="bg-gray-700 text-white text-xs font-bold px-2 py-0.5 rounded-lg">OUT OF STOCK</span>
          )}
        </div>

        {/* Wishlist btn */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-all duration-200 ${
            wishlisted ? 'bg-red-500 text-white scale-110' : 'bg-white dark:bg-gray-700 text-gray-400 hover:text-red-500'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <Link to={`/products/${product.id}`}>
          <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1 capitalize">
            {product.category.replace('-', ' ')}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight mb-1 line-clamp-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-gray-900 dark:text-white">₹{defaultVariant.price}</span>
          {defaultVariant.originalPrice > defaultVariant.price && (
            <span className="text-xs text-gray-400 line-through">₹{defaultVariant.originalPrice}</span>
          )}
        </div>

        <div className="mt-auto flex gap-2">
          {inStock ? (
            <button
              onClick={() => addToCart(product, defaultVariant)}
              className="flex-1 btn-primary text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <ShoppingCart size={13} />
              Add to Cart
            </button>
          ) : (
            <button disabled className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-400 text-xs py-2 rounded-xl font-semibold cursor-not-allowed">
              Out of Stock
            </button>
          )}
        </div>

        {inStock && defaultVariant.stock < 10 && (
          <p className="text-xs text-orange-600 mt-1.5 font-medium">Only {defaultVariant.stock} left!</p>
        )}
      </div>
    </div>
  );
}
