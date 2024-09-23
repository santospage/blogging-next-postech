// tests/app/not-found.spec.tsx
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';
import '@testing-library/jest-dom';

describe('NotFound Component', () => {
  it('should render the not found message', () => {
    render(<NotFound />);

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/ops! the page you are looking for does not exist/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /home page/i }),
    ).toBeInTheDocument();
  });

  it('should render the not found image', () => {
    render(<NotFound />);

    const image = screen.getByAltText('Not-Found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/notfound.png');
  });
});
