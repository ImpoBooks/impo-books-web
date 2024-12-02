import React, { FC } from 'react';

import ProductApi from '@/api/product-api';
import BookCommentSection from '@/modules/book/components/book-comment-section';
import BookInfo from '@/modules/book/components/book-info';
import BookReviewForm from '@/modules/book/components/book-review-form';

interface BookPageProps {
  bookId: string;
}

const BookPage: FC<BookPageProps> = async ({ bookId }) => {
  const book = await ProductApi.getBookById(+bookId);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
        <BookInfo book={book} />
        <div className="p-8 bg-card">
          <h2 className="text-2xl font-bold text-primary mb-4">Відгуки</h2>
          <BookReviewForm bookId={book.id} />
          {book.comments && book.comments.length > 0 ? (
            <BookCommentSection comments={book.comments} bookId={book.id} />
          ) : (
            <p data-testId="no-comments">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
