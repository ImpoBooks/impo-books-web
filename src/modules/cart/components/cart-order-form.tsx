import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { orderDefaultValues, OrderFormValues } from '@/modules/cart/constants';

interface CartOrderFormProps {
  total: number;
}
const CartOrderForm: FC<CartOrderFormProps> = ({ total }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<OrderFormValues>({
    defaultValues: orderDefaultValues,
  });

  const allFields = watch();

  const allFieldsFilled = Object.values(allFields).every((value) => value);

  const handleOrder = (data: OrderFormValues) => {
    console.log(data);
  };
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Оформити замовлення</h3>
      <form
        onSubmit={handleSubmit(handleOrder)}
        className="space-y-4"
        role="form"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Ім'я"
            id="order-firstName"
            type="text"
            placeholder="Петро"
            required
            {...register('firstName')}
          />
          <Input
            label="Прізвище"
            id="order-lastName"
            type="text"
            placeholder="Петренко"
            required
            {...register('lastName')}
          />
        </div>
        <Input
          label="Email"
          id="order-email"
          type="text"
          placeholder="your@mail.com"
          required
          {...register('email')}
        />
        <Input
          label="Адреса"
          id="order-address"
          type="text"
          placeholder="123 Book Street"
          required
          {...register('address')}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Місто"
            id="order-city"
            type="text"
            placeholder="Суми"
            required
            {...register('city')}
          />
          <Input
            label="Поштовий індекс"
            id="order-postalCode"
            type="text"
            placeholder="12345"
            required
            {...register('postalCode')}
          />
        </div>
        <Input
          label="Країна"
          id="order-country"
          type="text"
          placeholder="Україна"
          required
          {...register('country')}
        />
        {/*<div>*/}
        {/*  <Label htmlFor="country" className="block mb-2 text-sm font-medium">*/}
        {/*    Країна*/}
        {/*  </Label>*/}
        {/*  <Select>*/}
        {/*    <SelectTrigger id="country">*/}
        {/*      <SelectValue placeholder="Оберіть країну" />*/}
        {/*    </SelectTrigger>*/}
        {/*    <SelectContent>*/}
        {/*      <SelectItem value="ua">Україна</SelectItem>*/}
        {/*      <SelectItem value="ca">Канада</SelectItem>*/}
        {/*      <SelectItem value="pl">Польща</SelectItem>*/}
        {/*    </SelectContent>*/}
        {/*  </Select>*/}
        {/*</div>*/}
        <Input
          label="Номер картки"
          id="order-cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          required
          {...register('cardNumber')}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Термін дії"
            id="order-expirationDate"
            type="text"
            placeholder="MM/YY"
            required
            {...register('expirationDate')}
          />
          <Input
            label="CVV"
            id="order-cvv"
            type="text"
            placeholder="123"
            required
            {...register('cvv')}
          />
        </div>
        <Button
          disabled={!allFieldsFilled}
          isLoading={isSubmitting}
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Замовити на суму (${total.toFixed(2)})
        </Button>
      </form>
    </div>
  );
};

export default CartOrderForm;
