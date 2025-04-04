'use client';

import { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

type SignupModalProps = {
  onClose: () => void;
  openLogin: () => void;
};

export default function SignupModal({ onClose, openLogin }: SignupModalProps) {
  const [email, setEmail] = useState('');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email.includes('@ufl.edu')) {
      alert('Please use your @ufl.edu email.');
      return;
    }
  
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || 'Signup failed.');
        return;
      }
      setVerifyUrl(data.verifyUrl);
      setSubmitted(true); // show success UI
    } catch (err) {
      console.error('Signup request failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };
  

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
    <div className="px-3 py-8">
      <h1 className="text-2xl font-semibold text-center text-red-600 mb-2">Get started for free</h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Join over 100,000 UF students who've boosted their GPA with our study guides!
      </p>

      {!submitted ? (
        <>
          <form onSubmit={handleSignup} className="flex gap-2">
            <input
              ref={inputRef}
              type="email"
              placeholder="Enter your UFL.edu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="px-6 bg-red-600 text-white rounded-r-md font-semibold text-sm hover:bg-red-700 transition"
            >
              Start
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <Check size={16} />
              </div>
              Full access to all features for 7 days
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <Check size={16} />
              </div>
              Cancel anytime
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            By signing up, you agree to our&nbsp;
            <a href="/terms" className="text-red-600 underline hover:text-red-700">Terms of Service</a>
            &nbsp;and&nbsp;
            <a href="/privacy" className="text-red-600 underline hover:text-red-700">Privacy Policy</a>.
          </p>

          <p className="text-center text-sm mt-4">
            <button onClick={() => { onClose(); openLogin(); }} className="underline text-blue-600 hover:text-blue-700">
              Already have an account? Login
            </button>
          </p>
        </>
      ) : (
        <div className="bg-green-50 text-green-800 border border-green-100 p-4 rounded-md text-sm text-center">
          ✅ To be in email:
          <br />
          <a
            href={verifyUrl}
            className="text-blue-600 underline hover:text-blue-800"
            onClick={onClose}
          >
            Click here to verify your email & complete your profile setup
          </a>
        </div>
      )}
    </div>
    </div>
  );
}
