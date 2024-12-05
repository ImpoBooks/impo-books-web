'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProfileData, profileFormSchema } from '../constants';

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
import { profileFormFields } from '@/constants/profile-form-fields';
import { toast } from '@/hooks/use-toast';

const ProfileDataForm = ({ user }: { user: ProfileData }) => {
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user!.name,
    },
  });

  return (
    <AccordionItem value="personal-info">
      <AccordionTrigger>Особиста інформація</AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              try {
                await ProfileAPI.changeName(values.name);
                window.location.reload();
              } catch {
                toast({
                  title: 'Помилка',
                  description: 'Не вдалося змінити ім`я. Спробуйте ще раз.',
                  variant: 'destructive',
                });
              }
            })}
            className="space-y-4"
          >
            {profileFormFields.map((field) => (
              <FormField
                key={field.id}
                control={form.control}
                name={field.name as keyof ProfileData}
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
              {form.formState.isSubmitting ? 'Оновлення...' : 'Оновити профіль'}
            </Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProfileDataForm;