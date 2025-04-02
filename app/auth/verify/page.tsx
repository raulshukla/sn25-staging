'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      console.log('Verifying token:', token);
      setTimeout(() => {
        alert('Email verified successfully!');
        router.push('/auth/profile-setup');
      }, 1000);
    }
  }, [token, router]);

  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center">
        <div className="text-center text-lg font-semibold text-gray-700">
          Verifying your email...
        </div>
      </div>
      <Footer />
    </>
  );
}
