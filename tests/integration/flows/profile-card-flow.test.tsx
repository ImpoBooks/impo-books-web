import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { profileActionButtons } from '@/constants/profile-action-buttons';
import ProfileCard from '@/modules/profile/components/profile-card';
import { User } from '@/types/user';
import * as profileUtils from '@/utils/profile-utils';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/utils/user-utils', () => ({
  getNameAbbreviation: jest.fn((name) => name.charAt(0)),
}));

jest.mock('@/utils/profile-utils', () => ({
  handleLogout: jest.fn(),
  handleDeleteProfile: jest.fn(),
}));

describe('ProfileCard Integration Tests', () => {
  const mockUser: User = {
    id: 1,
    name: 'User',
    email: 'user@example.com',
  };
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));
  });

  it('renders user information when user is provided', () => {
    render(<ProfileCard user={mockUser} />);

    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    render(<ProfileCard user={mockUser} />);

    profileActionButtons.forEach((button) => {
      expect(screen.getByText(button.label)).toBeInTheDocument();
    });
  });

  it('opens logout dialog when logout button is clicked', async () => {
    render(<ProfileCard user={mockUser} />);
    const logoutButton = screen.getByText('Вийти');

    await act(async () => {
      fireEvent.click(logoutButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Підтвердження виходу')).toBeInTheDocument();
      expect(
        screen.getByText('Ви впевнені, що хочете вийти з облікового запису?'),
      ).toBeInTheDocument();
    });
  });

  it('opens delete account dialog when delete button is clicked', async () => {
    render(<ProfileCard user={mockUser} />);
    const deleteButton = screen.getByText('Видалити акаунт');

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Підтвердження видалення')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Ви впевнені, що хочете видалити свій обліковий запис? Ця дія є незворотною.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('calls handleLogout when logout is confirmed', async () => {
    (profileUtils.handleLogout as jest.Mock).mockResolvedValue({
      success: true,
    });
    render(<ProfileCard user={mockUser} />);

    const logoutButton = screen.getByText('Вийти');
    await act(async () => {
      fireEvent.click(logoutButton);
    });

    const confirmButton = screen.getByTestId('confirm');
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(profileUtils.handleLogout).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });

  it('calls handleDeleteProfile when delete account is confirmed', async () => {
    (profileUtils.handleDeleteProfile as jest.Mock).mockResolvedValue({
      success: true,
    });
    render(<ProfileCard user={mockUser} />);

    const deleteButton = screen.getByText('Видалити акаунт');
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = screen.getByText('Видалити', { selector: 'button' });
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(profileUtils.handleDeleteProfile).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });

  it('does not redirect on failed logout', async () => {
    (profileUtils.handleLogout as jest.Mock).mockResolvedValue({
      success: false,
    });
    render(<ProfileCard user={mockUser} />);

    const logoutButton = screen.getByText('Вийти');
    await act(async () => {
      fireEvent.click(logoutButton);
    });

    const confirmButton = screen.getByTestId('confirm');
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(profileUtils.handleLogout).toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  it('does not redirect on failed delete account', async () => {
    (profileUtils.handleDeleteProfile as jest.Mock).mockResolvedValue({
      success: false,
    });
    render(<ProfileCard user={mockUser} />);

    const deleteButton = screen.getByText('Видалити акаунт');
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    const confirmButton = screen.getByText('Видалити', { selector: 'button' });
    await act(async () => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(profileUtils.handleDeleteProfile).toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });
});
