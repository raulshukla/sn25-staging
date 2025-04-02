'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const boxStyle =
  'w-12 h-12 text-center text-xl border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500';

export default function OtpStep({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack?: () => void;
}) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const VALID_OTP = '6789'; // 💡 Hardcoded for now

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    setError('');
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const updated = [...otp];
      updated[index - 1] = '';
      setOtp(updated);
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData('Text').slice(0, 4);
    if (/^\d{4}$/.test(data)) {
      const chars = data.split('');
      setOtp(chars);
      inputsRef.current[3]?.focus();
      setError('');
    }
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    if (code.length < 4) {
      setError('Please enter all 4 digits');
      return;
    }

    setVerifying(true);
    await new Promise((res) => setTimeout(res, 1000)); // Simulate API delay

    if (code === VALID_OTP) {
      toast.success('OTP verified');
      onSuccess();
    } else {
      setError('Invalid OTP');
      toast.error('Incorrect OTP. Please try again.');
    }
    setVerifying(false);
  };

  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4"
    >
      <div
        className="flex gap-3"
        onPaste={handlePaste}
      >
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el!)}
            maxLength={1}
            value={otp[i]}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={boxStyle}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      {error && (
        <motion.div
          className="text-sm text-red-600 mt-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </motion.div>
      )}

      <button
        onClick={handleSubmit}
        disabled={verifying}
        className="mt-4 w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition disabled:opacity-50"
      >
        {verifying ? 'Verifying...' : 'Verify OTP'}
      </button>

      {onBack && (
        <button
          onClick={onBack}
          className="text-sm text-gray-500 underline hover:text-red-600"
        >
          ← Back
        </button>
      )}
    </motion.div>
  );
}
