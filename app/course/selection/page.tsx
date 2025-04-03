'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

const mockCourses = [
  { id: 1, name: 'MAC 2311 - Calculus I' },
  { id: 2, name: 'CHM 2045 - General Chemistry' },
  { id: 3, name: 'BSC 2010 - Biology' },
];

export default function CourseSelectionPage() {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    // Simulate saving selected courses
    // await saveCourses(selectedCourses)
    router.push('/course/add');
  };

  return (
    <>
      <Header />

      <main className="min-h-screen py-12 bg-gray-50 px-4 flex justify-center">
        <div className="bg-white max-w-2xl w-full p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
            Select Your Courses
          </h1>

          <ul className="space-y-4">
            {mockCourses.map((course) => (
              <li
                key={course.id}
                className="flex items-center justify-between border rounded-md px-4 py-2"
              >
                <span className="text-gray-700">{course.name}</span>
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleToggle(course.id)}
                  className="w-5 h-5"
                />
              </li>
            ))}
          </ul>

          <button
            onClick={handleNext}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Continue
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
