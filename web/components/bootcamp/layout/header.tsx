'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import styles from './header.module.css';

export default function BootcampHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Don't show navigation on sales pages
  const isSalesPage =
    pathname.includes('/bootcamp/') &&
    !pathname.includes('/week/') &&
    pathname !== '/bootcamp' &&
    pathname !== '/bootcamp/register';

  if (isSalesPage) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/bootcamp">
              <h1>
                EdTech<span className={styles.highlight}>Bootcamp</span>
              </h1>
            </Link>
          </div>
          <div className={styles.authButtons}>
            <Link href="/bootcamp/register" className={styles.registerButton}>
              Enroll Now
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/bootcamp">
            <h1>
              EdTech<span className={styles.highlight}>Bootcamp</span>
            </h1>
          </Link>
        </div>

        <nav className={styles.desktopNav}>
          <ul>
            <li>
              <Link
                href="/bootcamp"
                className={pathname === '/bootcamp' ? styles.active : ''}
              >
                All Bootcamps
              </Link>
            </li>
            <li>
              <Link
                href="/bootcamp/schedule"
                className={
                  pathname === '/bootcamp/schedule' ? styles.active : ''
                }
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/bootcamp/instructors"
                className={
                  pathname === '/bootcamp/instructors' ? styles.active : ''
                }
              >
                Instructors
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.authButtons}>
          {isAuthenticated ? (
            <>
              <Link
                href="/bootcamp/my-bootcamps"
                className={styles.dashboardLink}
              >
                My Bootcamps
              </Link>
              <button onClick={logout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/bootcamp/login" className={styles.loginButton}>
                Login
              </Link>
              <Link href="/bootcamp/register" className={styles.registerButton}>
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div
            className={`${styles.hamburger} ${
              mobileMenuOpen ? styles.open : ''
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav>
              <ul>
                <li>
                  <Link
                    href="/bootcamp"
                    className={pathname === '/bootcamp' ? styles.active : ''}
                    onClick={closeMobileMenu}
                  >
                    All Bootcamps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bootcamp/schedule"
                    className={
                      pathname === '/bootcamp/schedule' ? styles.active : ''
                    }
                    onClick={closeMobileMenu}
                  >
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bootcamp/instructors"
                    className={
                      pathname === '/bootcamp/instructors' ? styles.active : ''
                    }
                    onClick={closeMobileMenu}
                  >
                    Instructors
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        href="/bootcamp/my-bootcamps"
                        onClick={closeMobileMenu}
                      >
                        My Bootcamps
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          closeMobileMenu();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/login" onClick={closeMobileMenu}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link href="/bootcamp/register" onClick={closeMobileMenu}>
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
