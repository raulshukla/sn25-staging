'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import ModalWrapper from '@/components/ui/ModalWrapper';
import OtpStep from '@/components/auth/OtpStep';

export default function TabbedAuthModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { login } = useAuth();

  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState<'auth' | 'otp'>('auth');
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [tab, step]);

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    if (uid === 'rahul' && pwd === '1234') {
      setSentOtp('6789');
      setStep('otp');
      toast.success('OTP sent to registered mobile.');
    } else {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setSentOtp('6789');
    setStep('otp');
    toast.success(`Verification link & OTP sent to ${email}`);
    setLoading(false);
  };

  const handleOtpSuccess = () => {
    login();      // ✅ Set login state
    onClose();    // ✅ Close modal
  
    if (tab === 'signup') {
      router.push('/auth/profile');
    } else {
      router.push('/membership');
    }
  };

  return (
    <ModalWrapper show={true} onClose={onClose}>
      {/* Titles (shared) */}
      <div className="mb-6 text-center">
    <h1 className="text-2xl font-bold text-gray-800">
      {tab === 'login' ? 'Login to your account' : 'Create your account'}
    </h1>

    {tab === 'signup' && step === 'auth' && (
      <>
        <p className="text-sm text-gray-500 mt-1">Get started for free</p>
        <p className="text-sm text-gray-500">
          Join over 100,000 UF students who've boosted their GPA!
        </p>
      </>
    )}
  </div>

      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 font-semibold rounded-l-md transition ${
            tab === 'login' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => {
            setTab('login');
            setStep('auth');
          }}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-r-md transition ${
            tab === 'signup' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => {
            setTab('signup');
            setStep('auth');
          }}
        >
          Sign Up
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 'otp' ? (
         <OtpStep
         onSuccess={handleOtpSuccess}
         onBack={() => setStep('auth')}
       />
        ) : tab === 'login' ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <input
              ref={inputRef}
              type="text"
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
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition disabled:opacity-60"
            >
              {loading ? 'Sending OTP...' : 'Login'}
            </button>

            {/* Link to signup */}
            <div className="text-sm text-center text-gray-500 mt-2">
              New here?{' '}
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => {
                  setTab('signup');
                  setStep('auth');
                }}
              >
                Create Account
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <input
              ref={inputRef}
              type="email"
              placeholder="Enter your UFL.edu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>

            {/* Link to login */}
            <div className="text-sm text-center text-gray-500 mt-2">
              Already have an account?{' '}
              <button
                type="button"
                className="text-red-600 hover:underline"
                onClick={() => {
                  setTab('login');
                  setStep('auth');
                }}
              >
                Login here
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared footer */}
      <div className="text-xs text-gray-500 mt-6 text-center">
        By continuing, you agree to our{' '}
        <a href="#" className="text-red-500 underline">Terms</a> and{' '}
        <a href="#" className="text-red-500 underline">Privacy Policy</a>.
      </div>
    </ModalWrapper>
  );
}
