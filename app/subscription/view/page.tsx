'use client';

import { useState } from 'react';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import Link from 'next/link';

type Course = {
  id: number;
  code: string;
  name: string;
};

type FutureCourse = {
  id: number;
  newCourseCode: string;
  newCourseName: string;
  replacingCourseCode?: string;
};

export default function SubscriptionView() {
  const [currentCourses, setCurrentCourses] = useState<Course[]>([
    { id: 1, code: 'MAC2311', name: 'Calculus 1' },
    { id: 2, code: 'CHM2045', name: 'General Chemistry' },
  ]);

  const [futureCourses, setFutureCourses] = useState<FutureCourse[]>([
    {
      id: 101,
      newCourseCode: 'PHY2048',
      newCourseName: 'Physics with Calculus',
      replacingCourseCode: 'MAC2311',
    },
  ]);

  const [notification, setNotification] = useState('');

  const handleCancel = (id: number) => {
    setFutureCourses((prev) => prev.filter((c) => c.id !== id));
    setNotification('Change cancelled.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 space-y-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Subscriptions</h1>
            <p className="text-gray-500 text-sm">Manage your membership plan and courses.</p>
          </div>

          {/* Subscription Info */}
          <section className="border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold">MEMBERSHIP | 2</h2>
                <p className="text-gray-600 text-sm">Status: Active</p>
                <p className="text-sm mt-1 text-gray-500">
                  Next Billing Date: <strong>May 15, 2025</strong>
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/subscription/switch-plan"
                  className="px-4 py-2 rounded border border-red-600 text-red-600 hover:bg-red-50 text-sm"
                >
                  Switch Plan
                </Link>
                <Link
                  href="/subscription/cancel-membership"
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
                >
                  Cancel Membership
                </Link>
              </div>
            </div>
          </section>

          {/* Current Courses */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Current Course Access</h2>
            <div className="space-y-3">
              {currentCourses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-md p-3 bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium text-gray-800">
                      {course.code} - {course.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Access to study guides, videos, and practice exams.
                    </div>
                  </div>
                  <span className="text-green-600 text-sm font-medium">Active</span>
                </div>
              ))}
            </div>
          </section>

          {/* Future Course Changes */}
          {futureCourses.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Scheduled Course Changes
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                These changes will be applied on <strong>May 15, 2025</strong>.
              </p>

              <div className="space-y-3">
                {futureCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-yellow-300 rounded-md p-3 bg-yellow-50 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-yellow-800">
                        {course.newCourseCode} - {course.newCourseName}
                      </div>
                      <div className="text-xs text-yellow-700">
                        {course.replacingCourseCode
                          ? `Will replace ${course.replacingCourseCode}`
                          : 'Will be added'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCancel(course.id)}
                      className="text-red-600 font-bold text-xl hover:text-red-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Notification */}
          {notification && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded text-sm text-center">
              {notification}
            </div>
          )}

          {/* Add or Change Link */}
          <div className="text-center pt-6 border-t">
            <Link
              href="/course/add"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Add or Change Courses →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
