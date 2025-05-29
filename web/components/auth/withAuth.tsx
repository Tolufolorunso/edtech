'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

/**
 * withAuth Higher Order Component
 *
 * Handles authentication logic for protected and auth pages
 *
 * @param WrappedComponent - The component to wrap with authentication logic
 * @param requireAuth - Whether authentication is required (default: true)
 * @param isAuthPage - Whether this is a login/register page (default: false)
 */
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requireAuth = true,
  isAuthPage = false
) {
  return function WithAuth(props: P) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { user, isAuthenticated, initializeAuth } = useAuthStore();

    useEffect(() => {
      const handleAuth = async () => {
        // Initialize auth first
        initializeAuth();

        // Small delay to allow state to update properly
        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
          // Check authentication directly from localStorage instead of relying on state
          // which might not be initialized yet
          let token = null;
          let userData = null;

          // Only run on client side
          if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');
            if (userStr) {
              try {
                userData = JSON.parse(userStr);
              } catch (e) {
                console.error('Error parsing user data:', e);
              }
            }
          }

          const hasAuth = !!token && !!userData;

          // Case 1: On auth pages (login/register) but already authenticated
          if (isAuthPage && hasAuth) {
            router.replace(userData.bootcamp ? '/bootcamp' : '/dashboard');
            return;
          }

          // Case 2: On protected pages without authentication
          if (requireAuth && !hasAuth) {
            router.replace('/login');
            return;
          }

          // All other cases - allow the component to render
          setIsLoading(false);
        } catch (error) {
          console.error('Auth error:', error);
          // In case of any errors, allow the component to load
          // This prevents a situation where users get stuck
          setIsLoading(false);
        }
      };

      handleAuth();
    }, [router, requireAuth, isAuthPage, isAuthenticated, initializeAuth]);

    // Don't show loading state for auth pages to prevent flickering
    if (isLoading && !isAuthPage) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      );
    }

    // For auth pages, render immediately to avoid the user not found error
    if (isAuthPage) {
      return <WrappedComponent {...props} />;
    }

    // For protected pages, only render when not loading
    if (!isLoading) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
