'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <p className="text-gray-600">Selected Plan ID: {planId}</p>
      {/* Additional payment logic here */}
    </main>
  );
}

export default function PaymentPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <PaymentPageContent />
      </Suspense>
      <Footer />
    </>
  );
}
