'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { Footer } from '@/components/footer/footer';

type MembershipPlan = {
  id: number;
  title: string;
  price: number;
  description: string;
  features: string[];
  materials: string[];
  terms: string[];
  footnote: string;
};

const plans: MembershipPlan[] = [
  {
    id: 1,
    title: 'MEMBERSHIP | 1',
    price: 50,
    description: 'For your single toughest course.',
    features: [
      "Access to 1 course's complete study materials",
      'Materials updated weekly with latest content',
    ],
    materials: [
      'Online Study Guides*',
      'Online Chapter Summaries*',
      'Online Flash Cards*',
      'Online Practice Exams',
      'Online Tutorial Videos',
    ],
    terms: [
      'All materials available online for instant access',
      'Optional printed packet at Gainesville location',
    ],
    footnote: '* Online access ends when printed notes are picked up',
  },
  {
    id: 2,
    title: 'MEMBERSHIP | 2',
    price: 75,
    description: 'For your two toughest courses.',
    features: [
      "Access to 2 courses' complete study materials",
      'Materials updated weekly with latest content',
    ],
    materials: [
      'Online Study Guides*',
      'Online Chapter Summaries*',
      'Online Flash Cards*',
      'Online Practice Exams',
      'Online Tutorial Videos',
    ],
    terms: [
      'Materials available online (packet pickup optional)',
      'Printed packet available at Gainesville location',
    ],
    footnote: '* Available online unless/until printed notes picked up',
  },
  {
    id: 3,
    title: 'MEMBERSHIP | 3',
    price: 100,
    description: 'For your three key courses.',
    features: [
      "Access to 3 courses' complete study materials",
      'Materials updated weekly with latest content',
    ],
    materials: [
      'Online Study Guides*',
      'Online Chapter Summaries*',
      'Online Flash Cards*',
      'Online Practice Exams',
      'Online Tutorial Videos',
    ],
    terms: [
      'Materials available online (packet pickup optional)',
      'Printed packet available at Gainesville location',
    ],
    footnote: '* Available online unless/until printed notes picked up',
  },
];

export default function MembershipPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="border-b border-gray-200 bg-white px-6 py-4 text-sm text-gray-600">
          Home &rsaquo; My Classes &rsaquo; <strong>Membership Plans</strong>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Find the Right Study Plan for You
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Flexible membership options to match your study needs. Choose your plan and get access
              to top-quality study materials today!
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
              >
                <div className="mb-4">
                  <h2 className="text-sm font-semibold text-red-600 uppercase">{plan.title}</h2>
                  <div className="text-3xl font-bold text-gray-900 flex items-baseline gap-1">
                    <span className="text-lg">$</span>
                    {plan.price}
                    <span className="text-sm text-gray-500 ml-1">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                </div>

                <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex gap-2">
                      ✅ <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Included Materials:</h4>
                  <ul className="text-sm space-y-2 text-gray-700">
                    {plan.materials.map((material, i) => (
                      <li key={i} className="flex gap-2">
                        ✅ <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 border-t pt-4">
                  <ul className="text-sm space-y-2 text-gray-700">
                    {plan.terms.map((term, i) => (
                      <li key={i} className="flex gap-2">
                        ✅ <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-gray-500 italic mt-3">{plan.footnote}</p>

                <button
                  onClick={() => router.push(`/payment?planId=${plan.id}`)}
                  className="mt-6 w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-100 p-4 text-center text-sm text-gray-700 mt-12 rounded-lg max-w-3xl mx-auto">
            <strong className="text-gray-800 block mb-1">Important Policy Information:</strong>
            Printing or saving of online materials is not available or permitted. Printed packets
            can be picked up at our Gainesville location about a week before each exam. All materials
            are updated weekly to keep pace with your courses.
          </div>

          <div className="mt-6 text-center">
            <button className="text-gray-600 text-sm underline hover:text-red-600">
              View All Membership Plans →
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
