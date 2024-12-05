import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ProductApi from '@/api/product-api';
import useUserStore from '@/hooks/store/use-user-store';
import BookReviewForm from '@/modules/book/components/book-review-form';

jest.mock('@/api/product-api');
jest.mock('@/hooks/store/use-user-store');

describe('BookReviewForm Integration Tests', () => {
  const mockUser = { id: 1, name: 'Jane Doe' };
  const mockBookId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it('submits the review and calls the API', async () => {
    (ProductApi.sendComment as jest.Mock).mockResolvedValue({});
    render(<BookReviewForm bookId={mockBookId} />);

    fireEvent.change(screen.getByPlaceholderText(/Напишіть свій відгук/i), {
      target: { value: 'This is a test review' },
    });
    fireEvent.click(screen.getByRole('button', { name: '4' }));

    const submitButton = screen.getByRole('button', { name: /Додати відгук/i });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(ProductApi.sendComment).toHaveBeenCalledWith(mockBookId, {
        userId: mockUser.id,
        content: 'This is a test review',
        rating: 4,
      }),
    );
  });

  it('does not call the API if the user is not logged in', async () => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({ user: null });
    render(<BookReviewForm bookId={mockBookId} />);

    const submitButton = screen.queryByRole('button', {
      name: /Додати відгук/i,
    });
    expect(submitButton).not.toBeInTheDocument();
  });
});
