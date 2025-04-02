'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Plan = {
  id: string;
  name: string;
  monthlyPrice: number;
  shortDescription: string;
  features: string[];
  materials: { name: string; hasFootnote?: boolean }[];
  terms: string[];
  footnotes?: string;
};

export default function MembershipPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<Plan[]>('/api/plans');
        setPlans(data);
      } catch (err) {
        setError('Failed to load membership plans. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = (planId: string) => {
    router.push(`/payment?planId=${planId}`);
  };

  if (isLoading) {
    return <div className="text-center py-16 text-gray-500">Loading available plans...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Find the Right Study Plan for You</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Flexible membership options to match your study needs. Choose your plan and get access to top-quality study materials today!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-xl p-6 shadow-sm cursor-pointer transition hover:shadow-md ${
              selectedPlan?.id === plan.id ? 'border-red-500 ring-2 ring-red-300' : ''
            }`}
            onClick={() => handleSelectPlan(plan)}
          >
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-700">MEMBERSHIP | {plan.name}</h2>
              <div className="flex items-baseline gap-1 text-xl font-semibold text-red-600">
                <span className="text-lg">$</span>
                {plan.monthlyPrice}
                <span className="text-sm text-gray-400">/month</span>
              </div>
              <p className="text-sm text-gray-500">{plan.shortDescription}</p>
            </div>

            <div className="space-y-2 mb-4">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-700">
                  ✅ <span className="ml-2">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="font-medium text-gray-800 mb-1">Included Study Materials:</div>
              {plan.materials.map((material, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-700">
                  ✅ <span className="ml-2">{material.name}{material.hasFootnote ? '*' : ''}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              {plan.terms.map((term, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-700">
                  ✅ <span className="ml-2">{term}</span>
                </div>
              ))}
            </div>

            {plan.footnotes && (
              <div className="mt-2 text-xs text-gray-400 italic">{plan.footnotes}</div>
            )}

            <button
              onClick={() => handleSubscribe(plan.id)}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 text-sm text-gray-600 text-center max-w-2xl mx-auto">
        <strong className="block mb-1 text-gray-800">Important Policy Information:</strong>
        Printing or saving of online materials is not available or permitted. Printed packets can be picked up at our Gainesville location about a week before each exam. All materials are updated weekly to keep pace with your courses.
      </div>
    </main>
  );
}
