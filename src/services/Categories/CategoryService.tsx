import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { CategoryModel } from '@/models/Categories/Categories';
import { tokenService } from '@/services/Auth/tokenService';

export const categoryService = {
  async getCategories(id: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {},
    });
    if (!response.ok) {
      throw new Error(`Failed to get categories: ${response.statusText}`);
    }
    return response.body;
  },

  async getCategoryById(id: string) {
    const token = tokenService.get();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${id}`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get categories: ${response.statusText}`);
    }
    return response.body;
  },

  async getCategoriesManagerial() {
    const token = tokenService.get();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/managerial`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to get managerial categories: ${response.statusText}`,
      );
    }
    return response.body;
  },

  async createCategory(values: CategoryModel) {
    try {
      const token = tokenService.get();
      const { _id, ...categoryData } = values;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`;
      const response = await HttpClient(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: categoryData,
      });

      if (!response.ok) {
        throw new Error(`Failed to create category: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(`Failed to create category: ${(error as Error).message}`);
    }
  },

  async updateCategory(values: CategoryModel) {
    try {
      const token = tokenService.get();
      const { _id, ...categoryData } = values;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${_id}`;
      const response = await HttpClient(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: categoryData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update category: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(`Failed to update category: ${(error as Error).message}`);
    }
  },

  async deleteCategory(id: string) {
    try {
      const token = tokenService.get();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${id}`;
      console.log(url);
      const response = await HttpClient(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete category: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(`Failed to delete category: ${(error as Error).message}`);
    }
  },
};
