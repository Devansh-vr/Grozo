import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, CheckCircle, Store } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 mt-16">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">G</span>
              </div>
              <span className="font-black text-xl text-white tracking-tight">grozo</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Fresh groceries delivered to your door in 2 hours. Quality you can taste, prices you'll love.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['/', 'Home'],
                ['/products', 'All Products'],
                ['/cart', 'Cart'],
                ['/orders', 'Orders'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-green-400 transition-colors">{label}</Link>
                </li>
              ))}
              {/* Sell on Grozo link */}
              <li className="pt-1 border-t border-gray-800 mt-2">
                <Link to="/become-a-seller" className="hover:text-green-400 transition-colors flex items-center gap-1.5">
                  <Store size={12} className="text-green-500" /> Sell on Grozo
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['fruits-vegetables', 'Fruits & Veggies'],
                ['dairy', 'Dairy'],
                ['snacks', 'Snacks'],
                ['beverages', 'Beverages'],
                ['bakery', 'Bakery'],
                ['personal-care', 'Personal Care'],
                ['household', 'Household'],
              ].map(([id, label]) => (
                <li key={id}>
                  <Link to={`/products?category=${id}`} className="hover:text-green-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-green-500" />
                <span>123, Green Street, Bengaluru</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0 text-green-500" />
                <span>1800-GROZO-01</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0 text-green-500" />
                <span>support@grozo.com</span>
              </li>
              <li className="mt-2">
                <span className="inline-flex items-center gap-1.5 badge-green text-xs">
                  <CheckCircle size={11} /> 24/7 Support
                </span>
              </li>
            </ul>

            {/* Seller CTA */}
            <div className="mt-5 p-3 bg-gray-800 rounded-xl">
              <p className="text-white text-xs font-semibold mb-1">Want to sell on Grozo?</p>
              <p className="text-xs text-gray-400 mb-2">Register your shop and reach thousands of customers.</p>
              <Link to="/become-a-seller"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors">
                <Store size={11} /> Register Your Shop
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Grozo. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-green-400 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
