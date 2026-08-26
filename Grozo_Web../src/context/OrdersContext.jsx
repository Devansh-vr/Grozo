import { createContext, useContext, useState, useEffect } from 'react';
import { sampleOrders } from '../data/products';

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('grozo_orders');
    return saved ? JSON.parse(saved) : sampleOrders;
  });

  useEffect(() => {
    localStorage.setItem('grozo_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'placed',
      ...orderData,
      timeline: [
        { status: 'placed', label: 'Order Placed', time: new Date().toLocaleString('en-IN', { hour12: true }), done: true },
        { status: 'confirmed', label: 'Confirmed', time: '', done: false },
        { status: 'preparing', label: 'Preparing', time: '', done: false },
        { status: 'out', label: 'Out for Delivery', time: '', done: false },
        { status: 'delivered', label: 'Delivered', time: '', done: false },
      ],
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o)
    );
  };

  const getOrder = (id) => orders.find(o => o.id === id);

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, cancelOrder, getOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
