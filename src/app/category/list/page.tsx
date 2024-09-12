'use client';
import { CategoryModel } from '@/models/Categories/Categories';
import { categoryService } from '@/services/Categories/CategoryService';
import styles from '../../category/list/category.module.css';
import React, { useState, useEffect } from 'react';

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    console.log('Fetching categories...');
    try {
      const fetchedCategories = await categoryService.getCategories();
      console.log('Fetched Categories:', fetchedCategories);
      if (Array.isArray(fetchedCategories)) {
        setCategories(fetchedCategories);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (categories.length === 0) return <p>No categories found</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Category List</h1>
        <button className={styles.button}>Add</button>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {categories.map((category: CategoryModel) => (
            <div key={category._id} className={styles.gridItem}>
              <span>{category.name}</span>
              <div className={styles.actions}>
                <button className={styles.button}>Edit</button>
                <button className={styles.button}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
