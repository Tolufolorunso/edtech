'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import styles from './auth-forms.module.css';
import { withAuth } from './withAuth';
import { toast } from 'sonner';

function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bootcamp: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Clear any errors when the component mounts
  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

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
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.bootcamp
      );

      if (result.status) {
        // Show success toast
        toast.success('Registration successful! You can now log in.');

        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        // Show error toast for failed registration
        toast.error(result.message || 'Registration failed');
      }
    } catch (err: any) {
      // Handle unexpected errors
      toast.error(err.message || 'An unexpected error occurred');
      console.error('Registration error:', err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={formErrors.name ? styles.inputError : ''}
          disabled={isLoading}
        />
        {formErrors.name && (
          <div className={styles.errorMessage}>{formErrors.name}</div>
        )}
      </div>

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
          placeholder="Create a password"
          className={formErrors.password ? styles.inputError : ''}
          disabled={isLoading}
        />
        {formErrors.password && (
          <div className={styles.errorMessage}>{formErrors.password}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className={formErrors.confirmPassword ? styles.inputError : ''}
          disabled={isLoading}
        />
        {formErrors.confirmPassword && (
          <div className={styles.errorMessage}>
            {formErrors.confirmPassword}
          </div>
        )}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id="bootcamp"
            name="bootcamp"
            checked={formData.bootcamp}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="bootcamp" className={styles.checkboxLabel}>
            Register for Bootcamp Program
          </label>
        </div>
      </div>

      {error && <div className={styles.formError}>{error}</div>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      <div className={styles.formFooter}>
        Already have an account?{' '}
        <Link href="/login" className={styles.link}>
          Log in
        </Link>
      </div>
    </form>
  );
}

// Use withAuth with isAuthPage set to true
export default withAuth(RegisterForm, false, true);
