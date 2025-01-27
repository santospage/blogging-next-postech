'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/classroom/classroom.module.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';

import { aiService } from '@/services/OpenAI/OpenAIService';

export default function AssessmentPage() {
  const [description, setDescription] = useState<string>('');
  const [storedTitle, setStoredTitle] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const title = sessionStorage.getItem('classTitle');
    if (title) {
      setStoredTitle(title);
    }
  }, []);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddContent = async (topic: string) => {
    setIsGenerating(true);

    try {
      const aiContent = await aiService.createAI(topic, 'assessment');

      if (aiContent) {
        setDescription(aiContent);
      } else {
        toast.error('Failed to generate content using AI');
      }
    } catch (error) {
      toast.error('An error occurred while generating content');
    }

    setIsGenerating(false);
  };

  const handleGeneratePDF = () => {
    if (!description.trim()) {
      toast.error(
        'The description is empty. Please add content before generating a PDF',
      );
      return;
    }

    const doc = new jsPDF();

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(16);
    doc.text(storedTitle, 10, 20);
    doc.setFontSize(12);

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const textWidth = pageWidth - margin * 2;
    const textLines = doc.splitTextToSize(description, textWidth);

    let y = 30;

    textLines.forEach((line: string, index: number) => {
      if (y + 10 > pageHeight - margin) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += 10;
    });

    doc.save('assessment.pdf');
  };

  const handleCancel = () => {
    router.push('/classroom/list');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Assessment Creation</h1>
      </div>
      <form>
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
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.inputAssessment}
              />
            </label>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => handleAddContent(storedTitle)}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Add with IA'}
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={handleGeneratePDF}
            >
              Generate PDF
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
