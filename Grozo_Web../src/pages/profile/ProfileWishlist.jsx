import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/product/ProductCard';
import EmptyState from '../../components/ui/EmptyState';

export default function ProfileWishlist() {
  const { wishlist } = useWishlist();
  if (wishlist.length === 0) return <EmptyState type="wishlist" title="Wishlist is empty" description="Items you save will show here." actionLabel="Browse Products" actionTo="/products" />;

  return (
    <div className="card p-6 dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">My Wishlist ({wishlist.length})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
