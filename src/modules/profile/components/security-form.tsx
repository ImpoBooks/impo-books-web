'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PasswordData, passwordFormSchema } from '../constants';

import ProfileAPI from '@/api/profile-api';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { passwordFormFields } from '@/constants/password-form-fields';
import { useToast } from '@/hooks/use-toast';

const SecurityForm = () => {
  const { toast } = useToast();
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
  const allFieldsFilled =
    allFields && Object.values(allFields).every((value) => value);

  const handleChangePassword = async (password: string) => {
    try {
      await ProfileAPI.changePassword(password);
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
