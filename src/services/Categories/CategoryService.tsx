import { HttpClient } from '@/infra/httpclient/HttpClient';

export const categoryService = {
  async getCategories() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {},
    });
    return response;
  },
};
