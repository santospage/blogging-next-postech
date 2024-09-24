import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { authService } from '@/services/Auth/AuthService';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import LoginPage from '@/app/login/page';

jest.mock('@/services/Auth/AuthService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('LoginPage Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue('/'),
    });
  });

  it('should render the login form correctly', async () => {
    await act(async () => {
      render(<LoginPage />);
    });

    expect(
      screen.getByText('Welcome to Dynamic Class Blogging'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /confirm/i }),
    ).toBeInTheDocument();
  });

  it('should show validation errors when fields are empty', async () => {
    await act(async () => {
      render(<LoginPage />);
    });

    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(screen.getByText('User is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('should call authService.login and redirect on successful login', async () => {
    await act(async () => {
      render(<LoginPage />);
    });

    const userInput = screen.getByPlaceholderText('User');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(userInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    (authService.login as jest.Mock).mockResolvedValueOnce({});

    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        user: 'testUser',
        password: 'testPassword',
      });
      expect(sessionStorage.getItem('userSession')).toBe('testUser');
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });

  it('should show error message on failed login', async () => {
    await act(async () => {
      render(<LoginPage />);
    });

    const userInput = screen.getByPlaceholderText('User');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(userInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    (authService.login as jest.Mock).mockRejectedValueOnce(
      new Error('Invalid credentials'),
    );

    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Login failed: Invalid credentials',
      );
    });
  });
});
