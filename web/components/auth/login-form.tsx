'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import styles from './auth-forms.module.css';
import { withAuth } from './withAuth';
import { toast } from 'sonner';

function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  // Clear any errors when the component mounts
  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Clear global error
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (result.status && result.user) {
        // Show success toast
        toast.success('Login successful!');

        // Redirect based on user's bootcamp status
        if (
          result.user.bootcamp &&
          result.user.hasBootcampSubscription &&
          result.user.bootcampsArr &&
          result.user.bootcampsArr.length > 0
        ) {
          // Get the first bootcamp slug and navigate to week 1
          const firstBootcamp = result.user.bootcampsArr[0];
          router.push(`/bootcamp/${firstBootcamp.slug}/week/1`);
        }
        // else if (result.user.bootcamp) {
        //   router.push('/bootcamp');
        // }
        else {
          router.push('/dashboard');
        }
      } else {
        // Show error toast for failed login
        toast.error(result.message || 'Login failed');
      }
    } catch (err: any) {
      // Handle unexpected errors
      toast.error(err.message || 'An unexpected error occurred');
      console.error('Login error:', err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className={formErrors.email ? styles.inputError : ''}
          disabled={isLoading}
        />
        {formErrors.email && (
          <div className={styles.errorMessage}>{formErrors.email}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className={formErrors.password ? styles.inputError : ''}
          disabled={isLoading}
        />
        {formErrors.password && (
          <div className={styles.errorMessage}>{formErrors.password}</div>
        )}
      </div>

      <Link href="/forgot-password" className={styles.forgotPassword}>
        Forgot password?
      </Link>

      {error && <div className={styles.formError}>{error}</div>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>

      <div className={styles.formFooter}>
        Don't have an account?{' '}
        <Link href="/register" className={styles.link}>
          Sign up
        </Link>
      </div>
    </form>
  );
}

// Use withAuth with isAuthPage set to true
export default withAuth(LoginForm, false, true);
