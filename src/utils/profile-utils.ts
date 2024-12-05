import ProfileAPI from '@/api/profile-api';
import { toast } from '@/hooks/use-toast';
import { ProfileData } from '@/modules/profile/constants';
export const handleChangeProfileData = (values: ProfileData) => {
  toast({
    title: 'Оновлення профілю',
    description: 'Профіль оновлено!',
  });
  console.log(values);
};

export const handleDeleteProfile = async () => {
  try {
    await ProfileAPI.deleteProfile();
  } catch {
    toast({
      title: 'Помилка',
      description: 'Не вдалося змінити пароль. Спробуйте ще раз.',
      variant: 'destructive',
    });
  }
};

export const handleLogout = async () => {
  try {
    await ProfileAPI.logout();
  } catch {
    toast({
      title: 'Помилка',
      description: 'Не вдалося вийти з профілю. Спробуйте ще раз.',
      variant: 'destructive',
    });
  }
};
