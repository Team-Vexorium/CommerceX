import { useEffect, useState } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

let toastListeners: ((toast: Toast) => void)[] = [];

export function showToast(message: string, type: Toast["type"] = "success") {
  const toast: Toast = {
    id: `${Date.now()}-${Math.random()}`,
    message,
    type,
  };
  toastListeners.forEach((fn) => fn(toast));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
    toastListeners.push(handler);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== handler);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slide-up rounded-xl px-5 py-3.5 text-sm font-medium shadow-lg backdrop-blur-sm ${
            toast.type === "success"
              ? "bg-charcoal text-white"
              : toast.type === "error"
                ? "bg-terracotta text-white"
                : "bg-white text-charcoal border border-border"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
