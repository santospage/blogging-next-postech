import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/TokenService';
import { LoginValues } from '@/models/Login/LoginValues';
import { UserModel } from '@/models/Users/Users';

export const authService = {
  async login(values: LoginValues) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    return HttpClient(url, {
      method: 'POST',
      body: { user: values.user, password: values.password },
    }).then(async (response) => {
      if (!response.body.token) throw new Error(response.statusText);
      tokenService.save(response.body.token);
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

      const userSession = sessionStorage.getItem('userSession');
      sessionStorage.removeItem('userId');

      const selectedUser = response.body.find(
        (user: UserModel) => user.user === userSession,
      );

      if (selectedUser) {
        sessionStorage.setItem('userId', selectedUser._id);
      }

      return true;
    } catch (error) {
      return false;
    }
  },
};
