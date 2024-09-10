import Categories from '@/app/components/Categories/Categories';
import Classes from '@/app/components/Classes/Classes';
import styles from './page.module.css';

async function fetchCategories() {
  try {
    const apiUrl = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
    );
    const response = await apiUrl.json();
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function fetchClasses() {
  try {
    const apiUrl = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`,
    );
    const response = await apiUrl.json();
    return response;
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

export default async function Home() {
  const categories = await fetchCategories();
  const classes = await fetchClasses();

  return (
    <main className={styles.main}>
      {categories.length > 0 ? (
        <Categories categories={categories} />
      ) : (
        <div>Não foi possível carregar as categorias!</div>
      )}
      {classes.length > 0 ? (
        <Classes classes={classes} />
      ) : (
        <div>Não foi possível carregar as aulas!</div>
      )}
    </main>
  );
}
