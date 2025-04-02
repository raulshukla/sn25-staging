'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import TabbedAuthModal from '@/components/auth/TabbedAuthModal';

export const Header = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <div className="flex flex-row w-full justify-between px-16 py-2 rounded-md border-b z-50 sticky items-center bg-white">
        {/* Logo & Online Status */}
        <div className="flex flex-row gap-8">
          <img
            src="/assets/images/logo.png"
            alt="SmokinNotes Logo"
            className="h-8 cursor-pointer"
            onClick={() => router.push('/')}
          />
          <div className="h-8 flex flex-row justify-center items-center gap-2 bg-slate-100 rounded-full px-3">
            <div className="h-2 w-2 rounded-full bg-[#00ff00]" />
            <span className="text-red-500">{784}</span> Members Online
          </div>
        </div>

        {/* Navigation + Auth Buttons */}
        <div className="flex flex-row items-center gap-2">
          <Button variant="link" onClick={() => router.push('/classes')}>Classes</Button>
          <Button variant="link" onClick={() => router.push('/locations')}>Locations</Button>
          <Button variant="link" onClick={() => router.push('/jobs')}>Jobs</Button>
          <Button variant="link" onClick={() => router.push('/contact')}>Contact</Button>
          <Button variant="link" onClick={() => router.push('/membership')}>Membership</Button>
          <Button variant="link" onClick={() => router.push('/admin')}>Admin</Button>

          {!isLoggedIn ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowAuthModal(true)}
              >
                Login
              </Button>
              <Button
                className="h-[51px] rounded-2xl px-6"
                onClick={() => setShowAuthModal(true)}
              >
                Create Account
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => router.push('/auth/profile')}>
                Profile
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabbed Auth Modal (Login + Signup) */}
      {showAuthModal && (
        <TabbedAuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

Header.displayName = 'Header';
