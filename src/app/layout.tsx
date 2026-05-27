"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import LoadingScreen from "@/components/LoadingScreen";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <html lang="bn" suppressHydrationWarning>
        <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="bn" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {children}
            <BottomNav />
          </>
        )}
      </body>
    </html>
  );
}
