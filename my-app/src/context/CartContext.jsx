import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [vaultItems, setVaultItems] = useState(() => {
    try {
      const savedAllocations = localStorage.getItem('2mVault');
      return savedAllocations ? JSON.parse(savedAllocations) : [];
    } catch (error) {
      console.error("Failed to parse vault from local storage", error);
      return [];
    }
  });

  // State for activated (purchased) protocols
  const [activeProtocols, setActiveProtocols] = useState(() => {
    try {
      const savedActive = localStorage.getItem('2mActiveProtocols');
      return savedActive ? JSON.parse(savedActive) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('2mVault', JSON.stringify(vaultItems));
  }, [vaultItems]);

  useEffect(() => {
    localStorage.setItem('2mActiveProtocols', JSON.stringify(activeProtocols));
  }, [activeProtocols]);

  const addAllocation = (item) => {
    setVaultItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; 
    setVaultItems((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeAllocation = (id) => {
    setVaultItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearVault = () => {
    setVaultItems([]);
    localStorage.removeItem('2mVault');
  };

  // Move items from vault to active dashboard upon successful payment
  const activateVault = () => {
    const newActiveProtocols = vaultItems.map(item => ({
      ...item,
      activationDate: new Date().toISOString(),
      // Calculate renewal date (e.g., 30 days from now)
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }));
    
    setActiveProtocols(prev => [...prev, ...newActiveProtocols]);
    clearVault();
  };

  return (
    <CartContext.Provider value={{ 
      vaultItems, 
      activeProtocols,
      addAllocation, 
      updateQuantity, 
      removeAllocation, 
      clearVault,
      activateVault
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);