'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/header/header.module.css';
import logo from '../../../public/logo.png';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <Image src={logo} alt="Classes" width={50} height={200} priority />
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
        <button onClick={toggleMenu} className={styles.menuButton}>
          Menu
        </button>
        {menuOpen && (
          <ul className={styles.menu}>
            <li>
              <Link href="/classroom/list">Classes</Link>
            </li>
            <li>
              <Link href="/category/list">Categories</Link>
            </li>
            <li>
              <Link href="/user/list">Users</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
