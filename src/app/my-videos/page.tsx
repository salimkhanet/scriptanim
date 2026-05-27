"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Trash2, Share2, Plus, Search, Loader2 } from "lucide-react";
import { db, auth } from "@/firebase/config";
import { collection, query, where, onSnapshot, deleteDoc, doc, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function MyVideosPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "videos"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "videos", id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = videos.filter((v) =>
    v.title?.toLowerCase().includes(search.toLowerCase()) ||
    v.script?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 size={40} className="text-indigo-400 animate-spin" />
      </div>
    );
  }

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
        <h1 className="text-xl font-extrabold">🎬 আমার ভিডিও</h1>
        <button
          onClick={() => router.push("/generate")}
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded-xl font-semibold transition text-sm"
        >
          <Plus size={16} />
          নতুন
        </button>
      </div>

      <div className="p-6 max-w-md mx-auto pb-24">

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ভিডিও খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl border-2 border-gray-700 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-indigo-400">{videos.length}</p>
            <p className="text-gray-400 text-xs mt-1">মোট ভিডিও</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-green-400">
              {videos.filter((v) => v.status === "সম্পন্ন").length}
            </p>
            <p className="text-gray-400 text-xs mt-1">সম্পন্ন</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-yellow-400">
              {videos.filter((v) => v.status === "প্রসেসিং").length}
            </p>
            <p className="text-gray-400 text-xs mt-1">প্রসেসিং</p>
          </div>
        </div>

        {/* Video List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🎬</p>
            <p className="text-gray-400 text-lg font-medium">কোনো ভিডিও নেই</p>
            <p className="text-gray-500 text-sm mt-2">প্রথম ভিডিও বানিয়ে শুরু করুন!</p>
            <button
              onClick={() => router.push("/generate")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-bold transition"
            >
              ভিডিও বানান ✨
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((video) => (
              <div
                key={video.id}
                className="bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-700"
              >
                <div className="flex gap-4 items-start">

                  {/* Thumbnail */}
                  <div className="w-20 h-16 bg-gray-700 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                    {video.thumbnail || "🎬"}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm">
                      {video.title || video.script?.substring(0, 30) + "..."}
                    </h3>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <span className="bg-indigo-600/30 text-indigo-300 px-2 py-0.5 rounded-lg text-xs font-medium">
                        {video.style}
                      </span>
                      <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-lg text-xs font-medium">
                        ⏱ {video.duration}
                      </span>
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                        video.status === "সম্পন্ন"
                          ? "bg-green-600/30 text-green-300"
                          : "bg-yellow-600/30 text-yellow-300"
                      }`}>
                        {video.status === "সম্পন্ন" ? "✅" : "⏳"} {video.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">
                      {video.createdAt?.toDate?.()?.toLocaleDateString("bn-BD") || ""}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex justify-center items-center gap-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-xl font-semibold text-sm transition">
                    <Play size={16} />
                    Play
                  </button>
                  <button className="flex-1 flex justify-center items-center gap-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-xl font-semibold text-sm transition">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-xl transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
