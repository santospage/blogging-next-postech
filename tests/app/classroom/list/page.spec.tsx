import { render, screen, waitFor, act } from '@testing-library/react';
import ClassRoomPage from '@/app/classroom/list/page';
import { classroomService } from '@/services/Classes/ClassRoomService';
import { authService } from '@/services/Auth/AuthService';
import { useRouter } from 'next/navigation';

jest.mock('@/services/Classes/ClassRoomService');
jest.mock('@/services/Auth/AuthService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

fdescribe('ClassRoomPage', () => {
  const mockRouterPush = jest.fn();
  const mockClasses = [
    { _id: '1', title: 'ClassRoom 1' },
    { _id: '2', title: 'ClassRoom 2' },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (classroomService.getClasses as jest.Mock).mockResolvedValue(mockClasses);
    (classroomService.deleteClassRoom as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading message while fetching data', async () => {
    act(() => {
      render(<ClassRoomPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
  });

  it('should display "No classes found" when there are no classes', async () => {
    (classroomService.getClasses as jest.Mock).mockResolvedValueOnce([]);

    await act(async () => {
      render(<ClassRoomPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/No Classes found/i)).toBeInTheDocument();
    });
  });

  it('should redirect to login if not logged in', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(false);

    await act(async () => {
      render(<ClassRoomPage />);
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/login?redirect=undefined');
    });
  });

  it('should handle classroom deletion', async () => {
    await act(async () => {
      render(<ClassRoomPage />);
    });
  });
});
