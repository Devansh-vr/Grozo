import { createContext, useContext, useState, useEffect } from 'react';

const AddressContext = createContext(null);

const defaultAddresses = [
  { id: 'addr1', name: 'Aarav Shah', phone: '9876543210', line1: '12, Rose Apartments', line2: 'MG Road', city: 'Bengaluru', state: 'Karnataka', pin: '560001', type: 'Home', isDefault: true },
  { id: 'addr2', name: 'Aarav Shah', phone: '9876543210', line1: 'Tech Park, Block B', line2: 'Whitefield', city: 'Bengaluru', state: 'Karnataka', pin: '560066', type: 'Work', isDefault: false },
];

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('grozo_addresses');
    return saved ? JSON.parse(saved) : defaultAddresses;
  });

  useEffect(() => {
    localStorage.setItem('grozo_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (addr) => {
    const newAddr = { ...addr, id: `addr_${Date.now()}`, isDefault: addresses.length === 0 };
    setAddresses(prev => [...prev, newAddr]);
  };

  const updateAddress = (id, data) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress, setDefault, defaultAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);
