'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

type Course = {
  code: string;
  name: string;
  term: string;
  semester: string;
  addedDate?: string;
};

type SubscriptionPlan = {
  name: string;
  maxCourses: number;
};

export default function AddCourseViewPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionPlan>({ name: 'Basic Plan', maxCourses: 2 });
  const [allCourses, setAllCourses] = useState<Course[]>([
    { code: 'BUL101', name: 'Business Law Basics', term: 'Fall', semester: '2025' },
    { code: 'ECO201', name: 'Intro to Economics', term: 'Fall', semester: '2025' },
    { code: 'MCB150', name: 'Microbiology Fundamentals', term: 'Spring', semester: '2025' },
    { code: 'PSY200', name: 'General Psychology', term: 'Spring', semester: '2025' },
    { code: 'APK202', name: 'Applied Physiology', term: 'Summer', semester: '2025' },
  ]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentDepartment, setCurrentDepartment] = useState('all');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const coursesPerPage = 4;

  useEffect(() => {
    let filtered = allCourses.filter(course => !selectedCourses.find(sc => sc.code === course.code));

    if (currentCategory === 'business') {
      filtered = filtered.filter(course =>
        ['BUL', 'ECO', 'GEB', 'MAN', 'MAR', 'ENT'].includes(course.code.substring(0, 3))
      );
    } else if (currentCategory === 'science') {
      filtered = filtered.filter(course =>
        ['APK', 'BSC', 'MCB', 'PSY', 'STA'].includes(course.code.substring(0, 3))
      );
    }

    if (currentDepartment !== 'all') {
      filtered = filtered.filter(course => course.code.startsWith(currentDepartment));
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        course.code.toLowerCase().includes(term) || course.name.toLowerCase().includes(term)
      );
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [allCourses, selectedCourses, searchTerm, currentCategory, currentDepartment]);

  const maxCoursesAllowed = subscription?.maxCourses || 0;

  const toggleCourseSelection = (course: Course) => {
    const exists = selectedCourses.some(sc => sc.code === course.code);
    const updated = exists
      ? selectedCourses.filter(sc => sc.code !== course.code)
      : selectedCourses.length < maxCoursesAllowed
      ? [...selectedCourses, { ...course, addedDate: new Date().toISOString() }]
      : selectedCourses;

    if (!exists && selectedCourses.length >= maxCoursesAllowed) {
      showNotification('You cannot add more courses. Please remove a course first.', 'error');
      return;
    }

    setSelectedCourses(updated);
    showNotification(`${course.code} - ${course.name} ${exists ? 'removed' : 'added'} successfully!`);
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleCategoryChange = (cat: string) => setCurrentCategory(cat);
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCurrentDepartment(e.target.value);
  const handlePageChange = (p: number) => setCurrentPage(p);

  const getCurrentPageCourses = () => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    return filteredCourses.slice(startIndex, startIndex + coursesPerPage);
  };

  const saveSelections = () => {
    showNotification('Selections saved! Redirecting...');
    setTimeout(() => {
      router.push('/profile/member');
    }, 1000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f8f8] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Manage Your Courses</h1>
            <p className="text-sm text-gray-600">Plan: <strong>{subscription.name}</strong></p>
            <p className="text-sm text-gray-600">Allowed: {subscription.maxCourses}</p>
            <p className="text-sm text-gray-600">Selected: {selectedCourses.length}</p>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              className="border px-3 py-2 rounded w-full max-w-md"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {['all', 'business', 'science'].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1 rounded-full text-sm border ${
                  currentCategory === cat ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <select value={currentDepartment} onChange={handleDepartmentChange} className="border px-3 py-2 rounded">
              <option value="all">All Departments</option>
              <option value="APK">APK - Applied Physiology</option>
              <option value="BSC">BSC - Biological Sciences</option>
              <option value="BUL">BUL - Business Law</option>
              <option value="ECO">ECO - Economics</option>
              <option value="MCB">MCB - Microbiology</option>
              <option value="PSY">PSY - Psychology</option>
              <option value="STA">STA - Statistics</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {getCurrentPageCourses().map(course => (
              <div
                key={course.code}
                className="relative p-5 bg-white shadow rounded border hover:shadow-md transition"
              >
                <div className="font-semibold text-lg">{course.code} - {course.name}</div>
                <div className="text-sm text-gray-500">{course.term} {course.semester}</div>
                <button
                  onClick={() => toggleCourseSelection(course)}
                  className="absolute top-3 right-3 text-xs text-red-600 underline"
                >
                  {selectedCourses.some(sc => sc.code === course.code) ? 'Remove' : 'Add'}
                </button>
              </div>
            ))}
          </div>

          {notification.show && (
            <div className={`mt-6 text-sm p-3 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {notification.message}
            </div>
          )}

          <div className="mt-10 flex gap-4">
            <button onClick={() => router.back()} className="px-5 py-2 border rounded bg-gray-200 hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={saveSelections} className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Save
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
