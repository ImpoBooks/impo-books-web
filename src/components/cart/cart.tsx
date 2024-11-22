'use client';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

import CartPopup from '@/components/cart/cart-popup';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/hooks/store/use-cart-store';

const Cart = () => {
  const pathname = usePathname();
  const hideCart = ['/auth', '/cart', '/admin'].includes(pathname);

  const cart = useCartStore();
  if (hideCart) return <></>;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-4 right-4 z-10">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Кошик ({cart.cartItems.reduce((sum, item) => sum + item.count, 0)})
        </Button>
      </SheetTrigger>
      <CartPopup />
    </Sheet>
  );
};

export default Cart;
