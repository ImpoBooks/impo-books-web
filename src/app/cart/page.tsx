import { Metadata } from 'next';

import CartPage from '@/modules/cart/cart-page';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `ImpoBooks | Кошик`,
  };
};

const Cart = () => {
  return <CartPage />;
};

export default Cart;
