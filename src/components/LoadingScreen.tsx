"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gray-950 z-[200] flex flex-col items-center justify-center">

      {/* Logo */}
      <div className="text-center mb-8">
        <div className="text-7xl mb-4 animate-bounce">🎬</div>
        <h1 className="text-4xl font-extrabold text-white tracking-wider">
          ScriptAnim
        </h1>
        <p className="text-indigo-400 mt-2 font-medium">AI Cartoon Video Maker</p>
      </div>

      {/* Loading Bar */}
      <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-loading-bar" />
      </div>

      <p className="text-gray-500 text-sm mt-4 animate-pulse">লোড হচ্ছে...</p>
    </div>
  );
}
