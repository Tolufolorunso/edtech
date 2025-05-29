import CustomFetch from '@/lib/CustomFetch';
import { mockLogin, mockRegister } from '@/lib/mockApi';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'student' | 'instructor' | 'admin' | 'superadmin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bootcamp?: boolean;
  hasBootcampSubscription?: boolean;
  bootcampsArr?: Array<{
    _id: string;
    slug: string;
  }>;
  completedLessons: string[];
}

interface AuthState {
  user: User | null;
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{
    status: boolean;
    message?: string;
    user?: User;
  }>;
  register: (
    name: string,
    email: string,
    password: string,
    bootcamp: boolean
  ) => Promise<{ status: boolean; message: string }>;
  logout: () => void;
  clearError: () => void;
  markLessonComplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  initializeAuth: () => void;
}

// Flag to use mock API for development (set to true to use mock API)
const ALWAYS_USE_MOCK = true;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: '',
      isAuthenticated: false,
      isLoading: false,
      error: null,

      initializeAuth: () => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        try {
          const token = localStorage.getItem('token');
          const userStr = localStorage.getItem('user');

          if (token && userStr) {
            try {
              const user = JSON.parse(userStr);
              set({
                token,
                user,
                isAuthenticated: true,
              });
              console.log('Auth initialized successfully');
            } catch (e) {
              // If user data is invalid, clear it
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              console.error('Invalid user data in localStorage:', e);
            }
          }
        } catch (e) {
          console.error('Error initializing auth:', e);
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          let result;

          // Check if we should use mock API
          if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
            result = await mockLogin(email, password);
          } else {
            const response = await CustomFetch.post('/auth/login', {
              email,
              password,
            });
            result = response.data;
          }

          if (result.status && result.token && result.user) {
            // Update state
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            // Store in localStorage directly
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));

            return {
              status: true,
              message: result.message || 'Login successful',
              user: result.user,
            };
          } else {
            throw new Error(result.message || 'Login failed');
          }
        } catch (error: any) {
          console.error('Login error:', error);

          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Login failed. Please try again.';

          set({
            error: errorMessage,
            isLoading: false,
          });

          return {
            status: false,
            message: errorMessage,
          };
        }
      },

      register: async (name, email, password, bootcamp = false) => {
        set({ isLoading: true, error: null });

        try {
          let result;

          // Check if we should use mock API
          if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
            result = await mockRegister(name, email, password, bootcamp);
          } else {
            const response = await CustomFetch.post('/auth/register', {
              name,
              email,
              password,
              bootcamp,
              role: 'student',
            });
            result = response.data;
          }

          set({ isLoading: false });
          return {
            status: true,
            message: result.message || 'Registration successful',
          };
        } catch (error: any) {
          console.error('Register error:', error);

          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Registration failed. Please try again.';

          set({
            error: errorMessage,
            isLoading: false,
          });
          return { status: false, message: errorMessage };
        }
      },

      logout: () => {
        try {
          // Directly use localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          set({
            user: null,
            token: '',
            isAuthenticated: false,
            error: null,
          });

          console.log('Logged out successfully');
        } catch (e) {
          console.error('Error during logout:', e);
        }
      },

      clearError: () => {
        set({ error: null });
      },

      markLessonComplete: (lessonId: string) => {
        const { user } = get();
        if (!user) return;

        if (!user.completedLessons.includes(lessonId)) {
          const updatedUser = {
            ...user,
            completedLessons: [...user.completedLessons, lessonId],
          };
          set({ user: updatedUser });
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      },

      isLessonCompleted: (lessonId: string) => {
        const { user } = get();
        return user?.completedLessons?.includes(lessonId) || false;
      },
    }),
    {
      name: 'auth-storage',
      // Only store specific fields in localStorage via Zustand persist
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
