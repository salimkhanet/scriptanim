"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const icons = {
  success: <CheckCircle size={20} className="text-green-400" />,
  error: <XCircle size={20} className="text-red-400" />,
  warning: <AlertCircle size={20} className="text-yellow-400" />,
  info: <Info size={20} className="text-blue-400" />,
};

const colors = {
  success: "border-green-500/50 bg-green-500/10",
  error: "border-red-500/50 bg-red-500/10",
  warning: "border-yellow-500/50 bg-yellow-500/10",
  info: "border-blue-500/50 bg-blue-500/10",
};

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl ${colors[type]} animate-slide-in`}>
      {icons[type]}
      <p className="text-white font-semibold text-sm flex-1">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-white transition">
        <X size={18} />
      </button>
    </div>
  );
}

// Toast Container
interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: number) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 left-4 z-[100] flex flex-col gap-2 max-w-md mx-auto">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

// Toast Hook
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = {
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
    warning: (message: string) => addToast(message, "warning"),
    info: (message: string) => addToast(message, "info"),
  };

  return { toasts, removeToast, toast };
}
