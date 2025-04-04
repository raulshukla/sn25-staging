'use client'

import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AppProviders } from "@/components/providers"; // ✅ updated wrapper
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Toaster />
        <div className="min-h-screen">
        <AuthProvider>
            {children}
            </AuthProvider>
          </div>
       
        {/* <SpeedInsights />
        <Analytics /> */}
      </body>
    </html>
  );
}
