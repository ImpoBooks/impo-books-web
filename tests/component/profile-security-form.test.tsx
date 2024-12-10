import { beforeEach, describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { passwordFormFields } from '@/constants/password-form-fields';
import SecurityForm from '@/modules/profile/components/security-form';

jest.mock('@/components/ui/button', () => ({
  Button: jest.fn(() => null),
}));

jest.mock('@/components/ui/input', () => ({
  Input: jest.fn(() => null),
}));

jest.mock('@/components/ui/accordion', () => ({
  AccordionItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  AccordionContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('SecurityForm Unit Tests', () => {
  beforeEach(() => {
    render(<SecurityForm />);
  });

  it('renders Input components with correct props', () => {
    passwordFormFields.forEach((field) => {
      expect(Input).toHaveBeenCalledWith(
        expect.objectContaining({
          type: field.type,
          required: field.required,
        }),
        {},
      );
    });
  });

  it('renders Button components with correct props', () => {
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        type: 'submit',
        children: 'Змінити пароль',
      }),
      {},
    );
  });

  it('disables submit button when submitting', () => {
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
      }),
      {},
    );
  });
});
