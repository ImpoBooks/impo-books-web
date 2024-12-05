'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PasswordData, passwordFormSchema } from '../constants';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { passwordFormFields } from '@/constants/password-form-fields';
import { handleChangePassword } from '@/utils/profile-utils';

const SecurityForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: PasswordData,
  });

  const allFields = watch();
  const allFieldsFilled = Object.values(allFields).every((value) => value);

  return (
    <AccordionItem value="security">
      <AccordionTrigger>Безпека</AccordionTrigger>
      <AccordionContent>
        <form
          onSubmit={handleSubmit((values) => {
            handleChangePassword(values.newPassword);
            reset();
          })}
          className="space-y-4"
        >
          {passwordFormFields.map((field) => (
            <Input
              label={field.label}
              key={field.id}
              type={field.type}
              required={field.required}
              error={errors[field.id]?.message}
              {...register(field.id)}
            />
          ))}
          <Button type="submit" disabled={isSubmitting || !allFieldsFilled}>
            {isSubmitting ? 'Зміна паролю...' : 'Змінити пароль'}
          </Button>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SecurityForm;
