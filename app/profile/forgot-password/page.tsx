'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateUFLEmail = (email: string) => {
    return email.toLowerCase().includes('@ufl.edu');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setError('Please enter your username.');
      return;
    }

    if (!validateUFLEmail(username)) {
      setError('Please enter a valid UFL email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess('Password reset instructions have been sent to your UFL email address.');
      setUsername('');
      setIsSubmitting(false);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Forgot Password?</h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            Your password will be sent to your UFL email address given at the time of registration.
          </p>

          {success && (
            <div className="bg-green-100 text-green-800 text-sm p-3 rounded mb-4">{success}</div>
          )}
          {error && (
            <div className="bg-red-100 text-red-800 text-sm p-3 rounded mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="User name (e.g. username@ufl.edu)"
              value={username}
              onChange={handleUsernameChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
            >
              {isSubmitting ? 'Processing...' : 'Get Password'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
  Don’t have an account?{' '}
  <button
    type="button"
    className="text-blue-600 hover:underline"
    onClick={() => {
      router.push('/'); // 
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('openSignupModal'));
      }, 200);
    }}
  >
    Sign up
  </button>
</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
