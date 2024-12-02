import React, { FC } from 'react';

import BookComment from '@/modules/book/components/book-comment';
import { Comment } from '@/types/comment';

interface BookCommentSectionProps {
  comments: Comment[];
  bookId: number;
}
const BookCommentSection: FC<BookCommentSectionProps> = ({
  comments,
  bookId,
}) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <BookComment key={comment.id} comment={comment} bookId={bookId} />
      ))}
    </div>
  );
};

export default BookCommentSection;
