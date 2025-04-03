'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

const ChangePasswordPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    // Simulate password update
    await new Promise((res) => setTimeout(res, 1000));
    setMessage('Your password has been changed successfully.');
    setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Change Password</h1>

          {message && (
            <div className="bg-green-100 text-green-800 text-sm p-3 rounded mb-4">{message}</div>
          )}
          {error && (
            <div className="bg-red-100 text-red-800 text-sm p-3 rounded mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              name="oldPassword"
              placeholder="Current Password"
              value={form.oldPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
