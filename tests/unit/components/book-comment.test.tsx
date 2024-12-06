import { render, screen, cleanup } from '@testing-library/react';

import useUserStore from '@/hooks/store/use-user-store';
import BookComment from '@/modules/book/components/book-comment';

jest.mock('@/api/product-api');
jest.mock('@/hooks/store/use-user-store');

describe('BookComment Component', () => {
  const mockComment = {
    id: 1,
    userName: 'John Doe',
    content: 'This is a great book!',
    rating: 4,
    likesNumber: 10,
    dislikesNumber: 2,
  };

  const mockUserStore = {
    user: { id: 1, name: 'Jane Doe' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockReturnValue(mockUserStore);
  });

  it('renders the component with given comment props', () => {
    render(<BookComment comment={mockComment} bookId={123} />);

    expect(screen.getByText(mockComment.userName)).toBeInTheDocument();
    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/star/i).length).toBe(5);
  });

  it('displays the correct number of filled stars for the rating', () => {
    render(<BookComment comment={mockComment} bookId={123} />);

    const filledStars = screen
      .getAllByLabelText(/star/i)
      .filter((star) => star.classList.contains('text-yellow-400'));
    expect(filledStars.length).toBe(mockComment.rating);
  });

  it('renders buttons only when a user is logged in', () => {
    render(<BookComment comment={mockComment} bookId={10} />);
    expect(screen.getByRole('button', { name: /10/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /2/i })).toBeInTheDocument();

    cleanup();

    (useUserStore as unknown as jest.Mock).mockReturnValue({ user: null });

    render(<BookComment comment={mockComment} bookId={10} />);
    expect(
      screen.queryByRole('button', { name: /10/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /2/i }),
    ).not.toBeInTheDocument();
  });
});
