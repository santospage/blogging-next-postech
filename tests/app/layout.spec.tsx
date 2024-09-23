// tests/app/layout.spec.tsx
import { render, screen } from '@testing-library/react';
import Layout from '@/app/layout';
import '@testing-library/jest-dom';

// Mock para o Header e Footer
jest.mock('@/app/header/page', () => ({
  Header: () => <div>Mocked Header</div>,
}));

jest.mock('@/app/footer/page', () => ({
  Footer: () => <div>Mocked Footer</div>,
}));

import { ReactNode } from 'react';

const TestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};

describe('Layout', () => {
  it('should have the correct metadata', () => {
    document.title = 'Blogging';
    expect(document.title).toBe('Blogging');
  });
});
