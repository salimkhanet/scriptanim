"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Save, LogOut, Star } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [videoCount, setVideoCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");

        // Videos count
        const vq = query(
          collection(db, "videos"),
          where("userId", "==", currentUser.uid)
        );
        onSnapshot(vq, (snap) => setVideoCount(snap.size));

        // Characters count
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

  const handleSave = async () => {
    if (!name) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName: name });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const getLevel = () => {
    if (videoCount >= 50) return { label: "Master Creator", color: "from-purple-500 to-pink-500" };
    if (videoCount >= 20) return { label: "Pro Creator", color: "from-indigo-500 to-blue-500" };
    if (videoCount >= 5) return { label: "Rising Creator", color: "from-green-500 to-teal-500" };
    return { label: "Beginner Creator", color: "from-yellow-500 to-orange-500" };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-white text-2xl font-bold animate-pulse">লোড হচ্ছে...</div>
      </div>
    );
  }

  const level = getLevel();

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <div className="bg-indigo-700 px-6 py-4 flex justify-between items-center shadow-lg">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold"
        >
          <ArrowLeft size={22} />
          Dashboard
        </button>
        <h1 className="text-xl font-extrabold">আমার Profile</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded-xl font-semibold transition text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <div className="p-6 max-w-md mx-auto pb-24">

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-extrabold shadow-xl">
              {name ? name.charAt(0).toUpperCase() : "?"}
            </div>
            <button className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full shadow-lg transition">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="text-2xl font-bold mt-4">{user?.displayName || "নাম নেই"}</h2>
          <p className="text-gray-400 text-sm mt-1">{user?.email}</p>

          {/* Creator Level */}
          <div className={`mt-3 bg-gradient-to-r ${level.color} px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold shadow`}>
            <Star size={16} />
            {level.label}
          </div>
        </div>

        {/* Real Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-extrabold text-indigo-400">{videoCount}</p>
            <p className="text-gray-400 text-xs mt-1">ভিডিও</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-extrabold text-pink-400">50</p>
            <p className="text-gray-400 text-xs mt-1">Credits</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-extrabold text-orange-400">{charCount}</p>
            <p className="text-gray-400 text-xs mt-1">Characters</p>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 text-gray-200">Profile সম্পাদনা</h3>

          {success && (
            <div className="bg-green-500/20 text-green-400 p-3 rounded-xl mb-4 text-center font-medium">
              ✅ সফলভাবে সেভ হয়েছে!
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border-2 border-gray-600 focus:border-indigo-500 outline-none transition"
                placeholder="আপনার নাম"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">ইমেইল</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-gray-700/50 text-gray-400 px-4 py-3 rounded-xl border-2 border-gray-600 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition flex justify-center items-center gap-2 disabled:opacity-60"
          >
            <Save size={20} />
            {saving ? "সেভ হচ্ছে..." : "সেভ করুন"}
          </button>
        </div>

        {/* Plan Info */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-2">আপনার Plan</h3>
          <p className="text-indigo-200 text-sm mb-4">Free Plan • ৫০ Credits বাকি</p>
          <button
            onClick={() => router.push("/pricing")}
            className="w-full bg-white text-indigo-700 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition"
          >
            ⭐ Premium এ আপগ্রেড করুন
          </button>
        </div>

      </div>
    </div>
  );
}
