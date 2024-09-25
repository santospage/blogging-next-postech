import { render, screen, act } from '@testing-library/react';
import Home from '@/app/page';
import { CategoryContext } from '@/context/CategoryContext';
import { useRouter } from 'next/navigation';

// useRouter Mock
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Image component mockup
jest.mock('next/image', () => (props: { src?: string; alt: string }) => {
  return (
    <img {...props} src={props.src || '/placeholder.jpg'} alt={props.alt} />
  );
});

// Mock of services
jest.mock('@/services/Categories/CategoryService', () => ({
  categoryService: {
    getCategories: jest
      .fn()
      .mockResolvedValue([{ _id: '1', name: 'Category 1' }]),
  },
}));

jest.mock('@/services/Classes/ClassRoomService', () => ({
  classroomService: {
    getClasses: jest.fn().mockResolvedValue([{ _id: '1', title: 'Class 1' }]),
  },
}));

const mockChangeCategory = jest.fn();
const mockCategoryContextValue = {
  changeCategory: mockChangeCategory,
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the useRouter implementation
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {},
      pathname: '/',
      asPath: '/',
    });
  });

  it('renders search input and buttons', async () => {
    await act(async () => {
      render(
        <CategoryContext.Provider value={mockCategoryContextValue}>
          <Home />
        </CategoryContext.Provider>,
      );
    });

    expect(screen.getByPlaceholderText('Enter the class')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('handles search input correctly', async () => {
    await act(async () => {
      render(
        <CategoryContext.Provider value={mockCategoryContextValue}>
          <Home />
        </CategoryContext.Provider>,
      );
    });

    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByAltText('Class 1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /see more/i }),
    ).toBeInTheDocument();
  });

  it('displays login link when user is not logged in', async () => {
    await act(async () => {
      render(
        <CategoryContext.Provider value={mockCategoryContextValue}>
          <Home />
        </CategoryContext.Provider>,
      );
    });

    expect(screen.getByText('(Login)')).toBeInTheDocument();
  });

  it('displays user session when user is logged in', async () => {
    sessionStorage.setItem('userSession', 'User123');
    await act(async () => {
      render(
        <CategoryContext.Provider value={mockCategoryContextValue}>
          <Home />
        </CategoryContext.Provider>,
      );
    });

    expect(screen.getByText('User123 (Logout)')).toBeInTheDocument();
  });
});
