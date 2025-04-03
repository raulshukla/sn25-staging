'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  justSignedUp: boolean;
  login: () => void;
  logout: () => void;
  setJustSignedUp: (val: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const signedUp = localStorage.getItem('justSignedUp') === 'true';
    setIsLoggedIn(loggedIn);
    setJustSignedUp(signedUp);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setJustSignedUp(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('justSignedUp');
  };

  const handleSetJustSignedUp = (val: boolean) => {
    setJustSignedUp(val);
    if (val) {
      localStorage.setItem('justSignedUp', 'true');
    } else {
      localStorage.removeItem('justSignedUp');
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, justSignedUp, login, logout, setJustSignedUp: handleSetJustSignedUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within <AuthProvider>');
  return context;
};
