import Link from "next/link"
import styles from "./footer.module.css"

export default function BootcampFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3>
              EdTech<span className={styles.highlight}>Bootcamp</span>
            </h3>
            <p>Intensive learning programs to master modern web and mobile development skills.</p>
          </div>

          <div className={styles.column}>
            <h4>Bootcamps</h4>
            <ul>
              <li>
                <Link href="/bootcamp/javascript">JavaScript</Link>
              </li>
              <li>
                <Link href="/bootcamp/reactnative">React Native</Link>
              </li>
              <li>
                <Link href="/bootcamp/react">React</Link>
              </li>
              <li>
                <Link href="/bootcamp/nodejs">Node.js</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/bootcamp/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/bootcamp/testimonials">Success Stories</Link>
              </li>
              <li>
                <Link href="/bootcamp/instructors">Instructors</Link>
              </li>
              <li>
                <Link href="/bootcamp/schedule">Schedule</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Contact</h4>
            <p>
              <a href="mailto:bootcamp@edtech.com">bootcamp@edtech.com</a>
            </p>
            <p>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </p>
            <div className={styles.social}>
              <a href="#" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} EdTech Bootcamp. All rights reserved.</p>
          <div className={styles.links}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
