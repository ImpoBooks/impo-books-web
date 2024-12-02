import { z } from 'zod';

export const contactsFormValues = {
  name: '',
  email: '',
  message: '',
};

export const contactsFormSchema = z.object({
  name: z.string().nonempty({ message: 'Поле не може бути пустим' }),
  email: z.string().email({ message: 'Невірний формат email' }),
  message: z.string().min(20, { message: 'Мінімум 20 символів' }),
});

export type FormValues = z.infer<typeof contactsFormSchema>;
