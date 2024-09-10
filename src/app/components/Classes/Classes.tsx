'use client';
import React, { useContext } from 'react';
import ClassRoom from '@/app/components/Classes/ClassRoom';
import { CategoryContext } from '@/context/CategoryContext';
import styles from '@/app/components/Classes/classes.module.css';
import { IClasses } from '@/interfaces/Classes/IClasses';

const Classes = ({ classes }: { classes: IClasses[] }) => {
  const { category }: any = useContext(CategoryContext);

  // Verifica se "classes" é um array válido
  if (!Array.isArray(classes) || classes.length === 0) {
    return <div>Nenhuma aula disponível!</div>;
  }

  // Verifica se a categoria é "Todas" ou vazia, e exibe todas as classes
  const filteredClasses =
    category && category !== 'Todas'
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
