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
          <p classN
