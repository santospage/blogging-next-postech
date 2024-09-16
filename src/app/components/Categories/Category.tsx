'use client';

import React, { useContext } from 'react';
import { CategoryContext } from '@/context/CategoryContext';
import styles from '@/app/components/Categories/categories.module.css';
import { CategoryPropsModel } from '@/models/Categories/Categories';

const Category = ({ cat }: CategoryPropsModel) => {
  const { changeCategory }: any = useContext(CategoryContext);

  return (
    <div onClick={() => changeCategory(cat.name)}>
      <p className={styles.title}>{cat.name}</p>
    </div>
  );
};

export default Category;
