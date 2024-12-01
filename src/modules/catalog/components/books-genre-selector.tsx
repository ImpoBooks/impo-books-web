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

const BooksGenreSelector = () => {
  const [genre, setGenre] = useQueryState('genre', { shallow: false });

  const handleGenreChange = (genre: string) => {
    if (genre === 'all') {
      setGenre(null);
      return;
    }
    setGenre(genre);
  };

  return (
    <div className="space-y-1">
      <Label htmlFor="genre">Жанр</Label>
      <Select
        onValueChange={handleGenreChange}
        defaultValue={genre || undefined}
      >
        <SelectTrigger>
          <SelectValue placeholder="Виберіть жанр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Всі жанри</SelectItem>
          <SelectItem value="Fiction">Fiction</SelectItem>
          <SelectItem value="Science Fiction">Science Fiction</SelectItem>
          <SelectItem value="Romance">Romance</SelectItem>
          <SelectItem value="Fantasy">Fantasy</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BooksGenreSelector;
