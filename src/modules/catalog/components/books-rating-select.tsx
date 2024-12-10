'use client';
import { useQueryState } from 'nuqs';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const stars = ['3', '4', '4.5'];

const BooksRatingSelect = () => {
  const [minRating, setMinRating] = useQueryState('minRating', {
    shallow: false,
  });

  const handleRatingChange = (rating: string) => {
    if (rating === '0') {
      setMinRating(null);
      return;
    }
    setMinRating(rating);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="rating">Мінімальний рейтинг</Label>
      <Select
        onValueChange={handleRatingChange}
        defaultValue={minRating || undefined}
      >
        <SelectTrigger>
          <SelectValue
            data-testId="rating-selector"
            placeholder="Виберіть рейтинг"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Будь-який</SelectItem>
          {stars.map((star) => (
            <SelectItem key={star} value={star}>
              {star}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BooksRatingSelect;
