'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserModel } from '@/models/Users/Users';
import { userService } from '@/services/Users/UserService';
import styles from '@/app/user/user.module.css';
import { authService } from '@/services/Auth/authService';

export default function UserPage() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

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

  // Search users
  const generateStaticProps = async () => {
    console.log('Fetching users...');
    try {
      const fetchedUsers = await userService.getUsers();
      console.log('Fetched Users:', fetchedUsers);
      if (Array.isArray(fetchedUsers)) {
        setUsers(fetchedUsers);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Failed to fetch users', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      generateStaticProps();
    }
  }, [isLoggedIn]);

  const deleteUser = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await userService.deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (users.length === 0) return <p>No Users found</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>User List</h1>
        <Link href="/user/form/new">
          <button className={styles.button}>Add</button>
        </Link>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>
          <span>User</span>
          <span>Name</span>
          <span>Email</span>
          <span>Actions</span>
        </div>
        <div className={styles.grid}>
          {users.map((user: UserModel) => (
            <div key={user._id} className={styles.gridItem}>
              <span>{user.user}</span>
              <span>{user.fullName}</span>
              <span>{user.email}</span>
              <div className={styles.actions}>
                <button
                  className={styles.button}
                  onClick={() => {
                    router.push(`/user/form/${user._id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => deleteUser(user._id)}
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
