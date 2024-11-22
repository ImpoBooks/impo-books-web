'use client';
import { useCartStore } from '@/hooks/store/use-cart-store';
import CartItemsList from '@/modules/cart/components/cart-items-list';
import CartOrderForm from '@/modules/cart/components/cart-order-form';

const CartPage = () => {
  const { cartItems } = useCartStore();

  const total = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.count,
    0,
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-2xl font-semibold">Кошик</h2>
        <div className="grid gap-12 lg:grid-cols-2">
          <CartItemsList cartItems={cartItems} total={total} />
          <CartOrderForm total={total} />
        </div>
      </main>
    </div>
  );
};

export default CartPage;
