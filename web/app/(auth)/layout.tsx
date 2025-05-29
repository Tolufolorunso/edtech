import type { Metadata } from 'next';
import Link from 'next/link';
import '../globals.css';
import styles from './auth-layout.module.css';

export const metadata: Metadata = {
  title: 'Authentication | EdTech Platform',
  description: 'Log in or create an account to access our learning platform',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authLayout}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
