import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, LayoutGrid, List } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import Layout from '../components/layout/Layout';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'discount', label: 'Best Discount' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (searchQuery) result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    result = result.filter(p => p.variants[0].price >= priceRange[0] && p.variants[0].price <= priceRange[1]);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    if (onlyInStock) result = result.filter(p => p.variants[0].stock > 0);

    switch (sort) {
      case 'price-asc': return result.sort((a, b) => a.variants[0].price - b.variants[0].price);
      case 'price-desc': return result.sort((a, b) => b.variants[0].price - a.variants[0].price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'discount': return result.sort((a, b) => b.discount - a.discount);
      case 'newest': return result.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
      default: return result;
    }
  }, [selectedCategory, searchQuery, priceRange, minRating, onlyInStock, sort]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setPriceRange([0, 2000]);
    setMinRating(0);
    setOnlyInStock(false);
    setSort('newest');
    setSearchParams({});
  };

  const hasFilters = selectedCategory || searchQuery || priceRange[1] < 2000 || minRating > 0 || onlyInStock;

  const Sidebar = () => (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
        {hasFilters && (
          <button onClick={resetFilters} className="text-xs text-red-500 hover:underline font-medium">
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input pl-8 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Category</label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${selectedCategory === cat.id ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
          Price Range: ₹{priceRange[0]} — ₹{priceRange[1]}
        </label>
        <input
          type="range" min="0" max="2000" step="50"
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>₹0</span><span>₹2000</span></div>
      </div>

      {/* Min rating */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Minimum Rating</label>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 3.5, 4, 4.5].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${minRating === r ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50'}`}
            >
              {r === 0 ? 'All' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={e => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 accent-green-600"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="page-container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || 'Products' : searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
            </h1>
            <p className="text-sm text-gray-500">{filtered.length} products found</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="input text-sm pr-8 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* View mode */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}>
                <LayoutGrid size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''}`}>
                <List size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="lg:hidden flex items-center gap-2 btn-outline text-sm py-2"
            >
              <SlidersHorizontal size={14} /> Filters
              {hasFilters && <span className="w-2 h-2 bg-red-500 rounded-full" />}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card p-5 sticky top-20 dark:bg-gray-900 dark:border-gray-800">
              <Sidebar />
            </div>
          </aside>

          {/* Mobile Sidebar Drawer */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="relative bg-white dark:bg-gray-900 w-80 max-w-full h-full overflow-y-auto p-5 shadow-xl animate-slide-in">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg dark:text-white">Filters</span>
                  <button onClick={() => setSidebarOpen(false)}><X size={20} className="text-gray-500" /></button>
                </div>
                <Sidebar />
                <button onClick={() => setSidebarOpen(false)} className="btn-primary w-full mt-6">
                  Show {filtered.length} Results
                </button>
              </div>
            </div>
          )}

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {/* Active filters chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory && (
                  <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('')}><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    {minRating}★+
                    <button onClick={() => setMinRating(0)}><X size={12} /></button>
                  </span>
                )}
                {onlyInStock && (
                  <span className="flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    In Stock
                    <button onClick={() => setOnlyInStock(false)}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {loading ? (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                {Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={36} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search term</p>
                <button onClick={resetFilters} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
