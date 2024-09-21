'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CategoryModel } from '@/models/Categories/Categories';
import { categoryService } from '@/services/Categories/CategoryService';
import styles from '@/app/category/category.module.css';
import { authService } from '@/services/Auth/authService';

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Checks the session and sets the isLoggedIn state
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authService.getSession();
        setIsLoggedIn(session);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  // Redirects to login page if not logged in
  useEffect(() => {
    if (isLoggedIn === false) {
      sessionStorage.removeItem('userSession');
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoggedIn, router]);

  // Search categories
  const generateStaticProps = async () => {
    console.log('Fetching categories...');
    try {
      const fetchedCategories = await categoryService.getCategoriesManagerial();
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
    if (isLoggedIn === true) {
      generateStaticProps();
    }
  }, [isLoggedIn]);

  const deleteCategory = async (id: string) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this category?',
    );
    if (!confirmDelete) return;

    try {
      await categoryService.deleteCategory(id);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      setError('Failed to delete category');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (categories.length === 0) return <p>No categories found</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Category List</h1>
        <Link href="/category/form/new">
          <button className={styles.button}>Add</button>
        </Link>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>
          <span>Name</span>
          <span>Actions</span>
        </div>
        <div className={styles.grid}>
          {categories.map((category: CategoryModel) => (
            <div key={category._id} className={styles.gridItem}>
              <span>{category.name}</span>
              <div className={styles.actions}>
                <button
                  className={styles.button}
                  onClick={() => {
                    router.push(`/category/form/${category._id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => deleteCategory(category._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
