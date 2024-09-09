import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { CategoryProvider } from '@/context/CategoryContext';
import { Header } from '@/app/components/Header';
import { Footer } from './components/Footer';

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blogging',
  description: 'Blogging Dinâmico de Aulas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ptg">
      <body className={inter.className}>
        <div className="w-full">
          <Header />
          <CategoryProvider>{children}</CategoryProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
