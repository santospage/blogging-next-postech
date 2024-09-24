import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import UserPage from '@/app/user/list/page';
import { userService } from '@/services/Users/UserService';
import { authService } from '@/services/Auth/AuthService';
import { useRouter } from 'next/navigation';

jest.mock('@/services/Users/UserService');
jest.mock('@/services/Auth/AuthService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('UserPage', () => {
  const mockRouterPush = jest.fn();
  const mockUsers = [
    { _id: '1', user: 'User 1', password: 'test' },
    { _id: '2', user: 'User 2', password: 'test' },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (userService.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (userService.deleteUser as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading message while fetching data', async () => {
    act(() => {
      render(<UserPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
  });

  it('should display users after fetching', async () => {
    act(() => {
      render(<UserPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('User 2')).toBeInTheDocument();
    });
  });

  it('should display "No users found" when there are no users', async () => {
    (userService.getUsers as jest.Mock).mockResolvedValueOnce([]);

    await act(async () => {
      render(<UserPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/No users found/i)).toBeInTheDocument();
    });
  });

  it('should redirect to login if not logged in', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(false);

    await act(async () => {
      render(<UserPage />);
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/login?redirect=undefined');
    });
  });

  it('should handle user deletion', async () => {
    await act(async () => {
      render(<UserPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText('Delete')[0];

    global.confirm = jest.fn(() => true);

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(userService.deleteUser).toHaveBeenCalledWith('1');
      expect(screen.queryByText('User 1')).not.toBeInTheDocument();
    });
  });
});
