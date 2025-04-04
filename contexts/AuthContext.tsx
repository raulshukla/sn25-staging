'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    const userCookie = Cookies.get('user');

    console.log('🔐 AuthContext cookies:', { token, userCookie });

    if (token && userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        if (parsedUser?.id && parsedUser?.email) {
          setUser(parsedUser); // ✅ Use the cookie user directly
        }
      } catch (err) {
        console.error('❌ Failed to parse user cookie:', err);
        Cookies.remove('auth_token');
        Cookies.remove('user');
      }
    }
  }, []);

  const logout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
