'use client';
import React, { useContext, useLayoutEffect } from 'react';
import Category from './Category';
import { CategoryContext } from '@/context/CategoryContext';
import styles from '@/app/components/Categories/categories.module.css';
import { ICategories } from '@/interfaces/Categories/ICategories';
import { ICategory } from '@/interfaces/Categories/ICategories';

const Categories = ({ categories }: ICategories) => {
  const { changeCategory }: any = useContext(CategoryContext);

  // Ensure categories is a valid array
  if (!categories || !Array.isArray(categories)) {
    return <div>Nenhuma categoria encontrada!</div>;
  }

  // Initializes categories with "All" at the beginning of the list
  const updatedCategories = [{ _id: 'all', name: 'All' }, ...categories];

  useLayoutEffect(() => {
    changeCategory('All');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.categorias}>
      <h3>Search by category:</h3>
      <div className={styles.container}>
        {updatedCategories?.map((category: ICategory) => (
          <div key={category._id}>
            <Category cat={category} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
