'use client';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

const BooksSearch = () => {
  const [urlSearch, setUrlSearch] = useQueryState('search', { shallow: false });
  const [search, setSearch] = useState<string | null>(urlSearch || '');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value === '') {
      setUrlSearch(null);
      return;
    }
    setUrlSearch(e.target.value);
  };

  return (
    <Input
      label="Пошук"
      id="search"
      type="text"
      placeholder="Назва, автор або ключові слова"
      value={search || ''}
      onChange={handleSearch}
    />
  );
};

export default BooksSearch;
