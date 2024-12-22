import { render, screen } from '@testing-library/react';
import { useQueryState } from 'nuqs';
import React from 'react';

import '@testing-library/jest-dom';
import BooksPriceSlider from '@/modules/catalog/components/books-price-slider';
import { Book } from '@/types/book';
import { getMaxAndMinPrice } from '@/utils/books-utils';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

jest.mock('@/hooks/use-debounce', () => ({
  __esModule: true,
  default: jest.fn((value) => value),
}));

jest.mock('@/utils/books-utils', () => ({
  getMaxAndMinPrice: jest.fn(),
}));

const books: Book[] = [
  {
    id: 1,
    name: 'Book 1',
    price: 10,
    genres: 'Fiction',
    rating: 4,
    author: 'Author 1',
    releaseDate: new Date().toDateString(),
    comments: [],
  },
  {
    id: 2,
    name: 'Book 2',
    price: 20,
    genres: 'Romance',
    rating: 5,
    author: 'Author 2',
    releaseDate: new Date().toDateString(),
    comments: [],
  },
  {
    id: 3,
    name: 'Book 3',
    price: 30,
    genres: 'Fiction',
    rating: 3,
    author: 'Author 3',
    releaseDate: new Date().toDateString(),
    comments: [],
  },
];

describe('BooksPriceSlider', () => {
  const mockSetMinPrice = jest.fn();
  const mockSetMaxPrice = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryState as jest.Mock).mockImplementation((key) => {
      if (key === 'minPrice') return [10, mockSetMinPrice];
      if (key === 'maxPrice') return [30, mockSetMaxPrice];
      return [null, jest.fn()];
    });
    (getMaxAndMinPrice as jest.Mock).mockReturnValue({
      min: 10,
      max: 30,
    });
  });

  it('renders the price slider with correct label', () => {
    render(<BooksPriceSlider books={books} />);
    expect(screen.getByText('Ціна')).toBeInTheDocument();
    expect(screen.getAllByRole('slider').length).toBe(2);
  });

  it('displays the current price range', () => {
    render(<BooksPriceSlider books={books} />);
    expect(screen.getByText('$10 - $30')).toBeInTheDocument();
  });

  it('uses default min and max prices when query params are not set', () => {
    (useQueryState as jest.Mock).mockImplementation(() => [null, jest.fn()]);
    render(<BooksPriceSlider books={books} />);
    expect(screen.getByText('$10 - $30')).toBeInTheDocument();
  });
});
