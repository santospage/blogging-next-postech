import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import styles from '@/app/footer/footer.module.css';
import { Footer } from '@/app/footer/page';

// Mockar o arquivo de estilos
jest.mock('@/app/footer/footer.module.css', () => ({
  footer: 'footer',
  footerHead: 'footerHead',
}));

describe('Footer Component', () => {
  it('should render the footer with correct text and class names', () => {
    render(<Footer />);

    // Verificar se o texto "Dynamic Class Blogging" foi renderizado
    const footerText = screen.getByText('Dynamic Class Blogging');
    expect(footerText).toBeInTheDocument();

    // Verificar se o <h3> foi renderizado com a classe correta
    expect(footerText).toHaveClass('footerHead');
  });
});
