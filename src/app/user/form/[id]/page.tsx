'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { UserModel } from '@/models/Users/Users';
import styles from '@/app/user/user.module.css';
import { userService } from '@/services/Users/UserService';
import { authService } from '@/services/Auth/authService';

export default function FormPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [user, setUser] = useState<UserModel | null>(null);
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
    const fetchData = async () => {
      if (isLoggedIn === true) {
        if (id === 'new') {
          setIsEditMode(false);
          setUser({ _id: '', user: '', fullName: '', password: '', email: '' });
          setLoading(false);
        } else {
          try {
            const fetchedCategory = await userService.getUserById(id);
            setUser(fetchedCategory ? fetchedCategory : null);
            setIsEditMode(true);
          } catch (error) {
            toast.error('Failed to fetch user details');
          }
          setLoading(false);
        }
      } else if (isLoggedIn === false) {
        router.push('/login');
      }
    };

    fetchData();
  }, [id, isLoggedIn, router]);

  const handleSubmit = async (values: UserModel) => {
    try {
      if (isEditMode) {
        await userService.updateUser(values); // Update the user in the backend
        toast.info('User updated successfully');
      } else {
        await userService.createUser(values); // Create the new user in the backend
        toast.info('User created successfully');
      }
    } catch (error) {
      toast.error(`Failed to submit user: ${(error as Error).message}`);
    }

    router.push('/user/list');
  };

  const handleCancel = () => {
    router.push('/user/list');
  };

  if (isLoggedIn === null || !isLoggedIn) {
    return null;
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{isEditMode ? 'Edit User' : 'Add User'}</h1>
        </div>
        <Formik
          initialValues={{
            _id: user?._id || '',
            user: user?.user || '',
            fullName: user?.fullName || '',
            email: user?.email || '',
            password: user?.password || '',
          }}
          onSubmit={handleSubmit}
          validate={(values) => {
            const errors: Partial<{ user: string; password: string }> = {};
            if (!values.user) {
              errors.user = 'User name is required';
            }
            if (values.password.length < 4) {
              errors.password = 'Password must be at least 4 characters long';
            }
            return errors;
          }}
          enableReinitialize
        >
          {() => (
            <Form>
              <div className={styles.gridContainer}>
                <div className={styles.grid}>
                  <label className={styles.label}>
                    User:
                    <Field
                      className={styles.input}
                      type="text"
                      name="user"
                      placeholder="User"
                    />
                    <ErrorMessage name="user">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>
                  <label className={styles.label}>
                    Name:
                    <Field
                      className={styles.input}
                      type="text"
                      name="fullName"
                      placeholder="Name"
                    />
                    <ErrorMessage name="fullName">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>
                  <label className={styles.label}>
                    Email:
                    <Field
                      className={styles.input}
                      type="text"
                      name="email"
                      placeholder="email"
                    />
                    <ErrorMessage name="email">
                      {(msg: string) => (
                        <span className={styles.span}>{msg}</span>
                      )}
                    </ErrorMessage>
                  </label>
                  <label className={styles.label}>
                    Password:
                    <Field
                      className={styles.input}
                      type="password"
                      name="password"
                      placeholder="password"
                    />
                    <ErrorMessage name="password">
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
