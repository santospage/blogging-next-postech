import Categories from '@/app/components/Categories/Categories';
import Classes from '@/app/components/Classes/Classes';
import styles from './page.module.css';

async function fetchCategories() {
  try {
    const apiUrl = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`
    );
    const response = await apiUrl.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function fetchClasses() {
  try {
    const apiUrl = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`
    );
    const response = await apiUrl.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const categories = await fetchCategories();
  const classes = await fetchClasses();
  return (
    <main className={styles.main}>
      <Categories categories={categories} />
      <Classes classes={classes} />
    </main>
  );
}
