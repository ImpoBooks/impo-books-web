import { FC } from 'react';

import CatalogAPI from '@/api/catalog-api';
import BooksGenreSelector from '@/modules/catalog/components/books-genre-selector';
import BooksPriceSlider from '@/modules/catalog/components/books-price-slider';
import BooksRatingSelect from '@/modules/catalog/components/books-rating-select';
import BooksSearch from '@/modules/catalog/components/books-search';
import { Book } from '@/types/book';

const BooksFilters: FC = async () => {
  let books: Book[] = [];
  try {
    const { data } = await CatalogAPI.getCatalog();
    books = data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="md:col-span-1">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Фільтри</h2>
        <div className="space-y-4">
          <BooksSearch />
          <BooksGenreSelector />
          <BooksPriceSlider books={books} />
          <BooksRatingSelect />
        </div>
      </div>
    </div>
  );
};

export default BooksFilters;
