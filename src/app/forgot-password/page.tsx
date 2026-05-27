"use client";

import React, { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    if (!email) {
      setError("ইমেইল দিন");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("এই ইমেইলে কোনো অ্যাকাউন্ট নেই!");
      } else {
        setError("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4">
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border-2 border-white/50">

        <div className="bg-indigo-600 p-6 text-center rounded-b-3xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-white tracking-wider drop-shadow-md">
            ScriptAnim
          </h1>
          <p className="text-indigo-200 mt-2 font-medium">AI Cartoon Video Maker</p>
        </div>

        <div className="p-8">
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition mb-6 font-medium"
          >
            <ArrowLeft size={20} />
            লগইনে ফিরুন
          </button>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">পাসওয়ার্ড রিসেট 🔐</h2>
          <p className="text-gray-500 text-center mb-6 text-sm">আপনার ইমেইলে রিসেট লিংক পাঠানো হবে</p>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-center font-medium">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center">
              <div className="bg-green-100 text-green-600 p-5 rounded-2xl mb-6 font-medium">
                ✅ ইমেইল পাঠানো হয়েছে! আপনার ইনবক্স চেক করুন।
              </div>
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                লগইনে ফিরুন
              </button>
            </div>
          ) : (
            <>
              <div className="relative mb-6">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="আপনার Email Address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={handleReset}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex justify-center items-center gap-2 disabled:opacity-60"
              >
                <Mail size={22} />
                {loading ? "পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
              </button>
            </>
          )}

          <p className="text-center mt-6 text-gray-600 font-medium">
            নতুন অ্যাকাউন্ট? <a href="/register" className="text-pink-500 hover:text-pink-600 font-bold">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
