import { z } from 'zod';

export const ProfileData = {
  name: '',
};

export const PasswordData = {
  newPassword: '',
  confirmPassword: '',
};

export const profileFormSchema = z.object({
  name: z.string().min(2, "Ім'я повинно містити мінімум 2 символи"),
});

export const passwordFormSchema = z
  .object({
    newPassword: z.string().min(8, 'Пароль повинен містити мінімум 8 символів'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export type ProfileData = z.infer<typeof profileFormSchema>;
export type PasswordData = z.infer<typeof passwordFormSchema>;
