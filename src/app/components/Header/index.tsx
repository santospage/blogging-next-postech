import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import logo from './logo.png';
import React from 'react';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <Image src={logo} alt="Classes" width={50} height={10} priority />
        </Link>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Classes</li>
          <li>Categories</li>
          <li>Users</li>
        </ul>
      </nav>
      <div className={styles.search}>
        <form action="">
          <input type="text" placeholder="Enter the class" />
          <button>Search</button>
        </form>
      </div>
    </header>
  );
};
