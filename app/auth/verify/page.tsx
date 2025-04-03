'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

export default function EmailVerificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    // Simulate verification delay
    setTimeout(() => {
      // Commented actual logic (example)
      // const verified = await verifyEmail(token);
      setEmailVerified(true); // ✅ Mocked success
      setLoading(false);
    }, 1000);
  }, []);

  const handleContinue = () => {
    router.push('/auth/profile');
  };

  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-4 text-center text-red-600">Email Verification</h1>

          {loading ? (
            <p className="text-center text-gray-600">Verifying your email...</p>
          ) : emailVerified ? (
            <>
              <p className="text-center text-green-600 mb-4">
                ✅ Your email has been verified successfully!
              </p>
              <button
                onClick={handleContinue}
                className="w-full bg-red-600 text-white py-3 rounded-md mt-2"
              >
                Continue to Profile Setup
              </button>
            </>
          ) : (
            <p className="text-center text-red-500">❌ Invalid or expired verification link.</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
