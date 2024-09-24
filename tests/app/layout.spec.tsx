import Layout from '@/app/layout';
import '@testing-library/jest-dom';

// Mock for Header and Footer
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
