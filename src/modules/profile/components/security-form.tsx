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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { passwordFormFields } from '@/constants/password-form-fields';
import { toast } from '@/hooks/use-toast';
const SecurityForm = () => {
  const form = useForm<PasswordData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <AccordionItem value="security">
      <AccordionTrigger>Безпека</AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              try {
                await ProfileAPI.changePassword(values.newPassword);
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
            })}
            className="space-y-4"
          >
            {passwordFormFields.map((field) => (
              <FormField
                key={field.id}
                control={form.control}
                name={field.id as keyof PasswordData}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        {...formField}
                        type={field.type}
                        required={field.required}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? 'Зміна паролю...'
                : 'Змінити пароль'}
            </Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SecurityForm;
