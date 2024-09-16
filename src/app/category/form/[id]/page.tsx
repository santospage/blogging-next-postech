'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { CategoryModel } from '@/models/Categories/Categories';
import styles from '@/app/category/category.module.css';
import { categoryService } from '@/services/Categories/CategoryService';
import { authService } from '@/services/Auth/authService';

export default function FormPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [category, setCategory] = useState<CategoryModel | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

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
      sessionStorage.removeItem('loginStatus');
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (id === 'new') {
      setIsEditMode(false);
      setCategory({ _id: '', name: '' });
      setLoading(false);
    } else {
      const storedCategory = sessionStorage.getItem('selectedCategory');
      setCategory(storedCategory ? JSON.parse(storedCategory) : null);
      setIsEditMode(true);
      setLoading(false);
    }
  }, [id, router]);

  const handleSubmit = async (values: CategoryModel) => {
    try {
      if (isEditMode) {
        // await categoryService.updateCategory(id, values); // Update the category in the backend
        toast.info('Category updated successfully');
      } else {
        // await categoryService.createCategory(values); // Create the new category in the backend
        toast.info('Category created successfully');
      }
    } catch (error) {
      toast.error(`Failed to submit category: ${(error as Error).message}`);
    }

    sessionStorage.removeItem('selectedCategory');
    router.push('/category/list');
  };

  const handleCancel = () => {
    sessionStorage.removeItem('selectedCategory');
    router.push('/category/list');
  };

  if (isLoggedIn === null || !isLoggedIn) {
    return;
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{isEditMode ? 'Edit Category' : 'Add Category'}</h1>
        </div>
        <Formik
          initialValues={{
            _id: category?._id || '',
            name: category?.name || '',
          }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange }) => (
            <Form>
              <div className={styles.gridContainer}>
                <div className={styles.grid}>
                  <label className={styles.label}>
                    Category:
                    <Field
                      className={styles.input}
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.button} type="submit">
                  Confirm
                </button>
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
