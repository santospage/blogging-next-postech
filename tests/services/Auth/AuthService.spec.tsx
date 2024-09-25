import { authService } from '@/services/Auth/AuthService';
import { HttpClient } from '@/infra/HttpClient/HttpClient';
import { tokenService } from '@/services/Auth/TokenService';

jest.mock('@/infra/HttpClient/HttpClient');
jest.mock('@/services/Auth/TokenService');

describe('authService', () => {
  const loginValues = {
    user: 'testuser',
    password: 'testpassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should save token and handle successful login', async () => {
      (HttpClient as jest.Mock).mockResolvedValue({
        body: { token: 'mockToken' },
      });

      await authService.login(loginValues);

      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          method: 'POST',
          body: { user: 'testuser', password: 'testpassword' },
        },
      );
      expect(tokenService.save).toHaveBeenCalledWith('mockToken');
    });

    it('should throw an error if no token is returned', async () => {
      (HttpClient as jest.Mock).mockResolvedValue({
        body: {},
        statusText: 'No token',
      });

      await expect(authService.login(loginValues)).rejects.toThrow('No token');
      expect(tokenService.save).not.toHaveBeenCalled();
    });
  });

  describe('getSession', () => {
    // eslint-disable-next-line max-len
    it('should return true if a valid token is found and user is selected', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockResolvedValue({
        body: [{ user: 'testuser', _id: 'userId' }],
      });
      sessionStorage.setItem('userSession', 'testuser');

      const result = await authService.getSession();

      expect(tokenService.get).toHaveBeenCalled();
      expect(HttpClient).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer validToken',
          },
        },
      );
      expect(sessionStorage.getItem('userId')).toBe('userId');
      expect(result).toBe(true);
    });

    it('should return false if no token is found', async () => {
      (tokenService.get as jest.Mock).mockReturnValue(null);

      const result = await authService.getSession();

      expect(tokenService.get).toHaveBeenCalled();
      expect(result).toBe(false);
    });

    // eslint-disable-next-line max-len
    it('should return false if an error occurs during the API call', async () => {
      (tokenService.get as jest.Mock).mockReturnValue('validToken');
      (HttpClient as jest.Mock).mockRejectedValue(new Error('API Error'));

      const result = await authService.getSession();

      expect(result).toBe(false);
    });
  });
});
