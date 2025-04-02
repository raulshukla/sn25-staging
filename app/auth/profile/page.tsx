'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

export default function ProfileSetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    studentType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted profile:', form);
    alert('Profile setup complete!');
    router.push('/course-selection'); // replace with your actual next page
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
        <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Complete Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="other">Other</option>
            </select>

            <select
              name="studentType"
              value={form.studentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            >
              <option value="">Student Type</option>
              <option value="undergrad">Undergraduate</option>
              <option value="grad">Graduate</option>
              <option value="alumni">Alumni</option>
            </select>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
