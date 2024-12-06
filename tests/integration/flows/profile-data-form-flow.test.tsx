import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import ProfileAPI from '@/api/profile-api';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse } from '@/lib/api';
import ProfileDataForm from '@/modules/profile/components/profile-data-form';

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

jest.mock('@/api/profile-api');
jest.mock('@/hooks/use-toast');

describe('ProfileDataForm Integration Tests', () => {
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
      name: '',
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
    });

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  it('renders the form correctly', () => {
    render(<ProfileDataForm user={{ name: 'Test' }} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText("Ім'я")).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Оновити профіль' }),
    ).toBeInTheDocument();
  });

  it('disables submit button when form is empty', () => {
    mockWatch.mockReturnValue({ name: '' });
    render(<ProfileDataForm user={{ name: '' }} />);
    expect(
      screen.getByRole('button', { name: 'Оновити профіль' }),
    ).toBeDisabled();
  });

  it('enables submit button when all fields are filled', () => {
    mockWatch.mockReturnValue({ name: 'Test' });
    render(<ProfileDataForm user={{ name: 'Test' }} />);
    expect(
      screen.getByRole('button', { name: 'Оновити профіль' }),
    ).toBeEnabled();
  });

  it('shows error message when name is too short', async () => {
    mockWatch.mockReturnValue({ name: 'T' });
    mockErrors.name = { message: "Ім'я повинно містити мінімум 2 символи" };

    render(<ProfileDataForm user={{ name: 'Test' }} />);

    fireEvent.click(screen.getByRole('button', { name: 'Оновити профіль' }));

    await waitFor(() => {
      expect(
        screen.getByText("Ім'я повинно містити мінімум 2 символи"),
      ).toBeInTheDocument();
    });
  });

  it('calls handleChangeName and reloads page on successful submission', async () => {
    mockWatch.mockReturnValue({ name: 'Test' });
    const mockChangeName = jest
      .spyOn(ProfileAPI, 'changeName')
      .mockResolvedValue({ status: 202 } as ApiResponse<unknown>);

    render(<ProfileDataForm user={{ name: 'Test' }} />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockChangeName).toHaveBeenCalledWith('Test');
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  it('shows error toast on failed submission', async () => {
    mockWatch.mockReturnValue({ name: 'Test' });
    const mockChangeName = jest
      .spyOn(ProfileAPI, 'changeName')
      .mockRejectedValue(new Error());

    render(<ProfileDataForm user={{ name: 'Test' }} />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockChangeName).toHaveBeenCalledWith('Test');
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Помилка',
        description: 'Не вдалося змінити ім`я. Спробуйте ще раз.',
        variant: 'destructive',
      });
    });
  });
});
