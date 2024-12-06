import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import ProfileAPI from '@/api/profile-api';
import { ProfileDialogs } from '@/constants/profile-dialogs';
import ProfileDialog from '@/modules/profile/components/profile-dialog';
import { handleDeleteProfile, handleLogout } from '@/utils/profile-utils';

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogFooter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    onClick,
    variant,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: string;
  }) => (
    <button onClick={onClick} data-variant={variant}>
      {children}
    </button>
  ),
}));

jest.mock('@/api/profile-api', () => ({
  deleteProfile: jest.fn(),
  logout: jest.fn(),
}));

describe('ProfileDialog Integration Tests', () => {
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  ProfileDialogs.forEach((dialog) => {
    describe(`${dialog.id} dialog`, () => {
      it('renders correctly', () => {
        render(
          <ProfileDialog
            open={true}
            onOpenChange={mockOnOpenChange}
            title={dialog.title}
            description={dialog.description}
            confirmLabel={dialog.confirmLabel}
            onConfirm={dialog.handle}
            confirmVariant={dialog.confirmVariant}
          />,
        );

        expect(screen.getByText(dialog.title)).toBeInTheDocument();
        expect(screen.getByText(dialog.description)).toBeInTheDocument();
        expect(screen.getByText(dialog.confirmLabel)).toBeInTheDocument();
        expect(screen.getByText('Скасувати')).toBeInTheDocument();
      });

      it('calls onOpenChange when cancel button is clicked', () => {
        render(
          <ProfileDialog
            open={true}
            onOpenChange={mockOnOpenChange}
            title={dialog.title}
            description={dialog.description}
            confirmLabel={dialog.confirmLabel}
            onConfirm={dialog.handle}
            confirmVariant={dialog.confirmVariant}
          />,
        );

        fireEvent.click(screen.getByText('Скасувати'));
        expect(mockOnOpenChange).toHaveBeenCalledWith(false);
      });

      it('calls handle function when confirm button is clicked', async () => {
        if (dialog.id === 'logout') {
          (ProfileAPI.logout as jest.Mock).mockResolvedValue({});
        } else if (dialog.id === 'delete') {
          (ProfileAPI.deleteProfile as jest.Mock).mockResolvedValue({});
        }

        render(
          <ProfileDialog
            open={true}
            onOpenChange={mockOnOpenChange}
            title={dialog.title}
            description={dialog.description}
            confirmLabel={dialog.confirmLabel}
            onConfirm={dialog.handle}
            confirmVariant={dialog.confirmVariant}
          />,
        );

        fireEvent.click(screen.getByText(dialog.confirmLabel));

        await waitFor(() => {
          if (dialog.id === 'logout') {
            expect(ProfileAPI.logout).toHaveBeenCalled();
          } else if (dialog.id === 'delete') {
            expect(ProfileAPI.deleteProfile).toHaveBeenCalled();
          }
        });
      });

      it('handles API failure', async () => {
        if (dialog.id === 'logout') {
          (ProfileAPI.logout as jest.Mock).mockRejectedValue(
            new Error('API Error'),
          );
        } else if (dialog.id === 'delete') {
          (ProfileAPI.deleteProfile as jest.Mock).mockRejectedValue(
            new Error('API Error'),
          );
        }

        render(
          <ProfileDialog
            open={true}
            onOpenChange={mockOnOpenChange}
            title={dialog.title}
            description={dialog.description}
            confirmLabel={dialog.confirmLabel}
            onConfirm={dialog.handle}
            confirmVariant={dialog.confirmVariant}
          />,
        );

        fireEvent.click(screen.getByText(dialog.confirmLabel));

        await waitFor(() => {
          if (dialog.id === 'logout') {
            expect(ProfileAPI.logout).toHaveBeenCalled();
          } else if (dialog.id === 'delete') {
            expect(ProfileAPI.deleteProfile).toHaveBeenCalled();
          }
        });
      });
    });
  });

  describe('handleDeleteProfile', () => {
    it('returns success true when API call succeeds', async () => {
      (ProfileAPI.deleteProfile as jest.Mock).mockResolvedValue({});
      const result = await handleDeleteProfile();
      expect(result).toEqual({ success: true });
    });

    it('returns success false when API call fails', async () => {
      (ProfileAPI.deleteProfile as jest.Mock).mockRejectedValue(
        new Error('API Error'),
      );
      const result = await handleDeleteProfile();
      expect(result).toEqual({ success: false });
    });
  });

  describe('handleLogout', () => {
    it('returns success true when API call succeeds', async () => {
      (ProfileAPI.logout as jest.Mock).mockResolvedValue({});
      const result = await handleLogout();
      expect(result).toEqual({ success: true });
    });

    it('returns success false when API call fails', async () => {
      (ProfileAPI.logout as jest.Mock).mockRejectedValue(
        new Error('API Error'),
      );
      const result = await handleLogout();
      expect(result).toEqual({ success: false });
    });
  });
});
