'use client';
import { CategoryContext } from '@/context/CategoryContext';
import React, { useContext } from 'react';
import styles from '@/app/components/Categories/categories.module.css';
import { CategoryProps } from '@/interfaces/Categories/ICategories';

const Category = ({ cat }: CategoryProps) => {
  const { changeCategory }: any = useContext(CategoryContext);

  return (
    <div onClick={() => changeCategory(cat.name)}>
      <p className={styles.title}>{cat.name}</p>
    </div>
  );
};

export default Category;
