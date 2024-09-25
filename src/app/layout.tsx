import type { Metadata } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import '@/app/globals.css';
import { CategoryProvider } from '@/context/CategoryContext';
import Header from '@/app/header/page';
import Footer from '@/app/footer/page';

export const metadata: Metadata = {
  title: 'Blogging',
  description: 'Dynamic Class Blogging',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout-container">
          <Header />
          <main>
            <CategoryProvider>{children}</CategoryProvider>
          </main>
          <Footer />
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
