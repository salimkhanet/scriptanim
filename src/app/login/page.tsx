"use client";

import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError("ইমেইল বা পাসওয়ার্ড ভুল!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Google লগইন ব্যর্থ হয়েছে!");
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
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back! ✨</h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-700 font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm font-medium">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800">Forgot Password?</a>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex justify-center items-center gap-2 disabled:opacity-60"
          >
            <LogIn size={22} />
            {loading ? "লগইন হচ্ছে..." : "Sign In"}
          </button>

          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <span className="absolute bg-white px-3 text-gray-500 font-medium text-sm">Or continue with</span>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="flex-1 flex justify-center items-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700 disabled:opacity-60"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.58c2.08-1.92 3.27-4.74 3.27-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.58-2.77c-.98.66-2.23 1.06-3.7 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </div>
          </div>

          <p className="text-center mt-8 text-gray-600 font-medium">
            Don't have an account? <a href="/register" className="text-pink-500 hover:text-pink-600 font-bold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
