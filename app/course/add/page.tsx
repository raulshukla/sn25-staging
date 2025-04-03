'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

const mockSubjects = [
  { id: 1, subject: 'MAC 2311 - Calculus I', instructor: 'Prof. Newton' },
  { id: 2, subject: 'CHM 2045 - Chemistry', instructor: 'Dr. Curie' },
  { id: 3, subject: 'BSC 2010 - Biology', instructor: 'Dr. Darwin' },
];

export default function AddCoursePage() {
  const router = useRouter();
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;

    // Simulate saving course
    // await api.addCourse(selectedCourseId)
    router.push('/subscription/view');
  };

  return (
    <>
      <Header />

      <main className="min-h-screen py-12 px-4 bg-gray-50 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md max-w-xl w-full space-y-6"
        >
          <h1 className="text-2xl font-bold text-red-600 text-center">
            Add a Course to Your Plan
          </h1>

          <div className="space-y-3">
            {mockSubjects.map((course) => (
              <label
                key={course.id}
                className={`flex items-center justify-between p-4 border rounded-md cursor-pointer ${
                  selectedCourseId === course.id ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-800">{course.subject}</p>
                  <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                </div>
                <input
                  type="radio"
                  name="selectedCourse"
                  checked={selectedCourseId === course.id}
                  onChange={() => setSelectedCourseId(course.id)}
                  className="w-5 h-5 text-red-600"
                />
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={!selectedCourseId}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            Add Course and Continue
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
