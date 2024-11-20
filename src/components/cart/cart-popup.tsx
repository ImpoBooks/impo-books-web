'use client';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { SheetContent } from '@/components/ui/sheet';
import { useCartStore } from '@/hooks/store/use-cart-store';

const CartPopup = () => {
  const cart = useCartStore();

  return (
    <SheetContent>
      <h2 className="text-lg font-semibold mb-4">Кошик</h2>
      {cart.cartItems.map((item) => (
        <div
          key={item.book.id}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <h3 className="font-medium">{item.book.name}</h3>
            <p className="text-sm text-gray-500">
              ${item.book.price.toFixed(2)} x {item.count}
            </p>
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => cart.decrementItem(item)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-2">{item.count}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => cart.incrementItem(item)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => cart.deleteFromCart(item)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Всього: $
          {cart.cartItems
            .reduce((sum, item) => sum + item.book.price * item.count, 0)
            .toFixed(2)}
        </p>
      </div>
    </SheetContent>
  );
};

export default CartPopup;
