import { Book, Filters, Prices } from '@/types/book';

export const getMaxAndMinPrice = (books: Book[]): Prices => {
  const prices = books.map((book) => book.price);
  return {
    max: Math.max(...prices),
    min: Math.min(...prices),
  };
};

export const filterBooks = (books: Book[], filters: Filters): Book[] => {
  return books.filter((book) => {
    return (
      book.name.toLowerCase().includes(filters.search?.toLowerCase() ?? '') &&
      book.genres.toLowerCase().includes(filters.genre?.toLowerCase() ?? '') &&
      book.rating >= (filters.minRating ?? 0) &&
      book.price >= (filters.minPrice ?? 0) &&
      book.price <= (filters.maxPrice ?? Infinity)
    );
  });
};
