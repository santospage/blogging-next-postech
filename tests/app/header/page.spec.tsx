import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/app/header/page';

jest.mock('../../../public/logo.png', () => 'test-logo-stub');

// Mock the style file
jest.mock('@/app/header/header.module.css', () => ({
  header: 'header',
  nav: 'nav',
  menu: 'menu',
  menuButton: 'menuButton',
}));

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

    const logoImage = screen.getByAltText('Classes');
    expect(logoImage).toBeInTheDocument();

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('should toggle the menu when the button is clicked', () => {
    render(<Header />);

    const menuButton = screen.getByRole('button', { name: /menu/i });

    fireEvent.click(menuButton);
    expect(screen.getByText('Classes')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.queryByText('Classes')).not.toBeInTheDocument();
  });
});
