import { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext(null);

export function RecentlyViewedProvider({ children }) {
  const [viewed, setViewed] = useState(() => {
    return JSON.parse(localStorage.getItem('grozo_viewed') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('grozo_viewed', JSON.stringify(viewed));
  }, [viewed]);

  const addViewed = (product) => {
    setViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ viewed, addViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
