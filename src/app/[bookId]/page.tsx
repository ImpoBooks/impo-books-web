import { Metadata } from 'next';
import { FC } from 'react';

import ProductApi from '@/api/product-api';
import BookPage from '@/modules/book/book-page';

export async function generateMetadata({
  params,
}: {
  params: { bookId: number };
}): Promise<Metadata> {
  const book = await ProductApi.getBookById(params.bookId);

  if (!book) {
    return {
      title: `ImpoBooks | Невідома книга`,
    };
  }

  return {
    title: `ImpoBooks | ${book.name}`,
  };
}

interface BookProps {
  params: Promise<{ bookId: number }>;
}

const Book: FC<BookProps> = async ({ params }) => {
  const bookId = (await params).bookId;
  const book = await ProductApi.getBookById(bookId);
  if (!book) {
    return <div>Book not found</div>;
  }

  return <BookPage book={book} />;
};

export default Book;
