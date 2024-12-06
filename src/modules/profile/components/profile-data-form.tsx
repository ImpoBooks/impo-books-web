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
import { Input } from '@/components/ui/input';
import { profileFormFields } from '@/constants/profile-form-fields';
import { useToast } from '@/hooks/use-toast';

const ProfileDataForm = ({ user }: { user: ProfileData }) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user!.name,
    },
  });

  const allFields = watch();
  const allFieldsFilled = Object.values(allFields).every((value) => value);
  const handleChangeName = async (name: string) => {
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

  return (
    <AccordionItem value="personal-info">
      <AccordionTrigger>Особиста інформація</AccordionTrigger>
      <AccordionContent>
        <form
          onSubmit={handleSubmit((values) => handleChangeName(values.name))}
          className="space-y-4"
          role="form"
        >
          {profileFormFields.map((field) => (
            <Input
              label={field.label}
              id={field.label}
              key={field.id}
              type={field.type}
              required={field.required}
              error={errors[field.id]?.message}
              {...register(field.id)}
            />
          ))}
          <Button type="submit" disabled={isSubmitting || !allFieldsFilled}>
            {isSubmitting ? 'Оновлення...' : 'Оновити профіль'}
          </Button>
        </form>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProfileDataForm;
