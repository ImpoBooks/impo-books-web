import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import CartOrderForm from '@/modules/cart/components/cart-order-form';

describe('CartOrderForm', () => {
  const total = 100;

  it('renders the form fields correctly', () => {
    render(<CartOrderForm total={total} />);

    expect(screen.getByLabelText("Ім'я")).toBeInTheDocument();
    expect(screen.getByLabelText('Прізвище')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Адреса')).toBeInTheDocument();
    expect(screen.getByLabelText('Місто')).toBeInTheDocument();
    expect(screen.getByLabelText('Поштовий індекс')).toBeInTheDocument();
    expect(screen.getByLabelText('Країна')).toBeInTheDocument();
    expect(screen.getByLabelText('Номер картки')).toBeInTheDocument();
    expect(screen.getByLabelText('Термін дії')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Замовити на суму/i }),
    ).toBeInTheDocument();
  });

  it('disables the submit button when not all fields are filled', () => {
    render(<CartOrderForm total={total} />);

    const submitButton = screen.getByRole('button', {
      name: /Замовити на суму/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it('enables the submit button when all fields are filled', () => {
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

    const submitButton = screen.getByRole('button', {
      name: /Замовити на суму/i,
    });
    expect(submitButton).not.toBeDisabled();
  });
});
