import api from '@/lib/api';
import { Book } from '@/types/book';

class CatalogAPI {
  async getCatalog() {
    return await api.get<Book[]>('/catalog', {
      withCredentials: true,
    });
  }
}

export default new CatalogAPI();
