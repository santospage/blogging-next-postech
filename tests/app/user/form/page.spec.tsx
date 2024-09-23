import { render, screen, act, waitFor } from '@testing-library/react';
import FormPage from '@/app/user/form/[id]/page';
import { userService } from '@/services/Users/UserService';
import { authService } from '@/services/Auth/authService';
import { usePathname, useRouter } from 'next/navigation';

// Mock do serviço e do roteamento
jest.mock('@/services/Users/UserService');
jest.mock('@/services/Auth/authService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(), // Mock para o hook usePathname
}));

describe('FormPage', () => {
  const mockRouter = { push: jest.fn() };
  const mockParams = { id: '1' }; // ID de teste para simular o parâmetro da rota

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/user/form/1');
  });

  it('deve renderizar corretamente quando logado', async () => {
    // Mock da sessão do usuário
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (userService.getUserById as jest.Mock).mockResolvedValue({
      _id: '1',
      user: 'User Teste',
      password: 'teste',
    });

    // Renderiza o componente dentro do act() para garantir que o estado seja atualizado corretamente
    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    // Verifica se o título está presente
    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });

  it('deve redirecionar para o login se não estiver logado', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(false);

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/login?redirect=%2Fuser%2Fform%2F1',
    );
  });

  it('deve exibir um indicador de loading durante o carregamento', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (userService.getUserById as jest.Mock).mockResolvedValue({
      _id: '1',
      user: 'User Teste',
      password: 'teste',
    });

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Edit User')).toBeInTheDocument();
    });
  });
});
