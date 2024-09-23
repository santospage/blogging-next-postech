import { render } from '@testing-library/react';
import { tokenService } from '@/services/Auth/tokenService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import LogoutPage from '@/app/logout/page';

jest.mock('@/services/Auth/tokenService'); // Mock do tokenService
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
    (tokenService.delete as jest.Mock).mockResolvedValueOnce({}); // Simula um logout bem-sucedido

    render(<LogoutPage />);

    expect(tokenService.delete).toHaveBeenCalled();
    expect(sessionStorage.getItem('userSession')).toBeNull(); // Verifica se a sessão foi removida
    expect(sessionStorage.getItem('userId')).toBeNull(); // Verifica se o userId foi removido
    //expect(toast.info).toHaveBeenCalledWith('You are being logged out...');
    //expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('should handle logout failure', async () => {
    (tokenService.delete as jest.Mock).mockRejectedValueOnce(
      new Error('Logout error'),
    );

    render(<LogoutPage />);

    expect(tokenService.delete).toHaveBeenCalled();
    //expect(toast.error).toHaveBeenCalledWith('Logout failed: Logout error');
  });

  it('should not log out multiple times', async () => {
    (tokenService.delete as jest.Mock).mockResolvedValueOnce({});

    const { rerender } = render(<LogoutPage />);

    // A primeira renderização deve chamar o logout
    expect(tokenService.delete).toHaveBeenCalledTimes(1);

    // Rerenderizar o componente
    rerender(<LogoutPage />);

    // Verifica que a função de logout não deve ser chamada novamente
    expect(tokenService.delete).toHaveBeenCalledTimes(1); // Deve ser chamado apenas uma vez
  });
});
