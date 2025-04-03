'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

export default function ProfileSetupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    major: '',
    graduationYear: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    major: '',
    graduationYear: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded validation (replace API later)
    let hasError = false;
    const newErrors = { ...errors };

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      hasError = true;
    }
    if (!formData.major) {
      newErrors.major = 'Major is required';
      hasError = true;
    }
    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
      hasError = true;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Simulate profile save
    // await saveProfile(formData);
    router.push('/membership');
  };

  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white p-8 rounded-xl shadow space-y-4"
        >
          <h1 className="text-2xl font-bold text-red-600 text-center mb-4">Complete Your Profile</h1>

          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Major</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.major && <p className="text-red-500 text-sm mt-1">{errors.major}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Graduation Year</label>
            <input
              type="text"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md mt-4"
          >
            Save and Continue
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
