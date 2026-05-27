"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Star, Zap, Crown, Building2 } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    icon: <Star size={28} className="text-gray-400" />,
    price: { monthly: 0, yearly: 0 },
    color: "border-gray-600",
    btnColor: "bg-gray-600 hover:bg-gray-700",
    badge: null,
    features: [
      "প্রতিদিন ৫০ Credits",
      "৭২০p ভিডিও রেজুলেশন",
      "৩টি Character স্লট",
      "৫টি ভিডিও স্টোরেজ",
      "Basic Camera Controls",
      "Community Access",
      "ScriptAnim Watermark",
    ],
    notIncluded: [
      "4K Export",
      "Voice Cloning",
      "Priority Generation",
      "Commercial Rights",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: <Zap size={28} className="text-yellow-400" />,
    price: { monthly: 999, yearly: 799 },
    color: "border-indigo-500",
    btnColor: "bg-indigo-600 hover:bg-indigo-700",
    badge: "সবচেয়ে জনপ্রিয়",
    features: [
      "প্রতিদিন ৫০০ Credits",
      "4K ভিডিও Export",
      "২০টি Character স্লট",
      "১০০টি ভিডিও স্টোরেজ",
      "সব Camera Controls",
      "Voice Cloning",
      "Lip Sync",
      "Watermark ছাড়া",
      "Priority Generation",
      "Commercial Rights",
    ],
    notIncluded: [
      "Team Collaboration",
      "Custom Branding",
    ],
  },
  {
    id: "master",
    name: "Master",
    icon: <Crown size={28} className="text-purple-400" />,
    price: { monthly: 2499, yearly: 1999 },
    color: "border-purple-500",
    btnColor: "bg-purple-600 hover:bg-purple-700",
    badge: "সেরা মূল্য",
    features: [
      "Unlimited Credits",
      "4K + Alpha Channel Export",
      "Unlimited Characters",
      "Unlimited Storage",
      "AI Director Assistant",
      "Custom LoRA Training",
      "Multi-voice Support",
      "YouTube SEO Toolkit",
      "Real-time Collaboration",
      "Priority Support",
      "Commercial Rights",
      "Brand Kit",
    ],
    notIncluded: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: <Building2 size={28} className="text-blue-400" />,
    price: { monthly: null, yearly: null },
    color: "border-blue-500",
    btnColor: "bg-blue-600 hover:bg-blue-700",
    badge: "টিমের জন্য",
    features: [
      "সব Master সুবিধা",
      "Team Seats",
      "SSO Login",
      "Admin Panel",
      "Custom Branding",
      "Dedicated Support",
      "SLA Guarantee",
      "Custom API Access",
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState("pro");

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
        <h1 className="text-xl font-extrabold">💎 Pricing</h1>
        <div className="w-20" />
      </div>

      <div className="p-6 max-w-md mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold mb-2">আপনার Plan বেছে নিন</h2>
          <p className="text-gray-400">যেকোনো সময় আপগ্রেড বা ডাউনগ্রেড করুন</p>
        </div>

        {/* Monthly/Yearly Toggle */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className={`font-semibold ${!yearly ? "text-white" : "text-gray-400"}`}>মাসিক</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`w-14 h-7 rounded-full transition-all relative ${yearly ? "bg-indigo-600" : "bg-gray-600"}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${yearly ? "left-8" : "left-1"}`} />
          </button>
          <span className={`font-semibold ${yearly ? "text-white" : "text-gray-400"}`}>
            বার্ষিক
            <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">২০% ছাড়</span>
          </span>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`bg-gray-800 rounded-2xl p-5 border-2 cursor-pointer transition-all ${
                selected === plan.id ? plan.color + " shadow-lg scale-[1.02]" : "border-gray-700"
              }`}
            >
              {/* Plan Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {plan.icon}
                  <div>
                    <h3 className="text-xl font-extrabold">{plan.name}</h3>
                    {plan.badge && (
                      <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {plan.price.monthly === null ? (
                    <p className="text-xl font-extrabold text-blue-400">যোগাযোগ করুন</p>
                  ) : plan.price.monthly === 0 ? (
                    <p className="text-2xl font-extrabold text-green-400">বিনামূল্যে</p>
                  ) : (
                    <div>
                      <p className="text-2xl font-extrabold">
                        ৳{yearly ? plan.price.yearly : plan.price.monthly}
                      </p>
                      <p className="text-gray-400 text-xs">/মাস</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-1.5 mb-4">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-red-400 flex-shrink-0 text-base">✕</span>
                    <span className="text-gray-500">{f}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`w-full py-3 rounded-xl font-bold text-white transition ${plan.btnColor}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (plan.id === "free") {
                    router.push("/dashboard");
                  } else {
                    alert(`${plan.name} Plan এর জন্য Payment সিস্টেম শীঘ্রই আসছে!`);
                  }
                }}
              >
                {plan.id === "free"
                  ? "বর্তমান Plan"
                  : plan.price.monthly === null
                  ? "যোগাযোগ করুন"
                  : `${plan.name} Plan নিন`}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-800 rounded-2xl p-5 mt-6 text-center">
          <p className="text-gray-400 text-sm mb-3">পেমেন্ট পদ্ধতি</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="bg-gray-700 px-4 py-2 rounded-xl text-sm font-bold">💳 Stripe</span>
            <span className="bg-gray-700 px-4 py-2 rounded-xl text-sm font-bold">📱 bKash</span>
            <span className="bg-gray-700 px-4 py-2 rounded-xl text-sm font-bold">📱 Nagad</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-6 mb-8">
          <h3 className="text-lg font-bold mb-3 text-gray-200">❓ সাধারণ প্রশ্ন</h3>
          <div className="space-y-3">
            {[
              {
                q: "Credits কি?",
                a: "প্রতিটি ভিডিও তৈরিতে Credits খরচ হয়। মান ও দৈর্ঘ্য অনুযায়ী Credits কম বেশি লাগে।",
              },
              {
                q: "কি যেকোনো সময় Cancel করা যাবে?",
                a: "হ্যাঁ, যেকোনো সময় Cancel করতে পারবেন। পরবর্তী billing cycle থেকে চার্জ হবে না।",
              },
              {
                q: "Commercial Rights মানে কি?",
                a: "আপনার তৈরি ভিডিও YouTube, TikTok বা অন্য প্ল্যাটফর্মে monetize করতে পারবেন।",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-4">
                <p className="font-bold text-sm text-white mb-1">Q: {item.q}</p>
                <p className="text-gray-400 text-sm">A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
