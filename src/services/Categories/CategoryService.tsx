import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/tokenService';

export const categoryService = {
  async getCategories() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {},
    });
    return response;
  },

  async getCategoriesManagerial() {
    const token = tokenService.get();

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/managerial`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};
