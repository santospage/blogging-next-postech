import React from 'react';
import Image from 'next/image';
import styles from '@/app/classroom/classroom.module.css';
import { classroomService } from '@/services/Classes/ClassRoomService';
import { ClassRoomModel } from '@/models/Classes/Classes';
import Link from 'next/link';

const ClassRoomPage = async ({ params }: any) => {
  const classRoom: ClassRoomModel = await classroomService.getClassesById(
    params.id,
  );

  return (
    <div className={styles.classroom}>
      <div className={styles.header}>
        <h1 className={styles.title}>{classRoom.title}</h1>
        <Link href="/" className={styles.backButton}>
          Back
        </Link>
      </div>
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
