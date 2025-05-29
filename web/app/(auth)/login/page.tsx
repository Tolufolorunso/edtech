import LoginForm from '@/components/auth/login-form';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1>Welcome Back</h1>
            <p>Log in to continue your learning journey</p>
          </div>
          <LoginForm />
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.content}>
            <h2>Continue Learning</h2>
            <p>
              Pick up where you left off and keep building your skills with our
              expert-led courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
