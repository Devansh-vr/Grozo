import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, Share2, RefreshCw, Truck, Shield, Search } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductCard from '../components/product/ProductCard';
import Layout from '../components/layout/Layout';
import StarRating from '../components/ui/StarRating';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addViewed, viewed } = useRecentlyViewed();

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
      addViewed(product);
      setSelectedVariant(product.variants[0]);
      setImgIdx(0);
      setQty(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="page-container py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={36} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">Back to Products</button>
        </div>
      </Layout>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recentlyViewedFiltered = viewed.filter(p => p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);
  const inStock = selectedVariant.stock > 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product, selectedVariant);
  };

  const avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / (product.reviews.length || 1);

  return (
    <Layout>
      <div className="page-container py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-green-600 transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-green-600 transition-colors capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Images */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 mb-3 aspect-square">
              <img
                src={product.images[imgIdx]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              {product.discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-xl">
                  -{product.discount}%
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === imgIdx ? 'border-green-500 shadow-md' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium capitalize mb-1">
                  {product.category.replace('-', ' ')}
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{product.name}</h1>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-xl border-2 transition-all ${wishlisted ? 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-500' : 'border-gray-200 dark:border-gray-700 hover:border-red-300 text-gray-400 hover:text-red-500'}`}
                >
                  <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={avgRating} size="md" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{avgRating.toFixed(1)}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <span className="text-3xl font-black text-gray-900 dark:text-white">₹{selectedVariant.price}</span>
              {selectedVariant.originalPrice > selectedVariant.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{selectedVariant.originalPrice}</span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-1 rounded-lg">
                    Save ₹{selectedVariant.originalPrice - selectedVariant.price}
                  </span>
                </>
              )}
            </div>

            {/* Variants */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Size / Quantity</p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={v.stock === 0}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                      selectedVariant.id === v.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : v.stock === 0
                        ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-400'
                    }`}
                  >
                    {v.label}
                    {v.stock === 0 && <span className="block text-xs text-gray-400">Out of stock</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock indicator */}
            {inStock ? (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                {selectedVariant.stock < 10 ? `Only ${selectedVariant.stock} left in stock!` : 'In Stock'}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-red-500 mb-4">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Out of Stock
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-lg text-gray-700 dark:text-gray-300 transition-colors">−</button>
                <span className="px-4 py-2.5 font-semibold text-gray-900 dark:text-white min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(selectedVariant.stock, q + 1))} className="px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold text-lg text-gray-700 dark:text-gray-300 transition-colors">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Delivery info */}
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-sm">
              {[
                { icon: <Truck size={15} className="text-green-600" />, text: 'Free delivery on orders above ₹599' },
                { icon: <RefreshCw size={15} className="text-blue-600" />, text: '7-day easy returns & exchanges' },
                { icon: <Shield size={15} className="text-orange-600" />, text: '100% genuine products guaranteed' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description / Reviews */}
        <div className="card dark:bg-gray-900 dark:border-gray-800 mb-12">
          <div className="flex border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
            {['description', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviews.length})` : tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {/* Summary */}
                <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <div className="text-center">
                    <div className="text-4xl font-black text-gray-900 dark:text-white">{avgRating.toFixed(1)}</div>
                    <StarRating rating={avgRating} size="md" />
                    <div className="text-sm text-gray-500 mt-1">{product.reviews.length} reviews</div>
                  </div>
                  <div className="flex-1">
                    {[5,4,3,2,1].map(star => {
                      const count = product.reviews.filter(r => r.rating === star).length;
                      const pct = product.reviews.length ? (count / product.reviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-sm mb-1">
                          <span className="text-xs text-gray-500 w-3">{star}</span>
                          <Star size={11} className="text-amber-400 fill-amber-400" />
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-4">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviews list */}
                <div className="space-y-4">
                  {product.reviews.map(review => (
                    <div key={review.id} className="border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {review.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-gray-900 dark:text-white">{review.user}</p>
                            <p className="text-xs text-gray-400">{review.date}</p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mb-12">
            <h2 className="section-title dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* Recently viewed */}
        {recentlyViewedFiltered.length > 0 && (
          <section>
            <h2 className="section-title dark:text-white mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recentlyViewedFiltered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
