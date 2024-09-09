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
          <Image src={logo} alt="Aulas" width={50} height={10} priority />
        </Link>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Aulas</li>
          <li>Categorias</li>
          <li>Usuários</li>
        </ul>
      </nav>
      <div className={styles.search}>
        <form action="">
          <input type="text" placeholder="Digite a aula" />
          <button>Buscar</button>
        </form>
      </div>
    </header>
  );
};
