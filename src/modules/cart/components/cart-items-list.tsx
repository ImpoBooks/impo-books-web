import React, { FC } from 'react';

import CartItemField from '@/modules/cart/components/cart-item-field';
import { CartItem } from '@/types/book';

interface CartItemsProps {
  cartItems: CartItem[];
  total: number;
}
const CartItemsList: FC<CartItemsProps> = ({ cartItems, total }) => {
  return (
    <div data-testid="cart-items-list">
      {cartItems.map((item) => (
        <CartItemField item={item} key={item.book.id} />
      ))}
      <div className="mt-6 text-right">
        <p className="text-lg font-semibold" data-testid="cart-total">
          Сума: ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItemsList;
