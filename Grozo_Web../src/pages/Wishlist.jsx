import { useWishlist } from '../context/WishlistContext';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import EmptyState from '../components/ui/EmptyState';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist();
  const [confirmClear, setConfirmClear] = useState(false);

  if (wishlist.length === 0) {
    return (
      <Layout>
        <EmptyState type="wishlist" title="Your wishlist is empty" description="Save your favourite items to the wishlist and shop them later!" actionLabel="Explore Products" actionTo="/products" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Wishlist <span className="text-gray-400 font-normal text-lg">({wishlist.length})</span>
          </h1>
          <button onClick={() => setConfirmClear(true)} className="flex items-center gap-2 text-sm text-red-500 hover:underline font-medium">
            <Trash2 size={14} /> Clear Wishlist
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
      <ConfirmDialog
        open={confirmClear}
        title="Clear Wishlist?"
        message="Remove all items from your wishlist?"
        onConfirm={() => { clearWishlist(); setConfirmClear(false); }}
        onCancel={() => setConfirmClear(false)}
        confirmText="Clear"
        danger
      />
    </Layout>
  );
}
