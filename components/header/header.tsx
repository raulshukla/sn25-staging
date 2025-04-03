'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import LoginModal from '@/components/auth/LoginModal';
import SignupModal from '@/components/auth/SignupModal';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  // 🔁 Listen for external trigger (e.g. Forgot Password page)
  useEffect(() => {
    const openSignupListener = () => setShowSignup(true);
    document.addEventListener('openSignupModal', openSignupListener);
    return () => {
      document.removeEventListener('openSignupModal', openSignupListener);
    };
  }, []);

  return (
    <>
      <div className="flex flex-row w-full justify-between px-16 py-2 rounded-md border-b z-50 sticky items-center bg-white">
        <div className="flex flex-row gap-8">
          <img
            src="/assets/images/logo.png"
            alt=""
            className="h-8 cursor-pointer"
            onClick={() => router.push('/')}
          />
          <div className="h-8 flex flex-row justify-center items-center gap-2 bg-slate-100 rounded-full px-3">
            <div className="h-2 w-2 rounded-full bg-[#00ff00]" />
            <span className="text-red-500">{784}</span> Members Online
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Button variant="link">Classes</Button>
          <Button variant="link">Locations</Button>
          <Button variant="link">Jobs</Button>
          <Button variant="link">Contact</Button>
          <Button variant="link">Membership</Button>
          <Button variant="link">Admin</Button>

          {!isLoggedIn ? (
            <>
              <Button variant="secondary" onClick={() => setShowLogin(true)}>
                Login
              </Button>
              <Button
                onClick={() => setShowSignup(true)}
                className="h-[51px] rounded-2xl px-6"
              >
                Join for Free
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => router.push('/profile/member')}>Profile</Button>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl">
            <LoginModal
              onClose={() => setShowLogin(false)}
              openSignup={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl">
            <SignupModal
              onClose={() => setShowSignup(false)}
              openLogin={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
