import Categories from '@/app/components/Categories/Categories';
import Classes from '@/app/components/Classes/Classes';
import styles from './page.module.css';
import { categoryService } from '@/services/Categories/CategoryService';
import { CategoryModel } from '@/models/Categories/Categories';
import { classroomService } from '@/services/Classes/ClassRoomService';
import { ClassesModel } from '@/models/Classes/Classes';

export default async function Home() {
  const categories: CategoryModel[] = await categoryService.getCategories();
  const classes: ClassesModel[] = await classroomService.getClasses();

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
