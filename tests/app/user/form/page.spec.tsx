import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormPage from '@/app/user/form/[id]/page'; // Ajuste o caminho conforme necessário
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/services/Auth/authService'; // Importando o authService

// Mock do serviço e do router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/services/Auth/authService', () => ({
  getSession: jest.fn(),
}));

describe('FormPage Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/some-path'); // Mockando usePathname
    //(authService.getSession as jest.Mock).mockResolvedValue(true); // Simulando que o usuário está logado
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('should redirect to login if not logged in', async () => {
    //(authService.getSession as jest.Mock).mockResolvedValue(false); // Simulando que o usuário não está logado

    render(<FormPage params={{ id: 'new' }} />);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        '/login?redirect=%2Fsome-path',
      );
    });
  });
});
