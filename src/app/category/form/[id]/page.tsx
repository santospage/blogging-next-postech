'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryModel } from '@/models/Categories/Categories';
import styles from '@/app/category/category.module.css';
import { categoryService } from '@/services/Categories/CategoryService';

export default function FormPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (id === 'new') {
      setIsEditMode(false);
      setCategory({ _id: '', name: '' }); // Initializes with a new empty object
      setLoading(false);
    } else {
      const storedCategory = sessionStorage.getItem('selectedCategory');
      setCategory(storedCategory ? JSON.parse(storedCategory) : null);
      setIsEditMode(true);
      setLoading(false);
    }
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        //await categoryService.updateCategory(id, category); // Update the category in the backend
        alert('Category updated successfully');
      } else {
        //await categoryService.createCategory(category); // Create the new category in the backend
        alert('Category created successfully');
      }
    } catch (error) {
      console.error('Failed to submit category', error);
    }

    sessionStorage.removeItem('selectedCategory'); // Clear sessionStorage after submission
    router.push('/category/list');
  };

  const handleCancel = () => {
    sessionStorage.removeItem('selectedCategory'); // Clear sessionStorage after submission
    router.push('/category/list');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>{isEditMode ? 'Edit Category' : 'Add Category'}</h1>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          <input
            type="text"
            value={category?.name || ''}
            onChange={(e) =>
              setCategory({ ...category, _id: '', name: e.target.value })
            }
            placeholder="Category Name"
          />
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.button} onClick={handleSubmit}>
          Confirm
        </button>{' '}
        <button className={styles.button} onClick={handleCancel}>
          Cancel
        </button>{' '}
      </div>
    </div>
  );
}
