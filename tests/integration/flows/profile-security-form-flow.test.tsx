import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import ProfileAPI from '@/api/profile-api';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse } from '@/lib/api';
import SecurityForm from '@/modules/profile/components/security-form';

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

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('@/api/auth-api');
jest.mock('@/hooks/use-toast');

describe('SecurityForm Integration Tests', () => {
  const mockToast = jest.fn();
  let mockHandleSubmit: jest.Mock;
  let mockRegister: jest.Mock;
  let mockWatch: jest.Mock;
  let mockErrors: Record<string, { message: string }>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockErrors = {};
    mockRegister = jest.fn((name) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }));
    mockWatch = jest.fn().mockReturnValue({
      newPassword: '',
      confirmPassword: '',
    });
    mockHandleSubmit = jest.fn((cb) => () => {
      const formValues = mockWatch();
      return cb(formValues);
    });

    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      watch: mockWatch,
      formState: { errors: mockErrors, isSubmitting: false },
      reset: jest.fn(),
    });
  });

  it('renders the form correctly', () => {
    render(<SecurityForm />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText('Новий пароль')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Підтвердження нового пароля'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Змінити пароль' }),
    ).toBeInTheDocument();
  });

  it('enables submit button when all fields are filled', async () => {
    mockWatch.mockReturnValue({
      newPassword: 'successful',
      confirmPassword: 'successful',
    });
    render(<SecurityForm />);

    expect(
      screen.getByRole('button', { name: 'Змінити пароль' }),
    ).toBeEnabled();
  });

  it('shows error message when password is too short', async () => {
    mockWatch.mockReturnValue({
      newPassword: 'short',
      confirmPassword: 'short',
    });
    mockErrors.newPassword = {
      message: 'Пароль повинен містити мінімум 8 символів',
    };

    render(<SecurityForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Змінити пароль' }));

    await waitFor(() => {
      expect(
        screen.getByText('Пароль повинен містити мінімум 8 символів'),
      ).toBeInTheDocument();
    });
  });

  it('shows error message when passwords do not match', async () => {
    mockWatch.mockReturnValue({
      newPassword: 'newpassword123',
      confirmPassword: 'differentpassword',
    });
    mockErrors.confirmPassword = { message: 'Паролі не співпадають' };

    render(<SecurityForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Змінити пароль' }));

    await waitFor(() => {
      expect(screen.getByText('Паролі не співпадають')).toBeInTheDocument();
    });
  });

  it('calls handleChangePassword and shows success toast on successful submission', async () => {
    mockWatch.mockReturnValue({
      newPassword: 'successful',
      confirmPassword: 'successful',
    });

    const mockChangePassword = jest
      .spyOn(ProfileAPI, 'changePassword')
      .mockResolvedValue({ status: 201 } as ApiResponse<unknown>);
    render(<SecurityForm />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledWith('successful');
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Успішно',
        description: 'Ваш пароль було змінено!',
        variant: 'default',
      });
    });
  });

  it('shows error toast on failed submission', async () => {
    jest.spyOn(ProfileAPI, 'changePassword').mockRejectedValue(new Error());
    render(<SecurityForm />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка',
        description: 'Не вдалося змінити пароль. Спробуйте ще раз.',
        variant: 'destructive',
      });
    });
  });

  it('resets form after successful submission', async () => {
    jest
      .spyOn(ProfileAPI, 'changePassword')
      .mockResolvedValue({ status: 201 } as ApiResponse<unknown>);

    render(<SecurityForm />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByLabelText('Новий пароль')).toHaveValue('');
      expect(screen.getByLabelText('Підтвердження нового пароля')).toHaveValue(
        '',
      );
    });
  });
});
