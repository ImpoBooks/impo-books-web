export type Book = {
  id: string;
  name: string;
  genre?: string;
  author?: string;
  price: number;
  priceUnits?: string;
  rating?: number;
  image?: string;
  description?: string;
};

export type CartItem = {
  book: Book;
  count: number;
};
