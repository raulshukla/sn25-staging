'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import ModalWrapper from '@/components/ui/ModalWrapper';

export default function SignupModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((res) => setTimeout(res, 1200));
    toast.success(`Verification link sent to ${email}`);
    setStatus('sent');
  };

  return (
    <ModalWrapper show={true} onClose={onClose}>
      <h1 className="text-2xl font-bold mb-2 text-red-600 text-center">Smokin'Notes</h1>
      <h2 className="text-xl font-semibold mb-1 text-center">Get started for free</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Join over 100,000 UF students who've boosted their GPA!
      </p>

      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="text-center text-green-600 font-medium text-lg"
          >
            🎉 Verification link sent to <span className="font-semibold">{email}</span>. <br />
            Please check your inbox to continue!
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <input
              type="email"
              ref={inputRef}
              placeholder="Enter your UFL.edu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'sending'}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-500 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : 'Send Verification Email'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="text-xs text-gray-500 mt-6 text-center">
        By signing up, you agree to our{' '}
        <a href="#" className="text-red-500 underline">Terms</a> and{' '}
        <a href="#" className="text-red-500 underline">Privacy Policy</a>.
      </div>
    </ModalWrapper>
  );
}
