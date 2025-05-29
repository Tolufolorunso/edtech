import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface BackendResponse {
  status: boolean;
  message?: string;
  data?: any;
}

const CustomFetch = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
CustomFetch.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token;

    // Use try-catch to handle localStorage access in SSR
    if (typeof window !== 'undefined') {
      try {
        token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Error accessing localStorage:', e);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
CustomFetch.interceptors.response.use(
  (response: AxiosResponse<BackendResponse>) => {
    return response;
  },
  (error: AxiosError<BackendResponse>) => {
    if (!error.response) {
      return Promise.reject({
        status: false,
        message: 'Network error. Please check your connection.',
      });
    }

    const { status, data } = error.response;

    // Only redirect if we're in the browser
    if (typeof window !== 'undefined') {
      if (status === 401) {
        // Clear auth data on unauthorized
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        } catch (e) {
          console.error('Error accessing localStorage:', e);
        }
        return Promise.reject(data);
      }

      if (status === 403) {
        window.location.href = '/';
        return Promise.reject(data);
      }
    }

    return Promise.reject(
      data || {
        status: false,
        message: 'An unexpected error occurred',
      }
    );
  }
);

export default CustomFetch;
