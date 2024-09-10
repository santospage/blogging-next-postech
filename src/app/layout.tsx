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
    <html lang="pt">
      <body className={inter.className}>
        <div className="layout-container">
          <Header />
          <main>
            <CategoryProvider>{children}</CategoryProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
