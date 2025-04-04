'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from '@/contexts/AuthContext';

type LoginModalProps = {
  onClose: () => void;
  openSignup: () => void;
};

export default function LoginModal({ onClose, openSignup }: LoginModalProps) {
  const router = useRouter();
  const { setUser } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const fullEmail = username.includes('@') ? username : `${username}@ufl.edu`;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fullEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Login failed');
        return;
      }

      // ✅ Trigger AuthContext manually using cookie
      const userCookie = Cookies.get('user');
      if (userCookie) {
        try {
          const parsed = JSON.parse(userCookie);
          setUser(parsed);
        } catch (err) {
          console.error('Failed to parse user cookie:', err);
        }
      }

      onClose();
      router.push('/course/add');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const verifyOtp = () => {
    const fullOtp = otp.join('');
    if (fullOtp === '1234') {
      onClose();
      router.push('/course/add');
    } else {
      setError('Invalid OTP. Try again.');
    }
  };

  useEffect(() => {
    if (step === 'otp') inputRefs.current[0]?.focus();
  }, [step]);

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-lg animate-fadeIn relative">
      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 hover:text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-8 text-center border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-600">Log in to access your study materials</p>
      </div>

      <div className="p-6 space-y-4">
        {error && <div className="bg-red-100 text-red-700 text-sm p-3 rounded">{error}</div>}

        {step === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="UFL Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded px-4 py-3 pr-20 text-sm"
                required
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                @ufl.edu
              </span>
            </div>

            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-4 py-3 pr-16 text-sm"
                required
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-blue-500 cursor-pointer"
                onClick={() => setShowPwd(!showPwd)}
              >
                {showPwd ? 'Hide' : 'Show'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-3 rounded hover:bg-red-700 transition"
            >
              Send OTP
            </button>

            <div className="text-center mt-2">
              <a href="/profile/forgot-password" className="text-sm text-blue-600 underline">
                Forgot your password?
              </a>
            </div>

            <div className="border-t pt-4 text-center text-sm text-gray-700">
              <p className="mb-2">Don’t have an account?</p>
              <button
                type="button"
                onClick={openSignup}
                className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50"
              >
                Sign up with UFL Email
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Enter the 4-digit OTP sent to your registered mobile number.
            </p>
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => {
                    inputRefs.current[i] = el!;
                  }}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-12 h-12 text-center border border-gray-400 rounded text-xl font-mono"
                />
              ))}
            </div>
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
