"use client";

import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Package, Barcode, DiamondPercent, PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Product {
  id: string;
  sku: string;
  size: string;
  weight: number;
  retailPrice: number;
  wholesalePrice: number;
  image: string;
  servings: number;
}

interface CartItem {
  product: Product;
  quantity: number;
  isWholesale: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'MAC-100G',
    size: '100g',
    weight: 100,
    retailPrice: 45,
    wholesalePrice: 38,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/high-quality-raw-macaroni-pasta-tubes-in-029e30d5-20250902054727.jpg',
    servings: 2,
  },
  {
    id: '2',
    sku: 'MAC-500G',
    size: '500g',
    weight: 500,
    retailPrice: 180,
    wholesalePrice: 155,
    image: 'https://cdn.pixabay.com/photo/2022/08/13/22/18/rigatoni-7384569_960_720.jpg',
    servings: 10,
  },
  {
    id: '3',
    sku: 'MAC-1KG',
    size: '1kg',
    weight: 1000,
    retailPrice: 320,
    wholesalePrice: 275,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/premium-pasta-packaging-photography-show-02a79ba0-20250902054705.jpg',
    servings: 20,
  },
  {
    id: '4',
    sku: 'MAC-20KG',
    size: '20kg',
    weight: 20000,
    retailPrice: 5800,
    wholesalePrice: 4200,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7f8c7369-1912-4a09-9c1b-d0857f3cfd33/generated_images/professional-product-photography-of-prem-4e4361ef-20250902054653.jpg',
    servings: 400,
  },
  {
    id: '5',
    sku: 'MAC-25KG',
    size: '25kg',
    weight: 25000,
    retailPrice: 7200,
    wholesalePrice: 5200,
    image: 'https://cdn.pixabay.com/photo/2023/06/16/14/03/rigatoni-8068088_960_720.jpg',
    servings: 500,
  },
  {
    id: '6',
    sku: 'MAC-30KG',
    size: '30kg',
    weight: 30000,
    retailPrice: 8600,
    wholesalePrice: 6200,
    image: 'https://cdn.pixabay.com/photo/2023/05/03/13/25/pasta-7967719_960_720.jpg',
    servings: 600,
  },
  {
    id: '7',
    sku: 'MAC-50KG',
    size: '50kg',
    weight: 50000,
    retailPrice: 14200,
    wholesalePrice: 10200,
    image: 'https://cdn.pixabay.com/photo/2014/10/22/18/41/macaroni-498670_1280.jpg',
    servings: 1000,
  },
  {
    id: '8',
    sku: 'MAC-75KG',
    size: '75kg',
    weight: 75000,
    retailPrice: 21000,
    wholesalePrice: 15000,
    image: 'https://cdn.pixabay.com/photo/2023/06/16/14/06/pasta-8068093_960_720.jpg',
    servings: 1500,
  },
];

export default function ProductShowcase() {
  const [isWholesale, setIsWholesale] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(product => 
      product.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (isWholesale ? a.wholesalePrice : a.retailPrice) - (isWholesale ? b.wholesalePrice : b.retailPrice));
        break;
      case 'price-high':
        filtered.sort((a, b) => (isWholesale ? b.wholesalePrice : b.retailPrice) - (isWholesale ? a.wholesalePrice : a.retailPrice));
        break;
      default:
        // Recommended order - keep original order
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, isWholesale]);

  const calculateSavings = (product: Product, quantity: number) => {
    if (isWholesale) {
      const retailEquivalent = product.retailPrice * quantity;
      const wholesaleTotal = product.wholesalePrice * quantity;
      return Math.max(0, retailEquivalent - wholesaleTotal);
    } else {
      const retailTotal = product.retailPrice * quantity;
      const discountedPrice = quantity >= 5 ? retailTotal * 0.95 : retailTotal;
      return Math.max(0, retailTotal - discountedPrice);
    }
  };

  const getQuantityForProduct = (productId: string) => {
    return selectedQuantities[productId] || 1;
  };

  const setQuantityForProduct = (productId: string, quantity: number) => {
    setSelectedQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const addToCart = (product: Product) => {
    const quantity = getQuantityForProduct(product.id);
    const existingItemIndex = cart.findIndex(
      item => item.product.id === product.id && item.isWholesale === isWholesale
    );

    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart(prev => [...prev, { product, quantity, isWholesale }]);
    }

    const price = isWholesale ? product.wholesalePrice : product.retailPrice;
    const subtotal = price * quantity;
    
    toast.success('Added to cart', {
      description: `${quantity}x ${product.size} Macronica - ₹${subtotal}`,
    });
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
    return total + (price * item.quantity);
  }, 0);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="bg-cream/30 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brown mb-4">
            Premium Pasta Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From bulk wholesale to convenient retail packs - quality pasta for every need
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Wholesale Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={!isWholesale ? "default" : "outline"}
                size="sm"
                onClick={() => setIsWholesale(false)}
                className={`text-sm ${!isWholesale ? 'bg-golden text-brown hover:bg-golden/90' : 'border-golden text-golden hover:bg-golden hover:text-brown'}`}
              >
                Retail
              </Button>
              <Button
                variant={isWholesale ? "default" : "outline"}
                size="sm"
                onClick={() => setIsWholesale(true)}
                className={`text-sm ${isWholesale ? 'bg-golden text-brown hover:bg-golden/90' : 'border-golden text-golden hover:bg-golden hover:text-brown'}`}
              >
                Wholesale
              </Button>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by size or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-golden/30 focus:border-golden"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-golden/30 focus:border-golden">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mini Cart
          {totalItems > 0 && (
            <div className="flex items-center gap-2 text-sm text-brown bg-golden/20 px-3 py-2 rounded-full">
              <ShoppingCart className="h-4 w-4" />
              <span>{totalItems} items • ₹{cartTotal}</span>
            </div>
          )} */}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => {
            const quantity = getQuantityForProduct(product.id);
            const price = isWholesale ? product.wholesalePrice : product.retailPrice;
            const subtotal = price * quantity;
            const savings = calculateSavings(product, quantity);

            return (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200 border-golden/20 hover:border-golden/40">
                <CardContent className="p-6">
                  {/* Product Image */}
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-cream/50 border border-golden/20">
                    <img
                      src={product.image}
                      alt={`${product.size} Macronica Premium Pasta Pack - Raw macaroni pasta tubes in premium packaging`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  {/* Pack Size */}
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-4 w-4 text-golden" />
                    <span className="font-semibold text-lg text-brown">{product.size}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-brown">
                      ₹{price}
                    </span>
                    {isWholesale && (
                      <span className="text-sm text-muted-foreground ml-2 line-through">
                        ₹{product.retailPrice}
                      </span>
                    )}
                  </div>

                  {/* Savings Badge */}
                  {savings > 0 && (
                    <Badge className="mb-4 bg-tomato text-white">
                      <DiamondPercent className="h-3 w-3 mr-1" />
                      You Save ₹{savings}
                    </Badge>
                  )}

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>{product.weight}g</span>
                    <span>~{product.servings} servings</span>
                    <span className="flex items-center gap-1">
                      <Barcode className="h-3 w-3" />
                      {product.sku}
                    </span>
                  </div>

                  {/* Quantity Selector
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-muted-foreground">Qty:</span>
                    <div className="flex gap-1">
                      {[1, 5, 10].map((qty) => (
                        <Button
                          key={qty}
                          variant={quantity === qty ? "default" : "outline"}
                          size="sm"
                          onClick={() => setQuantityForProduct(product.id, qty)}
                          className={`text-xs px-2 py-1 ${quantity === qty ? 'bg-golden text-brown' : 'border-golden/40 text-golden hover:bg-golden hover:text-brown'}`}
                        >
                          {qty}
                        </Button>
                      ))}
                    </div>
                  </div> */}

                  {/* Subtotal
                  {quantity > 1 && (
                    <div className="text-sm font-medium text-brown mb-4">
                      Subtotal: ₹{subtotal}
                    </div>
                  )} */}

                  {/* Actions */}
                  <div className="space-y-2">
                    {/* <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-golden text-brown hover:bg-golden/90"
                      size="sm"
                    >
                      <PackagePlus className="h-4 w-4 mr-2" />
                      {isWholesale ? 'Request Quote' : 'Order'}
                    </Button> */}

                    {/* Product Detail Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full border-golden/40 text-golden hover:bg-golden hover:text-brown">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-brown">{product.size} Macronica Pack</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="aspect-square overflow-hidden rounded-lg border border-golden/20">
                            <img
                              src={product.image}
                              alt={`${product.size} Macronica Premium Pasta Pack`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-brown">Product Details</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Premium durum wheat macaroni</li>
                              <li>• Hygienically packed for freshness</li>
                              <li>• Rich in protein and fiber</li>
                              <li>• Perfect for all pasta recipes</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-brown">Nutritional Info</h4>
                            <div className="text-sm text-muted-foreground">
                              Per 100g serving: 350 kcal, 12g protein, 2g fat, 70g carbs
                            </div>
                          </div>
                          {/* <Button
                            onClick={() => addToCart(product)}
                            className="w-full bg-golden text-brown hover:bg-golden/90"
                          >
                            <PackagePlus className="h-4 w-4 mr-2" />
                            {isWholesale ? 'Request Wholesale Quote' : 'Buy Now'}
                          </Button> */}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-golden mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-brown mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or contact our support team
            </p>
            <Button variant="outline" className="border-golden text-golden hover:bg-golden hover:text-brown">Contact Support</Button>
          </div>
        )}
      </div>
    </section>
  );
}