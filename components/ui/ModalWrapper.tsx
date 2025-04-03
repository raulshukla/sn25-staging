'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalWrapperProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalWrapper({ show, onClose, children }: ModalWrapperProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (show) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center">
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl"
          >
           
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
