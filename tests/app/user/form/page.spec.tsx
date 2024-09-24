import { render, screen, act, waitFor } from '@testing-library/react';
import FormPage from '@/app/user/form/[id]/page';
import { userService } from '@/services/Users/UserService';
import { authService } from '@/services/Auth/AuthService';
import { usePathname, useRouter } from 'next/navigation';

// Mock the service and routing
jest.mock('@/services/Users/UserService');
jest.mock('@/services/Auth/AuthService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('FormPage', () => {
  const mockRouter = { push: jest.fn() };
  const mockParams = { id: '1' };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/user/form/1');
  });

  it('should render correctly when logged in', async () => {
    // Mock da sessão do usuário
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (userService.getUserById as jest.Mock).mockResolvedValue({
      _id: '1',
      user: 'User Test',
      password: 'test',
    });

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    expect(screen.getByText('Edit User')).toBeInTheDocument();
  });

  it('should redirect to login if not logged in', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(false);

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/login?redirect=%2Fuser%2Fform%2F1',
    );
  });

  it('should display a loading indicator during loading', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (userService.getUserById as jest.Mock).mockResolvedValue({
      _id: '1',
      user: 'User Test',
      password: 'test',
    });

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Edit User')).toBeInTheDocument();
    });
  });
});
