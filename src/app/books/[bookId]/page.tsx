import { Metadata } from 'next';
import { FC, Suspense } from 'react';

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
  params: { bookId: string };
}

const Book: FC<BookProps> = async ({ params }) => {
  return (
    <Suspense fallback={<div className="mx-auto">Завантаження...</div>}>
      <BookPage bookId={params.bookId} />
    </Suspense>
  );
};

export default Book;
