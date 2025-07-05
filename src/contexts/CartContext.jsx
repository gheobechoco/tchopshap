// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (plat) => {
    setCartItems((prev) => {
      // on parse le prix en float et on initialise quantity à 1
      const item = { ...plat, prix: parseFloat(plat.prix), quantity: 1 };
      const exists = prev.find((p) => p.id_plat === item.id_plat);

      if (exists) {
        return prev.map((p) =>
          p.id_plat === item.id_plat
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const updateQuantity = (id_plat, quantity) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id_plat === id_plat ? { ...p, quantity } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (id_plat) => {
    setCartItems((prev) => prev.filter((p) => p.id_plat !== id_plat));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
