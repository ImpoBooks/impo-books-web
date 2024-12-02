import { Comment } from '@/types/comment';

export type Book = {
  id: number;
  name: string;
  description?: string;
  format?: string;
  author: string;
  publisher?: string;
  genres?: string;
  releaseDate?: string;
  rating?: number;
  price: number;
  image?: string;
  comments: Comment[];
};

export type CartItem = {
  book: Book;
  count: number;
};
