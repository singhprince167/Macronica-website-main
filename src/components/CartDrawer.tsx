"use client";

import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Utility function to format price in rupees
const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart,
    getCartItemCount,
    getCartTotal,
    getCartSavings
  } = useCart();

  const totalItems = getCartItemCount();
  const subtotal = getCartTotal();
  const totalSavings = getCartSavings();
  const finalTotal = subtotal;

  const handleQuantityChange = (productId: string, newQuantity: number, isWholesale: boolean) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, isWholesale);
    } else {
      updateQuantity(productId, newQuantity, isWholesale);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page - you can implement this later
    window.location.href = '/checkout';
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-golden/20 bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-brown" />
            <h2 className="text-xl font-heading font-semibold text-brown">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-golden text-brown text-sm font-medium px-2.5 py-1 rounded-full">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-brown hover:bg-golden/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-golden/10 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-golden" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-brown mb-2">
              Your cart is empty
            </h3>
            <p className="text-brown/70 mb-6 max-w-sm">
              Add some delicious Macronica pasta to get started on your culinary journey!
            </p>
            <Button 
              onClick={onClose}
              className="bg-golden hover:bg-golden/90 text-brown font-medium px-6"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.isWholesale ? 'wholesale' : 'retail'}`} className="bg-white rounded-lg p-4 shadow-sm border border-golden/10">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-golden/10 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={`${item.product.size} Macronica Premium Pasta`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-brown truncate">
                            Macronica {item.product.size}
                          </h4>
                          
                          {/* Price Type Indicator */}
                          <div className="text-xs text-brown/60 mb-1">
                            {item.isWholesale ? 'Wholesale' : 'Retail'} • {item.product.sku}
                          </div>
                          
                          {/* Price Display */}
                          <div className="flex items-center gap-2 mt-1">
                            {item.isWholesale ? (
                              <>
                                <span className="text-sm text-brown/50 line-through">
                                  MRP {formatPrice(item.product.retailPrice)}
                                </span>
                                <span className="font-semibold text-brown">
                                  {formatPrice(item.product.wholesalePrice)}
                                </span>
                                <span className="text-xs bg-tomato text-white px-2 py-0.5 rounded-full">
                                  Save {formatPrice(item.product.retailPrice - item.product.wholesalePrice)}
                                </span>
                              </>
                            ) : (
                              <span className="font-semibold text-brown">
                                {formatPrice(item.product.retailPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id, item.isWholesale)}
                          className="text-tomato hover:bg-tomato/10 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls and Subtotal */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-golden/30 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1, item.isWholesale)}
                            className="text-brown hover:bg-golden/10 px-3 py-1 h-8"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium text-brown min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1, item.isWholesale)}
                            className="text-brown hover:bg-golden/10 px-3 py-1 h-8"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Item Subtotal */}
                        <div className="text-right">
                          <div className="font-semibold text-brown">
                            {formatPrice((item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice) * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary & Checkout */}
            <div className="border-t border-golden/20 bg-white p-6 space-y-4">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-brown">Subtotal</span>
                  <span className="text-brown">{formatPrice(subtotal)}</span>
                </div>
                
                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-basil">Total Savings</span>
                    <span className="text-basil font-medium">-{formatPrice(totalSavings)}</span>
                  </div>
                )}
                
                <div className="border-t border-golden/20 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-brown">Total</span>
                    <span className="font-bold text-lg text-brown">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-brown hover:bg-brown/90 text-cream font-medium py-3"
                  size="lg"
                >
                  Checkout • {formatPrice(finalTotal)}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="w-full border-golden text-brown hover:bg-golden/10"
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Trust Badge */}
              <div className="text-center text-xs text-brown/60 pt-2">
                <p>✓ Secure checkout • Free delivery on orders above ₹500</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};