import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import BookInfo from '@/modules/book/components/book-info';
import { Book } from '@/types/book';

describe('BookInfo Component Integration Tests', () => {
  const mockBook: Book = {
    id: 1,
    name: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    image: 'https://example.com/image.jpg',
    genres: 'Classic',
    rating: 4,
    price: 19.99,
    description: 'A classic novel set in the 1920s.',
    comments: [],
  };

  const mockOnBookAddition = jest.fn();

  it('executes `onBookAddition` callback when "Add to Cart" button is clicked', () => {
    render(<BookInfo book={mockBook} onBookAddition={mockOnBookAddition} />);

    const button = screen.getByRole('button', { name: /Додати в кошик/i });
    fireEvent.click(button);

    expect(mockOnBookAddition).toHaveBeenCalledTimes(1);
  });
});
