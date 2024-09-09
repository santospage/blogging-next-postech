'use client';
import { createContext, useState } from 'react';

export const CategoryContext = createContext({});

import { ReactNode } from 'react';

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState('');
  const changeCategory = (cat: string) => {
    setCategory(cat);
  };

  return (
    <CategoryContext.Provider value={{ category, changeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
