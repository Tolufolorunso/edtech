import React from 'react';

import styles from '@/app/bootcamp/page.module.css';
import Link from 'next/link';
export function HomeHero({}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Transform Your Career with Our Intensive Bootcamps</h1>
        <p>
          Master in-demand skills with our immersive, instructor-led bootcamps.
          Build real-world projects and get personalized feedback.
        </p>
        <a href="#bootcamps" className={styles.ctaButton}>
          Apply Now
        </a>
      </div>
    </section>
  );
}
