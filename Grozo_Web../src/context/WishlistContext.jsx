import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('grozo_wishlist') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('grozo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const isIn = wishlist.some(p => p.id === product.id);
    if (isIn) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      setWishlist(prev => [...prev, product]);
      toast.success('Added to wishlist!', { icon: '❤️' });
    }
  };

  const isWishlisted = (id) => wishlist.some(p => p.id === id);
  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
