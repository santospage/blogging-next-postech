'use client';

import React, { Suspense } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/login/login.module.css';
import { authService } from '@/services/Auth/AuthService';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const handleSubmit = (values: { user: string; password: string }) => {
    authService
      .login(values)
      .then(() => {
        sessionStorage.setItem('userSession', values.user);
        router.push(redirectUrl);
      })
      .catch((error: Error) => {
        toast.error(`Login failed: ${error.message}`);
      });
  };

  return (
    <Formik
      initialValues={{ user: '', password: '' }}
      onSubmit={handleSubmit}
      validate={(values: { user: string; password: string }) => {
        const errors: Partial<{ user: string; password: string }> = {};
        if (!values.user) {
          errors.user = 'User is required';
        }
        if (!values.password) {
          errors.password = 'Password is required';
        }
        return errors;
      }}
    >
      {() => (
        <Form>
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              <label className={styles.label}>
                User:
                <Field
                  className={styles.input}
                  name="user"
                  placeholder="User"
                />
                <ErrorMessage name="user">
                  {(msg: string) => <span className={styles.span}>{msg}</span>}
                </ErrorMessage>
              </label>
              <label className={styles.label}>
                Password:
                <Field
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage name="password">
                  {(msg: string) => <span className={styles.span}>{msg}</span>}
                </ErrorMessage>
              </label>
            </div>
            <div className={styles.actions}>
              <button className={styles.button} type="submit">
                Confirm
              </button>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src="/login.png" alt="Login" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Welcome to Dynamic Class Blogging</div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
