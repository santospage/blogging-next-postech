import { userService } from '@/services/Users/UserService';
import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/TokenService';
import { UserModel } from '@/models/Users/Users';

jest.mock('@/infra/HttpClient/HttpClient');
jest.mock('@/services/Auth/TokenService');

describe('userService', () => {
  describe('getUsers', () => {
    it('should return users when response is ok', async () => {
      const token = 'mock-token';
      const mockUsers = [
        { _id: '1', user: 'User 1', password: 'mock-password' },
        { _id: '2', user: 'User 2', password: 'mock-password' },
      ];
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: mockUsers,
      });

      const users = await userService.getUsers();

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      expect(users).toEqual(mockUsers);
    });

    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(userService.getUsers()).rejects.toThrow(
        'Failed to get users: Not Found',
      );
    });
  });

  describe('getUserById', () => {
    it('should return a user when response is ok', async () => {
      const token = 'mock-token';
      const mockUser = { _id: '1', name: 'User 1' };
      const userId = '1';
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: mockUser,
      });

      const user = await userService.getUserById(userId);

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      expect(user).toEqual(mockUser);
    });

    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      const userId = '1';
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(userService.getUserById(userId)).rejects.toThrow(
        'Failed to get user: Not Found',
      );
    });
  });

  describe('createUser', () => {
    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      const newUser: UserModel = {
        _id: '2',
        user: 'User 2',
        password: 'mock-password',
      };
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
      });

      await expect(userService.createUser(newUser)).rejects.toThrow(
        'Failed to create user: Bad Request',
      );
    });
  });

  describe('updateUser', () => {
    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      const updatedUser: UserModel = {
        _id: '1',
        user: 'User 1',
        password: 'mock-password',
      };
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(userService.updateUser(updatedUser)).rejects.toThrow(
        'Failed to update user: Not Found',
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user when response is ok', async () => {
      const token = 'mock-token';
      const userId = '1';
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({ ok: true, body: {} });

      const response = await userService.deleteUser(userId);

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      expect(response).toEqual({});
    });

    it('should throw an error when response is not ok', async () => {
      const token = 'mock-token';
      const userId = '1';
      (tokenService.get as jest.Mock).mockReturnValue(token);
      (HttpClient as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(userService.deleteUser(userId)).rejects.toThrow(
        'Failed to delete user: Internal Server Error',
      );
    });
  });
});
