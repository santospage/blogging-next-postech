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
import { authService } from '@/services/Auth/AuthService';
import { categoryService } from '@/services/Categories/CategoryService';
import { CategoryModel } from '@/models/Categories/Categories';
import { aiService } from '@/services/OpenAI/OpenAIService';

export default function FormPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [classroom, setClassRoom] = useState<ClassRoomModel | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);
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
      sessionStorage.removeItem('classTitle');
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
        // Update the classroom in the backend
        await classroomService.updateClassRoom(values, categoryId);
        toast.info('Classroom updated successfully');
      } else {
        // Create the new classroom in the backend
        await classroomService.createClassRoom(values, categoryId);
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

  const [isDetailGenerating, setIsDetailGenerating] = useState(false);
  const [isResumeGenerating, setIsResumeGenerating] = useState(false);

  const handleAddContent = async (
    field: keyof ClassRoomModel,
    topic: string,
    setFieldValue: (field: string, value: string | boolean) => void,
  ) => {
    if (field === 'detail') {
      setIsDetailGenerating(true);
    } else if (field === 'resume') {
      setIsResumeGenerating(true);
    }

    try {
      if (!topic) {
        toast.error('Mandatory title to generate with AI.');
        if (field === 'detail') {
          setIsDetailGenerating(false);
        } else if (field === 'resume') {
          setIsResumeGenerating(false);
        }

        return;
      }

      let aiContent: string | null = null;

      try {
        aiContent = await aiService.createAI(topic, field);
        if (aiContent !== null) {
          setFieldValue(field, aiContent);
        }
      } catch (generateError) {
        toast.error('Error generating content with AI.');
        if (field === 'detail') {
          setIsDetailGenerating(false);
        } else if (field === 'resume') {
          setIsResumeGenerating(false);
        }
        return;
      }

      if (classroom && aiContent) {
        setClassRoom((prevState) => {
          if (!prevState) return null;
          return {
            ...prevState,
            [field]: aiContent,
          };
        });
        toast.success('Content added successfully!');
      } else {
        toast.error('Failed to generate content using AI.');
      }
    } catch (error) {
      toast.error(`An error occurred: ${(error as Error).message}`);
    } finally {
      if (field === 'detail') {
        setIsDetailGenerating(false);
      } else if (field === 'resume') {
        setIsResumeGenerating(false);
      }
    }
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
          key={classroom?._id || 'new'}
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
          enableReinitialize={false}
        >
          {({ values, setFieldValue }) => (
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
                    <div className={styles.inputWithButton}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() =>
                          handleAddContent(
                            'resume',
                            values.title,
                            setFieldValue,
                          )
                        }
                        disabled={isResumeGenerating}
                      >
                        {isResumeGenerating ? 'Generating...' : 'Add with IA'}
                      </button>
                    </div>
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
                    <div className={styles.inputWithButton}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() =>
                          handleAddContent(
                            'detail',
                            values.title,
                            setFieldValue,
                          )
                        }
                        disabled={isDetailGenerating}
                      >
                        {isDetailGenerating ? 'Generating...' : 'Add with IA'}
                      </button>
                    </div>
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
                      value={
                        isEditMode
                          ? classroom?.user?.user || ''
                          : sessionStorage.getItem('userSession') || ''
                      }
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
