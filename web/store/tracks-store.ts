import { create } from 'zustand';
import type { Course } from './courses-store';

export interface Track {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface TracksState {
  tracks: Track[];
  currentTrack: Track | null;
  isLoading: boolean;
  error: string | null;
  fetchTracks: () => Promise<void>;
  fetchTrackById: (id: string) => Promise<void>;
  getTrackCourses: (trackId: string) => Promise<Course[]>;
}

// Mock track data
const mockTracks: Track[] = [
  {
    _id: '1',
    title: 'Frontend Web Development',
    description:
      'Master frontend web development with this comprehensive track covering HTML, CSS, JavaScript, and React.',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '2',
    title: 'Full Stack JavaScript',
    description:
      'Become a full stack developer with JavaScript, covering frontend and backend technologies.',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '3',
    title: 'Mobile App Development',
    description:
      'Learn to build cross-platform mobile applications using React Native and related technologies.',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: '4',
    title: 'Backend Development with Node.js',
    description:
      'Master server-side programming with Node.js, Express, and MongoDB.',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useTracksStore = create<TracksState>((set, get) => ({
  tracks: [],
  currentTrack: null,
  isLoading: false,
  error: null,

  fetchTracks: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({
        tracks: mockTracks,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch tracks',
        isLoading: false,
      });
    }
  },

  fetchTrackById: async (id: string) => {
    set({ isLoading: true, error: null, currentTrack: null });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const track = mockTracks.find((t) => t._id === id);

      if (!track) {
        throw new Error('Track not found');
      }

      set({
        currentTrack: track,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch track',
        isLoading: false,
      });
    }
  },

  getTrackCourses: async (trackId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // This would normally be an API call
      const { useCoursesStore } = require('./courses-store');
      const { courses } = useCoursesStore.getState();

      return courses.filter((course: any) => course.tracks.includes(trackId));
    } catch (error) {
      console.error('Failed to fetch track courses:', error);
      return [];
    }
  },
}));
