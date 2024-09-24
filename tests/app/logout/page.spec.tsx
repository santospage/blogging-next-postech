import { render } from '@testing-library/react';
import { tokenService } from '@/services/Auth/TokenService';
import { useRouter } from 'next/navigation';
import LogoutPage from '@/app/logout/page';

jest.mock('@/services/Auth/TokenService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe('LogoutPage Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('should log out the user and redirect', async () => {
    (tokenService.delete as jest.Mock).mockResolvedValueOnce({});

    render(<LogoutPage />);

    expect(tokenService.delete).toHaveBeenCalled();
    expect(sessionStorage.getItem('userSession')).toBeNull();
    expect(sessionStorage.getItem('userId')).toBeNull();
  });

  it('should handle logout failure', async () => {
    (tokenService.delete as jest.Mock).mockRejectedValueOnce(
      new Error('Logout error'),
    );

    render(<LogoutPage />);

    expect(tokenService.delete).toHaveBeenCalled();
  });

  it('should not log out multiple times', async () => {
    (tokenService.delete as jest.Mock).mockResolvedValueOnce({});

    const { rerender } = render(<LogoutPage />);

    expect(tokenService.delete).toHaveBeenCalledTimes(1);

    rerender(<LogoutPage />);

    expect(tokenService.delete).toHaveBeenCalledTimes(1);
  });
});
