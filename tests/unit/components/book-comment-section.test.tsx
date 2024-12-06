import { render, screen } from '@testing-library/react';
import React from 'react';

import BookComment from '@/modules/book/components/book-comment';
import BookCommentSection from '@/modules/book/components/book-comment-section';
import { Comment } from '@/types/comment';

jest.mock('@/modules/book/components/book-comment', () => ({
  __esModule: true,
  default: jest.fn(({ comment }) => <div>{comment.content}</div>),
}));

describe('BookCommentSection Component', () => {
  const mockComments: Comment[] = [
    {
      id: 1,
      userName: 'John Doe',
      content: 'This is a great book!',
      rating: 4,
      likesNumber: 10,
      dislikesNumber: 2,
    },
    {
      id: 2,
      userName: 'Jane Smith',
      content: 'Not my favorite read.',
      rating: 2,
      likesNumber: 3,
      dislikesNumber: 1,
    },
  ];

  const mockBookId = 123;

  it('renders without crashing', () => {
    render(<BookCommentSection comments={mockComments} bookId={mockBookId} />);
    expect(screen.getByText('This is a great book!')).toBeInTheDocument();
  });

  it('renders the correct number of comments', () => {
    render(<BookCommentSection comments={mockComments} bookId={mockBookId} />);
    expect(screen.getByText('This is a great book!')).toBeInTheDocument();
    expect(screen.getByText('Not my favorite read.')).toBeInTheDocument();
    expect(screen.queryAllByText(/great book|favorite read/i).length).toBe(2);
  });

  it('passes correct props to each BookComment', () => {
    render(<BookCommentSection comments={mockComments} bookId={mockBookId} />);

    expect(BookComment).toHaveBeenCalledTimes(mockComments.length);
    expect(BookComment).toHaveBeenCalledWith(
      { comment: mockComments[0], bookId: mockBookId },
      expect.any(Object),
    );
    expect(BookComment).toHaveBeenCalledWith(
      { comment: mockComments[1], bookId: mockBookId },
      expect.any(Object),
    );
  });
});
