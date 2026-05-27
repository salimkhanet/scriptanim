"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Youtube, Copy, RefreshCw, Hash, FileText, Image } from "lucide-react";

export default function SEOToolkitPage() {
  const router = useRouter();
  const [videoTitle, setVideoTitle] = useState("");
  const [category, setCategory] = useState("শিক্ষামূলক");
  const [language, setLanguage] = useState("বাংলা");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState("");

  const categories = ["শিক্ষামূলক", "বিনোদন", "কার্টুন", "ব্যবসা", "প্রযুক্তি", "স্বাস্থ্য", "রান্না", "ভ্রমণ"];
  const languages = ["বাংলা", "English", "হিন্দি"];

  const seoData = {
    titles: [
      `${videoTitle} | AI কার্টুন ভিডিও | ScriptAnim`,
      `${videoTitle} - সেরা অ্যানিমেশন ভিডিও ২০২৬`,
      `${videoTitle} | বাংলা কার্টুন | Kids Animation`,
    ],
    description: `এই ভিডিওতে আমরা "${videoTitle}" নিয়ে আলোচনা করেছি। ScriptAnim AI দিয়ে তৈরি এই অ্যানিমেশন ভিডিওটি ${category} বিষয়ক।\n\n📌 ভিডিওতে যা আছে:\n✅ মজাদার অ্যানিমেশন\n✅ সহজ ভাষায় উপস্থাপন\n✅ শিশুদের জন্য উপযুক্ত\n\n🔔 চ্যানেল Subscribe করুন নতুন ভিডিওর জন্য!\n\n#ScriptAnim #কার্টুন #Animation #${category}`,
    tags: [
      "বাংলা কার্টুন",
      "AI animation",
      "ScriptAnim",
      category,
      "kids cartoon",
      "বাংলা ভিডিও",
      "cartoon video",
      "animation 2026",
      "বাংলা অ্যানিমেশন",
      "AI video maker",
      videoTitle,
      "cartoon bangla",
    ],
    hashtags: [
      "#বাংলাকার্টুন",
      "#AIAnimation",
      "#ScriptAnim",
      `#${category}`,
      "#KidsCartoon",
      "#BanglaVideo",
      "#CartoonVideo",
      "#Animation2026",
    ],
    thumbnail: [
      "밝은 রঙ ব্যবহার করুন (লাল, হলুদ, নীল)",
      "বড় টেক্সট রাখুন (৩০% জায়গা)",
      "মুখের expression স্পষ্ট রাখুন",
      "১২৮০x৭২০ রেজুলেশন ব্যবহার করুন",
      "ক্লিকবেইট কিন্তু সত্যিকারের থাম্বনেইল বানান",
    ],
  };

  const handleGenerate = async () => {
    if (!videoTitle.trim()) {
      alert("ভিডিওর বিষয় লিখুন!");
      return;
    }
    setGenerating(true);
    await new Promise((res) => setTimeout(res, 2000));
    setGenerating(false);
    setGenerated(true);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <div className="bg-red-700 px-6 py-4 flex justify-between items-center shadow-lg">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold"
        >
          <ArrowLeft size={22} />
          Dashboard
        </button>
        <h1 className="text-xl font-extrabold flex items-center gap-2">
          <Youtube size={24} />
          SEO Toolkit
        </h1>
        <div className="w-20" />
      </div>

      <div className="p-6 max-w-md mx-auto pb-24">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-5 mb-6 text-center shadow-xl">
          <Youtube size={40} className="mx-auto mb-2" />
          <h2 className="text-xl font-extrabold mb-1">YouTube SEO Toolkit</h2>
          <p className="text-red-200 text-sm">AI দিয়ে Title, Description, Tags তৈরি করুন</p>
        </div>

        {/* Input */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-4">
          <h3 className="font-bold text-gray-200 mb-3">📝 ভিডিওর বিষয়</h3>
          <input
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="যেমন: জাদুর বনের গল্প"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border-2 border-gray-600 focus:border-red-500 outline-none transition mb-4"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-gray-400 text-xs mb-2">ক্যাটাগরি</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-xl border border-gray-600 outline-none text-sm"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-2">ভাষা</p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-xl border border-gray-600 outline-none text-sm"
              >
                {languages.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition flex justify-center items-center gap-2 disabled:opacity-60 mb-6"
        >
          {generating ? (
            <>
              <RefreshCw size={22} className="animate-spin" />
              তৈরি হচ্ছে...
            </>
          ) : (
            <>
              <Youtube size={22} />
              SEO Data তৈরি করুন
            </>
          )}
        </button>

        {/* Generated Results */}
        {generated && (
          <div className="space-y-4">

            {/* Titles */}
            <div className="bg-gray-800 rounded-2xl p-5">
              <h3 className="font-bold text-gray-200 mb-3 flex items-center gap-2">
                <FileText size={18} className="text-red-400" />
                YouTube Title (৩টি অপশন)
              </h3>
              <div className="space-y-2">
                {seoData.titles.map((title, i) => (
                  <div key={i} className="bg-gray-700 rounded-xl p-3 flex items-start justify-between gap-2">
                    <p className="text-sm text-gray-200 flex-1">{title}</p>
                    <button
                      onClick={() => handleCopy(title, `title-${i}`)}
                      className={`flex-shrink-0 p-1.5 rounded-lg transition ${copied === `title-${i}` ? "bg-green-600" : "bg-gray-600 hover:bg-gray-500"}`}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-2xl p-5">
              <h3 className="font-bold text-gray-200 mb-3 flex items-center gap-2">
                <FileText size={18} className="text-blue-400" />
                Description
              </h3>
              <div className="bg-gray-700 rounded-xl p-3 mb-2">
                <p className="text-sm text-gray-200 whitespace-pre-line">{seoData.description}</p>
              </div>
              <button
                onClick={() => handleCopy(seoData.description, "desc")}
                className={`w-full py-2 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${copied === "desc" ? "bg-green-600" : "bg-gray-600 hover:bg-gray-500"}`}
              >
                <Copy size={16} />
                {copied === "desc" ? "কপি হয়েছে! ✅" : "Description কপি করুন"}
              </button>
            </div>

            {/* Tags */}
            <div className="bg-gray-800 rounded-2xl p-5">
              <h3 className="font-bold text-gray-200 mb-3 flex items-center gap-2">
                <Hash size={18} className="text-green-400" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {seoData.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-xl text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleCopy(seoData.tags.join(", "), "tags")}
                className={`w-full py-2 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${copied === "tags" ? "bg-green-600" : "bg-gray-600 hover:bg-gray-500"}`}
              >
                <Copy size={16} />
                {copied === "tags" ? "কপি হয়েছে! ✅" : "Tags কপি করুন"}
              </button>
            </div>

            {/* Hashtags */}
            <div className="bg-gray-800 rounded-2xl p-5">
              <h3 className="font-bold text-gray-200 mb-3 flex items-center gap-2">
                <Hash size={18} className="text-purple-400" />
                Hashtags
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {seoData.hashtags.map((tag, i) => (
                  <span key={i} className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-xl text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleCopy(seoData.hashtags.join(" "), "hashtags")}
                className={`w-full py-2 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${copied === "hashtags" ? "bg-green-600" : "bg-gray-600 hover:bg-gray-500"}`}
              >
                <Copy size={16} />
                {copied === "hashtags" ? "কপি হয়েছে! ✅" : "Hashtags কপি করুন"}
              </button>
            </div>

            {/* Thumbnail Tips */}
            <div className="bg-gray-800 rounded-2xl p-5">
              <h3 className="font-bold text-gray-200 mb-3 flex items-center gap-2">
                <Image size={18} className="text-yellow-400" />
                Thumbnail Tips
              </h3>
              <div className="space-y-2">
                {seoData.thumbnail.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold text-sm flex-shrink-0">✓</span>
                    <p className="text-gray-300 text-sm">{tip}</p>
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
