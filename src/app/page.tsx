import { FC } from 'react';

import CatalogPage from '@/modules/catalog/catalog-page';
import { Filters } from '@/types/book';

interface CatalogProps {
  searchParams: Filters;
}

const Catalog: FC<CatalogProps> = async ({ searchParams }) => {
  return <CatalogPage filters={searchParams} />;
};

export default Catalog;
