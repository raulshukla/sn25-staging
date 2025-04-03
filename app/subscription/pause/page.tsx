'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

export default function PauseMembershipPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [resumeDate, setResumeDate] = useState('');
  const [password, setPassword] = useState('');
  const [termsVisible, setTermsVisible] = useState(false);

  useEffect(() => {
    if (selected) {
      const date = new Date();
      date.setMonth(date.getMonth() + selected);
      const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setResumeDate(formatted);
    }
  }, [selected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selected) {
      alert('Please select a pause duration.');
      return;
    }

    if (!password) {
      alert('Please enter your password to confirm this change.');
      return;
    }

    // Simulate pause membership API
    setTimeout(() => {
      alert(`Your membership has been paused. It will resume on ${resumeDate}.`);
      router.push('/subscription/view');
    }, 1000);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">Pause Your Membership</h1>
          <p className="text-gray-600 mb-6">
            Need a break? Pause your membership temporarily and resume when you're ready.
          </p>

          <div className="bg-yellow-50 border border-yellow-300 p-4 rounded mb-6">
            <div className="flex items-center gap-2 font-semibold mb-2">📝 About Pausing</div>
            <p className="text-sm text-gray-700">
              Pausing your membership temporarily stops your billing and access to study materials.
              Your subscription will automatically resume after the selected pause period.
            </p>
            <button
              className="text-red-600 mt-2 text-sm underline"
              onClick={() => setTermsVisible(!termsVisible)}
            >
              {termsVisible ? 'Hide' : 'View'} full pause terms
            </button>
            {termsVisible && (
              <ul className="text-sm mt-2 list-disc list-inside text-gray-600">
                <li>You won't be billed during the pause period.</li>
                <li>Access to materials will be paused.</li>
                <li>Auto-resume after selected duration.</li>
                <li>Only one pause every 6 months.</li>
                <li>Max pause duration: 3 months.</li>
              </ul>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Subscription Status</h2>
            <div className="text-sm text-gray-600">
              <p><strong>Plan:</strong> 2 Course Plan ($75/month)</p>
              <p><strong>Account Age:</strong> 7 months</p>
              <p><strong>Last Paused:</strong> Never</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Select Pause Duration</h2>
              <div className="flex gap-4">
                {[1, 2, 3].map((month) => (
                  <div
                    key={month}
                    onClick={() => setSelected(month)}
                    className={`cursor-pointer border rounded p-4 flex-1 text-center ${
                      selected === month
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-red-400'
                    }`}
                  >
                    <div className="text-xl font-bold">{month}</div>
                    <div className="text-sm text-gray-500">
                      {month === 1 ? 'Month' : 'Months'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded mb-6">
              <p className="text-sm text-green-800">
                Your membership will resume on: <strong>{resumeDate || 'Select duration'}</strong>
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Verify Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border px-3 py-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Pause Membership
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
