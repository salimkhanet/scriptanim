"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from "lucide-react";

const faqs = [
  {
    category: "🎬 ভিডিও তৈরি",
    items: [
      {
        q: "কিভাবে প্রথম ভিডিও বানাবো?",
        a: "Dashboard থেকে 'নতুন ভিডিও' বাটনে চাপুন। স্ক্রিপ্ট লিখুন, স্টাইল বেছে নিন এবং 'ভিডিও তৈরি করুন' বাটনে চাপুন।",
      },
      {
        q: "একটি ভিডিও তৈরি করতে কত সময় লাগে?",
        a: "সাধারণত ১-৫ মিনিট লাগে। ভিডিওর দৈর্ঘ্য ও মানের উপর নির্ভর করে সময় কম বেশি হতে পারে।",
      },
      {
        q: "কত লম্বা ভিডিও বানাতে পারব?",
        a: "Free Plan এ সর্বোচ্চ ৩০ সেকেন্ড। Pro Plan এ ৫ মিনিট। Master Plan এ সীমাহীন।",
      },
    ],
  },
  {
    category: "💰 Credits ও Payment",
    items: [
      {
        q: "Credits কি এবং কিভাবে পাব?",
        a: "Credits দিয়ে ভিডিও তৈরি করা হয়। প্রতিদিন ৫০টি ফ্রি Credits পাবেন। আরো Credits কিনতে Pricing পেজে যান।",
      },
      {
        q: "bKash দিয়ে কিভাবে পেমেন্ট করব?",
        a: "Pricing পেজ থেকে Plan বেছে নিন। Payment এ bKash সিলেক্ট করুন এবং নির্দেশনা অনুসরণ করুন।",
      },
      {
        q: "Refund পাব কি?",
        a: "পেমেন্টের ৭ দিনের মধ্যে Refund চাইতে পারবেন। support@scriptanim.com এ ইমেইল করুন।",
      },
    ],
  },
  {
    category: "👤 অ্যাকাউন্ট",
    items: [
      {
        q: "পাসওয়ার্ড ভুলে গেলে কি করব?",
        a: "Login পেজে 'Forgot Password' এ চাপুন। ইমেইলে Reset লিংক পাঠানো হবে।",
      },
      {
        q: "অ্যাকাউন্ট কিভাবে ডিলিট করব?",
        a: "Settings পেজে গিয়ে 'অ্যাকাউন্ট ডিলিট করুন' অপশনে চাপুন।",
      },
      {
        q: "একাধিক ডিভাইসে ব্যবহার করা যাবে?",
        a: "হ্যাঁ, যেকোনো ডিভাইস থেকে একই অ্যাকাউন্টে লগইন করতে পারবেন।",
      },
    ],
  },
  {
    category: "🎨 Character",
    items: [
      {
        q: "Character কিভাবে বানাব?",
        a: "Character পেজে গিয়ে গায়ের রং, চুল, পোশাক বেছে নিন এবং সেভ করুন।",
      },
      {
        q: "কতটি Character বানাতে পারব?",
        a: "Free Plan এ ৩টি, Pro Plan এ ২০টি, Master Plan এ সীমাহীন Character বানাতে পারবেন।",
      },
    ],
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filteredFaqs = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

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
        <h1 className="text-xl font-extrabold">❓ Help Center</h1>
        <div className="w-20" />
      </div>

      <div className="p-6 max-w-md mx-auto pb-24">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-center shadow-xl">
          <p className="text-5xl mb-3">🤝</p>
          <h2 className="text-2xl font-extrabold mb-2">কিভাবে সাহায্য করতে পারি?</h2>
          <p className="text-indigo-200 text-sm">নিচে সাধারণ প্রশ্নের উত্তর খুঁজুন</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="প্রশ্ন খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-xl border-2 border-gray-700 focus:border-indigo-500 outline-none transition"
          />
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-6">
          {filteredFaqs.map((cat) => (
            <div key={cat.category} className="bg-gray-800 rounded-2xl overflow-hidden">
              <h3 className="text-gray-300 font-bold px-5 py-3 border-b border-gray-700">
                {cat.category}
              </h3>
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`;
                const isOpen = openItems.includes(key);
                return (
                  <div key={i} className="border-b border-gray-700 last:border-0">
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-700/50 transition"
                    >
                      <p className="font-semibold text-sm text-white pr-4">{item.q}</p>
                      {isOpen ? (
                        <ChevronUp size={18} className="text-indigo-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gray-800 rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-4 text-center">এখনো সমস্যা হচ্ছে?</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded-xl font-semibold transition">
              <MessageCircle size={20} />
              AI Chat Support
            </button>
            <button className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-xl font-semibold transition">
              <Mail size={20} />
              support@scriptanim.com
            </button>
            <button className="w-full flex items-center gap-3 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-xl font-semibold transition">
              <Phone size={20} />
              +880 1700-000000
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
