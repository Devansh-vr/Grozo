import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">G</span>
            </div>
            <span className="font-black text-2xl text-green-700 dark:text-green-400">grozo</span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Fresh groceries, delivered fast</p>
        </div>
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          afterSignInUrl="/"
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-xl rounded-2xl border border-gray-100 dark:border-gray-800',
              headerTitle: 'text-2xl font-bold',
              formButtonPrimary: 'bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl',
              footerActionLink: 'text-green-600 hover:text-green-700 font-semibold',
            },
          }}
        />
      </div>
    </div>
  );
}
