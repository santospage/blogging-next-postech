import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from '@/app/page'; // ajuste o caminho conforme necessário
import { CategoryContext } from '@/context/CategoryContext';
import { useRouter } from 'next/navigation';

// Mock do useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock do componente Image do Next.js
jest.mock('next/image', () => (props: any) => {
  return (
    <img {...props} src={props.src || '/placeholder.jpg'} alt={props.alt} />
  );
});

// Mock dos serviços
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

// Criar um mock para o CategoryContext
const mockChangeCategory = jest.fn();

const mockCategoryContextValue = {
  changeCategory: mockChangeCategory,
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mockar a implementação do useRouter
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

    // Verificar a categoria renderizada
    expect(screen.getByText('Category 1')).toBeInTheDocument();

    // Verificar a imagem com alt "Class 1"
    expect(screen.getByAltText('Class 1')).toBeInTheDocument();

    // Verificar o botão "See more" relacionado à classe
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
