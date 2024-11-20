'use client';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCartStore } from '@/hooks/store/use-cart-store';

export default function CartCheckoutPage() {
  const cart = useCartStore();

  const total = cart.cartItems.reduce(
    (sum, item) => sum + item.book.price * item.count,
    0,
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-2xl font-semibold">Кошик</h2>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            {cart.cartItems.map((item) => (
              <div
                key={item.book.id}
                className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <div>
                  <h3 className="font-medium">{item.book.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.book.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      item.count === 0 ? null : cart.decrementItem(item)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.count}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => cart.incrementItem(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => cart.deleteFromCart(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">Сума: ${total.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Оформити замовлення</h3>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium"
                  >
                    Ім&#39;я
                  </label>
                  <Input id="firstName" placeholder="Іван" />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium"
                  >
                    Прізвище
                  </label>
                  <Input id="lastName" placeholder="Іванов" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Ел. пошта
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium"
                >
                  Адреса
                </label>
                <Input id="address" placeholder="123 Book Street" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium"
                  >
                    Місто
                  </label>
                  <Input id="city" placeholder="Суми" />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block mb-2 text-sm font-medium"
                  >
                    Поштовий індекс
                  </label>
                  <Input id="postalCode" placeholder="12345" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium"
                >
                  Країна
                </label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ua">Україна</SelectItem>
                    <SelectItem value="ca">Канада</SelectItem>
                    <SelectItem value="pl">Польща</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block mb-2 text-sm font-medium"
                >
                  Номер картки
                </label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="expirationDate"
                    className="block mb-2 text-sm font-medium"
                  >
                    Термін дії
                  </label>
                  <Input id="expirationDate" placeholder="MM/YY" />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block mb-2 text-sm font-medium"
                  >
                    CVV
                  </label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                Замовити на суму (${total.toFixed(2)})
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
