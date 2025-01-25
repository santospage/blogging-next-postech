'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/classroom/classroom.module.css';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [storedTitle, setStoredTitle] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const title = sessionStorage.getItem('classTitle');
    if (title) {
      setStoredTitle(title);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    router.push('/classroom/list');
  };

  const handleAddWithIA = () => {
    // Lógica para adicionar conteúdo com IA
    console.log('Add content with IA');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Test Creation</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.testForm}>
        <div className={styles.gridContainer}>
          <div>
            <label className={styles.label}>
              Title:
              <input
                type="text"
                id="title"
                name="title"
                value={storedTitle}
                readOnly
                className={styles.input}
              />
            </label>
          </div>
          <div>
            <label className={styles.label}>
              Test
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.inputTest}
              />
            </label>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={handleAddWithIA}
            >
              Add with IA
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={handleCancel}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
