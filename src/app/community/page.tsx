"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, MessageCircle, Share2, Download, Search, TrendingUp, Star, Trophy } from "lucide-react";

const videos = [
  {
    id: 1,
    creator: "রাহুল দাস",
    avatar: "👨",
    title: "জাদুর পাহাড়ের গল্প",
    style: "কার্টুন",
    likes: 1240,
    comments: 89,
    thumbnail: "🏔️",
    duration: "2:30",
    verified: true,
  },
  {
    id: 2,
    creator: "সুমাইয়া আক্তার",
    avatar: "👩",
    title: "মহাকাশে একদিন",
    style: "অ্যানিমে",
    likes: 980,
    comments: 67,
    thumbnail: "🚀",
    duration: "1:45",
    verified: true,
  },
  {
    id: 3,
    creator: "করিম সাহেব",
    avatar: "🧔",
    title: "সমুদ্রের রহস্য",
    style: "3D",
    likes: 756,
    comments: 45,
    thumbnail: "🌊",
    duration: "3:00",
    verified: false,
  },
  {
    id: 4,
    creator: "প্রিয়া রানী",
    avatar: "👧",
    title: "পরীর দেশে ভ্রমণ",
    style: "কার্টুন",
    likes: 2100,
    comments: 134,
    thumbnail: "🧚",
    duration: "2:15",
    verified: true,
  },
  {
    id: 5,
    creator: "তানভীর হোসেন",
    avatar: "👦",
    title: "রোবটের দুনিয়া",
    style: "পিক্সেল আর্ট",
    likes: 654,
    comments: 38,
    thumbnail: "🤖",
    duration: "1:30",
    verified: false,
  },
];

const tabs = ["🔥 Trending", "⭐ Featured", "🆕 নতুন", "🏆 Top Creators"];

export default function CommunityPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.creator.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 className="text-xl font-extrabold">🌍 Community</h1>
        <div className="w-20" />
      </div>

      <div className="p-4 pb-24 max-w-md mx-auto">

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ভিডিও বা creator খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl border-2 border-gray-700 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0 transition ${
                activeTab === i
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Weekly Challenge Banner */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-4 mb-4 flex items-center gap-4">
          <Trophy size={40} className="flex-shrink-0" />
          <div>
            <h3 className="font-extrabold text-lg">সাপ্তাহিক চ্যালেঞ্জ 🏆</h3>
            <p className="text-yellow-100 text-sm">এই সপ্তাহের বিষয়: "বৃষ্টির দিন"</p>
            <p className="text-yellow-200 text-xs mt-1">পুরস্কার: ৫০০ Credits</p>
          </div>
        </div>

        {/* Video Feed */}
        {activeTab !== 3 ? (
          <div className="space-y-4">
            {filtered.map((video) => (
              <div key={video.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700">

                {/* Creator Info */}
                <div className="flex items-center gap-3 p-4 pb-2">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-xl">
                    {video.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-sm">{video.creator}</p>
                      {video.verified && (
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <p className="text-gray-400 text-xs">{video.style}</p>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="mx-4 bg-gray-700 rounded-xl h-40 flex items-center justify-center text-7xl">
                  {video.thumbnail}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-base">{video.title}</h3>
                    <span className="text-gray-400 text-xs bg-gray-700 px-2 py-1 rounded-lg">
                      ⏱ {video.duration}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleLike(video.id)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                        liked.includes(video.id)
                          ? "bg-red-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      <Heart size={16} className={liked.includes(video.id) ? "fill-white" : ""} />
                      {video.likes + (liked.includes(video.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition">
                      <MessageCircle size={16} />
                      {video.comments}
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition">
                      <Share2 size={16} />
                      Share
                    </button>
                    <button className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 transition ml-auto">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Top Creators Tab */
          <div className="space-y-3">
            {videos.map((v, i) => (
              <div key={v.id} className="bg-gray-800 rounded-2xl p-4 flex items-center gap-4 border border-gray-700">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm ${
                  i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-600" : "bg-gray-700"
                }`}>
                  {i + 1}
                </div>
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-xl">
                  {v.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-bold">{v.creator}</p>
                    {v.verified && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                  </div>
                  <p className="text-gray-400 text-xs">{v.likes} likes</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold transition">
                  Follow
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
