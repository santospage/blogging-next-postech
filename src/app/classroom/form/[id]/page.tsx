'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ClassRoomModel } from '@/models/Classes/Classes';
import styles from '@/app/classroom/classroom.module.css';
import { classroomService } from '@/services/Classes/ClassRoomService';
import { authService } from '@/services/Auth/authService';
import { categoryService } from '@/services/Categories/CategoryService';
import { CategoryModel } from '@/models/Categories/Categories';

export default function FormPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [classroom, setClassRoom] = useState<ClassRoomModel | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const pathname = usePathname();

  const formatDate = (isoDateString: string | undefined) => {
    const date = parseISO(isoDateString || new Date().toISOString());
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

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
      sessionStorage.removeItem('userId');
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoggedIn, router]);

  // Fetch classes
  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn === true) {
        if (id === 'new') {
          const userSession = sessionStorage.getItem('userSession');
          setIsEditMode(false);
          setClassRoom({
            _id: '',
            title: '',
            resume: '',
            detail: '',
            category: { name: '' },
            user: { user: userSession || '' },
            updatedAt: new Date().toISOString(),
            image: '',
          });
          setLoading(false);
        } else {
          try {
            const fetchedClassRoom = await classroomService.getClassesById(id);
            setClassRoom(fetchedClassRoom ? fetchedClassRoom : null);
            setIsEditMode(true);
          } catch (error) {
            toast.error('Failed to fetch classroom details');
          }
          setLoading(false);
        }
      } else if (isLoggedIn === false) {
        router.push('/login');
      }
    };

    fetchData();
  }, [id, isLoggedIn, router]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await categoryService.getCategoriesManagerial();
        setCategoryList(categories);
      } catch {
        setCategoryList([]);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: ClassRoomModel) => {
    const selectedCategory = categoryList.find(
      (category: CategoryModel) => category.name === values.category.name,
    );

    const categoryId = selectedCategory ? selectedCategory._id : '';

    try {
      if (isEditMode) {
        await classroomService.updateClassRoom(values, categoryId); // Update the classroom in the backend
        toast.info('Classroom updated successfully');
      } else {
        await classroomService.createClassRoom(values, categoryId); // Create the new classroom in the backend
        toast.info('Classroom created successfully');
      }
    } catch (error) {
      toast.error(`Failed to submit classroom: ${(error as Error).message}`);
    }

    router.push('/classroom/list');
  };

  const handleCancel = () => {
    router.push('/classroom/list');
  };

  if (isLoggedIn === null || !isLoggedIn) {
    return null;
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{isEditMode ? 'Edit Classroom' : 'Add Classroom'}</h1>
        </div>
        <Formik
          initialValues={{
            _id: classroom?._id || '',
            title: classroom?.title || '',
            resume: classroom?.resume || '',
            detail: classroom?.detail || '',
            category: { name: classroom?.category.name || '' },
            user: { user: classroom?.user?.user || '' },
            updatedAt: classroom
              ? formatDate(classroom.updatedAt)
              : formatDate(new Date().toISOString()),
            image: classroom?.image || '',
          }}
          onSubmit={handleSubmit}
          validate={(values) => {
            const errors: Partial<Record<keyof ClassRoomModel, string>> = {};
            if (!values.title) {
              errors.title = 'Title name is required';
            }
            if (!values.detail) {
              errors.detail = 'Detail is required';
            }
            if (!values.resume) {
              errors.resume = 'Resume is required';
              return errors;
            }
            if (!values.category.name) {
              errors.category = 'Category is required';
            }
          }}
          enableReinitialize
        >
          {() => (
            <Form>
              <div className={styles.gridContainer}>
                <div className={styles.grid}>
                  <label className={styles.label}>
                    Title:
                    <Field
                      className={styles.input}
                      type="text"
                      name="title"
                      placeholder="Title"
                    />
                    <ErrorMessage name="title">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>
                  <label className={styles.label}>
                    Resume:
                    <Field
                      className={styles.input}
                      type="text"
                      name="resume"
                      placeholder="Resume"
                    />
                    <ErrorMessage name="resume">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>
                  <label className={styles.label}>
                    Detail:
                    <Field
                      as="textarea"
                      className={styles.inputDetail}
                      type="text"
                      name="detail"
                      placeholder="Detail"
                    />
                    <ErrorMessage name="detail">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>
                  <label className={styles.label}>
                    Category:
                    <Field
                      as="select"
                      name="category.name"
                      className={styles.input}
                    >
                      <option value="" label="Select a category" />
                      {categoryList.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="category.name">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>

                  <label className={styles.label}>
                    User:
                    <Field
                      className={styles.input}
                      type="text"
                      name="user.user"
                      placeholder="User"
                      readOnly
                    />
                    <ErrorMessage name="user.user">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>
                  <label className={styles.label}>
                    Date:
                    <Field
                      className={styles.input}
                      type="text"
                      name="updatedAt"
                      placeholder="Date"
                      readOnly
                    />
                    <ErrorMessage name="updatedAt">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>
                  <label className={styles.label}>
                    Image:
                    <Field
                      className={styles.input}
                      type="text"
                      name="image"
                      placeholder="Image"
                    />
                    <ErrorMessage name="image">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
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
                  onClick={() => handleCancel()}
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
