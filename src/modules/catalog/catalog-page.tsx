import { FC, Suspense } from 'react';

import BooksFilters from '@/modules/catalog/components/books-filters';
import BooksList from '@/modules/catalog/components/books-list';
import { Filters } from '@/types/book';

interface CatalogPageProps {
  filters: Filters;
}

const CatalogPage: FC<CatalogPageProps> = async ({ filters }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Каталог книг</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <BooksFilters />
        <Suspense fallback={<p>Завантаження...</p>}>
          <BooksList filters={filters} />
        </Suspense>
      </div>
    </div>
  );
};

export default CatalogPage;
