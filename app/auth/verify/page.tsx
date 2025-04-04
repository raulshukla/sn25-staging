'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';
import ProfileForm from '@/components/profile/ProfileForm';

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();

  const uid = params.get('uid');
  const code = params.get('code');

  const [step, setStep] = useState(1); // 1 = Verify Email, 2 = Complete Profile
  const [status, setStatus] = useState<'loading' | 'verified' | 'error'>('loading');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (!uid) {
      setStatus('error');
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify?uid=${uid}${code ? `&code=${code}` : ''}`);
        const result = await res.json();

        if (!res.ok) {
          setStatus('error');
          return;
        }

        setEmail(result.email);
        setUserId(result.userId);

        if (result.verified && result.profileCompleted) {
          router.push('/profile/member');
        } else if (result.verified) {
          setStep(2); // Show profile form
          setStatus('verified');
        }
      } catch (error) {
        console.error('Verification failed:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [uid, code, router]);

  const handleProfileComplete = () => {
    router.push('/membership');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-4 py-12 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          {/* Fancy Progress Steps Header */}
          <div className="relative flex justify-between items-center mb-10">
            {['Sign Up', 'Verify Email', 'Complete Profile'].map((label, idx) => (
              <div key={label} className="flex-1 flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center
                    ${step > idx ? 'bg-green-500' : step === idx ? 'bg-red-600 animate-pulse' : 'bg-gray-300'}`}
                >
                  {idx + 1}
                </div>
                <span className="text-xs mt-2 text-center">{label}</span>
              </div>
            ))}

            {/* Connector Line */}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full">
              <div
                className="h-1 bg-red-600 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Logic */}
          {status === 'loading' && (
            <div className="text-center text-gray-600 py-10">Verifying your email...</div>
          )}

          {status === 'error' && (
            <div className="text-center text-red-600 py-10">
              ❌ Verification failed or link has expired.
            </div>
          )}

          {status === 'verified' && step === 2 && (
            <>
              <h2 className="text-xl font-bold mb-4 text-red-600">Step 3: Complete Your Profile</h2>
              <ProfileForm
                email={email}
                userId={userId}
                onSubmit={async (data) => {
                  await fetch('/api/profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...data, userId }),
                  });
                  handleProfileComplete();
                }}
                onSuccess={handleProfileComplete}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
