'use client';

import { useSearchParams } from 'next/navigation';

export default function VerifyPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Verifying Email...</h1>
      <p>Email: {email}</p>
      <p>Token: {token}</p>
      {/* Add actual logic or redirect here */}
    </div>
  );
}
