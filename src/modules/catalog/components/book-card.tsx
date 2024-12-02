'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import BookRating from '@/components/book-rating';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Routes from '@/constants/routes';
import { useCartStore } from '@/hooks/store/use-cart-store';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCartStore();

  const handleQuickAdd = () => {
    addToCart({ book, count: 1 });
  };

  return (
    <Card key={book.id}>
      <Image
        src="https://placehold.co/600x400"
        alt={book.name}
        width={600}
        height={400}
        className="rounded-t-lg w-full object-cover"
      />
      <CardHeader>
        <CardTitle>{book.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{book.author}</p>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString()}
        </p>
        <BookRating rating={book.rating} />
        <p className="mt-2 text-lg font-bold">${book.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button onClick={handleQuickAdd} variant="outline">
          Додати в кошик
        </Button>
        <Link href={Routes.BOOKS + `/${book.id}`}>
          <Button>Детальніше</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
