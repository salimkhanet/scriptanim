"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Video, Wand2, Users, LogOut, Bell, Settings, User } from "lucide-react";
import { ToastContainer, useToast } from "@/components/Toast";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoCount, setVideoCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const router = useRouter();
  const { toasts, removeToast, toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        toast.success("স্বাগতম ScriptAnim এ! 🎬");

        // Real video count
        const vq = query(
          collection(db, "videos"),
          where("userId", "==", currentUser.uid)
        );
        onSnapshot(vq, (snap) => setVideoCount(snap.size));

        // Real character count
        const cq = query(
          collection(db, "characters"),
          where("userId", "==", currentUser.uid)
        );
        onSnapshot(cq, (snap) => setCharCount(snap.size));

      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    toast.info("লগআউট হয়েছে!");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
        <div className="text-white text-2xl font-bold animate-pulse">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Navbar */}
      <div className="bg-indigo-700 px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-extrabold tracking-wide">🎬 ScriptAnim</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => toast.info("কোনো নতুন নোটিফিকেশন নেই!")}
            className="hover:text-yellow-300 transition"
          >
            <Bell size={22} />
          </button>
          <button onClick={() => router.push("/profile")} className="hover:text-yellow-300 transition">
            <User size={22} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 pb-24">

        {/* Welcome */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 shadow-xl">
          <h2 className="text-3xl font-bold">স্বাগতম! 👋</h2>
          <p className="text-indigo-200 mt-1">{user?.displayName || user?.email}</p>
          <p className="text-white/80 mt-2">আজকে কোন ভিডিও বানাবেন?</p>
          <button
            onClick={() => router.push("/generate")}
            className="mt-4 bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition text-sm"
          >
            🎬 এখনই শুরু করুন
          </button>
        </div>

        {/* Quick Actions */}
        <h3 className="text-xl font-bold mb-4 text-gray-200">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => router.push("/generate")}
            className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl p-5 flex flex-col items-center gap-3 transition shadow-lg"
          >
            <Wand2 size={32} />
            <span className="font-bold">নতুন ভিডিও</span>
          </button>
          <button
            onClick={() => router.push("/my-videos")}
            className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-5 flex flex-col items-center gap-3 transition shadow-lg"
          >
            <Video size={32} />
            <span className="font-bold">আমার ভিডিও</span>
          </button>
          <button
            onClick={() => router.push("/character")}
            className="bg-pink-600 hover:bg-pink-700 rounded-2xl p-5 flex flex-col items-center gap-3 transition shadow-lg"
          >
            <Users size={32} />
            <span className="font-bold">Character</span>
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="bg-orange-500 hover:bg-orange-600 rounded-2xl p-5 flex flex-col items-center gap-3 transition shadow-lg"
          >
            <Settings size={32} />
            <span className="font-bold">Settings</span>
          </button>
        </div>

        {/* Real Stats */}
        <h3 className="text-xl font-bold mb-4 text-gray-200">📊 আপনার Stats</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-extrabold text-indigo-400">{videoCount}</p>
            <p className="text-gray-400 text-sm mt-1">ভিডিও</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-extrabold text-pink-400">50</p>
            <p className="text-gray-400 text-sm mt-1">Credits</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-extrabold text-orange-400">{charCount}</p>
            <p className="text-gray-400 text-sm mt-1">Characters</p>
          </div>
        </div>

        {/* Extra Tools */}
        <h3 className="text-xl font-bold mb-4 text-gray-200">🛠️ Extra Tools</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/seo-toolkit")}
            className="bg-red-600 hover:bg-red-700 rounded-2xl p-5 flex flex-col items-center gap-3 transition shadow-lg"
          >
            <span className="text-3xl">📊</span>
            <span className="font-bold text-sm">YouTube SEO</span>
          </button>
          <button
            onClick={() => router.push("/community")}
            className="bg-teal-600 hover:bg-teal-700 rounded-2xl p-5 flex flex-col items-center gap-3 transition shadow-lg"
          >
            <span className="text-3xl">🌍</span>
            <span className="font-bold text-sm">Community</span>
          </button>
        </div>

      </div>
    </div>
  );
}
