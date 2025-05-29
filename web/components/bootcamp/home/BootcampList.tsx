'use client';

import React, { useEffect } from 'react';
import styles from '@/app/bootcamp/page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useBootcampStore } from '@/store/bootcamp-store';

export function BootcampList() {
  const bootcamps = useBootcampStore((state) => state.bootcampMap);
  const getAllBootcamps = useBootcampStore((state) => state.getAllBootcamps);
  const isLoading = useBootcampStore((state) => state.isLoading);
  const error = useBootcampStore((state) => state.error);

  useEffect(() => {
    getAllBootcamps();
  }, []);

  return (
    <section className={styles.bootcampList}>
      <div className={styles.sectionHeader}>
        <h2>Available Bootcamps</h2>
        <p>Choose from our selection of intensive, career-focused bootcamps</p>
      </div>

      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>Loading bootcamps...</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {bootcamps.length <= 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>No Bootcamp Available, Please come again</p>
        </div>
      )}

      <div className={styles.grid} id="bootcamps">
        {bootcamps.map((bootcamp: any) => (
          <div key={bootcamp._id} className={styles.bootcampCard}>
            <div className={styles.cardImage}>
              <Image
                src={bootcamp.image || '/placeholder.svg'}
                alt={bootcamp.title}
                width={350}
                height={200}
              />
              <div
                className={`${styles.statusBadge} ${
                  bootcamp.status === 'Enrolling' ? styles.enrolling : ''
                }`}
              >
                {bootcamp.status}
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3>{bootcamp.title}</h3>
              <p>{bootcamp.description}</p>
              <div className={styles.bootcampMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Duration:</span>
                  <span>{bootcamp.duration}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Level:</span>
                  <span>{bootcamp.level}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Start Date:</span>
                  <span>{bootcamp.startDate}</span>
                </div>
              </div>
              <Link
                href={`/bootcamp/${bootcamp._id}`}
                className={styles.learnMoreButton}
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
