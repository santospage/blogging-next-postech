import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import '@/app/globals.css';
import { CategoryProvider } from '@/context/CategoryContext';
import { Header } from '@/app/header/page';
import { Footer } from '@//app/footer/page';

const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blogging',
  description: 'Dynamic Class Blogging',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="eng">
      <body className={inter.className}>
        <div className="layout-container">
          <Header />
          <main>
            <CategoryProvider>{children}</CategoryProvider>
          </main>
          <Footer />
        </div>
        <ToastContainer /> {}
      </body>
    </html>
  );
}
