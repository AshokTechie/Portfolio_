import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-panel-elevated border border-cyan-500/30 text-slate-100 shadow-glow-cyan animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
      <span className="text-xs font-mono">{message}</span>
      <button 
        onClick={onClose}
        className="p-1 rounded-md text-slate-400 hover:text-slate-100 transition-colors ml-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
