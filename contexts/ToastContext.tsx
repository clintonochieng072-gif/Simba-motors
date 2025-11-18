"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast from "../components/ui/Toast";

interface ToastItem {
  id: number;
  message: string;
  type: string;
  duration: number;
}

interface ToastContextType {
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (
    message: string,
    type: string = "success",
    duration: number = 3000
  ) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message: string, duration?: number) =>
    addToast(message, "success", duration);
  const showError = (message: string, duration?: number) =>
    addToast(message, "error", duration);
  const showWarning = (message: string, duration?: number) =>
    addToast(message, "warning", duration);
  const showInfo = (message: string, duration?: number) =>
    addToast(message, "info", duration);

  return (
    <ToastContext.Provider
      value={{
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
