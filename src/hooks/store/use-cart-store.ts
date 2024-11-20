import { create } from 'zustand';

import { Book } from '@/types';
type CartItem = {
  book: Book;
  count: number;
};

type CartState = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  deleteFromCart: (item: CartItem) => void;
  clearCart: () => void;
  incrementItem: (item: CartItem) => void;
  decrementItem: (item: CartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: [
    {
      book: {
        id: '1',
        name: "The Minimalist's Guide to Life",
        price: 15.99,
      },
      count: 1,
    },
    {
      book: {
        id: '2',
        name: 'Zen and the Art of Minimalism',
        price: 12.99,
      },
      count: 2,
    },
    {
      book: {
        id: '3',
        name: 'Less is More: A Novel',
        price: 9.99,
      },
      count: 1,
    },
  ],
  addToCart: (item: CartItem) =>
    set((state) => ({ cartItems: [...state.cartItems, item] })),
  deleteFromCart: (item: CartItem) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.book.id !== item.book.id),
    })),
  clearCart: () =>
    set(() => ({
      cartItems: [],
    })),
  incrementItem: (item: CartItem) =>
    set((state) => {
      return {
        cartItems: state.cartItems.map((i) =>
          i.book.id === item.book.id ? { ...i, count: i.count + 1 } : i,
        ),
      };
    }),
  decrementItem: (item: CartItem) =>
    set((state) => {
      return {
        cartItems: state.cartItems.map((i) =>
          i.book.id === item.book.id ? { ...i, count: i.count - 1 } : i,
        ),
      };
    }),
}));
