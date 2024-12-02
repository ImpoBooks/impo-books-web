import api from '@/lib/api';
import config from '@/lib/env';
import { Book } from '@/types/book';

type CommentRequest = {
  userId: number;
  content: string;
  rating: number;
};

class ProductAPI {
  async getBookById(id: number) {
    const res = await fetch(`${config.API_URL}/product/${id}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-store',
      },
      cache: 'no-store',
    });
    const data: Book = await res.json();
    return data;
  }

  async sendComment(id: number, comment: CommentRequest) {
    return await api.post(`/product/${id}/comment`, {
      body: comment,
      withCredentials: true,
    });
  }

  async likeComment(bookId: number, commentId: number) {
    return await api.put(`/product/${bookId}/comment/like`, {
      body: commentId,
      withCredentials: true,
    });
  }

  async dislikeComment(bookId: number, commentId: number) {
    return await api.put(`/product/${bookId}/comment/dislike`, {
      body: commentId,
      withCredentials: true,
    });
  }
}

export default new ProductAPI();
