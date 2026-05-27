"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Play, Pause, SkipBack, SkipForward,
  Scissors, Copy, Trash2, Volume2, Type, Image,
  Music, Layers, Download, Undo, Redo, ZoomIn, ZoomOut
} from "lucide-react";

const tracks = [
  { id: 1, label: "🎬 ভিডিও", color: "bg-indigo-600", items: ["দৃশ্য ১", "দৃশ্য ২", "দৃশ্য ৩"] },
  { id: 2, label: "🎙 ভয়েস", color: "bg-pink-600", items: ["ভয়েসওভার ১", "ভয়েসওভার ২"] },
  { id: 3, label: "🎵 মিউজিক", color: "bg-yellow-600", items: ["ব্যাকগ্রাউন্ড মিউজিক"] },
  { id: 4, label: "✏️ টেক্সট", color: "bg-green-600", items: ["শিরোনাম", "সাবটাইটেল"] },
];

const tools = [
  { icon: <Scissors size={20} />, label: "কাটুন" },
  { icon: <Copy size={20} />, label: "কপি" },
  { icon: <Trash2 size={20} />, label: "মুছুন" },
  { icon: <Type size={20} />, label: "টেক্সট" },
  { icon: <Image size={20} />, label: "ছবি" },
  { icon: <Music size={20} />, label: "মিউজিক" },
  { icon: <Volume2 size={20} />, label: "অডিও" },
  { icon: <Layers size={20} />, label: "লেয়ার" },
];

export default function EditorPage() {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [volume, setVolume] = useState(80);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Navbar */}
      <div className="bg-indigo-700 px-4 py-3 flex justify-between items-center shadow-lg">
        <button
          onClick={() => router.push("/my-videos")}
          className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold text-sm"
        >
          <ArrowLeft size={20} />
          ভিডিও
        </button>
        <h1 className="text-lg font-extrabold">✂️ Editor</h1>
        <div className="flex items-center gap-2">
          <button className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-xl font-bold text-sm transition flex items-center gap-1">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Preview Window */}
      <div className="bg-black mx-4 mt-4 rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="text-center">
            <p className="text-6xl mb-2">🎬</p>
            <p className="text-gray-400 text-sm">ভিডিও প্রিভিউ</p>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="px-4 mt-3">
        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-700 rounded-full mb-3 cursor-pointer">
          <div
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">0:15</span>
          <div className="flex items-center gap-4">
            <button className="hover:text-yellow-300 transition">
              <SkipBack size={22} />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="bg-indigo-600 hover:bg-indigo-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition"
            >
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <button className="hover:text-yellow-300 transition">
              <SkipForward size={22} />
            </button>
          </div>
          <span className="text-gray-400 text-xs">0:30</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl transition">
              <Undo size={18} />
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl transition">
              <Redo size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl transition"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-gray-400 text-xs">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl transition"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        {/* Tools */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tools.map((tool, i) => (
            <button
              key={i}
              onClick={() => setSelectedTool(i)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition flex-shrink-0 ${
                selectedTool === i
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tool.icon}
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="px-4 mt-3 flex-1 overflow-y-auto">
        <h3 className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-wider">Timeline</h3>
        <div className="space-y-2">
          {tracks.map((track) => (
            <div key={track.id}>
              <p className="text-gray-500 text-xs mb-1">{track.label}</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {track.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`${track.color} px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition opacity-90 hover:opacity-100 ${
                      selectedTrack === track.id ? "ring-2 ring-white" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-xl text-xs text-gray-400 flex-shrink-0 transition">
                  + যোগ করুন
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Volume Control */}
        <div className="bg-gray-800 rounded-2xl p-4 mt-4 mb-6">
          <div className="flex items-center gap-3">
            <Volume2 size={20} className="text-gray-400 flex-shrink-0" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 accent-indigo-500"
            />
            <span className="text-gray-400 text-sm w-8">{volume}%</span>
          </div>
        </div>
      </div>

    </div>
  );
}
