import { render, screen } from '@testing-library/react';
import Footer from '@/app/footer/page';
import '@testing-library/jest-dom';

// Mock the style file
jest.mock('@/app/footer/footer.module.css', () => ({
  footer: 'footer',
  footerHead: 'footerHead',
}));

describe('Footer Component', () => {
  it('should render the footer with correct text and class names', () => {
    render(<Footer />);

    const footerText = screen.getByText('Dynamic Class Blogging');
    expect(footerText).toBeInTheDocument();
    expect(footerText).toHaveClass('footerHead');
  });
});
