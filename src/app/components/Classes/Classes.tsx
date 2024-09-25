/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useContext } from 'react';
import ClassRoom from '@/app/components/Classes/ClassRoom';
import { CategoryContext } from '@/context/CategoryContext';
import styles from '@/app/components/Classes/classes.module.css';
import { ClassesModel, ClassesProps } from '@/models/Classes/Classes';

const Classes = ({ classes, searchTerm }: ClassesProps) => {
  const { category }: any = useContext(CategoryContext);

  // Checks if "classes" is a valid array
  if (!Array.isArray(classes) || classes.length === 0) {
    return <div>No classes available!</div>;
  }

  // Filters classes or categories
  const filteredClasses = classes.filter((classroom: ClassesModel) => {
    const matchesCategory =
      category && category !== 'All'
        ? classroom.category.name === category
        : true;

    const matchesSearchTerm = searchTerm
      ? classroom.resume.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className={styles.container}>
      {filteredClasses?.map((classroom: any) => (
        <ClassRoom key={classroom._id} classroom={classroom} />
      ))}
    </div>
  );
};

export default Classes;
