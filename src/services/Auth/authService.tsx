import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from './tokenService';
import { LoginValues } from '@/models/Login/LoginValues';

export const authService = {
  async login(values: LoginValues) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    return HttpClient(url, {
      method: 'POST',
      body: { user: values.user, password: values.password },
    }).then(async (response) => {
      if (!response.token) throw new Error(response.message);
      tokenService.save(response.token);
    });
  },

  async getSession() {
    const token = tokenService.get();
    if (!token) return false;

    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;
    try {
      const response = await HttpClient(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  },
};
