import { render, screen, act, waitFor } from '@testing-library/react';
import FormPage from '@/app/classroom/form/[id]/page';
import { classroomService } from '@/services/Classes/ClassRoomService';
import { authService } from '@/services/Auth/AuthService';
import { usePathname, useRouter } from 'next/navigation';

// Mock the service and routing
jest.mock('@/services/Classes/ClassRoomService');
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
    (usePathname as jest.Mock).mockReturnValue('/classroom/form/1');
  });

  it('should render correctly when logged in', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (classroomService.getClassesById as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'ClassRoom Test',
      detail: 'Detail Test',
      resume: 'Resume Test',
      category: 'Category Test',
      user: 'User',
    });

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    expect(screen.getByText('Edit Classroom')).toBeInTheDocument();
  });

  it('should redirect to login if not logged in', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(false);

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/login?redirect=%2Fclassroom%2Fform%2F1',
    );
  });

  it('should display a loading indicator during loading', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (classroomService.getClassesById as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'ClassRoom Test',
      detail: 'Detail Test',
      resume: 'Resume Test',
      category: 'Category Test',
      user: 'User',
    });

    await act(async () => {
      render(<FormPage params={mockParams} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Edit Classroom')).toBeInTheDocument();
    });
  });
});
