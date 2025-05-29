import React from 'react';
import styles from '@/app/bootcamp/page.module.css';
import Link from 'next/link';
import Image from 'next/image';
export function HomeTestimonials({}) {
  return (
    <section className={styles.testimonials}>
      <div className={styles.sectionHeader}>
        <h2>Success Stories</h2>
        <p>Hear from our bootcamp graduates</p>
      </div>

      <div className={styles.testimonialGrid}>
        <div className={styles.testimonialCard}>
          <div className={styles.testimonialContent}>
            <p>
              "The JavaScript bootcamp was intense but incredibly rewarding. I
              went from knowing basic HTML to building full-stack applications
              in just 8 weeks. I landed a job as a junior developer within a
              month of graduating."
            </p>
          </div>
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorAvatar}>
              <Image
                src="/placeholder.svg?height=60&width=60"
                alt="Sarah J."
                width={60}
                height={60}
              />
            </div>
            <div className={styles.authorInfo}>
              <h4>Sarah J.</h4>
              <p>Frontend Developer at TechCorp</p>
            </div>
          </div>
        </div>

        <div className={styles.testimonialCard}>
          <div className={styles.testimonialContent}>
            <p>
              "The React Native bootcamp gave me the skills to transition from
              web to mobile development. The instructors were knowledgeable and
              supportive, and the curriculum was up-to-date with industry
              standards."
            </p>
          </div>
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorAvatar}>
              <Image
                src="/placeholder.svg?height=60&width=60"
                alt="Michael T."
                width={60}
                height={60}
              />
            </div>
            <div className={styles.authorInfo}>
              <h4>Michael T.</h4>
              <p>Mobile Developer at AppWorks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
