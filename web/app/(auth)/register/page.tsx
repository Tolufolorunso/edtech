import RegisterForm from '@/components/auth/register-form';
import styles from './register.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1>Create an Account</h1>
            <p>Join our learning platform and start your educational journey</p>
          </div>
          <RegisterForm />
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.content}>
            <h2>Unlock Your Potential</h2>
            <ul className={styles.benefits}>
              <li>Access to 100+ JavaScript courses</li>
              <li>Learn from industry experts</li>
              <li>Join a community of developers</li>
              <li>Get certified in modern web technologies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
