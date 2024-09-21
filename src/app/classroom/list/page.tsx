'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClassRoomModel } from '@/models/Classes/Classes';
import { classroomService } from '@/services/Classes/ClassRoomService';
import styles from '@/app/classroom/classroom.module.css';
import { authService } from '@/services/Auth/authService';

export default function ClassRoomListPage() {
  const [classes, setClasses] = useState<ClassRoomModel[]>([]);
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
      sessionStorage.removeItem('userId');
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoggedIn, router]);

  // Search classes
  const generateStaticProps = async () => {
    try {
      const fetchedClasses = await classroomService.getClassesManagerial();
      if (Array.isArray(fetchedClasses)) {
        setClasses(fetchedClasses);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      setError('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      generateStaticProps();
    }
  }, [isLoggedIn]);

  const deleteClassRoom = async (id: string) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this classroom?',
    );
    if (!confirmDelete) return;

    try {
      await classroomService.deleteClassRoom(id);
      setClasses(classes.filter((classroom) => classroom._id !== id));
    } catch (error) {
      setError('Failed to delete classroom');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (classes.length === 0) return <p>No Classes found</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Classes List</h1>
        <Link href="/classroom/form/new">
          <button className={styles.button}>Add</button>
        </Link>
      </div>

      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>
          <span>Title</span>
          <span>Resume</span>
          <span>Category</span>
          <span>Responsible</span>
          <span>Date</span>
          <span>Actions</span>
        </div>
        <div className={styles.grid}>
          {classes.map((classes: ClassRoomModel) => (
            <div key={classes._id} className={styles.gridItem}>
              <span>{classes.title}</span>
              <span>{classes.resume}</span>
              <span>{classes.category.name}</span>
              <span>{classes.user.user}</span>
              <span>
                {classes.updatedAt
                  ? new Date(classes.updatedAt).toLocaleDateString('pt-BR')
                  : 'N/A'}
              </span>
              <div className={styles.actions}>
                <button
                  className={styles.button}
                  onClick={() => {
                    router.push(`/classroom/form/${classes._id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => deleteClassRoom(classes._id)}
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
