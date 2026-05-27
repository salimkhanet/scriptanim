"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, RefreshCw, Trash2 } from "lucide-react";
import { db, auth } from "@/firebase/config";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const skinColors = ["#FDBCB4", "#F1C27D", "#E0AC69", "#C68642", "#8D5524", "#4A2912"];
const hairColors = ["#000000", "#4A2912", "#8B4513", "#DAA520", "#FF6B6B", "#9B59B6", "#3498DB", "#FFFFFF"];
const eyeColors = ["#4A2912", "#2E4057", "#27AE60", "#E67E22", "#8E44AD", "#2980B9"];
const hairStyles = ["ছোট", "মাঝারি", "লম্বা", "কোঁকড়া", "সোজা", "বেণী"];
const outfits = ["ক্যাজুয়াল", "ফর্মাল", "স্পোর্টস", "ঐতিহ্যবাহী", "সুপারহিরো", "স্কুল"];
const expressions = ["😊 খুশি", "😢 দুঃখী", "😠 রাগী", "😲 অবাক", "😎 কুল", "🤔 চিন্তিত"];

export default function CharacterPage() {
  const router = useRouter();
  const [charName, setCharName] = useState("আমার চরিত্র");
  const [skinColor, setSkinColor] = useState(skinColors[0]);
  const [hairColor, setHairColor] = useState(hairColors[0]);
  const [eyeColor, setEyeColor] = useState(eyeColors[0]);
  const [hairStyle, setHairStyle] = useState(hairStyles[0]);
  const [outfit, setOutfit] = useState(outfits[0]);
  const [expression, setExpression] = useState(expressions[0]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [characters, setCharacters] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"create" | "my">("create");

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
      collection(db, "characters"),
      where("userId", "==", userId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCharacters(data);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      await addDoc(collection(db, "characters"), {
        userId,
        name: charName,
        skinColor,
        hairColor,
        eyeColor,
        hairStyle,
        outfit,
        expression,
        createdAt: serverTimestamp(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "characters", id));
  };

  const handleRandom = () => {
    setSkinColor(skinColors[Math.floor(Math.random() * skinColors.length)]);
    setHairColor(hairColors[Math.floor(Math.random() * hairColors.length)]);
    setEyeColor(eyeColors[Math.floor(Math.random() * eyeColors.length)]);
    setHairStyle(hairStyles[Math.floor(Math.random() * hairStyles.length)]);
    setOutfit(outfits[Math.floor(Math.random() * outfits.length)]);
    setExpression(expressions[Math.floor(Math.random() * expressions.length)]);
  };

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
        <h1 className="text-xl font-extrabold">Character Creator</h1>
        <button
          onClick={handleRandom}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 px-3 py-2 rounded-xl font-semibold transition text-sm"
        >
          <RefreshCw size={16} />
          Random
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-6 pt-4">
        <button
          onClick={() => setActiveTab("create")}
          className={`flex-1 py-2.5 rounded-xl font-bold transition ${activeTab === "create" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300"}`}
        >
          ✏️ নতুন বানান
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`flex-1 py-2.5 rounded-xl font-bold transition ${activeTab === "my" ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300"}`}
        >
          👥 আমার ({characters.length})
        </button>
      </div>

      <div className="p-6 max-w-md mx-auto pb-24">

        {activeTab === "create" ? (
          <>
            {/* Character Preview */}
            <div className="bg-gray-800 rounded-3xl p-6 mb-6 flex flex-col items-center shadow-xl">
              <div className="relative mb-4">
                <div
                  className="w-32 h-40 rounded-b-3xl flex items-end justify-center shadow-lg"
                  style={{ backgroundColor: outfit === "সুপারহিরো" ? "#E74C3C" : outfit === "ফর্মাল" ? "#2C3E50" : outfit === "স্পোর্টস" ? "#27AE60" : outfit === "স্কুল" ? "#2980B9" : outfit === "ঐতিহ্যবাহী" ? "#8E44AD" : "#95A5A6" }}
                />
                <div
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full shadow-lg flex items-center justify-center text-4xl"
                  style={{ backgroundColor: skinColor }}
                >
                  {expression.split(" ")[0]}
                </div>
                <div
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-24 h-10 rounded-t-full"
                  style={{ backgroundColor: hairColor }}
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eyeColor }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eyeColor }} />
                </div>
              </div>
              <input
                type="text"
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
                className="bg-gray-700 text-white text-center text-lg font-bold px-4 py-2 rounded-xl border-2 border-gray-600 focus:border-indigo-500 outline-none mt-6 w-full"
                placeholder="চরিত্রের নাম"
              />
            </div>

            {saved && (
              <div className="bg-green-500/20 text-green-400 p-3 rounded-xl mb-4 text-center font-medium">
                ✅ চরিত্র সেভ হয়েছে!
              </div>
            )}

            {/* Skin Color */}
            <div className="bg-gray-800 rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-gray-200 mb-3">গায়ের রং</h3>
              <div className="flex gap-3 flex-wrap">
                {skinColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSkinColor(color)}
                    className={`w-10 h-10 rounded-full shadow-lg transition-all ${skinColor === color ? "ring-4 ring-white scale-110" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Hair Color */}
            <div className="bg-gray-800 rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-gray-200 mb-3">চুলের রং</h3>
              <div className="flex gap-3 flex-wrap">
                {hairColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setHairColor(color)}
                    className={`w-10 h-10 rounded-full shadow-lg transition-all border border-gray-600 ${hairColor === color ? "ring-4 ring-white scale-110" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Eye Color */}
            <div className="bg-gray-800 rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-gray-200 mb-3">চোখের রং</h3>
              <div className="flex gap-3 flex-wrap">
                {eyeColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setEyeColor(color)}
                    className={`w-10 h-10 rounded-full shadow-lg transition-all ${eyeColor === color ? "ring-4 ring-white scale-110" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Hair Style */}
            <div className="bg-gray-800 rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-gray-200 mb-3">চুলের স্টাইল</h3>
              <div className="flex gap-2 flex-wrap">
                {hairStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setHairStyle(style)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${hairStyle === style ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Outfit */}
            <div className="bg-gray-800 rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-gray-200 mb-3">পোশাক</h3>
              <div className="flex gap-2 flex-wrap">
                {outfits.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOutfit(o)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${outfit === o ? "bg-pink-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Expression */}
            <div className="bg-gray-800 rounded-2xl p-5 mb-6">
              <h3 className="font-bold text-gray-200 mb-3">মুখের ভাব</h3>
              <div className="flex gap-2 flex-wrap">
                {expressions.map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setExpression(exp)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${expression === exp ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition flex justify-center items-center gap-2 disabled:opacity-60"
            >
              <Save size={22} />
              {saving ? "সেভ হচ্ছে..." : "চরিত্র সেভ করুন"}
            </button>
          </>
        ) : (
          /* My Characters */
          <div>
            {characters.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-6xl mb-4">👥</p>
                <p className="text-gray-400 text-lg font-medium">কোনো চরিত্র নেই</p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-bold transition"
                >
                  প্রথম চরিত্র বানান
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {characters.map((char) => (
                  <div key={char.id} className="bg-gray-800 rounded-2xl p-4 text-center border border-gray-700">
                    <div className="relative inline-block mb-2">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg"
                        style={{ backgroundColor: char.skinColor }}
                      >
                        {char.expression?.split(" ")[0]}
                      </div>
                    </div>
                    <p className="font-bold text-sm mb-1">{char.name}</p>
                    <p className="text-gray-400 text-xs mb-3">{char.outfit}</p>
                    <button
                      onClick={() => handleDelete(char.id)}
                      className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <Trash2 size={12} />
                      মুছুন
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
