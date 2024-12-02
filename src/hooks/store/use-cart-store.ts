import { create } from 'zustand';

import { CartItem } from '@/types/book';

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
        id: 1,
        name: 'Sample Book',
        price: 10,
        author: 'Maksym Rybalko',
        comments: [],
      },
      count: 2,
    },
  ],
  addToCart: (item: CartItem) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (i) => i.book.name === item.book.name,
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.book.name === item.book.name
              ? { ...i, count: i.count + item.count }
              : i,
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }
    }),
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
