import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState(null);

  const show = useCallback((msg) => {
    setMessage(msg);
    const t = setTimeout(() => setMessage(null), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <ToastContext.Provider value={{ message, show }}>
      {children}
    </ToastContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components -- useToast is the public API for ToastProvider */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { message: null, show: () => {} };
  return ctx;
}
