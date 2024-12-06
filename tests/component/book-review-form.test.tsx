import { render, screen, fireEvent } from '@testing-library/react';

import useUserStore from '@/hooks/store/use-user-store';
import BookReviewForm from '@/modules/book/components/book-review-form';

jest.mock('@/api/product-api');
jest.mock('@/hooks/store/use-user-store');

describe('BookReviewForm', () => {
  const mockUser = { id: 1, name: 'Jane Doe' };
  const mockBookId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it('renders the form if the user is logged in', () => {
    render(<BookReviewForm bookId={mockBookId} />);

    expect(
      screen.getByPlaceholderText(/Напишіть свій відгук/i),
    ).toBeInTheDocument();
    expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^[1-5]$/ })).toHaveLength(5);
  });

  it('does not render the form if the user is not logged in', () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({ user: null });
    render(<BookReviewForm bookId={mockBookId} />);

    expect(
      screen.queryByPlaceholderText(/Напишіть свій відгук/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Рейтинг:')).not.toBeInTheDocument();
  });

  it('updates the rating when a rating button is clicked', () => {
    render(<BookReviewForm bookId={mockBookId} />);

    const ratingButtons = screen.getAllByRole('button', { name: /^[1-5]$/ });
    fireEvent.click(ratingButtons[2]);

    expect(ratingButtons[2]).toHaveClass('bg-primary');
  });

  it('disables the submit button if fields are incomplete', () => {
    render(<BookReviewForm bookId={mockBookId} />);

    const submitButton = screen.getByRole('button', { name: /Додати відгук/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables the submit button if all fields are filled', () => {
    render(<BookReviewForm bookId={mockBookId} />);

    fireEvent.change(screen.getByPlaceholderText(/Напишіть свій відгук/i), {
      target: { value: 'This is a test review' },
    });
    fireEvent.click(screen.getByRole('button', { name: '4' }));

    const submitButton = screen.getByRole('button', { name: /Додати відгук/i });
    expect(submitButton).not.toBeDisabled();
  });
});
