import styles from '@/app/not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.message}>
        Ops! The page you are looking for does not exist.
      </p>
      <a href="/" className={styles.link}>
        Home page
      </a>
      <div className={styles.imageContainer}>
        <img src="/notfound.png" alt="Not-Found" />
      </div>
    </div>
  );
}
