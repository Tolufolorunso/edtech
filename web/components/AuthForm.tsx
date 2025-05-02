'use client';
import { useState } from 'react';
import API from '../lib/axios';
import useAuthStore from '../lib/store';
import { useRouter } from 'next/navigation';

export default function AuthForm({ mode = 'login' }) {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload =
        mode === 'login'
          ? { email: form.email, password: form.password }
          : { ...form, role: 'student' }; // default role for UI

      const { data } = await API.post(endpoint, payload);
      setUser(data.user);
      setToken(data.token);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {mode === 'register' && (
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
}
