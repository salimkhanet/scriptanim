"use client";

import { useState, useEffect } from "react";
import BottomNav from "@/components/BottomNav";
import LoadingScreen from "@/components/LoadingScreen";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <>
      {loading ? <LoadingScreen /> : (
        <>
          {children}
          <BottomNav />
        </>
      )}
    </>
  );
}
