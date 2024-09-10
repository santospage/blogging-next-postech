import { HttpClient } from '@/infra/httpclient/HttpClient';

export const categoriesService = {
  async getCategories() {
    const response = await HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
      {
        method: 'GET',
        headers: {},
      },
    );

    return response;
  },
};
