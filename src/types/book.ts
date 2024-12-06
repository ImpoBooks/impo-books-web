import { Comment } from '@/types/comment';

export type Book = {
  id: number;
  name: string;
  description?: string;
  format?: string;
  author: string;
  publisher?: string;
  price: number;
  genres: string;
  releaseDate: string;
  rating: number;
  image?: string;
  comments: Comment[];
};

export type CartItem = {
  book: Book;
  count: number;
};

export interface Prices {
  min: number;
  max: number;
}

export interface Filters {
  search?: string;
  genre?: string;
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
}
