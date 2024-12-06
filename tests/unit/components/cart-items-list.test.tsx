import { render, screen } from '@testing-library/react';
import React from 'react';

import CartItemsList from '@/modules/cart/components/cart-items-list';
import { CartItem } from '@/types/book';

jest.mock('@/modules/cart/components/cart-item-field', () =>
  // eslint-disable-next-line react/display-name
  ({ item }: { item: CartItem }) => (
    <div data-testid="cart-item">{item.book.name}</div>
  ),
);

describe('CartItemsList', () => {
  const cartItems: CartItem[] = [
    {
      book: {
        id: 1,
        name: 'Book One',
        price: 10,
        author: 'Maksym Rybalko',
        comments: [],
      },
      count: 2,
    },
    {
      book: {
        id: 2,
        name: 'Book Two',
        price: 15,
        author: 'Maksym Rybalko',
        comments: [],
      },
      count: 1,
    },
  ];
  const total = 35.0;

  it('renders all cart items', () => {
    render(<CartItemsList cartItems={cartItems} total={total} />);

    const renderedItems = screen.getAllByTestId('cart-item');
    expect(renderedItems).toHaveLength(cartItems.length);
    expect(renderedItems[0]).toHaveTextContent('Book One');
    expect(renderedItems[1]).toHaveTextContent('Book Two');
  });

  it('displays the total amount correctly', () => {
    render(<CartItemsList cartItems={cartItems} total={total} />);

    const totalAmount = screen.getByText(/Сума: \$/i);
    expect(totalAmount).toHaveTextContent(`Сума: $${total.toFixed(2)}`);
  });

  it('renders correctly with an empty cart', () => {
    render(<CartItemsList cartItems={[]} total={0} />);

    const renderedItems = screen.queryAllByTestId('cart-item');
    expect(renderedItems).toHaveLength(0);

    const totalAmount = screen.getByText(/Сума: \$/i);
    expect(totalAmount).toHaveTextContent('Сума: $0.00');
  });
});
