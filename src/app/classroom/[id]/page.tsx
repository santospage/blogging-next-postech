import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import styles from '../../classroom/classroom.module.css';
import { FaArrowLeft } from 'react-icons/fa';

async function generateStaticParams(id: number) {
  try {
    const apiUrl = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${id}`,
    );
    const response = await apiUrl.json();
    return response;
  } catch (error) {
    return { error: 'Failed to load class data' };
  }
}

const ClassRoomPage = async ({ params }: any) => {
  const classRoom = await generateStaticParams(params.id);

  return (
    <div className={styles.classroom}>
      <div className={styles.header}>
        <Link href="/" className={styles['back-link']}>
          <FaArrowLeft className={styles['icon']} /> Back
        </Link>
      </div>
      <h1 className={styles.title}>{classRoom.title}</h1>
      <p className={styles.detail}>{classRoom.detail}</p>
      <figure>
        <Image
          width={700}
          height={200}
          src={classRoom.image || ''}
          alt={classRoom.title || 'Title unavailable'}
          style={{
            objectFit: 'cover',
          }}
          className={styles.image}
        />
      </figure>
      <div className={styles.publication}>
        <span>Responsible: {classRoom.user.user}</span>
        <span>
          Published in: {new Date(classRoom.updatedAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ClassRoomPage;
