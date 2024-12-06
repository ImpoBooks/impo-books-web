import ProfileAPI from '@/api/profile-api';

export const handleDeleteProfile = async () => {
  try {
    await ProfileAPI.deleteProfile();
    return { success: true };
  } catch {
    return { success: false };
  }
};

export const handleLogout = async () => {
  try {
    await ProfileAPI.logout();
    return { success: true };
  } catch {
    return { success: false };
  }
};
