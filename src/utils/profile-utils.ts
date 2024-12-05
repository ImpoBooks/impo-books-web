import { UseFormReturn } from 'react-hook-form';

import ProfileAPI from '@/api/profile-api';
import { toast } from '@/hooks/use-toast';
import { PasswordData } from '@/modules/profile/constants';

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

export const handleChangeName = async (name: string) => {
  try {
    await ProfileAPI.changeName(name);
    window.location.reload();
  } catch {
    toast({
      title: 'Помилка',
      description: 'Не вдалося змінити ім`я. Спробуйте ще раз.',
      variant: 'destructive',
    });
  }
};

export const handleChangePassword = async (
  password: string,
  form: UseFormReturn<PasswordData>,
) => {
  try {
    await ProfileAPI.changePassword(password);
    form.reset();
    toast({
      title: 'Успішно',
      description: 'Ваш пароль було змінено!',
      variant: 'default',
    });
  } catch {
    toast({
      title: 'Помилка',
      description: 'Не вдалося змінити пароль. Спробуйте ще раз.',
      variant: 'destructive',
    });
  }
};
