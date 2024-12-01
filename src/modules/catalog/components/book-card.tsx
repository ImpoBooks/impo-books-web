import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Routes from '@/constants/routes';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
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
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(book.rating || 0)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">
            {book.rating?.toFixed(1)}
          </span>
        </div>
        <p className="mt-2 text-lg font-bold">${book.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button variant="outline">Додати в кошик</Button>
        <Link href={Routes.BOOKS + `/${book.id}`}>
          <Button>Детальніше</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
