"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, Video, Users, Globe, Settings } from "lucide-react";

const navItems = [
  { label: "Home", icon: <Home size={22} />, path: "/dashboard" },
  { label: "ভিডিও", icon: <Video size={22} />, path: "/my-videos" },
  { label: "Character", icon: <Users size={22} />, path: "/character" },
  { label: "Community", icon: <Globe size={22} />, path: "/community" },
  { label: "Settings", icon: <Settings size={22} />, path: "/settings" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const hideOn = ["/login", "/register", "/forgot-password", "/onboarding"];
  if (hideOn.includes(pathname)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition ${
                isActive
                  ? "text-indigo-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {item.icon}
              <span className="text-xs font-semibold">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-indigo-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
