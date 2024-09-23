import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/app/header/page';

jest.mock('../../../public/logo.png', () => 'test-logo-stub');

// Mockar o arquivo de estilos
jest.mock('@/app/header/header.module.css', () => ({
  header: 'header',
  nav: 'nav',
  menu: 'menu',
  menuButton: 'menuButton',
}));

// Mockar a imagem
jest.mock('next/image', () => {
  return ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => <img src={src} alt={alt} width={width} height={height} />;
});

describe('Header Component', () => {
  it('should render the header with logo and menu', () => {
    render(<Header />);

    // Verificar se a logo está presente
    const logoImage = screen.getByAltText('Classes');
    expect(logoImage).toBeInTheDocument();

    // Verificar se o link "Home" está presente
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    // Verificar se o botão de menu está presente
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('should toggle the menu when the button is clicked', () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    // Verificar se o menu foi aberto
    expect(screen.getByText('Classes')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();

    fireEvent.click(menuButton);

    // Verificar se o menu foi fechado
    expect(screen.queryByText('Classes')).not.toBeInTheDocument();
  });
});
