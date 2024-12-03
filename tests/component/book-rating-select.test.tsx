import { render, screen, fireEvent } from '@testing-library/react';
import { useQueryState } from 'nuqs';
import React from 'react';

import '@testing-library/jest-dom';
import BooksRatingSelect from '@/modules/catalog/components/books-rating-select';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

describe('BooksRatingSelect', () => {
  const mockSetMinRating = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryState as jest.Mock).mockImplementation(() => [
      null,
      mockSetMinRating,
    ]);
  });

  it('renders the rating select with correct label', () => {
    render(<BooksRatingSelect />);
    expect(screen.getByText('Мінімальний рейтинг')).toBeInTheDocument();
  });

  it('displays the default placeholder', () => {
    render(<BooksRatingSelect />);
    expect(screen.getByText('Виберіть рейтинг')).toBeInTheDocument();
  });

  it('calls setMinRating with the selected rating', () => {
    render(<BooksRatingSelect />);
    fireEvent.click(screen.getByText('Виберіть рейтинг'));
    fireEvent.click(screen.getByText('4'));
    expect(mockSetMinRating).toHaveBeenCalledWith('4');
  });

  it('calls setMinRating with null when "Будь-який" is selected', () => {
    render(<BooksRatingSelect />);
    fireEvent.click(screen.getByText('Виберіть рейтинг'));
    fireEvent.click(screen.getByText('Будь-який'));
    expect(mockSetMinRating).toHaveBeenCalledWith(null);
  });
});
