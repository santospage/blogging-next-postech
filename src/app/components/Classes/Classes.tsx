'use client';
import React, { useContext } from 'react';
import ClassRoom from '@/app/components/Classes/ClassRoom';
import { CategoryContext } from '@/context/CategoryContext';
import styles from '@/app/components/Classes/classes.module.css';
import { IClasses } from '@/interfaces/Classes/IClasses';

const Classes = ({ classes }: { classes: IClasses[] }) => {
  const { category }: any = useContext(CategoryContext);

  // Checks if "classes" is a valid array
  if (!Array.isArray(classes) || classes.length === 0) {
    return <div>No classes available!</div>;
  }

  // Checks if the category is "All" or empty, and displays all classes
  const filteredClasses =
    category && category !== 'All'
      ? classes.filter(
          (classroom: IClasses) => classroom.category.name === category,
        )
      : classes;

  return (
    <div className={styles.container}>
      {filteredClasses?.map((classroom: any) => (
        <ClassRoom key={classroom._id} classroom={classroom} />
      ))}
    </div>
  );
};

export default Classes;
