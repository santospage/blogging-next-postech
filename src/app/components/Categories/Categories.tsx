'use client';
import React, { useContext, useLayoutEffect } from 'react';
import Category from '@/app/components/Categories/Category';
import { CategoryContext } from '@/context/CategoryContext';
import styles from '@/app/components/Categories/categories.module.css';
import { CategoriesModel } from '@/models/Categories/Categories';
import { CategoryModel } from '@/models/Categories/Categories';

const Categories = ({ categories }: CategoriesModel) => {
  const { changeCategory }: any = useContext(CategoryContext);

  // Ensure categories is a valid array
  if (!categories || !Array.isArray(categories)) {
    return <div>Nenhuma categoria encontrada!</div>;
  }

  // Initializes categories with "All" at the beginning of the list
  const updatedCategories = [{ _id: 'all', name: 'All' }, ...categories];

  useLayoutEffect(() => {
    changeCategory('All');
  }, []);

  return (
    <section className={styles.categorias}>
      <h3>Search by category:</h3>
      <div className={styles.container}>
        {updatedCategories?.map((category: CategoryModel) => (
          <div key={category._id}>
            <Category cat={category} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
