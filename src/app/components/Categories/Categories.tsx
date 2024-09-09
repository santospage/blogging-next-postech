'use client';
import React, { useContext, useLayoutEffect } from 'react';
import Category from './Category';
import { CategoryContext } from '@/context/CategoryContext';
import styles from '@/app/components/Categories/categories.module.css';
import { ICategories } from '@/interfaces/Categories/ICategories';
import { ICategory } from '@/interfaces/Categories/ICategories';

const Categories = ({ categories }: ICategories) => {
  const { changeCategory }: any = useContext(CategoryContext);

  // Adiciona a categoria "Todos" no início da lista
  const updatedCategories = Array.isArray(categories)
    ? [{ _id: 'all', name: 'Todas' }, ...categories]
    : [{ _id: 'all', name: 'Todas' }];

  useLayoutEffect(() => {
    changeCategory('Todas');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.categorias}>
      <h3>Busque por categoria:</h3>
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
