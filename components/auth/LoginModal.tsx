'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ModalWrapper from '@/components/ui/ModalWrapper';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [uid, setUid] = useState('');
  const [pwd, setPwd] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const handleLogin = () => {
    if (uid === 'rahul' && pwd === '1234') {
      setSentOtp('6789');
      setStep('otp');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleOtpValidate = () => {
    if (otp === sentOtp) {
      login();
      onClose();
      router.push('/course');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <ModalWrapper show={true} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {step === 'login' ? 'Login to Smokin\'Notes' : 'Enter OTP'}
      </h2>
      {step === 'login' ? (
        <div className="space-y-4">
          <input
            type="text"
            ref={inputRef}
            placeholder="Username"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          >
            Login
          </button>
          <div className="text-sm text-center text-gray-500 mt-2">
            <a href="/auth/signup" className="text-red-600 hover:underline mr-4">Sign Up</a>
            <a href="/auth/forgot-password" className="text-red-600 hover:underline">Forgot Password?</a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleOtpValidate}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          >
            Verify OTP
          </button>
        </div>
      )}
    </ModalWrapper>
  );
}
