'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function MemberProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [coursesData, setCoursesData] = useState<any[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) {
        setError('User not logged in.');
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/profile?userId=${user.id}`);
        const profile = await res.json();

        if (!res.ok || !profile) {
          setError('Failed to load profile.');
        } else {
          setProfileData({
            firstName: profile.firstName,
            lastName: profile.lastName,
            uflEmail: user.email,
            contactEmail: profile.contactEmail,
            phone: profile.phone,
            major: profile.major,
            status: profile.status,
          });

          setSubscriptionData({
            plan: {
              name: '2 Course Plan',
              monthlyPrice: 75,
              maxCourses: 2,
            },
            status: 'Active',
            startDate: '2025-01-15',
            nextBillingDate: '2025-04-15',
          });

          setCoursesData([
            { code: 'BSC2010', name: 'Biology I' },
            { code: 'ECO2013', name: 'Macroeconomics' },
          ]);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const formatPhone = (phone: string) => {
    const match = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          <div>Loading profile...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-red-600">{error}</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 hidden md:block">
            <div className="bg-white rounded shadow border">
              <h2 className="text-base font-semibold border-b px-5 py-3">Account Settings</h2>
              <ul>
                <li>
                  <Link
                    href="/profile/member"
                    className="block px-5 py-3 text-red-600 bg-red-50 font-medium"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/profile/billing" className="block px-5 py-3 hover:bg-gray-50">
                    Billing
                  </Link>
                </li>
                <li>
                  <Link href="/subscription/view" className="block px-5 py-3 hover:bg-gray-50">
                    Subscription
                  </Link>
                </li>
                <li>
                  <Link href="/profile/change-password" className="block px-5 py-3 hover:bg-gray-50">
                    Change Password
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* Content */}
          <section className="flex-1 max-w-4xl space-y-8">
            <div className="bg-white shadow p-6 rounded-lg">
              <h1 className="text-xl font-bold mb-6">Member Profile</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  {/* Personal Info */}
                  <div className="mb-8">
                    <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-700">
                      Personal Information
                    </h2>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Name:</span>
                      <span>{profileData.firstName} {profileData.lastName}</span>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">UFL Email:</span>
                      <span>{profileData.uflEmail}</span>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Contact Email:</span>
                      <span>{profileData.contactEmail}</span>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Phone:</span>
                      <span>{formatPhone(profileData.phone)}</span>
                    </div>
                    <Link
                      href="/profile/update-contact"
                      className="inline-block mt-3 text-sm border px-4 py-2 rounded hover:bg-gray-100"
                    >
                      Edit Contact Info
                    </Link>
                  </div>

                  {/* Academic Info */}
                  <div>
                    <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-700">
                      Academic Information
                    </h2>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">University:</span>
                      <span>University of Florida</span>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Major:</span>
                      <span>{profileData.major}</span>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Status:</span>
                      <span>{profileData.status}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Membership Info */}
                  <div className="mb-8">
                    <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-700">
                      Membership Information
                    </h2>
                    <span className="inline-block bg-red-50 text-red-700 px-3 py-1 rounded text-sm font-medium mb-3">
                      {subscriptionData.plan.name} - {subscriptionData.status}
                    </span>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Member Since:</span>
                      <span>{formatDate(subscriptionData.startDate)}</span>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Next Billing:</span>
                      <span>{formatDate(subscriptionData.nextBillingDate)}</span>
                    </div>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Monthly Rate:</span>
                      <span>${subscriptionData.plan.monthlyPrice.toFixed(2)}</span>
                    </div>
                    <Link
                      href="/subscription/view"
                      className="inline-block mt-3 text-sm border px-4 py-2 rounded hover:bg-gray-100"
                    >
                      View Subscription
                    </Link>
                  </div>

                  {/* Course Access */}
                  <div>
                    <h2 className="text-sm font-semibold border-b pb-2 mb-4 text-gray-700">
                      Course Access
                    </h2>
                    <div className="mb-3 flex text-sm">
                      <span className="w-32 font-medium text-gray-600">Active Courses:</span>
                      <span>{coursesData.length} of {subscriptionData.plan.maxCourses}</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      {coursesData.map((course) => (
                        <div
                          key={course.code}
                          className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded text-sm"
                        >
                          <span className="font-medium">{course.code} - {course.name}</span>
                          <span className="text-red-600">Active</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/course/add"
                      className="inline-block mt-3 text-sm border px-4 py-2 rounded hover:bg-gray-100"
                    >
                      Manage Courses
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
