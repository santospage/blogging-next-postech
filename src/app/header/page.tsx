'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/header/header.module.css';
import logo from '../../../public/logo.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/Auth/authService';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await authService.getSession();
      setIsLoggedIn(session);
    };

    checkSession();

    return () => {
      router.refresh();
    };
  }, [router]);

  const handleLogout = async () => {
    setIsLoggedIn(false);
    router.push('/logout');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <Image src={logo} alt="Classes" width={50} height={50} priority />
        </Link>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Classes</li>
          <li>
            <Link href="/category/list">Categories</Link>
          </li>
          <li>Users</li>
        </ul>
      </nav>
      <div className={styles.actions}>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
      <div className={styles.search}>
        <form action="">
          <input type="text" placeholder="Enter the class" />
          <button>Search</button>
        </form>
      </div>
    </header>
  );
};
