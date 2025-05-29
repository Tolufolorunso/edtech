/**
 * This file provides mock API responses for development and testing
 * when the actual backend is not available.
 */

import { UserRole } from '@/store/auth-store';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bootcamp?: boolean;
  hasBootcampSubscription?: boolean;
  completedLessons: string[];
}

// Simulated database of users
const MOCK_USERS = [
  {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'student' as UserRole,
    bootcamp: false,
    completedLessons: [],
    bootcampsArr: [
      {
        _id: 'bootcamp-1',
        slug: 'React-native',
        title: 'Mobile Development Bootcamp',
      },
    ],
  },
  {
    id: 'user-2',
    name: 'Bootcamp User',
    email: 'bootcamp@example.com',
    password: 'password123',
    role: 'admin' as UserRole,
    bootcamp: true,
    hasBootcampSubscription: true,
    completedLessons: [],
  },
  {
    id: 'user-3',
    name: 'Bootcamp User',
    email: 'bootcamp2@example.com',
    password: 'password123',
    role: 'student' as UserRole,
    bootcamp: true,
    hasBootcampSubscription: true,
    bootcampsArr: [
      {
        _id: 'bootcamp-1',
        slug: 'web-development-bootcamp',
        title: 'Web Development Bootcamp',
      },
    ],
    completedLessons: [],
  },
];

// Determine if we should use mock API
const shouldUseMockApi = (): boolean => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

  // Use mock if explicitly set to true or if API URL is not defined
  return useMock || !apiUrl;
};

// Mock login function
export const mockLogin = async (email: string, password: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = MOCK_USERS.find((u) => u.email === email);

  if (!user) {
    return {
      status: false,
      message: 'User not found',
    };
  }

  if (user.password !== password) {
    return {
      status: false,
      message: 'Invalid credentials',
    };
  }

  // Return successful login with user data (excluding password)
  const { password: _, ...userData } = user;

  return {
    status: true,
    message: 'Login successful',
    token: `mock-token-${user.id}-${Date.now()}`,
    user: userData as User,
  };
};

// Mock register function
export const mockRegister = async (
  name: string,
  email: string,
  password: string,
  bootcamp: boolean
) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if user already exists
  if (MOCK_USERS.some((u) => u.email === email)) {
    return {
      status: false,
      message: 'User with this email already exists',
    };
  }

  // Create new user
  const newUser = {
    id: `user-${MOCK_USERS.length + 1}`,
    name,
    email,
    password,
    role: 'student' as UserRole,
    bootcamp,
    completedLessons: [],
    hasBootcampSubscription: bootcamp ? true : false,
    bootcampsArr: bootcamp
      ? [
          {
            _id: `bootcamp-${MOCK_USERS.length + 1}`,
            slug: 'default-bootcamp',
            title: 'Default Bootcamp',
          },
        ]
      : [],
  };

  // Add to mock database
  MOCK_USERS.push(newUser);

  return {
    status: true,
    message: 'Registration successful',
  };
};

export default {
  shouldUseMockApi,
  mockLogin,
  mockRegister,
};
