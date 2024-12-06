import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { ProfileDialogs } from '@/constants/profile-dialogs';
import ProfileDialog from '@/modules/profile/components/profile-dialog';
import * as profileUtils from '@/utils/profile-utils';

// Mock the profile utils
jest.mock('@/utils/profile-utils', () => ({
  handleLogout: jest.fn(),
  handleDeleteProfile: jest.fn(),
}));

describe('ProfileDialog Unit Tests', () => {
  const mockOnOpenChange = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render the dialog when closed', () => {
    render(
      <ProfileDialog
        open={false}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        description="Test Description"
        confirmLabel="Confirm"
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when cancel button is clicked', () => {
    render(
      <ProfileDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        description="Test Description"
        confirmLabel="Confirm"
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText('Скасувати'));

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    render(
      <ProfileDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        description="Test Description"
        confirmLabel="Confirm"
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText('Confirm'));

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('renders with destructive variant when specified', () => {
    render(
      <ProfileDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        description="Test Description"
        confirmLabel="Delete"
        onConfirm={mockOnConfirm}
        confirmVariant="destructive"
      />,
    );

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toHaveClass('bg-destructive');
  });

  it('renders logout dialog correctly', () => {
    const logoutDialog = ProfileDialogs.find(
      (dialog) => dialog.id === 'logout',
    );
    if (!logoutDialog) throw new Error('Logout dialog not found');

    render(
      <ProfileDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title={logoutDialog.title}
        description={logoutDialog.description}
        confirmLabel={logoutDialog.confirmLabel}
        onConfirm={logoutDialog.handle}
        confirmVariant={logoutDialog.confirmVariant}
      />,
    );

    expect(screen.getByText('Підтвердження виходу')).toBeInTheDocument();
    expect(
      screen.getByText('Ви впевнені, що хочете вийти з облікового запису?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Вийти')).toBeInTheDocument();
  });

  it('renders delete account dialog correctly', () => {
    const deleteDialog = ProfileDialogs.find(
      (dialog) => dialog.id === 'delete',
    );
    if (!deleteDialog) throw new Error('Delete dialog not found');

    render(
      <ProfileDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title={deleteDialog.title}
        description={deleteDialog.description}
        confirmLabel={deleteDialog.confirmLabel}
        onConfirm={deleteDialog.handle}
        confirmVariant={deleteDialog.confirmVariant}
      />,
    );

    expect(screen.getByText('Підтвердження видалення')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Ви впевнені, що хочете видалити свій обліковий запис? Ця дія є незворотною.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Видалити')).toBeInTheDocument();
    expect(screen.getByText('Видалити')).toHaveClass('bg-destructive');
  });

  it('calls handleLogout when logout dialog is confirmed', async () => {
    const logoutDialog = ProfileDialogs.find(
      (dialog) => dialog.id === 'logout',
    );
    if (!logoutDialog) throw new Error('Logout dialog not found');

    render(
      <ProfileDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title={logoutDialog.title}
        description={logoutDialog.description}
        confirmLabel={logoutDialog.confirmLabel}
        onConfirm={logoutDialog.handle}
        confirmVariant={logoutDialog.confirmVariant}
      />,
    );

    fireEvent.click(screen.getByText('Вийти'));

    expect(profileUtils.handleLogout).toHaveBeenCalled();
  });

  it('calls handleDeleteProfile when delete account dialog is confirmed', async () => {
    const deleteDialog = ProfileDialogs.find(
      (dialog) => dialog.id === 'delete',
    );
    if (!deleteDialog) throw new Error('Delete dialog not found');

    render(
      <ProfileDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        title={deleteDialog.title}
        description={deleteDialog.description}
        confirmLabel={deleteDialog.confirmLabel}
        onConfirm={deleteDialog.handle}
        confirmVariant={deleteDialog.confirmVariant}
      />,
    );

    fireEvent.click(screen.getByText('Видалити'));

    expect(profileUtils.handleDeleteProfile).toHaveBeenCalled();
  });
});
