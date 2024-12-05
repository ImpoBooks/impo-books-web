import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import CartOrderForm from '@/modules/cart/components/cart-order-form';

describe('CartOrderForm Component Integration Tests', () => {
  const total = 252.52;

  it('calls the submit function with correct data when the form is submitted', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<CartOrderForm total={total} />);

    fireEvent.change(screen.getByLabelText("Ім'я"), {
      target: { value: 'Петро' },
    });
    fireEvent.change(screen.getByLabelText('Прізвище'), {
      target: { value: 'Петренко' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'petro@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Адреса'), {
      target: { value: '123 Book Street' },
    });
    fireEvent.change(screen.getByLabelText('Місто'), {
      target: { value: 'Суми' },
    });
    fireEvent.change(screen.getByLabelText('Поштовий індекс'), {
      target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText('Країна'), {
      target: { value: 'Україна' },
    });
    fireEvent.change(screen.getByLabelText('Номер картки'), {
      target: { value: '1234 5678 9012 3456' },
    });
    fireEvent.change(screen.getByLabelText('Термін дії'), {
      target: { value: '12/25' },
    });
    fireEvent.change(screen.getByLabelText('CVV'), {
      target: { value: '123' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith({
        firstName: 'Петро',
        lastName: 'Петренко',
        email: 'petro@example.com',
        address: '123 Book Street',
        city: 'Суми',
        postalCode: '12345',
        country: 'Україна',
        cardNumber: '1234 5678 9012 3456',
        expirationDate: '12/25',
        cvv: '123',
      });
    });

    consoleLogSpy.mockRestore();
  });
});
