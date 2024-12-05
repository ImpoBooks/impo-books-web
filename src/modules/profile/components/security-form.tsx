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
import { handleChangePassword } from '@/utils/profile-utils';

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
            onSubmit={form.handleSubmit((values) =>
              handleChangePassword(values.newPassword, form),
            )}
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
