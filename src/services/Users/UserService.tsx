import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { UserModel } from '@/models/Users/Users';
import { tokenService } from '@/services/Auth/TokenService';

export const userService = {
  async getUsers() {
    const token = tokenService.get();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get users: ${response.statusText}`);
    }
    return response.body;
  },

  async getUserById(id: string) {
    const token = tokenService.get();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;
    const response = await HttpClient(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.statusText}`);
    }
    return response.body;
  },

  async createUser(values: UserModel) {
    try {
      const token = tokenService.get();
      const { _id, ...userData } = values;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;
      const response = await HttpClient(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: userData,
      });

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(`Failed to create user: ${(error as Error).message}`);
    }
  },

  async updateUser(values: UserModel) {
    try {
      const token = tokenService.get();
      const { _id, ...userData } = values;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${_id}`;
      const response = await HttpClient(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: userData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(`Failed to update user: ${(error as Error).message}`);
    }
  },

  async deleteUser(id: string) {
    try {
      const token = tokenService.get();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;
      const response = await HttpClient(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      return response.body;
    } catch (error) {
      throw new Error(`Failed to delete user: ${(error as Error).message}`);
    }
  },
};
