"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';

// Product interface
interface Product {
  id: string;
  sku: string;
  name: string;
  size: string;
  weight: number;
  retailPrice: number;
  wholesalePrice: number;
  image: string;
  servings: number;
}

// Cart item interface
interface CartItem {
  product: Product;
  quantity: number;
  isWholesale: boolean;
}

// Cart state interface
interface CartState {
  items: CartItem[];
}

// Context value interface
interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
  removeFromCart: (productId: string, isWholesale: boolean) => void;
  updateQuantity: (productId: string, quantity: number, isWholesale: boolean) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  getCartSavings: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// Local storage key
const CART_STORAGE_KEY = 'macronica_cart';

// Utility functions for localStorage
const saveCartToStorage = (cart: CartState) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
    toast.error('Failed to save cart data');
  }
};

const loadCartFromStorage = (): CartState => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate the stored data structure
      if (parsed && Array.isArray(parsed.items)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    toast.error('Failed to load cart data');
  }
  return { items: [] };
};

// Calculate item price with discounts
const calculateItemPrice = (item: CartItem): number => {
  const basePrice = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
  
  // Apply 5% discount for retail orders with 5+ items of the same product
  if (!item.isWholesale && item.quantity >= 5) {
    return basePrice * 0.95;
  }
  
  return basePrice;
};

// Calculate savings for an item (difference between retail and wholesale/discounted price)
const calculateItemSavings = (item: CartItem): number => {
  const retailPrice = item.product.retailPrice;
  const actualPrice = calculateItemPrice(item);
  
  if (item.isWholesale) {
    return (retailPrice - actualPrice) * item.quantity;
  }
  
  // For retail orders with 5+ items, calculate 5% discount savings
  if (item.quantity >= 5) {
    return (retailPrice - actualPrice) * item.quantity;
  }
  
  return 0;
};

// Cart Provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartState>({ items: [] });
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = loadCartFromStorage();
    setCart(storedCart);
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(cart);
    }
  }, [cart, isInitialized]);

  // Add item to cart
  const addToCart = (product: Product, quantity: number, isWholesale: boolean) => {
    try {
      if (quantity <= 0) {
        toast.error('Quantity must be greater than 0');
        return;
      }

      setCart(prevCart => {
        const existingItemIndex = prevCart.items.findIndex(
          item => item.product.id === product.id && item.isWholesale === isWholesale
        );

        let newItems;
        
        if (existingItemIndex >= 0) {
          // Update existing item
          newItems = [...prevCart.items];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity
          };
          
          toast.success(`Updated ${product.name} quantity in cart`);
        } else {
          // Add new item
          const newItem: CartItem = {
            product,
            quantity,
            isWholesale
          };
          newItems = [...prevCart.items, newItem];
          
          toast.success(`Added ${product.name} to cart`);
        }

        return { items: newItems };
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Remove item from cart
  const removeFromCart = (productId: string, isWholesale: boolean) => {
    try {
      setCart(prevCart => {
        const newItems = prevCart.items.filter(
          item => !(item.product.id === productId && item.isWholesale === isWholesale)
        );
        
        const removedItem = prevCart.items.find(
          item => item.product.id === productId && item.isWholesale === isWholesale
        );
        
        if (removedItem) {
          toast.success(`Removed ${removedItem.product.name} from cart`);
        }

        return { items: newItems };
      });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number, isWholesale: boolean) => {
    try {
      if (quantity < 0) {
        toast.error('Quantity cannot be negative');
        return;
      }

      if (quantity === 0) {
        removeFromCart(productId, isWholesale);
        return;
      }

      setCart(prevCart => {
        const newItems = prevCart.items.map(item => {
          if (item.product.id === productId && item.isWholesale === isWholesale) {
            return { ...item, quantity };
          }
          return item;
        });

        const updatedItem = newItems.find(
          item => item.product.id === productId && item.isWholesale === isWholesale
        );
        
        if (updatedItem) {
          toast.success(`Updated ${updatedItem.product.name} quantity`);
        }

        return { items: newItems };
      });
    } catch (error) {
      console.error('Failed to update item quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  // Clear entire cart
  const clearCart = () => {
    try {
      setCart({ items: [] });
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Get total number of items in cart
  const getCartItemCount = (): number => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total cart price in rupees
  const getCartTotal = (): number => {
    return cart.items.reduce((total, item) => {
      const itemPrice = calculateItemPrice(item);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  // Get total savings amount
  const getCartSavings = (): number => {
    return cart.items.reduce((total, item) => {
      return total + calculateItemSavings(item);
    }, 0);
  };

  const contextValue: CartContextValue = {
    items: cart.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getCartSavings
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

// Export types for use in other components
export type { Product, CartItem, CartState, CartContextValue };