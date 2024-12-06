import { render, screen } from '@testing-library/react';
import React from 'react';

import BookInfo from '@/modules/book/components/book-info';
import { Book } from '@/types/book';

describe('BookInfo Component', () => {
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

  it('renders correctly with all props', () => {
    render(<BookInfo book={mockBook} onBookAddition={mockOnBookAddition} />);

    expect(screen.getByAltText(mockBook.name)).toBeInTheDocument();
    expect(screen.getByText(mockBook.name)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockBook.author}`)).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText(mockBook.genres!)).toBeInTheDocument();
    expect(screen.getByText(mockBook.description!)).toBeInTheDocument();
  });

  it('renders default image if no image URL is provided', () => {
    const bookWithoutImage = { ...mockBook, image: undefined };
    render(
      <BookInfo book={bookWithoutImage} onBookAddition={mockOnBookAddition} />,
    );

    const imageElement = screen.getByAltText(
      bookWithoutImage.name,
    ) as HTMLImageElement;
    expect(imageElement.src).toContain('https://placehold.co/600x400');
  });

  it('renders the correct number of filled and unfilled stars based on rating', () => {
    const { container } = render(
      <BookInfo book={mockBook} onBookAddition={jest.fn()} />,
    );

    const filledStars = container.querySelectorAll('svg.text-yellow-400');
    const unfilledStars = container.querySelectorAll(
      'svg.text-muted-foreground',
    );

    expect(filledStars.length).toBe(4);
    expect(unfilledStars.length).toBe(1);
  });

  it('does not render optional fields when they are not provided', () => {
    const bookWithoutOptionalFields = {
      id: 2,
      name: 'Minimalist Book',
      author: 'Author Name',
      price: 10.0,
      comments: [],
    };
    render(
      <BookInfo
        book={bookWithoutOptionalFields}
        onBookAddition={mockOnBookAddition}
      />,
    );

    expect(
      screen.getByText(bookWithoutOptionalFields.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`by ${bookWithoutOptionalFields.author}`),
    ).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();

    expect(screen.queryByText('Classic')).not.toBeInTheDocument();
    expect(screen.queryByText(/A classic novel/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/star/i)).not.toBeInTheDocument();
  });
});
