import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  FileText, 
  Volume2, 
  VolumeX, 
  Layers, 
  List,
  Command
} from 'lucide-react';
import { sound } from '../utils/audio';

export const FloatingNavbar = ({
  viewMode,
  onSwitchToTour,
  onSwitchToBento,
  onSwitchToList,
  soundEnabled,
  onToggleSound,
  onOpenAi,
  onOpenResume,
  onOpenCommand,
}) => {
  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Monogram Brand */}
        <div 
          onClick={() => {
            sound.playClick();
            if (onSwitchToTour) onSwitchToTour();
          }}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl glass-panel-elevated cursor-pointer hover:border-[#41a6f6] transition-all shadow-card-subtle"
        >
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#41a6f6] to-[#ffcd75] flex items-center justify-center font-extrabold text-xs text-[#14151f] font-sans shadow-glow-cyan">
            AH
          </div>
          <span className="font-mono text-xs font-semibold text-slate-200 hidden sm:inline-block">
            ashok.dev
          </span>
        </div>

        {/* Action Controls Pill */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel-elevated shadow-card-subtle">
          
          {/* 3D Tour Mode Button */}
          <button
            onClick={() => {
              sound.playClick();
              onSwitchToTour?.();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              viewMode === 'tour'
                ? 'bg-[#41a6f6] text-[#14151f] font-bold shadow-glow-cyan'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
            title="Switch to 3D Isometric Room Tour"
          >
            <Layers className="w-3.5 h-3.5 text-[#41a6f6]" />
            <span className="font-semibold">3D Tour</span>
          </button>

          {/* Bento Mode Button */}
          <button
            onClick={() => {
              sound.playClick();
              onSwitchToBento?.();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              viewMode === 'interactive'
                ? 'bg-[#41a6f6] text-[#14151f] font-bold shadow-glow-cyan'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
            title="Switch to Bento Document View"
          >
            <span className="hidden sm:inline">Bento</span>
          </button>

          {/* List Mode Button */}
          <button
            onClick={() => {
              sound.playClick();
              onSwitchToList?.();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              viewMode === 'list'
                ? 'bg-[#41a6f6] text-[#14151f] font-bold shadow-glow-cyan'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
            }`}
            title="Switch to Fast Text List View"
          >
            <List className="w-3.5 h-3.5 text-[#ffcd75]" />
            <span className="hidden sm:inline">List</span>
          </button>

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/5 transition-colors"
            title={soundEnabled ? 'Mute Audio Clicks' : 'Enable Audio Clicks'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Ask AI Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAi();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all"
            title="Ask Ashok AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Ask AI</span>
          </button>

          {/* Resume Hub Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenResume();
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs font-mono transition-all"
            title="Download Tailored Resumes"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Quick Cmd+K Palette Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommand();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-4 h-4 text-slate-300" />
          </button>
        </div>

      </div>
    </header>
  );
};
