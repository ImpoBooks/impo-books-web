import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import BooksSearch from '@/modules/catalog/components/books-search';

import { useQueryState } from 'nuqs';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

describe('BooksSearch', () => {
  const mockSetUrlSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryState as jest.Mock).mockReturnValue([null, mockSetUrlSearch]);
  });

  it('renders the search input', () => {
    render(<BooksSearch />);
    const input = screen.getByLabelText('Пошук');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute(
      'placeholder',
      'Назва, автор або ключові слова',
    );
  });

  it('updates the input value when typing', () => {
    render(<BooksSearch />);
    const input = screen.getByLabelText('Пошук') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Harry Potter' } });
    expect(input.value).toBe('Harry Potter');
  });

  it('calls setUrlSearch with the input value', () => {
    render(<BooksSearch />);
    const input = screen.getByLabelText('Пошук');
    fireEvent.change(input, { target: { value: 'Harry Potter' } });
    expect(mockSetUrlSearch).toHaveBeenCalledWith('Harry Potter');
  });

  it('calls setUrlSearch with null when input is cleared', () => {
    render(<BooksSearch />);
    const input = screen.getByLabelText('Пошук');
    fireEvent.change(input, { target: { value: 'Harry Potter' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(mockSetUrlSearch).toHaveBeenCalledWith(null);
  });

  it('initializes with the URL search parameter', () => {
    (useQueryState as jest.Mock).mockReturnValue([
      'Initial Search',
      mockSetUrlSearch,
    ]);
    render(<BooksSearch />);
    const input = screen.getByLabelText('Пошук') as HTMLInputElement;
    expect(input.value).toBe('Initial Search');
  });
});
