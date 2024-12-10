import { describe, it, expect } from '@jest/globals';

import { Book, Filters } from '@/types/book';
import { getMaxAndMinPrice, filterBooks } from '@/utils/books-utils';

const books: Book[] = [
  {
    id: 1,
    name: 'Book 1',
    price: 10,
    genres: 'Fiction',
    rating: 4,
    author: 'Author 1',
    releaseDate: new Date().toDateString(),
    comments: [],
  },
  {
    id: 2,
    name: 'Book 2',
    price: 20,
    genres: 'Romance',
    rating: 5,
    author: 'Author 2',
    releaseDate: new Date().toDateString(),
    comments: [],
  },
  {
    id: 3,
    name: 'Book 3',
    price: 5,
    genres: 'Fiction',
    rating: 3,
    author: 'Author 3',
    releaseDate: new Date().toDateString(),
    comments: [],
  },
];

describe('Books Utils - Unit tests', () => {
  describe('getMaxAndMinPrice', () => {
    it('should return correct max and min prices', () => {
      const prices = getMaxAndMinPrice(books);
      expect(prices).toEqual({ max: 20, min: 5 });
    });

    it('should handle an empty array', () => {
      const books: Book[] = [];
      const prices = getMaxAndMinPrice(books);
      expect(prices).toEqual({ max: -Infinity, min: Infinity });
    });

    it('should handle an array with one book', () => {
      const prices = getMaxAndMinPrice([books[0]]);
      expect(prices).toEqual({ max: 10, min: 10 });
    });
  });

  describe('filterBooks', () => {
    it('should filter books by search term', () => {
      const filters: Filters = { search: 'Book 1' };
      const filteredBooks = filterBooks(books, filters);
      expect(filteredBooks).toEqual([books[0]]);
    });

    it('should filter books by genre', () => {
      const filters: Filters = { genre: 'Fiction' };
      const filteredBooks = filterBooks(books, filters);
      expect(filteredBooks).toEqual([books[0], books[2]]);
    });

    it('should filter books by minimum rating', () => {
      const filters: Filters = { minRating: 4 };
      const filteredBooks = filterBooks(books, filters);
      expect(filteredBooks).toEqual([books[0], books[1]]);
    });

    it('should filter books by price range', () => {
      const filters: Filters = { minPrice: 10, maxPrice: 20 };
      const filteredBooks = filterBooks(books, filters);
      expect(filteredBooks).toEqual([books[0], books[1]]);
    });

    it('should handle empty filters', () => {
      const filters: Filters = {};
      const filteredBooks = filterBooks(books, filters);
      expect(filteredBooks).toEqual(books);
    });

    it('should handle no matching books', () => {
      const filters: Filters = { search: 'Nonexistent' };
      const filteredBooks = filterBooks(books, filters);
      expect(filteredBooks).toEqual([]);
    });
  });
});
