import Categories from '@/app/components/Categories/Categories';
import Classes from '@/app/components/Classes/Classes';
import styles from './page.module.css';
import { categoriesService } from '@/services/Categories/CategoriesService';
import { ICategory } from '@/interfaces/Categories/ICategories';
import { classesService } from '@/services/Classes/ClassesService';
import { IClasses } from '@/interfaces/Classes/IClasses';

export default async function Home() {
  const categories: ICategory[] = await categoriesService.getCategories();
  const classes: IClasses[] = await classesService.getClasses();

  return (
    <main className={styles.main}>
      {categories.length > 0 ? (
        <Categories categories={categories} />
      ) : (
        <div>Unable to load categories!</div>
      )}
      {classes ? (
        <Classes classes={classes} />
      ) : (
        <div>Unable to load classes!</div>
      )}
    </main>
  );
}
