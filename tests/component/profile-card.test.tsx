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

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/utils/user-utils', () => ({
  getNameAbbreviation: jest.fn((name) => name.charAt(0)),
}));

describe('ProfileCard', () => {
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

  it('opens dialog when action button is clicked', async () => {
    render(<ProfileCard user={mockUser} />);
    const button = screen.getByText('Вийти');

    await act(async () => fireEvent.click(button));
    await waitFor(() => {
      expect(screen.getByText('Підтвердження виходу')).toBeInTheDocument();
    });
  });
});
