import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/components/Classes/classes.module.css';
import { IClassRoom } from '@/interfaces/Classes/IClasses';

const ClassRoom = ({ classroom }: IClassRoom) => {
  const truncatedResume =
    `${classroom.resume?.substring(0, 80)} ...` || 'Description unavailable';

  return (
    <section className={styles.classes}>
      <div className={styles.container}>
        <div className={styles.card}>
          <figure>
            <Image
              width={350}
              height={200}
              src={classroom.image || ''}
              alt={classroom.title || 'Title unavailable'}
              style={{
                objectFit: 'cover',
              }}
              className={styles.imagem}
            />
          </figure>
          <section className={styles.info}>
            <p className={styles.info}>{truncatedResume}</p>
            <Link href={`/classroom/${classroom._id}`}>
              <button className={styles.button}>See more</button>
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ClassRoom;
