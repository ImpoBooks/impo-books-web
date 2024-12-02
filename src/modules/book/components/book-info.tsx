import { Star } from 'lucide-react';
import React, { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Book } from '@/types/book';

interface BookInfoProps {
  book: Book;
  onBookAddition: () => void;
}

const BookInfo: FC<BookInfoProps> = ({ book, onBookAddition }) => {
  const handleCartAddition = () => {
    onBookAddition();
  };
  return (
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <img
          className="h-full min-w-72 w-full object-cover md:w-48"
          src={book.image ? book.image : 'https://placehold.co/600x400'}
          alt={book.name}
        />
      </div>
      <div className="p-8">
        {book.genres && (
          <div className="uppercase tracking-wide text-sm text-primary font-semibold">
            {book.genres}
          </div>
        )}
        <h1 className="mt-1 text-4xl font-bold text-primary">{book.name}</h1>
        <p className="mt-2 text-muted-foreground">by {book.author}</p>
        {book.rating && (
          <div className="mt-4 flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(book.rating as number)
                    ? 'text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="ml-2 text-muted-foreground">
              {book.rating.toFixed(1)}
            </span>
          </div>
        )}
        <p className="mt-4 text-xl font-bold text-primary">
          ${book.price.toFixed(2)}
        </p>
        {book.description && (
          <p className="mt-2 text-muted-foreground">{book.description}</p>
        )}
        <div className="mt-4 flex space-x-4">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={handleCartAddition}
          >
            Додати в кошик
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
