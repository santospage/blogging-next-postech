'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Categories from '@/app/components/Categories/Categories';
import Classes from '@/app/components/Classes/Classes';
import styles from '@/app/page.module.css';
import { categoryService } from '@/services/Categories/CategoryService';
import { CategoryModel } from '@/models/Categories/Categories';
import { classroomService } from '@/services/Classes/ClassRoomService';
import { ClassesModel } from '@/models/Classes/Classes';

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [classes, setClasses] = useState<ClassesModel[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const session = sessionStorage.getItem('userSession');
    setIsLoggedIn(session !== null);
    setUserSession(session);

    const fetchData = async () => {
      try {
        const categoriesData = await categoryService.getCategories();
        const classesData = await classroomService.getClasses();
        setCategories(categoriesData);
        setClasses(classesData);
      } catch (error) {
        toast.error(`Failed to fetch data: ${(error as Error).message}`);
      }
    };

    fetchData();
  }, []);

  // Function to handle search form submission
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.search}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Enter the class"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {isLoggedIn ? (
          <a href="/logout" className={styles.loginLink}>
            {userSession} (Logout)
          </a>
        ) : (
          <a href="/login" className={styles.loginLink}>
            (Login)
          </a>
        )}
      </div>
      {categories.length > 0 ? <Categories categories={categories} /> : <div />}
      {classes.length > 0 ? (
        <Classes classes={classes} searchTerm={searchTerm} />
      ) : (
        <div />
      )}
    </main>
  );
}
