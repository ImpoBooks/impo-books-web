import { render, screen } from '@testing-library/react';
import React from 'react';

import CartItemField from '@/modules/cart/components/cart-item-field';
import { CartItem } from '@/types/book';

describe('CartItemField', () => {
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

  it('renders cart item details correctly', () => {
    render(<CartItemField item={cartItem} />);

    expect(screen.getByText('Sample Book')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
