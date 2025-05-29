import type React from 'react';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function EdTechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
