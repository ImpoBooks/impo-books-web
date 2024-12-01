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
          <SelectValue placeholder="Виберіть рейтинг" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Будь-який</SelectItem>
          <SelectItem value="3">3+ зірок</SelectItem>
          <SelectItem value="4">4+ зірок</SelectItem>
          <SelectItem value="4.5">4.5+ зірок</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BooksRatingSelect;
