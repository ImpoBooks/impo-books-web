import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ProductApi from '@/api/product-api';
import useUserStore from '@/hooks/store/use-user-store';
import BookComment from '@/modules/book/components/book-comment';

jest.mock('@/api/product-api');
jest.mock('@/hooks/store/use-user-store');

describe('BookComment Component Integration Tests', () => {
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

  it('increments likes and calls API when "like" button is clicked', async () => {
    (ProductApi.likeComment as jest.Mock).mockResolvedValue({});
    render(<BookComment comment={mockComment} bookId={123} />);

    const likeButton = screen.getByRole('button', { name: /10/i });
    fireEvent.click(likeButton);

    expect(screen.getByRole('button', { name: /11/i })).toBeInTheDocument();
    await waitFor(() =>
      expect(ProductApi.likeComment).toHaveBeenCalledWith(123, mockComment.id),
    );
  });

  it('increments dislikes and calls API when "dislike" button is clicked', async () => {
    (ProductApi.dislikeComment as jest.Mock).mockResolvedValue({});
    render(<BookComment comment={mockComment} bookId={123} />);

    const dislikeButton = screen.getByRole('button', { name: /2/i });
    fireEvent.click(dislikeButton);

    expect(screen.getByRole('button', { name: /3/i })).toBeInTheDocument();
    await waitFor(() =>
      expect(ProductApi.dislikeComment).toHaveBeenCalledWith(
        123,
        mockComment.id,
      ),
    );
  });

  it('toggles reaction correctly between like and dislike', async () => {
    render(<BookComment comment={mockComment} bookId={123} />);

    const likeButton = screen.getByRole('button', { name: /10/i });
    const dislikeButton = screen.getByRole('button', { name: /2/i });

    fireEvent.click(likeButton);
    expect(screen.getByRole('button', { name: /11/i })).toBeInTheDocument();

    fireEvent.click(dislikeButton);
    expect(screen.getByRole('button', { name: /10/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /3/i })).toBeInTheDocument();
  });
});
