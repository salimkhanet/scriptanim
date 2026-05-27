"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wand2, Video, Users, Star, ArrowRight, ArrowLeft } from "lucide-react";

const slides = [
  {
    icon: <Wand2 size={80} className="text-indigo-400" />,
    title: "AI দিয়ে কার্টুন ভিডিও বানান",
    desc: "শুধু স্ক্রিপ্ট লিখুন, AI বাকি সব করবে। মাত্র কয়েক মিনিটে প্রফেশনাল কার্টুন ভিডিও তৈরি করুন।",
    bg: "from-indigo-600 to-purple-600",
  },
  {
    icon: <Users size={80} className="text-pink-400" />,
    title: "নিজের Character বানান",
    desc: "আপনার পছন্দমতো চরিত্র তৈরি করুন। চুল, চোখ, পোশাক সব কাস্টমাইজ করুন এবং বারবার ব্যবহার করুন।",
    bg: "from-pink-600 to-rose-600",
  },
  {
    icon: <Video size={80} className="text-orange-400" />,
    title: "প্রফেশনাল ভিডিও এডিটর",
    desc: "মাল্টি-ট্র্যাক টাইমলাইন, ক্যামেরা কন্ট্রোল, লিপ-সিংক ভয়েসওভার সহ সম্পূর্ণ এডিটিং সুবিধা।",
    bg: "from-orange-500 to-amber-500",
  },
  {
    icon: <Star size={80} className="text-yellow-400" />,
    title: "শুরু করুন বিনামূল্যে!",
    desc: "প্রতিদিন ফ্রি ক্রেডিট পান। YouTube, TikTok, Instagram এ সরাসরি শেয়ার করুন।",
    bg: "from-yellow-500 to-orange-500",
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const skip = () => {
    router.push("/dashboard");
  };

  const slide = slides[current];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${slide.bg} p-6 transition-all duration-500`}>

      {/* Skip Button */}
      <div className="w-full max-w-md flex justify-end mb-4">
        <button
          onClick={skip}
          className="text-white/70 hover:text-white font-semibold text-sm transition"
        >
          Skip →
        </button>
      </div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl p-8 text-center border border-white/20">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          {slide.icon}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-white/80 text-lg leading-relaxed mb-8">
          {slide.desc}
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                i === current ? "w-8 bg-white" : "w-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {current > 0 && (
            <button
              onClick={prev}
              className="flex-1 flex justify-center items-center gap-2 bg-white/20 hover:bg-white/30 text-white py-3 rounded-2xl font-bold transition"
            >
              <ArrowLeft size={20} />
              আগে
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 flex justify-center items-center gap-2 bg-white text-indigo-700 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition"
          >
            {current === slides.length - 1 ? "শুরু করি 🚀" : "পরবর্তী"}
            {current < slides.length - 1 && <ArrowRight size={20} />}
          </button>
        </div>
      </div>

      {/* ScriptAnim branding */}
      <p className="text-white/50 mt-8 text-sm font-medium">ScriptAnim • AI Cartoon Video Maker</p>
    </div>
  );
}
