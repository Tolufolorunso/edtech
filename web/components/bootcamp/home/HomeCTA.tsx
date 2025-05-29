import React from 'react';
import styles from '@/app/bootcamp/page.module.css';
import Link from 'next/link';
export function HomeCTA({}) {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent}>
        <h2>Ready to Transform Your Career?</h2>
        <p>
          Apply now to secure your spot in our upcoming bootcamps. Spaces are
          limited.
        </p>
        <Link href="/bootcamp#" className={styles.ctaButton}>
          Apply Now
        </Link>
      </div>
    </section>
  );
}
