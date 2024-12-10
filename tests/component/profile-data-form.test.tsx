import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/dom';
import ProfileDataForm from '@/modules/profile/components/profile-data-form';
import { ProfileData } from '@/modules/profile/constants';

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

jest.mock('@/utils/profile-utils', () => ({
  handleChangeName: jest.fn(),
}));

describe('ProfileDataForm', () => {
  const mockUser: ProfileData = {
    name: 'User',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with user data', () => {
    render(<ProfileDataForm user={mockUser} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText("Ім'я")).toBeInTheDocument();
  });

  it('disables submit button when form is empty', () => {
    render(<ProfileDataForm user={mockUser} />);
    expect(screen.getByText('Оновити профіль')).not.toBeDisabled();
  });

  it('enables submit button when form is filled', () => {
    render(<ProfileDataForm user={mockUser} />);
    const nameInput = screen.getByDisplayValue('User');

    fireEvent.change(nameInput, { target: { value: 'New Name' } });

    expect(
      screen.getByRole('button', { name: 'Оновити профіль' }),
    ).toBeEnabled();
  });

  it('disables submit button when form is empty', () => {
    render(<ProfileDataForm user={{ name: '' }} />);

    expect(
      screen.getByRole('button', { name: 'Оновити профіль' }),
    ).toBeDisabled();
  });

  it('enables submit button when form is filled', async () => {
    render(<ProfileDataForm user={mockUser} />);

    const nameInput = screen.getByLabelText("Ім'я");
    fireEvent.change(nameInput, { target: { value: 'New Name' } });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Оновити профіль' }),
      ).toBeEnabled();
    });
  });

  it('displays error message for invalid name', async () => {
    render(<ProfileDataForm user={mockUser} />);

    const nameInput = screen.getByLabelText("Ім'я");
    fireEvent.change(nameInput, { target: { value: 'A' } });

    const submitButton = screen.getByRole('button', {
      name: 'Оновити профіль',
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Ім'я повинно містити мінімум 2 символи"),
      ).toBeInTheDocument();
    });
  });

  it('changes button text when submitting', () => {
    render(<ProfileDataForm user={mockUser} />);

    const nameInput = screen.getByLabelText("Ім'я");
    fireEvent.change(nameInput, { target: { value: 'New Name' } });

    const submitButton = screen.getByRole('button', {
      name: 'Оновити профіль',
    });

    fireEvent.click(submitButton);
    expect(submitButton).toHaveTextContent('Оновлення...');
  });
});
