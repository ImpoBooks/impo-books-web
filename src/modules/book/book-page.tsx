'use client';
import React, { FC } from 'react';

import { useCartStore } from '@/hooks/store/use-cart-store';
import BookCommentSection from '@/modules/book/components/book-comment-section';
import BookInfo from '@/modules/book/components/book-info';
import BookReviewForm from '@/modules/book/components/book-review-form';
import { Book } from '@/types/book';

interface BookPageProps {
  book: Book;
}

const BookPage: FC<BookPageProps> = ({ book }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({ book, count: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
      <div className="max-w-screen-xl mx-auto bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
        <BookInfo book={book} onBookAddition={handleAddToCart} />
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
