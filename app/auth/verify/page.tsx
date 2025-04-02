import { Suspense } from 'react';
import VerifyPageContent from '@/app/auth/verify/VerifyPageContent';

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
