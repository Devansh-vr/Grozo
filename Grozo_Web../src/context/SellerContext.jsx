import { createContext, useContext, useState, useEffect } from 'react';

const SellerContext = createContext(null);

const DUMMY_APPLICATIONS = [
  {
    id: 'app_001',
    userId: 'user_demo1',
    ownerName: 'Rajesh Kumar',
    email: 'rajesh@freshmart.com',
    phone: '9876501234',
    shopName: 'Fresh Mart',
    category: 'fruits-vegetables',
    address: '42, Gandhi Nagar, Jaipur, Rajasthan - 302001',
    gst: '08ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    bankAccount: '1234567890',
    ifsc: 'SBIN0001234',
    description: 'We supply fresh organic fruits and vegetables directly from farms in Rajasthan.',
    appliedDate: '2026-08-10',
    status: 'pending',
  },
  {
    id: 'app_002',
    userId: 'user_demo2',
    ownerName: 'Meena Patel',
    email: 'meena@dairydelight.com',
    phone: '9765012345',
    shopName: 'Dairy Delight',
    category: 'dairy',
    address: '15, Anand Nagar, Anand, Gujarat - 388001',
    gst: '24FGHIJ5678K2Z6',
    pan: 'FGHIJ5678K',
    bankAccount: '9876543210',
    ifsc: 'HDFC0002345',
    description: 'Premium dairy products including milk, paneer, ghee and yogurt from our own farm.',
    appliedDate: '2026-08-12',
    status: 'approved',
  },
  {
    id: 'app_003',
    userId: 'user_demo3',
    ownerName: 'Suresh Bakshi',
    email: 'suresh@bakehouse.com',
    phone: '9654023456',
    shopName: 'The Bake House',
    category: 'bakery',
    address: '8, Brigade Road, Bengaluru, Karnataka - 560001',
    gst: '29KLMNO9012P3Z7',
    pan: 'KLMNO9012P',
    bankAccount: '1122334455',
    ifsc: 'ICIC0003456',
    description: 'Artisan breads, fresh croissants, cakes and pastries baked fresh every morning.',
    appliedDate: '2026-08-14',
    status: 'rejected',
  },
];

const DUMMY_SELLER_PRODUCTS = [
  { id: 's1', name: 'Farm Fresh Tomatoes', category: 'fruits-vegetables', price: 40, stock: 120, sales: 340, revenue: 13600, status: 'active', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200' },
  { id: 's2', name: 'Organic Carrots', category: 'fruits-vegetables', price: 55, stock: 80, sales: 210, revenue: 11550, status: 'active', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200' },
  { id: 's3', name: 'Green Capsicum', category: 'fruits-vegetables', price: 35, stock: 0, sales: 190, revenue: 6650, status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200' },
  { id: 's4', name: 'Fresh Spinach', category: 'fruits-vegetables', price: 30, stock: 60, sales: 415, revenue: 12450, status: 'active', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200' },
];

const DUMMY_SELLER_ORDERS = [
  { id: 'SORD-1021', customer: 'Aarav Shah', date: '2026-08-18', items: 2, total: 95, status: 'delivered' },
  { id: 'SORD-1020', customer: 'Priya Nair', date: '2026-08-17', items: 1, total: 55, status: 'out' },
  { id: 'SORD-1019', customer: 'Rohit Verma', date: '2026-08-16', items: 3, total: 125, status: 'preparing' },
  { id: 'SORD-1018', customer: 'Sneha Patil', date: '2026-08-15', items: 1, total: 40, status: 'delivered' },
  { id: 'SORD-1017', customer: 'Kiran Joshi', date: '2026-08-14', items: 2, total: 85, status: 'delivered' },
  { id: 'SORD-1016', customer: 'Meera Iyer', date: '2026-08-13', items: 1, total: 30, status: 'cancelled' },
];

export function SellerProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('grozo_seller_apps');
    return saved ? JSON.parse(saved) : DUMMY_APPLICATIONS;
  });

  const [currentSellerApp, setCurrentSellerApp] = useState(() => {
    const saved = localStorage.getItem('grozo_my_seller_app');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('grozo_seller_apps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    if (currentSellerApp) {
      localStorage.setItem('grozo_my_seller_app', JSON.stringify(currentSellerApp));
    }
  }, [currentSellerApp]);

  const submitApplication = (data) => {
    const app = {
      ...data,
      id: `app_${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setApplications(prev => [app, ...prev]);
    setCurrentSellerApp(app);
    return app;
  };

  const updateApplicationStatus = (id, status) => {
    setApplications(prev =>
      prev.map(a => a.id === id ? { ...a, status } : a)
    );
    if (currentSellerApp?.id === id) {
      setCurrentSellerApp(prev => ({ ...prev, status }));
    }
  };

  const deleteApplication = (id) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  const isApprovedSeller = currentSellerApp?.status === 'approved';

  return (
    <SellerContext.Provider value={{
      applications,
      currentSellerApp,
      submitApplication,
      updateApplicationStatus,
      deleteApplication,
      isApprovedSeller,
      sellerProducts: DUMMY_SELLER_PRODUCTS,
      sellerOrders: DUMMY_SELLER_ORDERS,
    }}>
      {children}
    </SellerContext.Provider>
  );
}

export const useSeller = () => useContext(SellerContext);
