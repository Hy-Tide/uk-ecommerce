import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', action = null) => {
    setToasts((currentToasts) => {
      // Deduping: Don't add a toast if an exact same message is currently active
      if (typeof message === 'string' && currentToasts.some((t) => t.message === message)) {
        return currentToasts;
      }

      const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
      
      const timer = setTimeout(() => {
        removeToast(id);
      }, 4000); // Auto-dismiss after 4 seconds

      return [...currentToasts, { id, message, type, timer, action }];
    });
  }, [removeToast]);

  // Listen to custom event for non-react components (like webservices.js)
  useEffect(() => {
    const handleGlobalToast = (event) => {
      if (event.detail && event.detail.message) {
        showToast(event.detail.message, event.detail.type || 'error');
      }
    };

    window.addEventListener('GLOBAL_TOAST', handleGlobalToast);
    return () => {
      window.removeEventListener('GLOBAL_TOAST', handleGlobalToast);
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 sm:p-6 w-full sm:w-auto z-[9999] flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === 'success';
            const isError = toast.type === 'error';
            const isWarning = toast.type === 'warning';
            
            const Icon = isSuccess ? FiCheckCircle : isError ? FiXCircle : isWarning ? FiAlertTriangle : FiInfo;
            const bgClasses = isSuccess 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : isError 
                ? 'bg-rose-50 border-rose-200 text-rose-800' 
                : isWarning 
                  ? 'bg-amber-50 border-amber-200 text-amber-800' 
                  : 'bg-slate-800 border-slate-700 text-white'; // info
            
            const iconColor = isSuccess ? 'text-emerald-500' : isError ? 'text-rose-500' : isWarning ? 'text-amber-500' : 'text-blue-400';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm w-full pointer-events-auto ${bgClasses}`}
              >
                <Icon className={`text-xl flex-shrink-0 ${iconColor}`} />
                <div className="flex-1 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold leading-tight">{toast.message}</p>
                  {toast.action && (
                    <Link 
                      to={toast.action.link} 
                      className={`flex-shrink-0 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-colors border shadow-xs ${
                        isSuccess ? 'bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700' : 'bg-slate-800 border-slate-900 text-white hover:bg-black'
                      }`}
                      onClick={() => removeToast(toast.id)}
                    >
                      {toast.action.label}
                    </Link>
                  )}
                </div>
                <button 
                  onClick={() => {
                    clearTimeout(toast.timer);
                    removeToast(toast.id);
                  }}
                  className="text-current opacity-60 hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-black/5"
                >
                  <FiX size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
