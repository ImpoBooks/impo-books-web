import { UseFormReturn } from 'react-hook-form';

import { toast } from '@/hooks/use-toast';
import { PasswordData, ProfileData } from '@/modules/profile/constants';

export const handleChangeProfileData = (values: ProfileData) => {
  toast({
    title: 'Оновлення профілю',
    description: 'Профіль оновлено!',
  });
  console.log(values);
};

export const handleChangePassword = (
  values: PasswordData,
  form: UseFormReturn<PasswordData>,
) => {
  toast({
    title: 'Зміна паролю',
    description: 'Пароль змінено!',
  });
  form.reset();
  console.log(values);
};
