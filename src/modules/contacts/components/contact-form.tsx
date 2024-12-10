'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { formItems } from '@/constants/form-items';
import { useToast } from '@/hooks/use-toast';
import {
  contactsFormSchema,
  contactsFormValues,
  FormValues,
} from '@/modules/contacts/constants';

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(contactsFormSchema),
    defaultValues: contactsFormValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormValues> = async () => {
    setIsSubmitting(true);
    try {
      reset();
    } catch {
      toast({
        title: 'Помилка при надісланні повідомлення',
        description: 'Перевірте правильність введених даних',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" role="form" onSubmit={handleSubmit(onSubmit)}>
      {formItems.map(({ id, label, component: Component, ...props }) => {
        return (
          <div key={id}>
            <label htmlFor={id} className="block mb-2 text-sm font-medium">
              {label}
            </label>
            <Component
              id={id}
              {...register(id as keyof FormValues, {})}
              {...props}
            />
            {errors[id as keyof FormValues] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[id as keyof FormValues]?.message}
              </p>
            )}
          </div>
        );
      })}
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Відправляється...' : 'Відправити'}
      </Button>
    </form>
  );
};

export default ContactForm;
