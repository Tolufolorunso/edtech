'use client';

import { useState } from 'react';
import { login } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import FormInput from '@/components/shared/FormInput';
import CustomButton from '@/components/shared/CustomButton';
import HeaderText from '@/components/shared/HeaderText';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    setUser(res.user);
    setToken(res.token);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <HeaderText level={2}>Login</HeaderText>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <CustomButton type="submit" className="w-full mt-2">
          Sign In
        </CustomButton>
      </form>
    </div>
  );
}
