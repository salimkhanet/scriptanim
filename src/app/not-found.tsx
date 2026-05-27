"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">

      {/* Animation */}
      <div className="text-center mb-8">
        <p className="text-9xl font-extrabold text-indigo-500 opacity-20 select-none">404</p>
        <div className="text-8xl -mt-16 animate-bounce">🎬</div>
      </div>

      {/* Text */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-3">পেজ পাওয়া যায়নি!</h1>
        <p className="text-gray-400 text-lg">
          আপনি যে পেজটি খুঁজছেন সেটি মুছে গেছে বা সরানো হয়েছে।
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg"
        >
          <Home size={22} />
          Dashboard এ যান
        </button>
        <button
          onClick={() => router.back()}
          className="w-full bg-gray-800 hover:bg-gray-700 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition"
        >
          <ArrowLeft size={22} />
          আগের পেজে ফিরুন
        </button>
      </div>

      {/* Branding */}
      <p className="text-gray-600 mt-12 text-sm">ScriptAnim • AI Cartoon Video Maker</p>
    </div>
  );
}
