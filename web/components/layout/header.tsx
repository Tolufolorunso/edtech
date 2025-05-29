"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import styles from "./header.module.css"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Tracks", path: "/tracks" },
    { name: "Live Classes", path: "/live-classes/1" },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>EdTech</h1>
          </Link>
        </div>

        <nav className={styles.desktopNav}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className={pathname === link.path ? styles.active : ""}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.authButtons}>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className={styles.dashboardLink}>
                Dashboard
              </Link>
              <button onClick={logout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginButton}>
                Login
              </Link>
              <Link href="/register" className={styles.registerButton}>
                Register
              </Link>
            </>
          )}
        </div>

        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu} aria-label="Toggle menu">
          <div className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav>
              <ul>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={pathname === link.path ? styles.active : ""}
                      onClick={closeMobileMenu}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link href="/dashboard" onClick={closeMobileMenu}>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout()
                          closeMobileMenu()
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
                      <Link href="/register" onClick={closeMobileMenu}>
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
  )
}
