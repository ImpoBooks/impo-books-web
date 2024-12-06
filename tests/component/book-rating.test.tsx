import { render, screen } from '@testing-library/react';

import BookRating from '@/components/book-rating';

describe('BookRating Component', () => {
  it('should render the correct number of filled stars', () => {
    render(<BookRating rating={3.5} />);
    const filledStars = screen.getAllByTestId('filled-star');
    expect(filledStars.length).toBe(3);
  });

  it('should render the correct number of empty stars', () => {
    render(<BookRating rating={3.5} />);
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars.length).toBe(2);
  });

  it('should display the correct rating value', () => {
    render(<BookRating rating={3.5} />);
    const ratingValue = screen.getByText('3.5');
    expect(ratingValue).toBeInTheDocument();
  });

  it('should handle a rating of 0', () => {
    render(<BookRating rating={0} />);
    const filledStars = screen.queryAllByTestId('filled-star');
    expect(filledStars.length).toBe(0);
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars.length).toBe(5);
  });

  it('should handle a rating of 5', () => {
    render(<BookRating rating={5} />);
    const filledStars = screen.getAllByTestId('filled-star');
    expect(filledStars.length).toBe(5);
    const emptyStars = screen.queryAllByTestId('empty-star');
    expect(emptyStars.length).toBe(0);
  });
});
