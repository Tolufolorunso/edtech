import { create } from 'zustand';
import CustomFetch from '@/lib/CustormFetch';

interface CurriculumItem {
  weekNumber: number;
  title: string;
  description: string;
  videos: string[];
  resources: string[];
  liveClass: string | null;
  quizzes: string[];
  completed: boolean;
}

interface Instructor {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

interface Bootcamp {
  _id?: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  duration: string;
  schedule: string;
  startDate: string;
  isPublished?: boolean;
  price: string;
  level: string;
  creator?: string;
  prerequisites: string[];
  image: string;
  instructors?: Instructor[];
  curriculum: CurriculumItem[];
  faqs: { question: string; answer: string }[];
  createdAt?: string;
  updatedAt?: string;
}

interface BootcampState {
  bootcampMap: Bootcamp[];
  bootcamp: Bootcamp | null;
  isLoading: boolean;
  error: string | null;
  getAllBootcamps: () => Promise<void>;
  setBootcamp: (bootcamp: Bootcamp | null) => void;
  createBootcamp: (
    formData: Omit<Bootcamp, '_id' | 'createdAt' | 'updatedAt'>
  ) => Promise<{
    status: boolean;
    message?: string;
    bootcamp?: Bootcamp;
  }>;
}

export const useBootcampStore = create<BootcampState>((set, get) => ({
  bootcampMap: [],
  bootcamp: null,
  isLoading: false,
  error: null,

  getAllBootcamps: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await CustomFetch.get('/bootcamps');
      if (response.data?.status && response.data.bootcamps) {
        set({
          bootcampMap: response.data.bootcamps, // Make sure this matches your API response
          isLoading: false,
        });
      } else {
        throw new Error(response.data?.message || 'Invalid response format');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch bootcamps';
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  setBootcamp: (bootcamp) => {
    set({ bootcamp });
  },

  createBootcamp: async (formData) => {
    set({ isLoading: true, error: null });

    try {
      // Format curriculum before sending
      const formattedData = {
        ...formData,
        curriculum: (formData.curriculum || []).map((week) => ({
          weekNumber: week.weekNumber || 0,
          title: week.title || '',
          description: week.description || '',
          videos: week.videos || [],
          resources: week.resources || [],
          liveClass: week.liveClass || null,
          quizzes: week.quizzes || [],
          completed: false,
        })),
      };

      const response = await CustomFetch.post('/bootcamps', formattedData);

      if (response.data?.status && response.data.bootcamp) {
        // Update state with new bootcamp
        set((state) => ({
          bootcampMap: [...state.bootcampMap, response.data.bootcamp],
          isLoading: false,
          error: null,
        }));

        return {
          status: true,
          message: response.data.message,
          bootcamp: response.data.bootcamp,
        };
      } else {
        throw new Error(response.data?.message || 'Bootcamp creation failed');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to create bootcamp';
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
}));
