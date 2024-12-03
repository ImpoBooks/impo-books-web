import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import { useCartStore } from '@/hooks/store/use-cart-store';
import BookCard from '@/modules/catalog/components/book-card';
import { Book } from '@/types/book';

jest.mock('@/hooks/store/use-cart-store', () => ({
  useCartStore: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockAddToCart = jest.fn();

describe('BookCard Component', () => {
  const book: Book = {
    id: 1,
    name: 'Test Book',
    price: 19.99,
    genres: 'Fiction',
    rating: 4.5,
    author: 'Test Author',
    releaseDate: new Date().toDateString(),
    comments: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  it('should render book details correctly', () => {
    render(<BookCard book={book} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should call addToCart when "Додати в кошик" button is clicked', () => {
    render(<BookCard book={book} />);
    const addButton = screen.getByText('Додати в кошик');
    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalledWith({ book, count: 1 });
  });

  it('should navigate to book details page when "Детальніше" button is clicked', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<BookCard book={book} />);
    const detailsLink = screen.getByRole('link', { name: /Детальніше/i });

    expect(detailsLink).toHaveAttribute('href', `/books/${book.id}`);
  });
});
