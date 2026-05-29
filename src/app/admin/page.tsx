"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  Users, Video, CreditCard, Flag,
  TrendingUp, Shield, Trash2, Ban, Check,
  Search, Bell, Settings, BarChart3
} from "lucide-react";

const ADMIN_UID = "8dbptOnkz6SE3zm6EBP1T07Hq832";

const stats = [
  { label: "মোট User", value: "12,450", icon: <Users size={24} />, color: "bg-indigo-600", change: "+12%" },
  { label: "মোট ভিডিও", value: "48,230", icon: <Video size={24} />, color: "bg-pink-600", change: "+8%" },
  { label: "আজকের Revenue", value: "৳45,200", icon: <CreditCard size={24} />, color: "bg-green-600", change: "+23%" },
  { label: "রিপোর্ট", value: "23", icon: <Flag size={24} />, color: "bg-red-600", change: "-5%" },
];

const recentUsers = [
  { id: 1, name: "রাহুল দাস", email: "rahul@gmail.com", plan: "Pro", status: "active", avatar: "👨", joined: "২৫ মে" },
  { id: 2, name: "সুমাইয়া আক্তার", email: "sumaiya@gmail.com", plan: "Free", status: "active", avatar: "👩", joined: "২৪ মে" },
  { id: 3, name: "করিম সাহেব", email: "karim@gmail.com", plan: "Master", status: "banned", avatar: "🧔", joined: "২৩ মে" },
  { id: 4, name: "প্রিয়া রানী", email: "priya@gmail.com", plan: "Pro", status: "active", avatar: "👧", joined: "২২ মে" },
  { id: 5, name: "তানভীর হোসেন", email: "tanvir@gmail.com", plan: "Free", status: "active", avatar: "👦", joined: "২১ মে" },
];

const reportedContent = [
  { id: 1, title: "আপত্তিকর ভিডিও ১", reporter: "User #123", reason: "অনুপযুক্ত বিষয়বস্তু", thumbnail: "⚠️" },
  { id: 2, title: "স্প্যাম ভিডিও", reporter: "User #456", reason: "স্প্যাম", thumbnail: "🚫" },
  { id: 3, title: "কপিরাইট লঙ্ঘন", reporter: "User #789", reason: "কপিরাইট", thumbnail: "©️" },
];

const tabs = ["📊 Overview", "👥 Users", "🚨 Reports", "💰 Revenue"];

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(recentUsers);
  const [reports, setReports] = useState(reportedContent);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else if (user.uid !== ADMIN_UID) {
        router.push("/dashboard");
      } else {
        setAuthorized(true);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleBan = (id: number) => {
    setUsers(users.map((u) =>
      u.id === id ? { ...u, status: u.status === "banned" ? "active" : "banned" } : u
    ));
  };

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🚫</p>
          <p className="text-white text-2xl font-bold">অনুমতি নেই!</p>
          <p className="text-gray-400 mt-2">আপনি Admin নন।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <div className="bg-red-700 px-6 py-4 flex justify-between items-center shadow-lg">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold"
        >
          ← Dashboard
        </button>
        <h1 className="text-xl font-extrabold">🛡️ Admin Panel</h1>
        <div className="flex items-center gap-3">
          <Bell size={22} className="cursor-pointer hover:text-yellow-300 transition" />
          <Settings size={22} className="cursor-pointer hover:text-yellow-300 transition" />
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto pb-24">

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0 transition ${
                activeTab === i ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 0 && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, i) => (
                <div key={i} className={`${stat.color} rounded-2xl p-4 shadow-lg`}>
                  <div className="flex justify-between items-start mb-2">
                    {stat.icon}
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-extrabold">{stat.value}</p>
                  <p className="text-white/70 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">⚡ Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "User Management", icon: <Users size={20} />, action: () => setActiveTab(1) },
                { label: "Content Reports", icon: <Flag size={20} />, action: () => setActiveTab(2) },
                { label: "Revenue Report", icon: <BarChart3 size={20} />, action: () => setActiveTab(3) },
                { label: "System Settings", icon: <Shield size={20} />, action: () => {} },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.action}
                  className="bg-gray-800 hover:bg-gray-700 rounded-2xl p-4 flex flex-col items-center gap-2 transition text-sm font-bold"
                >
                  <div className="text-red-400">{item.icon}</div>
                  {item.label}
                </button>
              ))}
            </div>

            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">🕐 সাম্প্রতিক কার্যক্রম</h3>
            <div className="bg-gray-800 rounded-2xl p-4 space-y-3">
              {[
                { text: "নতুন user রেজিস্ট্রেশন: রাহুল দাস", time: "২ মিনিট আগে", icon: "👤" },
                { text: "Pro Plan সাবস্ক্রিপশন: সুমাইয়া", time: "১৫ মিনিট আগে", icon: "💎" },
                { text: "ভিডিও রিপোর্ট: আপত্তিকর বিষয়বস্তু", time: "৩০ মিনিট আগে", icon: "🚨" },
                { text: "নতুন ভিডিও আপলোড: ১২৩টি", time: "১ ঘন্টা আগে", icon: "🎬" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-gray-700 last:border-0 pb-3 last:pb-0">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm text-gray-200">{item.text}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 1 && (
          <div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="User খুঁজুন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl border-2 border-gray-700 focus:border-red-500 outline-none transition"
              />
            </div>
            <div className="space-y-3">
              {filtered.map((user) => (
                <div key={user.id} className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-xl">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      user.plan === "Master" ? "bg-purple-600" :
                      user.plan === "Pro" ? "bg-indigo-600" : "bg-gray-600"
                    }`}>
                      {user.plan}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-green-400" : "bg-red-400"}`} />
                      <span className="text-xs text-gray-400">{user.status === "active" ? "Active" : "Banned"}</span>
                      <span className="text-xs text-gray-500">• {user.joined}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBan(user.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          user.status === "banned" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {user.status === "banned" ? <Check size={14} /> : <Ban size={14} />}
                        {user.status === "banned" ? "Unban" : "Ban"}
                      </button>
                      <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-xl transition">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 2 && (
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">✅</p>
                <p className="text-gray-400 font-medium">কোনো রিপোর্ট নেই</p>
              </div>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="bg-gray-800 rounded-2xl p-4 border border-red-900">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-3xl">
                      {report.thumbnail}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{report.title}</p>
                      <p className="text-gray-400 text-xs">রিপোর্টকারী: {report.reporter}</p>
                      <span className="bg-red-600/30 text-red-300 text-xs px-2 py-0.5 rounded-lg mt-1 inline-block">
                        {report.reason}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-xl text-sm font-bold transition flex items-center justify-center gap-1"
                    >
                      <Trash2 size={16} />
                      ভিডিও মুছুন
                    </button>
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-xl text-sm font-bold transition flex items-center justify-center gap-1"
                    >
                      <Check size={16} />
                      উপেক্ষা করুন
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 3 && (
          <div>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-4 text-center">
              <p className="text-gray-200 text-sm mb-1">এই মাসের মোট Revenue</p>
              <p className="text-4xl font-extrabold">৳1,24,500</p>
              <p className="text-green-200 text-sm mt-1">↑ গত মাসের চেয়ে ২৩% বেশি</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Free Users", value: "8,234", color: "text-gray-400" },
                { label: "Pro Users", value: "3,456", color: "text-indigo-400" },
                { label: "Master Users", value: "645", color: "text-purple-400" },
                { label: "Enterprise", value: "115", color: "text-blue-400" },
              ].map((item, i) => (
                <div key={i} className="bg-gray-800 rounded-2xl p-4 text-center">
                  <p className={`text-2xl font-extrabold ${item.color}`}>{item.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-800 rounded-2xl p-4">
              <h3 className="font-bold mb-3 text-gray-200">📈 সাম্প্রতিক লেনদেন</h3>
              <div className="space-y-3">
                {[
                  { name: "রাহুল দাস", plan: "Pro", amount: "৳999", time: "২ মিনিট আগে" },
                  { name: "সুমাইয়া আক্তার", plan: "Master", amount: "৳2499", time: "১ ঘন্টা আগে" },
                  { name: "প্রিয়া রানী", plan: "Pro", amount: "৳999", time: "৩ ঘন্টা আগে" },
                  { name: "তানভীর হোসেন", plan: "Pro Yearly", amount: "৳9588", time: "৫ ঘন্টা আগে" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-700 last:border-0 pb-3 last:pb-0">
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-gray-400 text-xs">{item.plan} • {item.time}</p>
                    </div>
                    <span className="text-green-400 font-bold">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
