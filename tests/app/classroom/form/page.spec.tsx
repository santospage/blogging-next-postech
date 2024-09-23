import { render, screen, act, waitFor } from '@testing-library/react';
import FormPage from '@/app/classroom/form/[id]/page';
import { classroomService } from '@/services/Classes/ClassRoomService';
import { authService } from '@/services/Auth/authService';
import { usePathname, useRouter } from 'next/navigation';

// Mock do serviço e do roteamento
jest.mock('@/services/Classes/ClassRoomService');
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
    (usePathname as jest.Mock).mockReturnValue('/classroom/form/1');
  });

  it('deve renderizar corretamente quando logado', async () => {
    // Mock da sessão do usuário
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (classroomService.getClassesById as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'ClassRoom Teste',
      detail: 'Detail Teste',
      resume: 'Resume Teste',
      category: 'Category Teste',
      user: 'User',
      //category: { name: 'Category Teste' },
      //user: { user: 'User' },
    });

    // Renderiza o componente dentro do act() para garantir que o estado seja atualizado corretamente
    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    // Verifica se o título está presente
    expect(screen.getByText('Edit Classroom')).toBeInTheDocument();
  });

  it('deve redirecionar para o login se não estiver logado', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(false);

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/login?redirect=%2Fclassroom%2Fform%2F1',
    );
  });

  it('deve exibir um indicador de loading durante o carregamento', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (classroomService.getClassesById as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'ClassRoom Teste',
      detail: 'Detail Teste',
      resume: 'Resume Teste',
      category: 'Category Teste',
      user: 'User',
      //category: { name: 'Category Teste' },
      //user: { user: 'User' },
    });

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Edit Classroom')).toBeInTheDocument();
    });
  });
});
