import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { useCartStore } from '@/hooks/store/use-cart-store';
import CartItemField from '@/modules/cart/components/cart-item-field';
import { CartItem } from '@/types/book';

jest.mock('@/hooks/store/use-cart-store', () => ({
  useCartStore: jest.fn(),
}));

describe('CartItemField Integration Tests', () => {
  const mockIncrementItem = jest.fn();
  const mockDecrementItem = jest.fn();
  const mockDeleteFromCart = jest.fn();

  const cartItem: CartItem = {
    book: {
      id: 1,
      name: 'Sample Book',
      price: 20,
      author: 'Maksym Rybalko',
      comments: [],
    },
    count: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      incrementItem: mockIncrementItem,
      decrementItem: mockDecrementItem,
      deleteFromCart: mockDeleteFromCart,
    });
  });

  it('calls incrementItem when the "+" button is clicked', () => {
    render(<CartItemField item={cartItem} />);

    const incrementButton = screen.getByRole('button', { name: /increment/i });
    fireEvent.click(incrementButton);

    expect(mockIncrementItem).toHaveBeenCalledWith(cartItem);
  });

  it('calls decrementItem when the "-" button is clicked', () => {
    render(<CartItemField item={cartItem} />);

    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    fireEvent.click(decrementButton);

    expect(mockDecrementItem).toHaveBeenCalledWith(cartItem);
  });

  it('does not call decrementItem when count is 0 and "-" button is clicked', () => {
    const cartItemWithZeroCount = { ...cartItem, count: 0 };
    render(<CartItemField item={cartItemWithZeroCount} />);

    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    fireEvent.click(decrementButton);

    expect(mockDecrementItem).not.toHaveBeenCalled();
  });

  it('calls deleteFromCart when the trash button is clicked', () => {
    render(<CartItemField item={cartItem} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockDeleteFromCart).toHaveBeenCalledWith(cartItem);
  });
});
