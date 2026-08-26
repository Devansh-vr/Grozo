import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock, Star, Zap, Leaf, Tag } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import Layout from '../components/layout/Layout';

const HERO_SLIDES = [
  {
    title: 'Fresh Groceries,\nDelivered Fast',
    subtitle: 'Order before 10 AM for same-day delivery. Farm-fresh produce, top brands — all in one place.',
    cta: 'Shop Now',
    badge: '2-Hour Delivery',
    badgeIcon: <Zap size={13} />,
    bg: 'from-green-700 to-green-500',
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
  },
  {
    title: 'Organic & Fresh\nEvery Day',
    subtitle: 'Handpicked organic fruits & vegetables straight from certified farms to your kitchen.',
    cta: 'Explore Organic',
    badge: '100% Organic',
    badgeIcon: <Leaf size={13} />,
    bg: 'from-emerald-700 to-teal-500',
    img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800',
  },
  {
    title: 'Big Savings on\nDaily Essentials',
    subtitle: 'Up to 30% off on your favourite brands. New offers every day — never miss a deal!',
    cta: 'View Deals',
    badge: 'Up to 30% OFF',
    badgeIcon: <Tag size={13} />,
    bg: 'from-orange-600 to-amber-500',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
  },
];

const OFFERS = [
  { title: 'Fresh Fruits & Veggies', subtitle: 'Up to 25% off', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400', category: 'fruits-vegetables', color: 'from-green-400/80' },
  { title: 'Dairy Deals', subtitle: 'Save big on milk & more', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', category: 'dairy', color: 'from-blue-400/80' },
  { title: 'Snack Attack', subtitle: 'Buy 2 get 1 free', img: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400', category: 'snacks', color: 'from-yellow-400/80' },
];

export default function Home() {
  const navigate = useNavigate();
  const [heroIdx, setHeroIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const featured = products.filter(p => p.isFeatured).slice(0, 8);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setHeroIdx(i => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[heroIdx];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className={`relative bg-gradient-to-r ${slide.bg} text-white overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <img src={slide.img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative page-container py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              {slide.badgeIcon} {slide.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-white/85 text-lg mb-8 max-w-lg">{slide.subtitle}</p>

            <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              />
              <button type="submit" className="bg-white text-green-700 font-bold px-5 py-3 rounded-xl shadow-lg hover:bg-green-50 transition-colors text-sm">
                Search
              </button>
            </form>
            <p className="text-white/60 text-xs mt-3">Popular: Mango, Milk, Bread, Chips, Detergent</p>
          </div>

          <div className="flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
              <img src={slide.img} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)}
              className={`h-2 rounded-full transition-all ${i === heroIdx ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="page-container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck size={18} />, title: 'Free Delivery', sub: 'On orders above Rs.599', color: 'text-green-600' },
              { icon: <Clock size={18} />, title: '2-Hour Delivery', sub: 'Express slots available', color: 'text-blue-600' },
              { icon: <ShieldCheck size={18} />, title: '100% Fresh', sub: 'Quality guaranteed', color: 'text-orange-600' },
              { icon: <Star size={18} className="fill-amber-400" />, title: '4.8 Rated', sub: '50,000+ happy customers', color: 'text-amber-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className={`${item.color} flex-shrink-0`}>{item.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="page-container py-10 space-y-14">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title dark:text-white">Shop by Category</h2>
            <Link to="/products" className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 group"
              >
                <div className="relative h-24">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  <p className="absolute inset-0 flex items-end justify-center pb-2 text-white text-xs font-bold text-center px-1 leading-tight drop-shadow">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Special offers */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title dark:text-white">Special Offers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {OFFERS.map((offer, i) => (
              <Link key={i} to={`/products?category=${offer.category}`}
                className="relative rounded-2xl overflow-hidden h-40 group shadow-sm hover:shadow-lg transition-shadow"
              >
                <img src={offer.img} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} to-transparent flex flex-col justify-end p-4`}>
                  <p className="text-white font-bold text-lg drop-shadow">{offer.title}</p>
                  <p className="text-white/90 text-sm font-medium">{offer.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title dark:text-white">Featured Products</h2>
              <p className="text-gray-500 text-sm mt-1">Our best-selling, highest rated picks</p>
            </div>
            <Link to="/products" className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featured.map(p => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </section>

        {/* All Products preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title dark:text-white">All Products</h2>
            <Link to="/products" className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.filter(p => !p.isFeatured).slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)
            }
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="btn-outline inline-flex items-center gap-2">
              Browse All Products <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Promo banner */}
        <section className="bg-gradient-to-r from-green-700 to-green-500 rounded-3xl overflow-hidden text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-0">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-black mb-3">Get Rs.100 Off Your First Order!</h2>
              <p className="text-white/85 mb-6 max-w-md">
                Use code <span className="bg-white/20 px-2 py-0.5 rounded-lg font-mono font-bold">NEWUSER</span> at checkout. Valid on orders above Rs.500.
              </p>
              <Link to="/products" className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors inline-flex items-center gap-2">
                Start Shopping <ArrowRight size={16} />
              </Link>
            </div>
            <div className="w-full md:w-72 h-48 md:h-full flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400"
                alt="Fresh groceries"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
