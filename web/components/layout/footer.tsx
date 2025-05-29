import Link from "next/link"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3>EdTech</h3>
            <p>A full-featured learning platform for modern JavaScript education.</p>
          </div>

          <div className={styles.column}>
            <h4>Learn</h4>
            <ul>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/tracks">Tracks</Link>
              </li>
              <li>
                <Link href="/live-classes">Live Classes</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/instructors">Instructors</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Support</h4>
            <ul>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/help">Help Center</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} EdTech. All rights reserved.</p>
          <div className={styles.links}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
