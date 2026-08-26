import { Link } from 'react-router-dom';
import { Home, ArrowLeft, PackageX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <PackageX size={56} className="text-green-400" />
        </div>
        <div className="text-8xl font-black text-green-200 dark:text-green-900 mb-2 leading-none">404</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like this page got out of stock. Let's get you back to fresh picks.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => window.history.back()} className="btn-outline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
