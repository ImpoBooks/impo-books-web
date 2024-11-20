import { Minus, Plus, Trash2 } from 'lucide-react';
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/hooks/store/use-cart-store';
import { CartItem } from '@/types/book';

interface CartItemProps {
  item: CartItem;
}
const CartItemField: FC<CartItemProps> = ({ item }) => {
  const { decrementItem, incrementItem, deleteFromCart } = useCartStore();

  const onIncrementClick = () => {
    incrementItem(item);
  };
  const onDecrementClick = () => {
    if (item.count > 0) {
      decrementItem(item);
    }
  };

  const onDeleteClick = () => {
    deleteFromCart(item);
  };
  return (
    <div
      key={item.book.id}
      className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4"
    >
      <div>
        <h3 className="font-medium">{item.book.name}</h3>
        <p className="text-sm text-gray-600">${item.book.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onDecrementClick}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.count}</span>
        <Button variant="outline" size="icon" onClick={onIncrementClick}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onDeleteClick}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemField;
