'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

type MembershipPlan = {
  id: number;
  title: string;
  price: number;
};

const MOCK_PLANS: MembershipPlan[] = [
  { id: 1, title: 'MEMBERSHIP | 1', price: 50 },
  { id: 2, title: 'MEMBERSHIP | 2', price: 75 },
  { id: 3, title: 'MEMBERSHIP | 3', price: 100 },
];

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);

  useEffect(() => {
    const planId = Number(searchParams.get('planId'));
    const plan = MOCK_PLANS.find((p) => p.id === planId);
    setSelectedPlan(plan || null);
  }, [searchParams]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real payment logic
    console.log('Mock payment submitted');
    router.push('/course/selection');
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-100 py-12 px-4 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
            Payment Details
          </h1>

          {selectedPlan ? (
            <>
              <p className="text-gray-700 mb-4">
                You selected: <strong>{selectedPlan.title}</strong>
              </p>
              <p className="text-gray-700 mb-6">
                Total to Pay: <strong>${selectedPlan.price}</strong>
              </p>

              <form onSubmit={handlePayment} className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border px-4 py-2 rounded-md"
                  required
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 border px-4 py-2 rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-1/2 border px-4 py-2 rounded-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                  Pay ${selectedPlan.price}
                </button>
              </form>
            </>
          ) : (
            <p className="text-gray-600">No membership plan selected.</p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
