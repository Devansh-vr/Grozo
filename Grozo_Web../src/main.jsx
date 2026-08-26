import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrdersProvider } from './context/OrdersContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ThemeProvider } from './context/ThemeContext';
import { AddressProvider } from './context/AddressContext';
import { SellerProvider } from './context/SellerContext';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <ThemeProvider>
          <RecentlyViewedProvider>
            <AddressProvider>
              <OrdersProvider>
                <WishlistProvider>
                  <CartProvider>
                    <SellerProvider>
                      <App />
                      <Toaster
                        position="top-right"
                        toastOptions={{
                          style: { borderRadius: '12px', background: '#fff', color: '#111', fontSize: '14px', fontWeight: '500', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
                          success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
                          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
                          duration: 2500,
                        }}
                      />
                    </SellerProvider>
                  </CartProvider>
                </WishlistProvider>
              </OrdersProvider>
            </AddressProvider>
          </RecentlyViewedProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
