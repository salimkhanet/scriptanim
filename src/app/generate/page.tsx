"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wand2, Loader2 } from "lucide-react";
import { db, auth } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const styles = ["কার্টুন", "অ্যানিমে", "3D", "স্কেচ", "পিক্সেল আর্ট", "রিয়েলিস্টিক"];
const durations = ["15 সেকেন্ড", "30 সেকেন্ড", "1 মিনিট", "2 মিনিট", "5 মিনিট"];
const ratios = ["16:9 YouTube", "9:16 Shorts/Reels", "1:1 Instagram", "4:3 Classic"];
const languages = ["বাংলা", "English", "হিন্দি"];
const cameras = ["Static", "Pan Left", "Pan Right", "Zoom In", "Zoom Out", "Dolly", "Orbit"];
const moods = ["🎵 Happy", "😢 Sad", "⚡ Energetic", "😌 Calm", "😨 Suspense", "🎉 Celebratory"];

export default function GeneratePage() {
  const router = useRouter();
  const [script, setScript] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [duration, setDuration] = useState(durations[0]);
  const [ratio, setRatio] = useState(ratios[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [camera, setCamera] = useState(cameras[0]);
  const [mood, setMood] = useState(moods[0]);
  const [voiceGender, setVoiceGender] = useState("পুরুষ");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState("");
  const [error, setError] = useState("");
  const [enhancing, setEnhancing] = useState(false);

  const handleEnhance = async () => {
    if (!script.trim()) return;
    setEnhancing(true);
    try {
      const res = await fetch("/api/enhance-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script, language, style }),
      });
      const data = await res.json();
      if (data.enhanced) setScript(data.enhanced);
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!script.trim()) {
      setError("স্ক্রিপ্ট লিখুন!");
      return;
    }
    if (!auth.currentUser) {
      setError("লগইন করুন!");
      return;
    }
    setGenerating(true);
    setProgress(0);
    setError("");

    const steps = [
      "স্ক্রিপ্ট বিশ্লেষণ করা হচ্ছে...",
      "Avatar তৈরি করা হচ্ছে...",
      "ভয়েসওভার যোগ করা হচ্ছে...",
      "ভিডিও রেন্ডার হচ্ছে...",
      "মিউজিক যোগ করা হচ্ছে...",
      "ভিডিও এক্সপোর্ট হচ্ছে...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setStep(steps[i]);
      setProgress(Math.round(((i + 1) / steps.length) * 100));
      await new Promise((res) => setTimeout(res, 1500));
    }

    try {
      const videoRes = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script, voiceGender }),
      });
      const videoData = await videoRes.json();
      const videoId = videoData.videoId || "";
      const videoUrl = videoData.videoUrl || "";

      await addDoc(collection(db, "videos"), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        script,
        style,
        duration,
        ratio,
        language,
        camera,
        mood,
        voiceGender,
        status: videoId ? "প্রসেসিং" : "সম্পন্ন",
        videoId,
        videoUrl,
        createdAt: serverTimestamp(),
        thumbnail: "🎬",
        title: script.substring(0, 30) + "...",
      });

      setGenerating(false);
      router.push("/my-videos");
    } catch (err) {
      setError("সেভ করতে সমস্যা হয়েছে!");
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <div className="bg-indigo-700 px-6 py-4 flex justify-between items-center shadow-lg">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold"
        >
          <ArrowLeft size={22} />
          Dashboard
        </button>
        <h1 className="text-xl font-extrabold">🎬 Video Generator</h1>
        <div className="w-20" />
      </div>

      <div className="p-6 max-w-md mx-auto">

        {generating && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800 rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
              <Loader2 size={60} className="text-indigo-400 animate-spin mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold mb-2">ভিডিও তৈরি হচ্ছে...</h2>
              <p className="text-gray-400 mb-6">{step}</p>
              <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-indigo-400 font-bold text-lg">{progress}%</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-xl mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="font-bold text-gray-200 mb-3">📝 স্ক্রিপ্ট লিখুন</h3>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="এখানে আপনার গল্প বা স্ক্রিপ্ট লিখুন..."
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border-2 border-gray-600 focus:border-indigo-500 outline-none transition resize-none h-36 text-sm"
          />
          <p className="text-gray-500 text-xs mt-2">{script.length} অক্ষর</p>
          <button
            onClick={handleEnhance}
            disabled={enhancing || !script.trim()}
            className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-bold transition flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {enhancing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                AI উন্নত করছে...
              </>
            ) : (
              "✨ AI দিয়ে স্ক্রিপ্ট উন্নত করুন"
            )}
          </button>
        </div>

        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="font-bold text-gray-200 mb-3">🎨 ভিডিও স্টাইল</h3>
          <div className="flex gap-2 flex-wrap">
            {styles.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${style === s ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800 rounded-2xl p-5">
            <h3 className="font-bold text-gray-200 mb-3">⏱ দৈর্ঘ্য</h3>
            <div className="space-y-2">
              {durations.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`w-full px-3 py-2 rounded-xl font-semibold text-xs transition ${duration === d ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-5">
            <h3 className="font-bold text-gray-200 mb-3">📐 অনুপাত</h3>
            <div className="space-y-2">
              {ratios.map((r) => (
                <button
                  key={r}
                  onClick={() => setRatio(r)}
                  className={`w-full px-3 py-2 rounded-xl font-semibold text-xs transition ${ratio === r ? "bg-pink-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="font-bold text-gray-200 mb-3">🎙 ভয়েসওভার</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-xs mb-2">ভাষা</p>
              <div className="flex flex-col gap-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-3 py-2 rounded-xl font-semibold text-xs transition ${language === l ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-2">কণ্ঠস্বর</p>
              <div className="flex flex-col gap-2">
                {["পুরুষ", "মহিলা"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVoiceGender(v)}
                    className={`px-3 py-2 rounded-xl font-semibold text-xs transition ${voiceGender === v ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="font-bold text-gray-200 mb-3">🎥 ক্যামেরা মুভমেন্ট</h3>
          <div className="flex gap-2 flex-wrap">
            {cameras.map((c) => (
              <button
                key={c}
                onClick={() => setCamera(c)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${camera === c ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-gray-200 mb-3">🎵 ব্যাকগ্রাউন্ড মিউজিক</h3>
          <div className="flex gap-2 flex-wrap">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${mood === m ? "bg-yellow-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition flex justify-center items-center gap-2 disabled:opacity-60 mb-8"
        >
          <Wand2 size={24} />
          ভিডিও তৈরি করুন ✨
        </button>

      </div>
    </div>
  );
}
