"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Bell, Shield, Globe, Moon, Sun,
  Trash2, Download, LogOut, ChevronRight,
  Volume2, Eye, Lock, Smartphone, HelpCircle
} from "lucide-react";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export default function SettingsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState("বাংলা");
  const [quality, setQuality] = useState("4K");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-all relative ${value ? "bg-indigo-600" : "bg-gray-600"}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${value ? "left-7" : "left-1"}`} />
    </button>
  );

  const SettingRow = ({
    icon, label, desc, children
  }: {
    icon: React.ReactNode;
    label: string;
    desc?: string;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-700 last:border-0">
      <div className="flex items-center gap-3">
        <div className="text-gray-400">{icon}</div>
        <div>
          <p className="font-semibold text-white text-sm">{label}</p>
          {desc && <p className="text-gray-500 text-xs mt-0.5">{desc}</p>}
        </div>
      </div>
      {children}
    </div>
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
        <h1 className="text-xl font-extrabold">⚙️ Settings</h1>
        <div className="w-20" />
      </div>

      <div className="p-6 max-w-md mx-auto">

        {/* Appearance */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">🎨 চেহারা</h3>
          <SettingRow
            icon={darkMode ? <Moon size={20} /> : <Sun size={20} />}
            label="ডার্ক মোড"
            desc="অ্যাপের থিম পরিবর্তন করুন"
          >
            <Toggle value={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </SettingRow>
          <SettingRow
            icon={<Globe size={20} />}
            label="ভাষা"
            desc="অ্যাপের ভাষা"
          >
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded-xl border border-gray-600 outline-none"
            >
              <option>বাংলা</option>
              <option>English</option>
              <option>হিন্দি</option>
            </select>
          </SettingRow>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">🔔 নোটিফিকেশন</h3>
          <SettingRow
            icon={<Bell size={20} />}
            label="Push নোটিফিকেশন"
            desc="ভিডিও তৈরি হলে জানান"
          >
            <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
          </SettingRow>
          <SettingRow
            icon={<Volume2 size={20} />}
            label="Sound Effects"
            desc="অ্যাপের সাউন্ড"
          >
            <Toggle value={soundEffects} onChange={() => setSoundEffects(!soundEffects)} />
          </SettingRow>
        </div>

        {/* Video Settings */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">🎬 ভিডিও</h3>
          <SettingRow
            icon={<Eye size={20} />}
            label="Default Quality"
            desc="ভিডিও এক্সপোর্টের মান"
          >
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded-xl border border-gray-600 outline-none"
            >
              <option>720p</option>
              <option>1080p</option>
              <option>4K</option>
            </select>
          </SettingRow>
          <SettingRow
            icon={<Smartphone size={20} />}
            label="Auto Save"
            desc="প্রতি ৩০ সেকেন্ডে সেভ"
          >
            <Toggle value={autoSave} onChange={() => setAutoSave(!autoSave)} />
          </SettingRow>
        </div>

        {/* Security */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">🔐 নিরাপত্তা</h3>
          <button
            onClick={() => router.push("/forgot-password")}
            className="w-full flex items-center justify-between py-4 border-b border-gray-700"
          >
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-gray-400" />
              <div className="text-left">
                <p className="font-semibold text-white text-sm">পাসওয়ার্ড পরিবর্তন</p>
                <p className="text-gray-500 text-xs">নতুন পাসওয়ার্ড সেট করুন</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="w-full flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-400" />
              <div className="text-left">
                <p className="font-semibold text-white text-sm">Privacy Settings</p>
                <p className="text-gray-500 text-xs">আপনার তথ্য নিয়ন্ত্রণ করুন</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Help */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">❓ সাহায্য</h3>
          <button
            onClick={() => router.push("/help")}
            className="w-full flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-gray-400" />
              <div className="text-left">
                <p className="font-semibold text-white text-sm">Help Center</p>
                <p className="text-gray-500 text-xs">সাহায্য ও সাধারণ প্রশ্ন</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Data */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">📦 ডেটা</h3>
          <button className="w-full flex items-center justify-between py-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Download size={20} className="text-gray-400" />
              <div className="text-left">
                <p className="font-semibold text-white text-sm">ডেটা Export করুন</p>
                <p className="text-gray-500 text-xs">আপনার সব তথ্য ডাউনলোড করুন</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-3">
              <Trash2 size={20} className="text-red-400" />
              <div className="text-left">
                <p className="font-semibold text-red-400 text-sm">অ্যাকাউন্ট ডিলিট করুন</p>
                <p className="text-gray-500 text-xs">সব ডেটা মুছে যাবে</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* App Info */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-4 text-center">
          <p className="text-2xl mb-1">🎬</p>
          <p className="font-extrabold text-lg">ScriptAnim</p>
          <p className="text-gray-400 text-sm">Version 1.0.0</p>
          <p className="text-gray-500 text-xs mt-1">AI Cartoon Video Maker</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 transition mb-8"
        >
          <LogOut size={22} />
          Logout
        </button>

        {/* Delete Confirm Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gray-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
              <p className="text-4xl text-center mb-4">⚠️</p>
              <h3 className="text-xl font-extrabold text-center mb-2">নিশ্চিত করুন</h3>
              <p className="text-gray-400 text-center text-sm mb-6">
                অ্যাকাউন্ট ডিলিট করলে সব ভিডিও, চরিত্র এবং ডেটা চিরতরে মুছে যাবে!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-bold transition"
                >
                  বাতিল
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    alert("অ্যাকাউন্ট ডিলিট ফিচার শীঘ্রই আসছে!");
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold transition"
                >
                  ডিলিট করুন
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
