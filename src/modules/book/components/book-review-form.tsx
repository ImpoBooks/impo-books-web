'use client';
import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

import ProductApi from '@/api/product-api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useUserStore from '@/hooks/store/use-user-store';

interface BookReviewFormProps {
  bookId: number;
}

const BookReviewForm: FC<BookReviewFormProps> = ({ bookId }) => {
  const { user } = useUserStore();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      content: '',
      rating: 0,
    },
  });

  const allFields = watch();
  const rating = watch('rating');

  const allFieldsFilled = Object.values(allFields).every((value) => value);

  const onSubmit = async (data: { content: string; rating: number }) => {
    if (!user) return;
    const review = {
      userId: user.id,
      content: data.content,
      rating: data.rating,
    };

    await ProductApi.sendComment(bookId, review);
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder="Напишіть свій відгук..."
            className="mb-2 h-[100px]"
          />
        )}
      />

      <div className="flex items-center space-x-2 mb-2">
        <span className="text-muted-foreground">Рейтинг:</span>
        {[1, 2, 3, 4, 5].map((ratingValue) => (
          <Button
            key={ratingValue}
            type="button"
            variant={rating === ratingValue ? 'default' : 'outline'}
            size="sm"
            onClick={() => setValue('rating', ratingValue)}
          >
            {ratingValue}
          </Button>
        ))}
      </div>

      <Button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={!allFieldsFilled}
        isLoading={isSubmitting}
      >
        Додати відгук
      </Button>
    </form>
  );
};

export default BookReviewForm;
