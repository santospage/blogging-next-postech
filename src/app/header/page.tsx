'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/header/header.module.css';
import logo from '../../../public/logo.png';

export const Header = () => {
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
    </header>
  );
};
