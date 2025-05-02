'use client';

import { useState } from 'react';
import { register } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import FormInput from '@/components/shared/FormInput';
import CustomButton from '@/components/shared/CustomButton';
import HeaderText from '@/components/shared/HeaderText';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await register(form.name, form.email, form.password, form.role);
    setUser(res.user);
    setToken(res.token);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <HeaderText level={2}>Register</HeaderText>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
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
          Create Account
        </CustomButton>
      </form>
    </div>
  );
}
