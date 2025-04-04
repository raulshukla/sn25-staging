'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import { useAuth } from '@/contexts/AuthContext';

export default function UpdateContactPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactEmail: '',
    phone: '',
    major: '',
    status: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 🔄 Load profile data on mount
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) {
        setError('User not logged in.');
        return;
      }

      try {
        const res = await fetch(`/api/profile?userId=${user.id}`);
        const profile = await res.json();

        if (!res.ok || !profile) {
          setError('Failed to load profile.');
          return;
        }

        setFormData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: user.email || '',
          contactEmail: profile.contactEmail || '',
          phone: profile.phone || '',
          major: profile.major || '',
          status: profile.status || '',
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Unable to load profile.');
      }
    };

    loadProfile();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your first and last name');
      return;
    }
  
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      setError('Please enter a valid email address');
      return;
    }
  
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          contactEmail: formData.contactEmail,
          phone: formData.phone,
          major: formData.major,
          status: formData.status,
        }),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.error || 'Unknown error');
      }
  
      setSuccess('Your contact information has been updated successfully');
    } catch (err) {
      console.error('Error updating contact:', err);
      setError('Failed to update contact info');
    }
  };

  return (
    <>
      <Header />
      <main className="flex px-8 py-10 gap-10 bg-gray-100 min-h-screen">
        <aside className="w-64 bg-white shadow rounded">
          <div className="border-b px-6 py-4 font-semibold">Account Settings</div>
          <ul>
            <li className="border-b">
              <a href="/profile/member" className="block px-6 py-3 hover:bg-gray-50">Profile</a>
            </li>
            <li className="border-b">
              <a href="/profile/billing" className="block px-6 py-3 hover:bg-gray-50">Billing</a>
            </li>
            <li className="border-b">
              <a href="/subscription/view" className="block px-6 py-3 hover:bg-gray-50">Subscription</a>
            </li>
            <li>
              <a href="/profile/change-password" className="block px-6 py-3 hover:bg-gray-50">Change Password</a>
            </li>
          </ul>
        </aside>

        <section className="flex-1 max-w-3xl">
          <div className="bg-white shadow rounded p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Update Contact Information</h1>
            <p className="text-sm text-gray-600 mb-6">
              Keep your contact information up to date to receive important notifications about your account.
            </p>

            {error && <div className="bg-red-100 text-red-700 text-sm p-3 mb-4 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 text-sm p-3 mb-4 rounded">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="font-medium text-gray-700 mb-3">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border rounded px-4 py-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium text-gray-700 mb-3">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">UFL Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      readOnly
                      className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">Alternate Email</label>
                    <input
                      type="email"
                      id="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full border rounded px-4 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      readOnly
                      className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium text-gray-700 mb-3">Academic Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="major" className="block text-sm font-medium mb-1">Major</label>
                    <select
                      id="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      className="w-full border rounded px-4 py-2"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Psychology">Psychology</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border rounded px-4 py-2"
                    >
                      <option value="c/o '28">c/o '28</option>
                      <option value="c/o '27">c/o '27</option>
                      <option value="c/o '26">c/o '26</option>
                      <option value="c/o '25">c/o '25</option>
                      <option value="Already Graduated">Already Graduated</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
