import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import CategoryPage from '@/app/category/list/page';
import { categoryService } from '@/services/Categories/CategoryService';
import { authService } from '@/services/Auth/AuthService';
import { useRouter } from 'next/navigation';

jest.mock('@/services/Categories/CategoryService');
jest.mock('@/services/Auth/AuthService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('CategoryPage', () => {
  const mockRouterPush = jest.fn();
  const mockCategories = [
    { _id: '1', name: 'Category 1' },
    { _id: '2', name: 'Category 2' },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (authService.getSession as jest.Mock).mockResolvedValue(true);
    (categoryService.getCategoriesManagerial as jest.Mock).mockResolvedValue(
      mockCategories,
    );
    (categoryService.deleteCategory as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading message while fetching data', async () => {
    act(() => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
  });

  it('should display categories after fetching', async () => {
    act(() => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.getByText('Category 2')).toBeInTheDocument();
    });
  });

  // eslint-disable-next-line max-len
  it('should display "No categories found" when there are no categories', async () => {
    (
      categoryService.getCategoriesManagerial as jest.Mock
    ).mockResolvedValueOnce([]);

    await act(async () => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/No categories found/i)).toBeInTheDocument();
    });
  });

  it('should redirect to login if not logged in', async () => {
    (authService.getSession as jest.Mock).mockResolvedValue(false);

    await act(async () => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/login?redirect=undefined');
    });
  });

  it('should handle category deletion', async () => {
    await act(async () => {
      render(<CategoryPage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText('Delete')[0];

    global.confirm = jest.fn(() => true);

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(categoryService.deleteCategory).toHaveBeenCalledWith('1');
      expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
    });
  });
});
