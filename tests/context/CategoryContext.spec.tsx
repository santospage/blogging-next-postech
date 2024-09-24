import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { CategoryContext, CategoryProvider } from '@/context/CategoryContext';
import userEvent from '@testing-library/user-event';

interface CategoryContextType {
  category: string;
  changeCategory: (category: string) => void;
}

const TestComponent = () => {
  const context = useContext(CategoryContext) as CategoryContextType;

  if (!context) {
    throw new Error('useContext must be used within a CategoryProvider');
  }

  const { category, changeCategory } = context;

  return (
    <div>
      <p>Selected Category: {category}</p>
      <button onClick={() => changeCategory('Technology')}>
        Change to Technology
      </button>
      <button onClick={() => changeCategory('Science')}>
        Change to Science
      </button>
    </div>
  );
};

describe('CategoryContext', () => {
  it('should update the category when changeCategory is called', async () => {
    const user = userEvent.setup();

    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>,
    );

    await user.click(screen.getByText('Change to Technology'));
    expect(screen.getByText(/Selected Category:/i)).toHaveTextContent(
      'Selected Category: Technology',
    );

    await user.click(screen.getByText('Change to Science'));
    expect(screen.getByText(/Selected Category:/i)).toHaveTextContent(
      'Selected Category: Science',
    );
  });
});
